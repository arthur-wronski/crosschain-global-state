export interface PickerOption {
    value: string;
    label: string;
}
  
export interface PickerProps {
    options: PickerOption[];
    placeholder: string;
    onSelect: (value: string) => void;
}

type Deployment = {
    chain: string,
    address: string,
  }
  
export type DeploymentSummary = {
    success: boolean, 
    parent: Deployment
    proxies: Deployment[]
  }