"use client";

import { useEffect, useState } from "react";

type Post = {
  id: string;
  title: string;
  content: string;
  author?: string;
  createdAt: string;
  updatedAt: string;
};

const emptyForm = { title: "", content: "", author: "" };

export default function ForumClient() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState({ ...emptyForm });
  const [error, setError] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const loadPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError("Não foi possível carregar os posts.");
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const resetForm = () => {
    setForm({ ...emptyForm });
    setEditId(null);
    setError(null);
  };

  const submitPost = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      setError("Título e conteúdo são obrigatórios.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const method = editId ? "PUT" : "POST";
      const path = editId ? `/api/posts/${editId}` : "/api/posts";
      const response = await fetch(path, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          content: form.content,
          author: form.author || undefined,
        }),
      });

      if (!response.ok) {
        const body = await response.json();
        throw new Error(body?.error || "Erro ao salvar post.");
      }

      await loadPosts();
      resetForm();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const editPost = (post: Post) => {
    setForm({ title: post.title, content: post.content, author: post.author ?? "" });
    setEditId(post.id);
    setError(null);
  };

  const deletePost = async (id: string) => {
    if (!confirm("Tem certeza que deseja remover este post?")) {
      return;
    }

    try {
      const response = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (!response.ok && response.status !== 204) {
        throw new Error("Não foi possível apagar o post.");
      }
      await loadPosts();
    } catch {
      setError("Erro ao apagar o post.");
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 p-6">
      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-zinc-900">Fórum de Blog</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Crie, edite e apague posts. A API REST está disponível em <code>/api/posts</code>.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto]">
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-zinc-700">Autor</span>
              <input
                value={form.author}
                onChange={(event) => setForm({ ...form, author: event.target.value })}
                placeholder="Seu nome (opcional)"
                className="mt-1 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-zinc-800"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-zinc-700">Título</span>
              <input
                value={form.title}
                onChange={(event) => setForm({ ...form, title: event.target.value })}
                placeholder="Título do post"
                className="mt-1 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-zinc-800"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-zinc-700">Conteúdo</span>
              <textarea
                value={form.content}
                onChange={(event) => setForm({ ...form, content: event.target.value })}
                rows={5}
                placeholder="Digite aqui o conteúdo do post"
                className="mt-1 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 outline-none focus:border-zinc-800"
              />
            </label>
          </div>

          <div className="flex flex-col justify-between rounded-3xl bg-zinc-950 p-6 text-white">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-300">Ações</p>
              <p className="mt-4 text-sm text-zinc-200">
                Use este painel para criar ou atualizar um post rápido. O botão muda automaticamente quando estiver editando.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                disabled={saving}
                onClick={submitPost}
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-100 disabled:opacity-60"
              >
                {editId ? "Atualizar post" : "Publicar post"}
              </button>
              {editId ? (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-full border border-zinc-700 bg-transparent px-5 py-3 text-sm text-white transition hover:bg-zinc-800"
                >
                  Cancelar edição
                </button>
              ) : null}
            </div>
          </div>
        </div>

        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
      </section>

      <section className="space-y-4">
        {posts.length === 0 ? (
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 text-zinc-700 shadow-sm">
            Nenhum post encontrado. Crie o primeiro post para ver o fórum em ação.
          </div>
        ) : (
          posts.map((post) => (
            <article key={post.id} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-zinc-900">{post.title}</h3>
                  <p className="mt-1 text-sm text-zinc-500">por {post.author ?? "Anonymous"}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => editPost(post)}
                    className="rounded-full border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm text-zinc-900 transition hover:bg-zinc-100"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => deletePost(post.id)}
                    className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700 transition hover:bg-red-100"
                  >
                    Excluir
                  </button>
                </div>
              </div>
              <p className="mt-4 whitespace-pre-line text-zinc-700">{post.content}</p>
              <p className="mt-4 text-xs text-zinc-500">
                Criado em {new Date(post.createdAt).toLocaleString()} • Atualizado em {new Date(post.updatedAt).toLocaleString()}
              </p>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
