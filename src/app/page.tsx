import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#dbece6_0%,#f6f1e7_38%,#f8fafc_100%)] px-6 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col justify-between rounded-[2rem] border border-white/70 bg-white/75 p-8 shadow-xl shadow-slate-900/10 backdrop-blur sm:p-12">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-emerald-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-800">
            HACCP / FSSC 22000
          </span>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
              Saha kayitlarini, dokuman revizyonlarini ve kalite akislarini dijitale tasiyan temel iskelet hazir.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Bu ilk kurulum; SQLite tabanli veri modeli, Prisma ORM, Auth.js ile kimlik
              dogrulama ve genisleyebilir operasyon panelini ayni cati altinda toplar.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Giris ekranina git
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
