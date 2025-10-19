import { memo } from "react";
import { Button } from "../ui/button";
import { useTranslation } from 'react-i18next';
import { Languages } from "lucide-react";

const LanguageToggle = () => {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;
    const changeLanguage = (lng: "ar" | "en") => () => {
        i18n.changeLanguage(lng);
    }

    const isEnglishLang = currentLanguage === "en"

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={changeLanguage(isEnglishLang ? "ar" : "en")}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800"
            aria-label="Toggle theme"
        >
            <Languages className="h-4 w-4" />
        </Button>
    )
}

export default memo(LanguageToggle)