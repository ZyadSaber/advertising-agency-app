"use client"

import { useCallback, useMemo } from "react"
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Header from "@/components/header";
import useFormManager from "@/hooks/useFormManager";
import DatePicker from "@/components/date-picker";
import InputText from "@/components/input-text";
import { toast } from 'sonner'
import QuerySelect, { useSelectValuesRef } from "@/components/query-select";
import CustomerSupplierModal from "@/components/customer-supplier-modal";
import BaseTable from "@/components/base-table";
import InputNumber from "@/components/input-number";
import { Button } from "@/components/ui/button";
import { RecordWithAnyValue } from "@/interfaces/global";
import isArrayHasData from "@/lib/isArrayHasData";
import useOpenStatus from "@/hooks/useOpenStatus";
import api from "@/lib/axios";
import { INVOICE_DETAILS_COLUMNS, INITIAL_VALUES, PAGE_MODE } from "./constants"


const PurchaseInvoice = () => {
    const { t } = useTranslation();
    const { type } = useParams<{ type: "C" | "S" }>();
    const { isOpen, handleClose, handleOpen } = useOpenStatus()
    const { selectValuesRef, fetchSelectOptions } = useSelectValuesRef()

    const { pageTitle, listEndPoint, listName, listLabel } = PAGE_MODE[type as keyof typeof PAGE_MODE] || {}

    const {
        values,
        handleChange,
        handleChangeMultiInputs,
        resetValues,
    } = useFormManager({
        initialValues: INITIAL_VALUES
    })

    const {
        invoice_date,
        invoice_notes,
        supplier_id,
        customer_id,
        invoiceDetails,
        width,
        item_no,
        height,
        quantity,
        price,
        item_name,
        discount,
        notes,
        paid,
        bank
    } = values

    const spaceValue = useMemo(() => +width * +height, [height, width])
    const allSpaceValue = useMemo(() => spaceValue * +quantity, [quantity, spaceValue])
    const totalPriceValue = useMemo(() => allSpaceValue * +price, [allSpaceValue, price])

    const invoiceTotal = useMemo(() => invoiceDetails.reduce((accumulator: number, currentObject: RecordWithAnyValue) => accumulator + currentObject.total_price, 0), [invoiceDetails])
    const invoiceTotalAfterDiscount = useMemo(() => invoiceTotal - discount, [discount, invoiceTotal])
    const creditAmount = useMemo(() => invoiceTotalAfterDiscount - (+paid + +bank), [bank, invoiceTotalAfterDiscount, paid])

    const handleChangeItemValue = useCallback((name: string, value: string, record: RecordWithAnyValue) => {
        handleChangeMultiInputs({
            [name]: value,
            item_name: record?.item_name
        })
    }, [handleChangeMultiInputs])

    const handleAddItem = useCallback(() => {
        if (item_no && item_name && width && height && quantity && price) {
            const computedDataSource = [
                {
                    rowKey: invoiceDetails + 2,
                    item_no,
                    item_name,
                    width,
                    height,
                    space: spaceValue,
                    quantity,
                    all_space: allSpaceValue,
                    price,
                    total_price: totalPriceValue,
                    notes
                },
                ...invoiceDetails
            ]
            handleChange("invoiceDetails", computedDataSource)
            handleChangeMultiInputs({
                item_no: "",
                item_name: "",
                width: 0,
                height: 0,
                quantity: 0,
                price: 0,
                notes: ""
            })
        } else {
            toast.error(t("vldtflds"))
        }
    }, [allSpaceValue, handleChange, handleChangeMultiInputs, height, invoiceDetails, item_no, item_name, notes, price, quantity, spaceValue, t, totalPriceValue, width])

    const deleteItem = useCallback((record: RecordWithAnyValue) => {
        const computedDataSource = invoiceDetails.filter(({ rowKey }) => rowKey !== record?.rowKey)
        handleChange("invoiceDetails", computedDataSource)
    }, [handleChange, invoiceDetails])

    const handleSave = useCallback(async () => {
        if (invoice_date && (supplier_id || customer_id) && isArrayHasData(invoiceDetails)) {
            try {
                await api.post("suppliers/post_supplier_invoice", {
                    invoice_date,
                    invoice_notes,
                    supplier_id,
                    total_invoice: invoiceTotal,
                    discount,
                    total_after_discount: invoiceTotalAfterDiscount,
                    paid,
                    unpaid: creditAmount,
                    invoiceDetails,
                    bank
                });
                resetValues()
                toast.success("Success")
            } catch (err) {
                toast.error(err.response?.data?.error)
            }
        } else {
            toast.error(t("vldtflds"))
        }
    }, [bank, creditAmount, customer_id, discount, invoiceDetails, invoiceTotal, invoiceTotalAfterDiscount, invoice_date, invoice_notes, paid, resetValues, supplier_id, t])

    const handleSaveNewCustomerOrSupplier = useCallback(({ id, name }) => {
        fetchSelectOptions()
        if (type === "C") {
            handleChangeMultiInputs({
                supplier_id: id,
            })
        } else if (type === "S") {
            handleChangeMultiInputs({
                customer_id: id,
            })
        }
    }, [fetchSelectOptions, handleChangeMultiInputs, type])

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">

            <Header pageTitle={pageTitle} />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-3 flex-wrap mb-5 items-end">
                    <DatePicker
                        name="invoice_date"
                        value={invoice_date}
                        label="invcdt"
                        onChange={handleChange}
                        className="w-[15%]"
                    />
                    <QuerySelect
                        ref={selectValuesRef}
                        name={listName}
                        value={values[listName]}
                        onChange={handleChange}
                        label={listLabel}
                        className="w-[25%]"
                        endPoint={listEndPoint}
                    />
                    <Button className="p-4 cursor-pointer" variant="default" onClick={handleOpen}>
                        {t("addnew")}
                    </Button>
                    <InputText
                        value={invoice_notes}
                        name="invoice_notes"
                        onChange={handleChange}
                        label="nts"
                        className="w-[25%]"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="border p-2 rounded px-4 flex flex-wrap gap-2">
                        <QuerySelect
                            name="item_no"
                            value={item_no}
                            onChange={handleChangeItemValue}
                            label="itmnm"
                            className="w-[25%]"
                            endPoint="items\get_items_list"
                        />
                        <InputNumber
                            label="wdth"
                            className="w-[10%]"
                            onChange={handleChange}
                            name="width"
                            value={width}
                            min={0}
                        />
                        <InputNumber
                            label="hght"
                            className="w-[10%]"
                            onChange={handleChange}
                            name="height"
                            value={height}
                            min={0}
                        />
                        <InputNumber
                            label="spc"
                            className="w-[10%]"
                            name="spacwe"
                            value={spaceValue}
                            min={0}
                            disabled
                        />
                        <InputNumber
                            label="qnty"
                            className="w-[10%]"
                            onChange={handleChange}
                            name="quantity"
                            value={quantity}
                            min={0}
                        />
                        <InputNumber
                            label="alspc"
                            className="w-[10%]"
                            onChange={handleChange}
                            name="alspc"
                            value={allSpaceValue}
                            min={0}
                            disabled
                        />
                        <InputNumber
                            label="prc"
                            className="w-[10%]"
                            onChange={handleChange}
                            name="price"
                            value={price}
                            min={0}
                        />
                        <InputNumber
                            label="ttlprc"
                            className="w-[10%]"
                            onChange={handleChange}
                            name="ttlprc"
                            value={totalPriceValue}
                            min={0}
                            disabled
                        />
                        <div className="w-full justify-between flex">
                            <InputText
                                value={notes}
                                name="notes"
                                onChange={handleChange}
                                label="nts"
                                className="w-[25%]"
                            />
                            <div className="w-[73%] flex justify-evenly items-end">
                                <InputNumber
                                    value={invoiceTotal}
                                    name="notes"
                                    disabled
                                    label="ttlinvc"
                                    className="w-[15%]"
                                />
                                <InputNumber
                                    value={discount}
                                    name="discount"
                                    onChange={handleChange}
                                    label="dscnt"
                                    className="w-[15%]"
                                    max={invoiceTotal}
                                    min={0}
                                />
                                <InputNumber
                                    value={invoiceTotalAfterDiscount}
                                    name="notes"
                                    disabled
                                    label="ttlinvcaftrdscnt"
                                    className="w-[15%]"
                                />
                                <InputNumber
                                    value={paid}
                                    name="paid"
                                    onChange={handleChange}
                                    label="paid"
                                    className="w-[15%]"
                                    max={invoiceTotalAfterDiscount - bank}
                                    min={0}
                                />
                                <InputNumber
                                    value={bank}
                                    name="bank"
                                    onChange={handleChange}
                                    label="bnk"
                                    className="w-[15%]"
                                    max={invoiceTotalAfterDiscount - paid}
                                    min={0}
                                />
                                <InputNumber
                                    value={creditAmount}
                                    name="notes"
                                    disabled
                                    label="crdt"
                                    className="w-[15%]"
                                />
                                <Button className="p-4 cursor-pointer" variant="default" onClick={handleSave}>
                                    {t("save")}
                                </Button>
                            </div>
                        </div>
                    </div>
                    <BaseTable
                        dataSource={invoiceDetails}
                        hidePagination
                        columns={INVOICE_DETAILS_COLUMNS}
                        rowKey="rowKey"
                        onClickOpen={handleAddItem}
                        handleDelete={deleteItem}
                        canEdit={false}
                    />
                </div>
            </main>
            {isOpen && <CustomerSupplierModal
                type={type}
                isOpen={isOpen}
                handleClose={handleClose}
                onSave={handleSaveNewCustomerOrSupplier}
            />}
        </div>
    )
}

export default PurchaseInvoice