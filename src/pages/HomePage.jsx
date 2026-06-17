import Hero from "../components/Hero.jsx";
import Stats from "../components/Stats.jsx";
import Problem from "../components/Problem.jsx";
import Chains from "../components/Chains.jsx";
import Roadmap from "../components/Roadmap.jsx";
import Litepaper from "../components/Litepaper.jsx";

export default function HomePage() {
  return (
    <main className="relative">
      <Hero />
      <Stats />
      <Problem />
      <Chains />
      <Roadmap />
      <Litepaper />
    </main>
  );
}
