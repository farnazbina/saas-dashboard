// 'use client' 

// import { useEffect } from "react";

// import { useModalStore } from "@/stores/modalStore"
// import { modalRegistery } from "./registery";
// import { Dialog, DialogContent } from "../ui/dialog";

// export const ModalProvider = () => {
//     const { isOpen, type, data, onClose } = useModalStore()

//     useEffect(() => {
//         if (isOpen) {
//             document.body.style.overflow = 'hidden';
//         } else {
//             document.body.style.overflow = 'unset';
//         }
//         return () => {
//             document.body.style.overflow = 'unset';
//         };
//     }, [isOpen]);

//     if (!isOpen || !type) return null;

//     const ModalComponent = modalRegistery[type]

//     if (!ModalComponent) {
//         console.error(`Modal type "${type} not found in regostery.`)
//         return null
//     }

//     return (
//         <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
//             <DialogContent className="w-xl">
//                 <ModalComponent isOpen={isOpen} onClose={onClose} data={data} />
//             </DialogContent>
//         </Dialog>
//     )
// }