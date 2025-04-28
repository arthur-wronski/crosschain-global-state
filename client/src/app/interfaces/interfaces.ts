import { DeploymentSummary, PickerOption } from "@/types/types"

export interface DeploymentState {
    primaryChain: string | null,
    setPrimaryChain: (primaryChain: string) => void,

    secondaryChains: string[],
    setSecondaryChains: (secondaryChains: string[]) => void,

    functionsToCopy: string[],
    setFunctionsToCopy: (functionsToCopy: string[]) => void,

    contract: string,
    setContract: (contract: string) => void,

    contractFunctions: PickerOption[],
    setContractFunctions: (contractFunctions: PickerOption[]) => void

    isDeploymentSummaryOpen: boolean,
    setDeploymentSummaryOpen: (open: boolean) => void

    deploymentSummary: DeploymentSummary | null,
    setDeploymentSummary: (summary: DeploymentSummary) => void
}