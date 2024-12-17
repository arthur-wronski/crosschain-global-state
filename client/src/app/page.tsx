"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ExternalLink, Code2, Globe, Boxes } from "lucide-react"
import { siGithub } from 'simple-icons';
import DynamicBackground from "./canvas/DynamicBackground"

const features = [
  {
    title: "Cross-Chain Deployment",
    description: "Deploy smart contracts across multiple chains with a single click",
    icon: Globe
  },
  {
    title: "Global State Management",
    description: "Maintain synchronized state across all deployed contracts",
    icon: Boxes
  },
  {
    title: "Developer SDK",
    description: "Comprehensive toolkit for building cross-chain applications",
    icon: Code2
  }
]

export default function Home() {
  return (
    <div className="relative bg-zinc-900 text-zinc-200 min-h-screen">
      {/* Canvas for Dynamic Background */}
      <DynamicBackground/>

      {/* Rest of the existing code remains the same */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 p-8 text-center">
          <p className="text-2xl mb-8 max-w-2xl mx-auto">
            A Global State Framework for Cross-Chain Smart Contracts
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/dashboard">
              <Button className="bg-zinc-700 hover:bg-zinc-600" >
                Get Started
              </Button>
            </Link>
            <Button className="bg-zinc-100 text-zinc-800 hover:bg-zinc-300" onClick={() => window.location.assign('https://github.com/arthur-wronski/orbitum')} variant="outline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="mr-2 h-5 w-5"
              >
                <path d={siGithub.path} />
              </svg>
              View on GitHub
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold text-center mb-12">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="bg-zinc-800 border-zinc-700">
                  <CardHeader className="text-center">
                    <div className="flex justify-center">
                      <Icon className="w-12 h-12 mb-4 text-zinc-400" />
                    </div>
                    <CardTitle className="text-xl text-zinc-200">{feature.title}</CardTitle>
                    <CardDescription className="text-zinc-400">{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-zinc-800 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-zinc-200">Parent-Child Contract Architecture</CardTitle>
                <CardDescription className="text-zinc-400">
                  Deploy a parent contract that manages the global state and child contracts across multiple chains.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-zinc-800 border-zinc-700">
              <CardHeader>
                <CardTitle className="text-zinc-200">Chainlink CCIP Integration</CardTitle>
                <CardDescription className="text-zinc-400">
                  Utilize Chainlink&apos;s Cross-Chain Interoperability Protocol for secure cross-chain communication.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="container mx-auto px-4 py-16 text-center">
          <Card className="bg-gradient-to-r from-zinc-500/10 to-slate-500/10 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-2xl mb-4">Ready to Build Cross-Chain?</CardTitle>
              <CardDescription className="text-lg mb-6">
                Start building the next generation of cross-chain applications with Orbitum
              </CardDescription>
              <Button className="bg-slate-500 hover:bg-slate-600">
                Read the Docs
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  )
}