import { memo, useCallback } from "react"
import { useTranslation } from 'react-i18next';
import Input from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface InputNumberProps {
    name?: string;
    value: number;
    onChange?: (name: string, value: string) => void;
    disabled?: boolean;
    label?: string;
    className?: string;
    required?: boolean;
    placeholder?: string;
    icon?: React.ReactNode;
    min?: number;
    max?: number;
    step?: number | string;
}

const InputNumber = ({
    name,
    value,
    onChange,
    disabled,
    label,
    className,
    icon,
    required,
    placeholder,
    min,
    max,
    step = "any"
}: InputNumberProps) => {
    const { t } = useTranslation();

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;

        if (inputValue === '') {
            onChange?.(name || '', '');
            return;
        }

        const numValue = parseFloat(inputValue);

        if (!isNaN(numValue)) {
            let constrainedValue = numValue;

            if (min !== undefined && numValue < min) {
                constrainedValue = min;
            }

            if (max !== undefined && numValue > max) {
                constrainedValue = max;
            }

            if (constrainedValue === numValue) {
                onChange?.(name || '', inputValue);
            } else {
                onChange?.(name || '', constrainedValue.toString());
            }
        }
    }, [name, onChange, min, max]);

    const handleBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;

        if (inputValue !== '' && !isNaN(parseFloat(inputValue))) {
            const numValue = parseFloat(inputValue);
            let constrainedValue = numValue;

            if (min !== undefined && numValue < min) {
                constrainedValue = min;
            }

            if (max !== undefined && numValue > max) {
                constrainedValue = max;
            }

            if (constrainedValue !== numValue) {
                onChange?.(name || '', constrainedValue.toString());
            }
        }
    }, [name, onChange, min, max]);

    return (
        <div className={cn(
            "grid gap-2 relative",
            className
        )}>
            <Label htmlFor={name} className="text-sm font-medium">
                {t(label || "")}
            </Label>
            <div className="relative">
                {icon}
                <Input
                    id={name}
                    placeholder={placeholder}
                    value={value.toString()}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                        cn(icon ? "pl-10" : "", "h-9 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400")
                    }
                    required={required}
                    disabled={disabled}
                    type="number"
                    min={min}
                    max={max}
                    step={step}
                />
            </div>
        </div>
    )
}

export default memo(InputNumber)
