"use client"

import { Textarea } from "@/components/ui/textarea"
import Picker from "@/components/Picker"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Rocket } from "lucide-react"
import { Label } from "@/components/ui/label"

export default function Dashboard() {
  const chains= [
    { value: "polygon", label: "Polygon" },
    { value: "arb", label: "Arbitrum" },
    { value: "avax", label: "Avalanche" },
    { value: "op", label: "Optimism" },
    { value: "eth", label: "Ethereum" },
    { value: "base", label: "Base" },
  ]

  const [primaryChain, setPrimaryChain] = useState<string | null>(null)
  // this will later be an array
  const [secondaryChain, setSecondaryChain] = useState<string | null>(null)
  const [functionToCopy, setFunctionToCopy] = useState<string |null>(null)


  return (
    <div className="flex flex-col items-center relative bg-zinc-900 text-zinc-200 min-h-screen w-full">
      <div className="w-full relative z-10">
        <div className="container mx-auto px-4 p-8 text-center">
          {/* <h1 className="text-white text-6xl font-bold mb-6 bg-clip-text">
            Orbitum Dashboard
          </h1> */}
          <Textarea 
            className="bg-zinc-800 w-1/2 h-20 mx-auto  border-zinc-600" 
            placeholder="Enter your smart contract code here..."
          />
        </div>
        {/* TODO: change Pickers to comboboxes as CCIP supports 10 + networks, make secondary a multi select, add icons*/}
        <div className="flex flex-col">
          <Label className="mx-auto block text-left text-xs mb-2 text-zinc-500">
              Primary chain
          </Label>
          <Picker 
            options={chains} 
            placeholder="Select primary chain"
            onSelect={(value) => setPrimaryChain(value)} 
          />
        </div>
        <div className="flex flex-col">
          <Label className="mx-auto block text-left text-xs mb-2 text-zinc-500">
              Secondary chains
          </Label>
          <Picker 
            options={chains.filter((chain) => chain.value != primaryChain)} 
            placeholder="Select secondary chains" 
            onSelect={(value) => setSecondaryChain(value)} 
          />
        </div>

        <div className="flex flex-col">
          <Label className="mx-auto block text-left text-xs mb-2 text-zinc-500">
              Function to copy
          </Label>
          <Picker 
            options={chains.filter((chain) => chain.value != primaryChain)} 
            placeholder="Select function to copy" 
            onSelect={(value) => setSecondaryChain(value)} 
          />
        </div>

        <Button className="flex w-32 h-10 bg-teal-700 hover:bg-teal-600 mx-auto border-zinc-600 mt-4" > 
          <Rocket size={18} />
          Deploy
        </Button>
      </div>
    </div>
  )
}