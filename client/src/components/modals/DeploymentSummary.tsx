import React from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Copy, Check } from "lucide-react"
import { useState } from "react"
import useDeploymentStore from "@/zustand/useDeploymentStore"


const DeploymentSummary = () => {
    const [copiedAddress, setCopiedAddress] = useState<string | null>(null)

    const deploymentSummary = useDeploymentStore((state) => state.deploymentSummary)

    const isDeploymentSummaryOpen = useDeploymentStore((state) => state.isDeploymentSummaryOpen)
    const setDeploymentSummaryOpen = useDeploymentStore((state) => state.setDeploymentSummaryOpen)


    const copyToClipboard = async (text: string) => {
        await navigator.clipboard.writeText(text)
        setCopiedAddress(text)
        setTimeout(() => setCopiedAddress(null), 1500)
    }

    const formatAddress = (address: string) => {
        return `${address.slice(0, 8)}...${address.slice(-8)}`
    }

    if (!deploymentSummary){return}

    return (
        <Dialog open={isDeploymentSummaryOpen} onOpenChange={setDeploymentSummaryOpen}>
            <DialogContent className="bg-zinc-900 border-zinc-700 text-zinc-300">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl">
                        Deployment Summary
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 max-h-[60vh] overflow-y-auto">
                    {/* Parent Contract Info */}
                    <div className="space-y-2 p-4 border border-zinc-700 rounded-lg">
                        <h3 className="font-bold text-lg text-teal-400">Parent Contract</h3>
                        <div className="flex justify-between items-center">
                            <span className="capitalize font-semibold tracking-wide">Network:</span>
                            <span className="capitalize font-bold">{deploymentSummary.parent.chain}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="capitalize font-semibold tracking-wide">Address:</span>
                            <Button
                                className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700"
                                onClick={() => copyToClipboard(deploymentSummary.parent.address)}
                            >
                                {copiedAddress === deploymentSummary.parent.address ? <Check size={16} /> : <Copy size={16} />}
                                <span className="font-mono">{formatAddress(deploymentSummary.parent.address)}</span>
                            </Button>
                        </div>
                    </div>

                    {/* Proxy Contracts Info */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg text-teal-400">Proxy Contracts</h3>
                        {deploymentSummary.proxies.map((proxy, idx) => (
                            <div key={idx} className="space-y-2 p-4 border border-zinc-700 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <span className="capitalize font-semibold tracking-wide">Network:</span>
                                    <span className="capitalize font-bold">{proxy.chain}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="capitalize font-semibold tracking-wide">Address:</span>
                                    <Button
                                        className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700"
                                        onClick={() => copyToClipboard(proxy.address)}
                                    >
                                        {copiedAddress === proxy.address ? <Check size={16} /> : <Copy size={16} />}
                                        <span className="font-mono">{formatAddress(proxy.address)}</span>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DeploymentSummary