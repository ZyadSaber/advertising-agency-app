import { useCallback } from "react"
import { Checkbox as StyledCheckbox } from "@/components/ui/checkbox"
import { useTranslation } from 'react-i18next';
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils";

interface CheckboxProps {
    name?: string;
    checked: boolean;
    onChange?: (name: string, value: boolean) => void;
    disabled?: boolean;
    label?: string;
    className?: string;
}

const Checkbox = (
    {
        name,
        checked,
        onChange,
        disabled,
        label,
        className,
    }: CheckboxProps
) => {
    const { t } = useTranslation();
    const handleChange = useCallback((event: boolean) => {
        onChange(name, event)
    }, [name, onChange])

    return (
        <div className={cn("flex items-center mb-1.5 gap-2", className)}>
            <StyledCheckbox id={name} disabled={disabled} onCheckedChange={handleChange} checked={checked} />
            <Label className="text-[18px] font-light" htmlFor={name}>{t(label || "")}</Label>
        </div>
    )
}

export default Checkbox