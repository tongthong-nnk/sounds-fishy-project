import { HomeForm } from "@/components/HomeForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f8fb] px-5 py-8 text-[#17202f] sm:px-8 lg:px-10">
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-2xl">
          <p className="mb-4 inline-flex rounded-md border border-[#2f9c95]/30 bg-white px-4 py-2 text-sm font-semibold text-[#1d6f6a] shadow-sm">
            Private bluffing game
          </p>
          <h1 className="text-5xl font-bold tracking-normal text-[#121a27] sm:text-6xl">
            Sounds Fishy
          </h1>
          <p className="mt-5 text-xl leading-8 text-[#465365]">
            Join friends for quick rounds of believable nonsense, hidden truth,
            and suspiciously confident guesses.
          </p>
          <div className="mt-8 grid max-w-xl gap-3 text-sm font-semibold text-[#253247] sm:grid-cols-3">
            <div className="border-l-4 border-[#2f9c95] bg-white px-4 py-3 shadow-sm">
              4+ players
            </div>
            <div className="border-l-4 border-[#f06c64] bg-white px-4 py-3 shadow-sm">
              1 truth teller
            </div>
            <div className="border-l-4 border-[#3949a3] bg-white px-4 py-3 shadow-sm">
              Many bluffers
            </div>
          </div>
        </div>

        <HomeForm />
      </section>
    </main>
  );
}
