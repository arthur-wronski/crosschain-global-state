"use client"

import { Textarea } from "@/components/ui/textarea"
import Picker from "@/components/Picker"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, Rocket, Loader2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import parser from "@solidity-parser/parser"
import { PickerOption } from "@/types/types"
import useDeploymentStore from "@/zustand/useDeploymentStore"
import { getFunctionsFromAST } from "@/utils/deploymentUtils"
import { deployContract } from "@/api/post/deployContract"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Dashboard() {
  const [step, setStep] = useState<1 | 2>(1)
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

  const [parsingSuccess, setParsingSuccess] = useState<boolean>(false)
  const [parsingState, setParsingState] = useState<string>("")

  const [deploymentLoading, setDeploymentLoading] = useState<boolean>(false)



  const handleContractChange = (contract: string) => {
    setContract(contract)

    if (contract === ""){
      setParsingState("No contract detected")
      setParsingSuccess(false)
      return
    }

    const textarea = document.getElementById("textarea") as HTMLElement;
    textarea.style.height = Math.min(textarea.scrollHeight, 500) + "px";

    try {
      const ast = parser.parse(contract)
      console.log("Parsing successful.")
      setParsingSuccess(true)
      setParsingState("Parsing successful.")
      const contractFunctions: string[] = getFunctionsFromAST(ast)

      const functionOptions: PickerOption[] = contractFunctions.map((func) => ({ value: func, label: func }));
      setContractFunctions(functionOptions)
    } catch (e) {
      setParsingSuccess(false)
      console.log(e)
      if (e instanceof parser.ParserError) {
        console.log(e.errors)
        setParsingState("Error parsing: " + e.errors[0].message)
      }
    }

  }

  const handleDeploy = async () => {
    setDeploymentLoading(true)

    if (!primaryChain || !secondaryChain || !functionToCopy || !contract) {
      alert("Please fill in all fields before deploying.");
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 200));

    const res = await deployContract(primaryChain, secondaryChain, functionToCopy, contract)
    console.log(res)
    setDeploymentLoading(false)
  }

  return (
    <div className="flex flex-col items-center relative bg-zinc-900 text-zinc-200 min-h-screen w-full">
      <div className="w-full relative z-10">
        <div className="flex flex-row w-full">
          <div className="flex-1 text-center p-8">
            <Label >Your Solidity contract</Label>
            <Textarea 
              className={`bg-zinc-800 w-[600px] mx-auto max-h-[500px]  border-zinc-600 my-2`}
              id="textarea"
              placeholder="Enter your smart contract code here..."
              onChange={(event) => handleContractChange(event.target.value)}
              disabled={step !== 1}
            />
          </div>
          {step === 2 ? 

            <div className="flex flex-1 flex-row  px-4 p-8 text-center w-full mt-8">
              <Separator orientation="vertical" className="bg-zinc-700"/>
              <Card className="w-[350px] ml-24 bg-zinc-800 border-zinc-700 text-zinc-200">
                <CardHeader>
                  <CardTitle>Deploy your contract</CardTitle>
                  <CardDescription className="text-zinc-500">Choose your parameters and deploy your cross-chain contract</CardDescription>
                </CardHeader>
                <CardContent>
                  <form>
                    <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col">
                      <Label className="mx-auto block text-left text-xs mb-2 text-zinc-400">
                          Primary chain
                      </Label>
                      <Picker 
                        options={chains} 
                        placeholder="Select primary chain"
                        onSelect={(value) => setPrimaryChain(value)} 
                      />
                    </div>
                    <div className="flex flex-col">
                      <Label className="mx-auto block text-left text-xs mb-2 text-zinc-400">
                          Secondary chains
                      </Label>
                      <Picker 
                        options={chains.filter((chain) => chain.value != primaryChain)} 
                        placeholder="Select secondary chains" 
                        onSelect={(value) => setSecondaryChain(value)} 
                      />
                    </div>

                    <div className="flex flex-col">
                      <Label className="mx-auto block text-left text-xs mb-2 text-zinc-400">
                          Function to copy
                      </Label>
                      <Picker 
                        options={contractFunctions} 
                        placeholder="Select function to copy" 
                        onSelect={(value) => setFunctionToCopy(value)} 
                      />
                    </div>

                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    className="flex w-32 h-10 bg-teal-700 hover:bg-teal-600 mx-auto border-zinc-600 mt-4"
                    onClick={handleDeploy} 
                    disabled={!primaryChain || !secondaryChain || !functionToCopy}
                  > 
                    {!deploymentLoading ? 
                      <>
                        <Rocket size={18} />
                        Deploy
                      </>
                      :
                      <>
                        <Loader2 className="animate-spin"/>
                        Deploying...
                      </>
                    }
                    
                  </Button>
                </CardFooter>
              </Card>
            </div> : <></>  
          }
          
        </div>

        {/* TODO: change Pickers to comboboxes as CCIP supports 10 + networks, make secondary a multi select, add icons*/}
        {step === 1 ? 
          <>
            <p className={`text-center ${parsingSuccess ? "text-green-400" : "text-red-500"}`}>
              {parsingState}
            </p>
            <Button 
              className="flex w-24 h-10 bg-teal-700 hover:bg-teal-600 mx-auto border-zinc-600 mt-4"
              onClick={() => setStep(2)} 
              disabled={!parsingSuccess || contract === ""}
            > 
              <ChevronRight size={18} />
              Next
            </Button>
          </>
          : 
          <></>
        }
        
      </div>
    </div>
  )
}