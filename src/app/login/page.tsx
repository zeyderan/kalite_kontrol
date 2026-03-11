import { redirect } from "next/navigation";

import { auth } from "@/auth";

import { LoginForm } from "./login-form";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(160deg,#f3efe2_0%,#f9fafb_48%,#d8e6e0_100%)] px-6 py-12">
      <div className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="flex flex-col justify-between rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl shadow-slate-950/20 sm:p-12">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-white/15 px-4 py-1 text-xs uppercase tracking-[0.3em] text-amber-300">
              FSSC 22000 Dijital Sistem
            </span>
            <div className="space-y-4">
              <h1 className="max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
                Dokuman, HACCP ve operasyon kayitlari tek panelde toplansin.
              </h1>
              <p className="max-w-xl text-base leading-7 text-slate-300">
                Bu kurulum; dokuman yonetimi, egitim, tedarikci, uygunsuzluk, izlenebilirlik
                ve tehlike kontrol modullerine genisleyebilecek cekirdek altyapiyi hazirlar.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Temel</p>
              <p className="mt-2 text-lg font-semibold">Next.js 16</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Veri</p>
              <p className="mt-2 text-lg font-semibold">Prisma + SQLite</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Guvenlik</p>
              <p className="mt-2 text-lg font-semibold">Auth.js + Roller</p>
            </div>
          </div>
        </section>

        <section className="flex items-center">
          <div className="w-full rounded-[2rem] border border-white/70 bg-white/85 p-8 shadow-xl shadow-slate-900/10 backdrop-blur sm:p-10">
            <div className="mb-8 space-y-2">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-700">
                Giris
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
                Yonetim paneli
              </h2>
              <p className="text-sm leading-6 text-slate-600">
                Ilk giris icin seed kullanicisi hazirdir.
                <br />
                <span className="font-medium text-slate-950">admin@intizam.local / ChangeMe123!</span>
              </p>
            </div>

            <LoginForm />
          </div>
        </section>
      </div>
    </main>
  );
}
