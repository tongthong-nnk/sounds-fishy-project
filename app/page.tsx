import { HomeForm } from "@/components/HomeForm";
import { FishMascot } from "@/components/theme/FishMascot";
import { OceanBackground } from "@/components/theme/OceanBackground";

export default function Home() {
  return (
    <OceanBackground>
      <main className="min-h-screen px-4 py-5 text-[#10243d] sm:px-7 lg:px-10">
        <section className="mx-auto grid min-h-[calc(100svh-2.5rem)] max-w-6xl items-center gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <p className="party-eyebrow mb-3 px-4 py-2 text-sm font-extrabold uppercase tracking-wide">
              Private ocean bluffing table
            </p>
            <div className="flex items-end gap-4">
              <h1 className="party-title text-4xl font-bold tracking-normal sm:text-5xl lg:text-6xl">
                Sounds Fishy
              </h1>
              <FishMascot className="hidden w-20 sm:block lg:w-24" variant="coral" />
            </div>
            <p className="mt-4 max-w-xl text-lg font-semibold leading-7 text-[#173a56] sm:text-xl">
              Quick rounds of suspicious answers, dramatic reveals, and friends
              confidently defending nonsense across the table.
            </p>
            <div className="mt-5 grid max-w-xl gap-3 text-sm font-extrabold text-[#10243d] sm:grid-cols-3">
              <div className="game-card-soft border-l-8 border-[#17a88b] px-4 py-3">
                4+ players
              </div>
              <div className="game-card-soft border-l-8 border-[#42c8f2] px-4 py-3">
                1 truth teller
              </div>
              <div className="game-card-soft border-l-8 border-[#ff6b5f] px-4 py-3">
                Many bluffers
              </div>
            </div>
          </div>

          <HomeForm />
        </section>
      </main>
    </OceanBackground>
  );
}
