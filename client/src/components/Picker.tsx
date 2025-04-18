import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { PickerProps } from "@/types/types"
  
const Picker: React.FC<PickerProps> = ({options, placeholder, onSelect}) => {
    return (
        <div className="mb-4">
            <Select onValueChange={onSelect}>
            <SelectTrigger className="bg-zinc-900 border-none w-[240px] mx-auto">
                <SelectValue className="font-bold" placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-none text-zinc-200">
                {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                    {option.label}
                </SelectItem>
                ))}
            </SelectContent>
            </Select>
        </div>
    )
}

export default Picker