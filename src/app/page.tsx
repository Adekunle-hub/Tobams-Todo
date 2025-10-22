import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SideIcons from "@/components/SideIcons";
import { ThemeToggle } from "@/components/ThemeToggle";
import Image from "next/image";

export default function Home() {
  return (
    <section className="w-full ">
      <Header/>
      <Hero />
      
    </section>
  );
}
