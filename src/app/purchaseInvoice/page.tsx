"use client"

import { useCallback } from "react"
import Header from "@/components/header";
import useFormManager from "@/hooks/useFormManager";
import DatePicker from "@/components/date-picker";
import InputText from "@/components/input-text";
import QuerySelect from "@/components/query-select";

const PurchaseInvoice = () => {

    const {
        values: {
            invoice_date,
            invoice_notes,
            supplier_id
        },
        handleChange
    } = useFormManager({
        initialValues: {}
    })

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">

            <Header pageTitle="prchsinvc" />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-3 flex-wrap">
                    <DatePicker
                        name="invoice_date"
                        value={invoice_date}
                        label="invcdt"
                        onChange={handleChange}
                        className="w-[15%]"
                    />
                    <QuerySelect
                        name="supplier_id"
                        value={supplier_id}
                        onChange={handleChange}
                        label="splrnm"
                        className="w-[25%]"
                        endPoint="suppliers\get_suppliers_list"
                    />
                    <InputText
                        value={invoice_notes}
                        name="invoice_notes"
                        onChange={handleChange}
                        label="invcnts"
                        className="w-[25%]"
                    />
                </div>
            </main>
        </div>
    )
}

export default PurchaseInvoice