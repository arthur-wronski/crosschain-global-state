"use client"

import { Textarea } from "@/components/ui/textarea"
import Picker from "@/components/Picker"
import React from "react"
import { Button } from "@/components/ui/button"
import { Rocket } from "lucide-react"
import { Label } from "@/components/ui/label"
import parser from "@solidity-parser/parser"
import { PickerOption } from "@/types/types"
import useDeploymentStore from "@/zustand/useDeploymentStore"
import { getFunctionsFromAST } from "@/utils/deploymentUtils"
import { deployContract } from "@/api/post/deployContract"

export default function Dashboard() {
  const chains= [
    { value: "polygon", label: "Polygon" },
    { value: "arb", label: "Arbitrum" },
    { value: "avax", label: "Avalanche" },
    { value: "op", label: "Optimism" },
    { value: "eth", label: "Ethereum" },
    { value: "base", label: "Base" },
  ]

  const primaryChain = useDeploymentStore((state) => state.primaryChain)
  const setPrimaryChain = useDeploymentStore((state) => state.setPrimaryChain)

  // this will later be an array of chains
  const secondaryChain = useDeploymentStore((state) => state.secondaryChain)
  const setSecondaryChain = useDeploymentStore((state) => state.setSecondaryChain)

  const functionToCopy = useDeploymentStore((state) => state.functionToCopy)
  const setFunctionToCopy = useDeploymentStore((state) => state.setFunctionToCopy)

  const contract = useDeploymentStore((state) => state.contract)
  const setContract = useDeploymentStore((state) => state.setContract)

  const contractFunctions = useDeploymentStore((state) => state.contractFunctions)
  const setContractFunctions = useDeploymentStore((state) => state.setContractFunctions)

  const handleContractChange = (contract: string) => {
    setContract(contract)

    const ast = parser.parse(contract)

    const contractFunctions: string[] = getFunctionsFromAST(ast)

    const functionOptions: PickerOption[] = contractFunctions.map((func) => ({ value: func, label: func }));

    setContractFunctions(functionOptions)

  }

  const handleDeploy = async () => {
    if (!primaryChain || !secondaryChain || !functionToCopy || !contract) {
      alert("Please fill in all fields before deploying.");
      return;
    }

    const res = await deployContract(primaryChain, secondaryChain, functionToCopy, contract)
    console.log(res)
  }

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
            onChange={(event) => handleContractChange(event.target.value)}
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
            options={contractFunctions} 
            placeholder="Select function to copy" 
            onSelect={(value) => setFunctionToCopy(value)} 
          />
        </div>

        <Button 
          className="flex w-32 h-10 bg-teal-700 hover:bg-teal-600 mx-auto border-zinc-600 mt-4"
          onClick={handleDeploy} 
        > 
          <Rocket size={18} />
          Deploy
        </Button>
      </div>
    </div>
  )
}