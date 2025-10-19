import { memo, useCallback } from "react"
import { RecordWithAnyValue } from "@/interfaces/global"
import Modal from "@/components/modal"
import useFormManager from "@/hooks/useFormManager";
import InputField from "@/components/input-text"
import CheckBox from "@/components/checkbox"
import { toast } from 'sonner'
import api from "@/lib/axios";

interface ModalViewProps {
    selectedRecord: RecordWithAnyValue;
    isOpen: boolean;
    handleClose: () => void;
    onSave: (type?: { id: number, name: string }) => void
}

const ModalView = ({
    selectedRecord,
    isOpen,
    handleClose,
    onSave,
}: ModalViewProps) => {
    const {
        values: {
            item_id,
            item_name,
            active,
            record_status
        },
        handleChange
    } = useFormManager({
        initialValues: selectedRecord
    })

    const handleSave = useCallback(async () => {
        try {
            const { data } = await api.post(
                "items/post_items_data",
                {
                    item_id,
                    item_name,
                    active,
                    record_status
                });
            const { id, name } = data
            handleClose()
            onSave({ id, name })
            toast.success("Success")
        } catch (err) {
            toast.error(err.response?.data?.error)
        }
    }, [active, handleClose, item_id, item_name, onSave, record_status])

    return (
        <Modal
            isOpen={isOpen}
            handleClose={handleClose}
            handleSave={handleSave}
        >
            <div className="flex gap-2.5 flex-wrap w-full items-end">
                <InputField
                    value={item_id}
                    disabled
                    className="w-[20%]"
                    label="id"
                />
                <InputField
                    value={item_name}
                    className="w-[60%]"
                    label="itmnm"
                    onChange={handleChange}
                    name="item_name"
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

export default memo(ModalView)