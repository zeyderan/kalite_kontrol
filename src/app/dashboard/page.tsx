import { redirect } from "next/navigation";
import { FileText, Package, ShieldAlert, Truck, Users } from "lucide-react";

import { auth } from "@/auth";
import { logout } from "@/app/dashboard/actions";
import { prisma } from "@/lib/prisma";

const moduleCards = [
  {
    title: "Dokuman Yonetimi",
    description: "Politika, prosedur, plan, talimat ve formlarin revizyon kontrollu takibi.",
    icon: FileText,
  },
  {
    title: "Tedarikci ve Girdi",
    description: "Onayli tedarikci, girdi riski, kabul ve performans izleme altyapisi.",
    icon: Truck,
  },
  {
    title: "HACCP ve Tehlike Kontrol",
    description: "O-OGP, KKN, limit, izleme, dogrulama ve geri cagirma baglantilari.",
    icon: ShieldAlert,
  },
  {
    title: "Urun ve Izlenebilirlik",
    description: "Urun kartlari, parti hareketleri ve geri cagirma senaryolari icin temel zemin.",
    icon: Package,
  },
];

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const [documents, suppliers, products, trainings, issues] = await Promise.all([
    prisma.document.count(),
    prisma.supplier.count(),
    prisma.product.count(),
    prisma.trainingPlan.count(),
    prisma.nonconformity.count(),
  ]);

  return (
    <main className="min-h-screen bg-[#f4f1e8] px-6 py-8 text-slate-950">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="flex flex-col gap-4 rounded-[2rem] bg-white px-6 py-6 shadow-lg shadow-slate-900/5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-emerald-700">Hazir Altyapi</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">FSSC 22000 Operasyon Paneli</h1>
            <p className="mt-2 text-sm text-slate-600">
              Giris yapan kullanici: <span className="font-medium">{session.user.email}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm">
              Rol: <span className="font-semibold">{session.user.role}</span>
            </div>
            <form action={logout}>
              <button
                className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                type="submit"
              >
                Cikis yap
              </button>
            </form>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <StatCard label="Dokumanlar" value={documents} accent="bg-amber-200" />
          <StatCard label="Tedarikciler" value={suppliers} accent="bg-emerald-200" />
          <StatCard label="Urunler" value={products} accent="bg-sky-200" />
          <StatCard label="Egitim Planlari" value={trainings} accent="bg-rose-200" />
          <StatCard label="Uygunsuzluklar" value={issues} accent="bg-orange-200" />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-xl shadow-slate-950/15">
            <div className="flex items-center gap-3">
              <Users className="size-6 text-amber-300" />
              <h2 className="text-xl font-semibold">Kurulu cekirdek moduller</h2>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {moduleCards.map((card) => {
                const Icon = card.icon;

                return (
                  <article key={card.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <Icon className="size-5 text-amber-300" />
                    <h3 className="mt-4 text-lg font-semibold">{card.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{card.description}</p>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            <section className="rounded-[2rem] bg-white p-6 shadow-lg shadow-slate-900/5">
              <h2 className="text-lg font-semibold">Sonraki mantikli adimlar</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <li>Dokuman yukleme ve revizyon akislarini eklemek</li>
                <li>Form tabanli kayit ekranlarini olusturmak</li>
                <li>PRP, O-OGP ve KKN ekranlarini veri modeline baglamak</li>
                <li>Izlenebilirlik ve geri cagirma tatbikat ekranlarini kurmak</li>
              </ul>
            </section>

            <section className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-emerald-700">Teknoloji</p>
              <div className="mt-4 flex flex-wrap gap-2 text-sm font-medium text-emerald-950">
                {["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "SQLite", "Auth.js", "Zod", "React Hook Form", "Pino"].map(
                  (item) => (
                    <span key={item} className="rounded-full bg-white px-3 py-1.5 shadow-sm">
                      {item}
                    </span>
                  ),
                )}
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: string;
}) {
  return (
    <article className="rounded-[1.75rem] bg-white p-5 shadow-lg shadow-slate-900/5">
      <div className={`mb-4 h-2 w-16 rounded-full ${accent}`} />
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
    </article>
  );
}
