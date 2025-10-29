"use client"

import useFormManager from "@/hooks/useFormManager";
import { useTranslation } from 'react-i18next';
import InputText from "@/components/input-text";
import Header from "@/components/header";
import TableWithApi, { useTableFunctionFromRef } from "@/components/table-with-api";
// import { COLUMNS } from "./constants"

const InvoiceSearch = () => {
    const { tableValuesRef, fetchTableData } = useTableFunctionFromRef()
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">

            <Header pageTitle="invcsrch" />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-wrap gap-2 mb-5 items-end">
                    {/* <InputText
                        className="w-[19%]"
                        label="itmnm"
                        value={item_name}
                        name="item_name"
                        onChange={handleChange}
                    />
                    <Button className="cursor-pointer h-full" onClick={handleSearch}>{t("srch")}</Button> */}
                </div>
            </main>
        </div>
    )
}

export default InvoiceSearch