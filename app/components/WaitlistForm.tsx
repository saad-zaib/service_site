"use client";

export default function WaitlistForm() {
  return (
    <form
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      aria-label="Waitlist signup form"
      onSubmit={(e) => e.preventDefault()}
    >
      <label htmlFor="email" className="sr-only">
        Email address
      </label>
      <input
        id="email"
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder="your@email.com"
        className="flex-1 bg-[#0d1320] border border-[#1a2540] text-white placeholder-[#3a4a66] px-4 py-3 text-sm focus:outline-none focus:border-[#00e5ff] transition-colors"
      />
      <button
        type="submit"
        className="bg-[#00e5ff] text-[#080c14] font-bold px-6 py-3 text-sm tracking-wide hover:bg-[#00b8cc] transition-colors whitespace-nowrap"
      >
        Join Waitlist
      </button>
    </form>
  );
}
