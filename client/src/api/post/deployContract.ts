import { handleApiRequest } from "@/api/apiHandler"

export const deployContract = async (primaryChain: string, secondaryChains: string[], functionsToCopy: string[], contract: string) => {
  try {

    const params = {primaryChain, secondaryChains, functionsToCopy, contract}

    const result = await handleApiRequest({
      url: "http://localhost:3001/api/deploy",
      tag: `deployContract`,
      method: "POST",
      body: params,
      successMessage: "Contract Deployment Successful",
      errorMessage: "Contract Deployment Failed",
    })

    return result
  } catch (error) {
    console.error("Deployment error:", error)
    return null
  }
}