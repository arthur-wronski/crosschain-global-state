import { PickerOption } from '@/types/types'
import { create } from 'zustand'

interface DeploymentState {
    primaryChain: string | null,
    setPrimaryChain: (primaryChain: string) => void,

    secondaryChain: string | null,
    setSecondaryChain: (secondaryChain: string) => void,

    functionToCopy: string | null,
    setFunctionToCopy: (functionToCopy: string) => void,

    contract: string,
    setContract: (contract: string) => void,

    contractFunctions: PickerOption[],
    setContractFunctions: (contractFunctions: PickerOption[]) => void
}

const useDeploymentStore = create<DeploymentState>((set) => ({
  primaryChain: null,
  setPrimaryChain: (primaryChain: string) => set({primaryChain}),

  secondaryChain: null,
  setSecondaryChain: (secondaryChain: string) => set({secondaryChain}),

  functionToCopy: null,
  setFunctionToCopy: (functionToCopy: string) => set({functionToCopy}),

  contract: "",
  setContract: (contract: string) => set({contract}),

  contractFunctions: [],
  setContractFunctions: (contractFunctions: PickerOption[]) => set({contractFunctions})
}))

export default useDeploymentStore