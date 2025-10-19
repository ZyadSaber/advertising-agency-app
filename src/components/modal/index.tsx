import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useTranslation } from 'react-i18next';

interface ModalProps {
    isOpen: boolean;
    children: React.ReactNode;
    handleClose?: () => void;
    title?: string;
    handleSave?: () => void
}

const Modal = ({
    isOpen,
    children,
    handleClose,
    title,
    handleSave
}: ModalProps) => {
    const { t } = useTranslation();
    return (
        <Dialog open={isOpen}>
            <form>
                <DialogContent onClose={handleClose} className="w-[900px]">
                    <DialogHeader>
                        <DialogTitle>{t(title || "dtls")}</DialogTitle>
                    </DialogHeader>
                    {children}
                    <DialogFooter>
                        <Button type="submit" onClick={handleSave}>{t("save")}</Button>
                        <DialogClose asChild>
                            <Button variant="outline" onClick={handleClose}>{t("cncl")}</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

export default Modal