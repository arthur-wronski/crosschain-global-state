"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ExternalLink, Code2, Globe, Boxes } from "lucide-react"
import { siGithub } from 'simple-icons';
import { useEffect, useRef } from "react";

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
  // const canvasRef = useRef(null);

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext('2d');

  //   canvas.width = window.innerWidth;
  //   canvas.height = window.innerHeight;

  //   class CelestialBody {
  //     constructor(x, y, radius, color, type = 'planet') {
  //       this.x = x;
  //       this.y = y;
  //       this.radius = radius;
  //       this.color = color;
  //       this.type = type;
  //       this.noise = Math.random() * 10;
  //       this.rotation = Math.random() * Math.PI * 2;
  //     }

  //     draw(ctx) {
  //       ctx.save();
  //       ctx.beginPath();
        
  //       // Add some organic deformation
  //       ctx.translate(this.x, this.y);
  //       ctx.rotate(this.rotation);
        
  //       if (this.type === 'planet') {
  //         // Create more organic planet shape
  //         ctx.ellipse(0, 0, 
  //           this.radius, 
  //           this.radius * (0.8 + Math.sin(this.noise) * 0.2), 
  //           0, 0, Math.PI * 2
  //         );
  //         ctx.fillStyle = this.color;
  //         ctx.fill();

  //         // Add atmospheric effect
  //         ctx.beginPath();
  //         ctx.ellipse(0, 0, 
  //           this.radius * 1.2, 
  //           this.radius * 1.1, 
  //           0, 0, Math.PI * 2
  //         );
  //         ctx.strokeStyle = `${this.color}33`;
  //         ctx.lineWidth = 3;
  //         ctx.stroke();
  //       }

  //       ctx.restore();
  //     }

  //     update() {
  //       this.noise += 0.05;
  //       this.rotation += 0.01;
  //     }
  //   }

  //   const bodies = [];
  //   const bodyCount = 6;
  //   const colors = [
  //     'rgba(255,255,255,0.7)', 
  //     'rgba(200,200,255,0.5)', 
  //     'rgba(255,200,200,0.5)'
  //   ];

  //   // Create varied celestial bodies
  //   for (let i = 0; i < bodyCount; i++) {
  //     bodies.push(new CelestialBody(
  //       Math.random() * canvas.width,
  //       Math.random() * canvas.height,
  //       Math.random() * 50 + 20,
  //       colors[Math.floor(Math.random() * colors.length)]
  //     ));
  //   }

  //   function animate() {
  //     ctx.fillStyle = 'rgb(30, 41, 59)'; // slate-800
  //     ctx.fillRect(0, 0, canvas.width, canvas.height);

  //     bodies.forEach(body => {
  //       body.update();
  //       body.draw(ctx);

  //       // Wrap around screen
  //       body.x = (body.x + 1) % canvas.width;
  //       body.y = (body.y + 0.5) % canvas.height;
  //     });

  //     requestAnimationFrame(animate);
  //   }

  //   const handleResize = () => {
  //     canvas.width = window.innerWidth;
  //     canvas.height = window.innerHeight;
  //   };

  //   window.addEventListener('resize', handleResize);
  //   animate();

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);
  
  return (
    <div className="relative bg-zinc-900 text-zinc-200 min-h-screen">
      {/* Canvas for Dynamic Background */}
      {/* <canvas ref={canvasRef} className="absolute inset-0 z-0" /> */}

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