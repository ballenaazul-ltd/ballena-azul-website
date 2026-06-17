import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Stats from "./components/Stats.jsx";
import Problem from "./components/Problem.jsx";
import Chains from "./components/Chains.jsx";
import Roadmap from "./components/Roadmap.jsx";
import Litepaper from "./components/Litepaper.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[40rem] bg-gradient-to-b from-whale/20 via-deep/40 to-transparent" />
      <Navbar />
      <main className="relative">
        <Hero />
        <Stats />
        <Problem />
        <Chains />
        <Roadmap />
        <Litepaper />
      </main>
      <Footer />
    </div>
  );
}
