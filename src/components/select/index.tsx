import { useCallback, useState, useMemo, useEffect, useRef } from "react"
import { useTranslation } from 'react-i18next';
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Input from "@/components/ui/input"
import { cn } from "@/lib/utils"
import LoadingSpinner from "../loading-spinner"
import { SelectProps } from "./interface"

const SelectView = ({
    className,
    name,
    label,
    placeholder,
    value,
    onChange,
    options,
    loading,
    disabled,
    searchable = true,
    searchPlaceholder
}: SelectProps) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const searchInputRef = useRef<HTMLInputElement>(null)
    const { t } = useTranslation();

    const filteredOptions = useMemo(() => {
        if (!searchable || !searchTerm) {
            return options;
        }
        return options.filter(option =>
            option.value.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [options, searchTerm, searchable]);

    const handleChange = useCallback((value: string) => {
        onChange(name, value)
        setSearchTerm("")
        setIsOpen(false)
    }, [name, onChange])

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }, [])

    useEffect(() => {
        if (isOpen && searchable && searchInputRef.current) {
            searchInputRef.current.focus()
        }
    }, [isOpen, searchable])
    return (
        <div className={cn(
            "grid gap-3 ",
            className
        )}>
            <Label htmlFor={name}>{t(label || "")}</Label>
            <Select value={value} name={name} onValueChange={handleChange} disabled={disabled} onOpenChange={setIsOpen}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {searchable && (
                        <div className="p-2 border-b">
                            <Input
                                ref={searchInputRef}
                                placeholder={searchPlaceholder || t("srch")}
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="h-8"
                                onClick={(e) => e.stopPropagation()}
                                onKeyDown={(e) => e.stopPropagation()}
                                onFocus={(e) => e.stopPropagation()}
                                autoFocus
                            />
                        </div>
                    )}
                    {
                        loading ?
                            <div className="w-full flex justify-center items-center p-2">
                                <LoadingSpinner />
                            </div> :
                            <>
                                {filteredOptions.length > 0 ? (
                                    filteredOptions.map((option, index) => (
                                        <SelectItem
                                            key={index}
                                            value={option.key}
                                            onFocus={(e) => e.preventDefault()}
                                        >
                                            {option.value}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <div className="p-2 text-sm text-muted-foreground text-center">
                                        {t("norslts")}
                                    </div>
                                )}
                            </>
                    }
                </SelectContent>
            </Select>
        </div>
    )
}

export default SelectView
export * from "./interface"