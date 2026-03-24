export type PermissionAction = 'create' | 'read' | 'update' | 'delete' | 'delete_student';
export type PermissionResource = 'auth' | 'users' | 'books' | 'schools' | 'classes' | 'activities' | 'evaluations' | 'system';
export interface Permission {
    resource: PermissionResource;
    action: PermissionAction;
}
