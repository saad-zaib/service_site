export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
        Welcome to My Site
      </h1>
      <p className="mt-4 text-lg text-zinc-500 dark:text-zinc-400 max-w-xl">
        A clean, fast, and modern web experience built with Next.js, TypeScript,
        and Tailwind CSS.
      </p>
      <div className="mt-8 flex gap-4">
        <a
          href="#"
          className="rounded-full bg-zinc-900 dark:bg-white px-6 py-3 text-sm font-semibold text-white dark:text-zinc-900 hover:opacity-80 transition-opacity"
        >
          Get Started
        </a>
        <a
          href="#"
          className="rounded-full border border-zinc-300 dark:border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
        >
          Learn More
        </a>
      </div>
    </main>
  );
}
