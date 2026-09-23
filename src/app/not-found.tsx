import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bella-cream px-6 py-20">
      <div className="max-w-2xl text-center">
        <p className="font-body text-xs uppercase tracking-[0.25em] text-bella-olive">
          Bella Luna
        </p>

        <p className="mt-6 font-display text-8xl tracking-[-0.06em] text-bella-charcoal sm:text-9xl">
          404
        </p>

        <h1 className="mt-4 font-display text-4xl tracking-[-0.04em] text-bella-charcoal sm:text-5xl">
          This page has wandered off.
        </h1>

        <p className="mx-auto mt-6 max-w-lg font-body text-base leading-7 text-bella-muted">
          The page you are looking for does not exist or may have moved.
        </p>

        <div className="mt-10 flex justify-center gap-3">
          <Link
            href="/"
            className="bg-bella-charcoal px-7 py-4 font-body text-xs font-semibold uppercase tracking-[0.18em] text-bella-cream transition hover:bg-bella-olive"
          >
            Back Home
          </Link>

          <Link
            href="/menu"
            className="border border-bella-charcoal/30 px-7 py-4 font-body text-xs font-semibold uppercase tracking-[0.18em] text-bella-charcoal transition hover:bg-bella-charcoal hover:text-bella-cream"
          >
            View Menu
          </Link>
        </div>
      </div>
    </main>
  );
}