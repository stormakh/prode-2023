"use client"
import { useState } from "react"
import Hero from "./Hero"
import Faq from "./faq"
import Features from "./features"
import Footer from "./footer"
// import { Dialog } from '@headlessui/react'
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Faq />
      <Footer />
    </>
  )
}
