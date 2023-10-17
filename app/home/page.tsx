"use client";
import Hero from "./Hero";
import Faq from "./faq";
import Features from "./features";
import Footer from "./footer";
import QuienesSomos from "./QuienesSomos";
import GlobalStatsPanel from "../components/GlobalStatsPanel";

export default function Home() {
  return (
    <>
      <Hero />
      <GlobalStatsPanel />
      <Features />
      <Faq />
      <QuienesSomos />
      <Footer />
    </>
  );
}
