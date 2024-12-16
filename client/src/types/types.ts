export interface PickerOption {
    value: string;
    label: string;
}
  
export interface PickerProps {
    options: PickerOption[];
    placeholder: string;
    onSelect: (value: string) => void;
}