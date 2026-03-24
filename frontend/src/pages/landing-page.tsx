import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export function LandingPage() {
  useEffect(() => {
    // Inject fonts
    const fontsLink = document.createElement("link");
    fontsLink.href = "https://fonts.googleapis.com/css2?family=Manrope:wght@400;700;800&family=Inter:wght@400;500;600;700&display=swap";
    fontsLink.rel = "stylesheet";
    document.head.appendChild(fontsLink);

    const iconsLink = document.createElement("link");
    iconsLink.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap";
    iconsLink.rel = "stylesheet";
    document.head.appendChild(iconsLink);

    return () => {
      fontsLink.remove();
      iconsLink.remove();
    };
  }, []);

  return (
    <div className="bg-surface font-body text-on-surface selection:bg-secondary-container min-h-screen">
      <style>{`
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .editorial-gradient { background: linear-gradient(135deg, #00113a 0%, #002366 100%); }
        .glass-card { background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(12px); }
        .ai-glow { box-shadow: 0 0 20px rgba(0, 106, 106, 0.15); }
      `}</style>
      
      {/* TopAppBar */}
      <nav className="bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm dark:shadow-none docked full-width top-0 sticky z-50">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-blue-900 dark:text-blue-100 text-3xl">auto_stories</span>
            <span className="font-['Manrope'] font-bold text-2xl tracking-tight text-blue-900 dark:text-blue-50 font-black tracking-tighter">iluminIA</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a className="text-teal-600 dark:text-teal-400 font-bold border-b-2 border-teal-600 font-['Inter'] text-sm font-semibold" href="#">Home</a>
            <a className="text-slate-500 dark:text-slate-400 font-medium hover:text-teal-500 transition-colors font-['Inter'] text-sm font-semibold" href="#how-it-works">Metodologia</a>
            <a className="text-slate-500 dark:text-slate-400 font-medium hover:text-teal-500 transition-colors font-['Inter'] text-sm font-semibold" href="#pricing">Preços</a>
            <Link className="text-teal-600 dark:text-teal-400 font-bold font-['Inter'] text-sm hover:underline" to="/login">Entrar</Link>
            <button className="bg-primary text-tertiary-fixed-dim px-6 py-2.5 rounded-xl font-bold transition-all hover:scale-105 active:opacity-80">Agendar Demonstração</button>
          </div>
          <div className="md:hidden">
            <span className="material-symbols-outlined text-on-surface">menu</span>
          </div>
        </div>
      </nav>
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-32 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="z-10">
              <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-secondary-container text-on-secondary-container font-label text-xs font-bold tracking-widest uppercase">Tecnologia Educacional</span>
              <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-primary leading-[1.1] mb-8 tracking-tight">
                O Futuro da Avaliação Literária com <span className="text-secondary">IA</span>
              </h1>
              <p className="text-on-surface-variant text-xl md:text-2xl leading-relaxed mb-10 max-w-xl">
                Automatize a avaliação de leitura dos seus alunos com inteligência artificial adaptativa e relatórios profundos de compreensão textual.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-primary text-tertiary-fixed-dim px-10 py-5 rounded-2xl font-headline font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform">
                  Agendar Demonstração
                </button>
                <button className="flex items-center justify-center gap-2 px-10 py-5 rounded-2xl font-headline font-bold text-lg text-primary hover:bg-surface-container-high transition-colors">
                  <span className="material-symbols-outlined">play_circle</span>
                  Ver Vídeo
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-20 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]"></div>
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl ai-glow transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <img alt="AI Education" className="w-full aspect-square object-cover" data-alt="Modern digital classroom setting with a student engaging with a tablet showing holographic AI reading analysis elements, soft studio lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaJbk9C_jvHICNtuhmGVIpSX-32BHhT0i6hAMKy6qDP0S4NGHz2mUkdpu28bgwQkiS8iHGsDUL0U94XmVC0xvk3lJczH3qtTbW7htgiMze6RtrL5QzAG90GY8X8iGvVKE6Xoc8ATkuSkxKVc3rEUefdVKryni5ZnvuWkNqLBLHB6WOcwTGLdKr_mwNdc5a1ATPNicYf_uuRjrie3FG6ktq3yRl2zTie84VSxAN9FUtLKGXpwHutYMeZFPP_U4bHlDBazQRvWDbZDk"/>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
              </div>
              
              {/* Floating Insight Card (Custom) */}
              <div className="absolute -bottom-10 -left-10 glass-card p-6 rounded-2xl shadow-2xl max-w-xs border-l-4 border-secondary animate-[bounce_3s_ease-in-out_infinite]">
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-secondary">Insight da IA</span>
                </div>
                <p className="font-headline font-bold text-primary text-sm">"O aluno demonstrou alta capacidade de inferência no capítulo 4."</p>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-24 bg-surface-container-low" id="how-it-works">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-6">Metodologia Simplicificada</h2>
              <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">Transforme a jornada literária da sua escola em três passos inteligentes.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connector line for desktop */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-outline-variant/30 -z-10"></div>
              
              <div className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-3xl bg-surface-container-lowest shadow-lg flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-primary text-4xl">library_add</span>
                </div>
                <h3 className="font-headline text-xl font-bold text-primary mb-4">1. Atribua leituras</h3>
                <p className="text-on-surface-variant font-body">Selecione títulos da nossa biblioteca curada ou faça o upload de seus próprios materiais pedagógicos.</p>
              </div>
              
              <div className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-3xl bg-secondary-container shadow-lg flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-secondary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>forum</span>
                </div>
                <h3 className="font-headline text-xl font-bold text-primary mb-4">2. Interação com a IA</h3>
                <p className="text-on-surface-variant font-body">O aluno conversa com nossa IA sobre o livro, em um diálogo adaptativo que testa compreensão e senso crítico.</p>
              </div>
              
              <div className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-3xl bg-surface-container-lowest shadow-lg flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-primary text-4xl">analytics</span>
                </div>
                <h3 className="font-headline text-xl font-bold text-primary mb-4">3. Relatórios Detalhados</h3>
                <p className="text-on-surface-variant font-body">Receba análises individuais e por turma com métricas de retenção, inferência e vocabulário.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits (Bento Grid Style) */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              <div className="md:col-span-8 bg-primary rounded-[2.5rem] p-12 text-white relative overflow-hidden flex flex-col justify-between min-h-[400px]">
                <div className="z-10">
                  <h2 className="font-headline text-4xl font-bold mb-6">Eficiência da IA</h2>
                  <p className="text-on-primary-container text-xl max-w-md">Reduza o tempo gasto com correção manual em até 85%. Libere seus professores para o que importa: mediar o conhecimento.</p>
                </div>
                <div className="flex gap-4 mt-8 z-10">
                  <div className="bg-white/10 backdrop-blur px-6 py-4 rounded-2xl">
                    <span className="block text-3xl font-bold text-tertiary-fixed-dim">20h+</span>
                    <span className="text-xs uppercase tracking-tighter opacity-70">Salvas por mês</span>
                  </div>
                </div>
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-secondary/20 rounded-full blur-[80px]"></div>
              </div>
              
              <div className="md:col-span-4 bg-surface-container rounded-[2.5rem] p-10 flex flex-col justify-between">
                <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-8">
                  <span className="material-symbols-outlined text-white text-3xl">groups</span>
                </div>
                <div>
                  <h3 className="font-headline text-2xl font-bold text-primary mb-4">Escalável</h3>
                  <p className="text-on-surface-variant">Um tutor particular de leitura para cada aluno simultaneamente. Atenção individualizada em escala industrial.</p>
                </div>
              </div>
              
              <div className="md:col-span-4 bg-secondary-container rounded-[2.5rem] p-10 flex flex-col justify-between">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-8">
                  <span className="material-symbols-outlined text-secondary text-3xl">psychology</span>
                </div>
                <div>
                  <h3 className="font-headline text-2xl font-bold text-primary mb-4">Análise Profunda</h3>
                  <p className="text-on-surface-variant">Vá além do múltipla escolha. Avalie habilidades socioemocionais e conexão textual profunda.</p>
                </div>
              </div>
              
              <div className="md:col-span-8 bg-surface-container-high rounded-[2.5rem] p-12 relative overflow-hidden flex items-center gap-12">
                <div className="flex-1">
                  <h3 className="font-headline text-3xl font-bold text-primary mb-4">Relatórios que contam histórias</h3>
                  <p className="text-on-surface-variant text-lg">Nossa IA mapeia o progresso cognitivo de cada estudante ao longo do ano letivo.</p>
                </div>
                <div className="hidden sm:block flex-1 h-full rounded-2xl overflow-hidden shadow-xl">
                  <img alt="Data Analytics" className="w-full h-full object-cover" data-alt="Detailed data visualization dashboard with clean charts and educational progress metrics on a tablet screen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAonv8tywUELbLAR0DVNCjanoghukbH4BACoCD4vtOSH7h1dcRFUCvr0ox8LtMpUbVxck6yJxlxMPbzxiZ-9KLS9rr2ZP1qnAmEEcv8jMaJFDdg2Prw3kuvEk7EgtirbSIHsnrHkDSjthx8FsxM4p1r8R60PPWAeQjrBHvnHI6xO51QSyHUsQIHOwLeYD1f1rSfdF-G3M_1-XmaFcgoHVMzGSUrFPDxYE39wGqBUQ_M1hhh7W8A_JVuQetVwaHDDpGsF_ssiWhZ2jY"/>
                </div>
              </div>
              
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-24 bg-surface-container-low px-6" id="pricing">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-6">Investimento no Sucesso</h2>
              <p className="text-on-surface-variant text-lg">Escolha o modelo ideal para a maturidade digital da sua escola.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Plano Básico */}
              <div className="bg-surface-container-lowest p-10 rounded-[2rem] shadow-sm hover:shadow-xl transition-shadow flex flex-col">
                <div className="mb-8">
                  <h3 className="font-headline text-2xl font-bold text-primary mb-2">Plano Básico</h3>
                  <p className="text-on-surface-variant text-sm">Para turmas experimentais</p>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  <li className="flex items-center gap-3 text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                    Atribuições individuais
                  </li>
                  <li className="flex items-center gap-3 text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                    Relatórios básicos
                  </li>
                  <li className="flex items-center gap-3 text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                    5 livros/ano indexados
                  </li>
                </ul>
                <button className="w-full py-4 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all">Começar Agora</button>
              </div>
              
              {/* Plano Premium */}
              <div className="bg-primary p-10 rounded-[2.5rem] shadow-2xl relative transform scale-105 z-10 flex flex-col">
                <div className="absolute top-0 right-10 -translate-y-1/2 bg-tertiary-fixed-dim text-on-tertiary-fixed font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest">Mais Popular</div>
                <div className="mb-8">
                  <h3 className="font-headline text-2xl font-bold text-white mb-2">Plano Premium</h3>
                  <p className="text-on-primary-container text-sm">Projetos Literários Completos</p>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  <li className="flex items-center gap-3 text-primary-fixed">
                    <span className="material-symbols-outlined text-secondary-fixed text-lg">check_circle</span>
                    Projetos de Rotação (Ciclos)
                  </li>
                  <li className="flex items-center gap-3 text-primary-fixed">
                    <span className="material-symbols-outlined text-secondary-fixed text-lg">check_circle</span>
                    Rubricas detalhadas personalizadas
                  </li>
                  <li className="flex items-center gap-3 text-primary-fixed">
                    <span className="material-symbols-outlined text-secondary-fixed text-lg">check_circle</span>
                    Upload ilimitado de livros
                  </li>
                  <li className="flex items-center gap-3 text-primary-fixed">
                    <span className="material-symbols-outlined text-secondary-fixed text-lg">check_circle</span>
                    IA de auxílio pedagógico
                  </li>
                </ul>
                <button className="w-full py-4 rounded-xl bg-tertiary-fixed-dim text-primary font-bold hover:scale-[1.02] transition-all">Solicitar Demonstração</button>
              </div>
              
              {/* Plano Escola/Enterprise */}
              <div className="bg-surface-container-lowest p-10 rounded-[2rem] shadow-sm hover:shadow-xl transition-shadow flex flex-col">
                <div className="mb-8">
                  <h3 className="font-headline text-2xl font-bold text-primary mb-2">Plano Escola</h3>
                  <p className="text-on-surface-variant text-sm">Gestão completa da rede</p>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  <li className="flex items-center gap-3 text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                    Integração personalizada (API/LMS)
                  </li>
                  <li className="flex items-center gap-3 text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                    Suporte prioritário 24/7
                  </li>
                  <li className="flex items-center gap-3 text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                    Dashboard Administrativo Master
                  </li>
                  <li className="flex items-center gap-3 text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                    Múltiplos professores e turmas
                  </li>
                </ul>
                <button className="w-full py-4 rounded-xl border-2 border-outline-variant text-on-surface font-bold hover:bg-surface-container-high transition-all">Falar com Consultor</button>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 bg-surface">
          <div className="max-w-5xl mx-auto rounded-[3rem] bg-secondary p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10">
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-white mb-8">Pronto para iluminar o aprendizado?</h2>
              <p className="text-secondary-fixed text-xl mb-12 max-w-2xl mx-auto">Junte-se a dezenas de escolas que já estão transformando a alfabetização e o letramento com nossa tecnologia.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button className="bg-white text-secondary px-12 py-5 rounded-2xl font-headline font-bold text-lg hover:scale-105 transition-transform">Agendar Demonstração</button>
                <button className="border-2 border-white/30 text-white px-12 py-5 rounded-2xl font-headline font-bold text-lg hover:bg-white/10 transition-colors">Contatar Vendas</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-950 w-full py-12 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-blue-900 dark:text-blue-100 text-3xl">auto_stories</span>
              <span className="font-['Manrope'] font-bold text-blue-900 dark:text-blue-100 text-2xl tracking-tight">iluminIA</span>
            </div>
            <p className="font-['Inter'] text-xs text-slate-500 max-w-xs">
              © {new Date().getFullYear()} iluminIA Education. Empoderando a próxima geração de leitores.
            </p>
          </div>
          <div className="flex flex-wrap gap-8 justify-start md:justify-end">
            <a className="text-slate-500 dark:text-slate-400 font-['Inter'] text-xs hover:underline transition-all" href="#">Política de Privacidade</a>
            <a className="text-slate-500 dark:text-slate-400 font-['Inter'] text-xs hover:underline transition-all" href="#">Termos de Serviço</a>
            <a className="text-slate-500 dark:text-slate-400 font-['Inter'] text-xs hover:underline transition-all" href="#">Central de Ajuda</a>
            <a className="text-slate-500 dark:text-slate-400 font-['Inter'] text-xs hover:underline transition-all" href="#">Falar com Vendas</a>
          </div>
        </div>
      </footer>

      {/* BottomNavBar (Mobile only) */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-end pb-6 px-4 lg:hidden bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl shadow-[0_-10px_40px_rgba(0,0,0,0.06)] rounded-t-[2rem] border-t border-slate-200/20">
        <div className="flex flex-col items-center justify-center bg-blue-900 dark:bg-teal-500 text-white dark:text-slate-950 rounded-2xl p-3 mb-1 shadow-lg shadow-blue-200/50">
          <span className="material-symbols-outlined">home</span>
          <span className="font-['Inter'] text-[10px] font-bold uppercase tracking-widest mt-1">Início</span>
        </div>
        <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 p-2">
          <span className="material-symbols-outlined">chat_bubble</span>
          <span className="font-['Inter'] text-[10px] font-bold uppercase tracking-widest mt-1">Ler</span>
        </div>
        <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 p-2">
          <span className="material-symbols-outlined">auto_graph</span>
          <span className="font-['Inter'] text-[10px] font-bold uppercase tracking-widest mt-1">Progresso</span>
        </div>
        <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 p-2">
          <span className="material-symbols-outlined">person</span>
          <span className="font-['Inter'] text-[10px] font-bold uppercase tracking-widest mt-1">Perfil</span>
        </div>
      </nav>
    </div>
  );
}
