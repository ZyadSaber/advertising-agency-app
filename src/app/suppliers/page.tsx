"use client"

import { useCallback } from "react"
import { useTranslation } from 'react-i18next';
import Header from "@/components/header";
import InputText from "@/components/input-text";
import useFormManager from "@/hooks/useFormManager";
import { Button } from "@/components/ui/button"
import TableWithApi, { useTableFunctionFromRef } from "@/components/table-with-api";
import useOpenStatus from "@/hooks/useOpenStatus";
import CustomerSupplierModal from "@/components/customer-supplier-modal";
import { RecordWithAnyValue } from "@/interfaces/global";
import api from "@/lib/axios";
import { COLUMNS } from "./constants"
import { toast } from "sonner";

const SuppliersPage = () => {
    const { tableValuesRef, fetchTableData } = useTableFunctionFromRef()
    const { isOpen, handleClose, handleOpen } = useOpenStatus()
    const { t } = useTranslation();

    const {
        values: {
            selectedRecord,
            type,
            supplier_name,
        },
        handleChangeMultiInputs,
        handleChange
    } = useFormManager({
        initialValues: {
            supplier_name: ""
        }
    })

    const handleSearch = useCallback(() => {
        fetchTableData({
            supplier_name
        })
    }, [supplier_name, fetchTableData])

    const handleShowItem = useCallback((type: "N" | "U") => (record?: RecordWithAnyValue) => {
        if (type === "N") {
            handleChange("selectedRecord", { record_status: "n" })
        }
        if (type === "U") {
            handleChange("selectedRecord", { ...record, record_status: "u" })
        }
        handleOpen()
    }, [handleChange, handleOpen])

    const handleDelete = useCallback(async (record) => {
        try {
            await api.post("suppliers/post_suppliers_data", {
                ...record,
                record_status: "d"
            });
            fetchTableData()
            toast.success("Success")
        } catch (err) {
            toast.error(err.response?.data?.error)
        }
    }, [fetchTableData])

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">

            <Header pageTitle="splrs" />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-wrap gap-2 mb-5 items-end">
                    <InputText
                        className="w-[19%]"
                        label="splrnm"
                        value={supplier_name}
                        name="supplier_name"
                        onChange={handleChange}
                    />
                    <Button className="cursor-pointer h-full" onClick={handleSearch}>{t("srch")}</Button>
                </div>
                <TableWithApi
                    ref={tableValuesRef}
                    onClickOpen={handleShowItem("N")}
                    columns={COLUMNS}
                    endPoint="suppliers/get_suppliers_data"
                    rowKey="supplier_id"
                    handleEdit={handleShowItem("U")}
                    handleDelete={handleDelete}
                />
            </main>
            {isOpen && <CustomerSupplierModal
                type="S"
                selectedRecord={selectedRecord}
                isOpen={isOpen}
                handleClose={handleClose}
                onSave={handleSearch}
            />}
        </div>
    )
}

export default SuppliersPage