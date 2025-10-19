import { memo, useCallback } from "react"
import { RecordWithAnyValue } from "@/interfaces/global"
import Modal from "@/components/modal"
import useFormManager from "@/hooks/useFormManager";
import InputField from "@/components/input-text"
import CheckBox from "@/components/checkbox"
import { toast } from 'sonner'
import api from "@/lib/axios";

interface CustomerSupplierModalProps {
    selectedRecord: RecordWithAnyValue;
    isOpen: boolean;
    type: "C" | "S";
    handleClose: () => void;
    onSave: (type?: { id: number, name: string }) => void
}

const CustomerSupplierModal = ({
    selectedRecord,
    isOpen,
    type,
    handleClose,
    onSave,
}: CustomerSupplierModalProps) => {
    const isCustomerView = type === "C"

    const {
        values: {
            customer_id,
            supplier_id,
            customer_name,
            customer_phone,
            customer_address,
            active,
            supplier_name,
            supplier_phone,
            supplier_address,
            record_status
        },
        handleChange
    } = useFormManager({
        initialValues: selectedRecord
    })

    const handleSave = useCallback(async () => {
        try {
            const { data } = await api.post(
                isCustomerView ?
                    "customers/post_customers_data" :
                    "suppliers/post_suppliers_data",
                {
                    customer_id,
                    supplier_id,
                    customer_name,
                    customer_phone,
                    customer_address,
                    active,
                    supplier_name,
                    supplier_phone,
                    supplier_address,
                    record_status
                });
            const { id, name } = data
            handleClose()
            onSave({ id, name })
            toast.success("Success")
        } catch (err) {
            toast.error(err.response?.data?.error)
        }
    }, [active, customer_address, customer_id, customer_name, customer_phone, handleClose, isCustomerView, onSave, record_status, supplier_address, supplier_id, supplier_name, supplier_phone])

    return (
        <Modal
            isOpen={isOpen}
            handleClose={handleClose}
            handleSave={handleSave}
        >
            <div className="flex gap-2.5 flex-wrap w-full items-end">
                <InputField
                    value={isCustomerView ? customer_id : supplier_id}
                    disabled
                    className="w-[20%]"
                    label="id"
                />
                <InputField
                    value={isCustomerView ? customer_name : supplier_name}
                    className="w-[40%]"
                    label={isCustomerView ? "cstmrnm" : "splrnm"}
                    onChange={handleChange}
                    name={isCustomerView ? "customer_name" : "supplier_name"}
                />
                <InputField
                    value={isCustomerView ? customer_phone : supplier_phone}
                    className="w-[37%]"
                    label="phn"
                    onChange={handleChange}
                    name={isCustomerView ? "customer_phone" : "supplier_phone"}
                />
                <InputField
                    value={isCustomerView ? customer_address : supplier_address}
                    className="w-[60%]"
                    label="adrs"
                    onChange={handleChange}
                    name={isCustomerView ? "customer_address" : "supplier_address"}
                />
                <CheckBox
                    checked={active}
                    onChange={handleChange}
                    label="actv"
                    name="active"
                />
            </div>
        </Modal>
    )
}

export default memo(CustomerSupplierModal)