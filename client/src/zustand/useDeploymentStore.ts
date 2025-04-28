import { DeploymentState } from '@/app/interfaces/interfaces'
import { DeploymentSummary, PickerOption } from '@/types/types'
import { create } from 'zustand'

const useDeploymentStore = create<DeploymentState>((set) => ({
  primaryChain: null,
  setPrimaryChain: (primaryChain: string) => set({primaryChain}),

  secondaryChains: [],
  setSecondaryChains: (secondaryChains: string[]) => set({secondaryChains}),

  functionsToCopy: [],
  setFunctionsToCopy: (functionsToCopy: string[]) => set({functionsToCopy}),

  contract: "",
  setContract: (contract: string) => set({contract}),

  contractFunctions: [],
  setContractFunctions: (contractFunctions: PickerOption[]) => set({contractFunctions}),

  isDeploymentSummaryOpen: false,
  setDeploymentSummaryOpen: (open: boolean) => (set({isDeploymentSummaryOpen: open})),

  deploymentSummary: null,
  setDeploymentSummary: (summary: DeploymentSummary) => (set({deploymentSummary: summary})),

}))

export default useDeploymentStore