param(
    [string]$SourceRoot = ".agents",
    [string]$DestRoot = ""
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Get-CodexHome {
    if ($env:CODEX_HOME -and $env:CODEX_HOME.Trim().Length -gt 0) {
        return $env:CODEX_HOME
    }
    return Join-Path $HOME ".codex"
}

function Sanitize-Slug([string]$name) {
    $slug = $name.ToLowerInvariant()
    $slug = $slug -replace "[^a-z0-9\-\.]+", "-"
    $slug = $slug -replace "-+", "-"
    return $slug.Trim("-")
}

function Read-AllTextUtf8([string]$path) {
    return [System.IO.File]::ReadAllText((Resolve-Path $path), [System.Text.Encoding]::UTF8)
}

function Write-Utf8NoBom([string]$path, [string]$content) {
    $dir = Split-Path -Parent $path
    if ($dir -and -not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($path, $content, $utf8NoBom)
}

if (-not (Test-Path $SourceRoot)) {
    throw "Source root not found: $SourceRoot"
}

if ([string]::IsNullOrWhiteSpace($DestRoot)) {
    $DestRoot = Get-CodexHome
}

$sourceSkills = Join-Path $SourceRoot "skills"
$sourceRules = Join-Path $SourceRoot "rules"
$sourceWorkflows = Join-Path $SourceRoot "workflows"
$destSkills = Join-Path $DestRoot "skills"

if (-not (Test-Path $sourceSkills)) {
    throw "Skills directory not found: $sourceSkills"
}

New-Item -ItemType Directory -Path $destSkills -Force | Out-Null

$copiedSkills = 0
$generatedRuleSkills = 0
$generatedWorkflowSkills = 0

# 1) Copy existing Antygravity skills with a Codex-safe prefix to avoid collisions.
Get-ChildItem -Path $sourceSkills -Directory | ForEach-Object {
    $srcName = $_.Name
    $prefixedName = "ag-" + (Sanitize-Slug $srcName)
    $destDir = Join-Path $destSkills $prefixedName

    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
    # Mirror each skill folder into the prefixed destination.
    robocopy $_.FullName $destDir /MIR /NFL /NDL /NJH /NJS /NP | Out-Null
    $copiedSkills++
}

# 2) Convert rules into SKILL.md wrappers so Codex can load them naturally as skills.
if (Test-Path $sourceRules) {
    Get-ChildItem -Path $sourceRules -File -Filter "*.md" | ForEach-Object {
        $baseName = [System.IO.Path]::GetFileNameWithoutExtension($_.Name)
        $slug = "ag-rule-" + (Sanitize-Slug $baseName)
        $skillDir = Join-Path $destSkills $slug
        $skillFile = Join-Path $skillDir "SKILL.md"
        $ruleText = Read-AllTextUtf8 $_.FullName

        $content = @"
---
name: $slug
description: Codex-adapted rule imported from Antygravity file '$($_.Name)'.
---

# $slug

Use this skill to enforce the original Antygravity rule content below.

## Source
- Origin: $($_.FullName)
- Type: rule

## Instructions
$ruleText
"@
        Write-Utf8NoBom -path $skillFile -content $content
        $generatedRuleSkills++
    }
}

# 3) Convert workflows into SKILL.md wrappers so Codex can trigger step-by-step guidance.
if (Test-Path $sourceWorkflows) {
    Get-ChildItem -Path $sourceWorkflows -File -Filter "*.md" | ForEach-Object {
        $baseName = [System.IO.Path]::GetFileNameWithoutExtension($_.Name)
        $slug = "ag-workflow-" + (Sanitize-Slug $baseName)
        $skillDir = Join-Path $destSkills $slug
        $skillFile = Join-Path $skillDir "SKILL.md"
        $workflowText = Read-AllTextUtf8 $_.FullName

        $content = @"
---
name: $slug
description: Codex-adapted workflow imported from Antygravity file '$($_.Name)'.
---

# $slug

Use this skill when the request matches this workflow and execute it step-by-step.

## Source
- Origin: $($_.FullName)
- Type: workflow

## Workflow
$workflowText
"@
        Write-Utf8NoBom -path $skillFile -content $content
        $generatedWorkflowSkills++
    }
}

$summary = @"
Sync completed.
- Source root: $SourceRoot
- Destination root: $DestRoot
- Skills copied: $copiedSkills
- Rule skills generated: $generatedRuleSkills
- Workflow skills generated: $generatedWorkflowSkills
"@

Write-Host $summary
