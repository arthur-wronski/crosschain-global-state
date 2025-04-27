import { DeploymentSummary, PickerOption } from "@/types/types"

export interface DeploymentState {
    primaryChain: string | null,
    setPrimaryChain: (primaryChain: string) => void,

    secondaryChains: string[] | null,
    setSecondaryChains: (secondaryChains: string[]) => void,

    functionToCopy: string | null,
    setFunctionToCopy: (functionToCopy: string) => void,

    contract: string,
    setContract: (contract: string) => void,

    contractFunctions: PickerOption[],
    setContractFunctions: (contractFunctions: PickerOption[]) => void

    isDeploymentSummaryOpen: boolean,
    setDeploymentSummaryOpen: (open: boolean) => void

    deploymentSummary: DeploymentSummary | null,
    setDeploymentSummary: (summary: DeploymentSummary) => void
}