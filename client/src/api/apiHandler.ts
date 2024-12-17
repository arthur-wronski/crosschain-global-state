import { toast } from "@/hooks/use-toast"

export interface ApiRequestOptions {
  url: string
  tag: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: unknown
  successMessage?: string
  errorMessage?: string
}

export const handleApiRequest = async ({
  url, 
  tag,
  method, 
  body, 
  successMessage, 
  errorMessage,
}: ApiRequestOptions) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    console.log(response)

    const data = await response.json()

    if (response.ok) {
      if (successMessage) {
        toast({
            description: successMessage,
        })
      }
      return data
    } else {
      if (errorMessage) {
        toast({
            variant: "destructive",
            description: errorMessage,
        })
      }
      throw new Error(data.message || 'API request failed')
    }
  } catch (error) {
    if (errorMessage) {
        toast({
            variant: "destructive",
            description: error instanceof Error ? error.message : String(error)
        })
    }
    throw error
  }
}