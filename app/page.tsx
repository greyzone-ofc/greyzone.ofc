import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col justify-center gap-6 py-16">
      <p className="text-subtitle font-bold tracking-wider text-ink uppercase">
        Web / AI / Automation
      </p>
      <h1 className="max-w-[12ch] text-h2 font-bold sm:text-h1">
        We build what your business needs.
      </h1>
      <p className="max-w-[65ch] text-ink">
        Websites, applications and AI that solve real problems, designed to be
        used and built to last.
      </p>
      <div className="flex flex-wrap gap-4">
        <Link
          href="/contact"
          className="inline-flex h-12 items-center rounded-button bg-signal px-5 text-button font-bold tracking-button text-white uppercase hover:bg-deep"
        >
          Start a project
        </Link>
        <Link
          href="/work"
          className="inline-flex h-12 items-center rounded-button border border-black px-5 text-button font-bold tracking-button uppercase"
        >
          See our work
        </Link>
      </div>
    </main>
  );
}
