export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-10 px-6 py-16 sm:px-10">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Blog API</p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-6xl">
            REST CRUD API for Blog/Forum
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-300">
            Uma API REST completa para operações CRUD em posts de blog ou fórum, construída com Next.js, TypeScript e MongoDB.
            Inclui documentação interativa com Swagger UI para facilitar o desenvolvimento e integração.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href="/docs"
            className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-300"
          >
            Ver documentação
          </a>
          <a
            href="/api/posts"
            className="inline-flex items-center justify-center rounded-full border border-cyan-400/40 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Abrir endpoint de posts
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm font-semibold text-cyan-200">Endpoints</p>
            <p className="mt-4 text-sm text-slate-300">GET, POST, PUT e DELETE para `/api/posts` e `/api/posts/:id`.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm font-semibold text-cyan-200">MongoDB</p>
            <p className="mt-4 text-sm text-slate-300">Conexão segura com MongoDB usando `MONGODB_URI`.</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm font-semibold text-cyan-200">Swagger UI</p>
            <p className="mt-4 text-sm text-slate-300">Documentação interativa disponível em `/docs`.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
