import Link from "next/link";
import Reveal from "@/components/site/Reveal";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export const metadata = {
  title: "Admin Login | Trattoria Bella Luna",
  description: "Administration login for Trattoria Bella Luna.",
};

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-bella-cream">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="relative hidden overflow-hidden bg-bella-olive lg:block">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85')",
            }}
          />

          <div className="absolute inset-0 bg-bella-charcoal/45" />

          <div className="relative z-10 flex h-full flex-col justify-between p-10 text-bella-cream">
            <Link
              href="/"
              className="font-display text-3xl tracking-[-0.04em]"
            >
              Bella Luna
            </Link>

            <div>
              <p className="font-body text-xs uppercase tracking-[0.25em] text-bella-cream/60">
                Administration
              </p>

              <h1 className="mt-4 max-w-xl font-display text-6xl leading-[0.9] tracking-[-0.05em]">
                Welcome back.
              </h1>
            </div>
          </div>
        </section>

        <section className="flex items-center px-6 py-12 sm:px-10 lg:px-20">
          <div className="mx-auto w-full max-w-md">
            <Reveal>
              <Link
                href="/"
                className="font-body text-xs uppercase tracking-[0.2em] text-bella-muted transition-colors hover:text-bella-charcoal"
              >
                ← Back to website
              </Link>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-16 font-body text-xs font-semibold uppercase tracking-[0.3em] text-bella-muted">
                Admin portal
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <h2 className="mt-4 font-display text-5xl leading-[0.92] tracking-[-0.045em] text-bella-charcoal sm:text-6xl">
                Sign in to
                <br />
                <span className="text-bella-olive">Bella Luna.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-12">
                <AdminLoginForm />
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </main>
  );
}