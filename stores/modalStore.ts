// import { create } from "zustand";

// export type ModalType =
//     | 'createProject'


// export interface ModalData {
//     projectId?: string
// }

// interface ModalStore {
//     type: ModalType | null;
//     isOpen: boolean;
//     data: ModalData | null;
//     onOpen: (type: ModalType, data?: ModalData) => void;
//     onClose: () => void
// }

// export const useModalStore = create<ModalStore>((set) => ({
//     type: null,
//     isOpen: false,
//     data: null,
//     onOpen: (type, data) => set({ isOpen: true, type, data: data ?? null }),
//     onClose: () => set({ isOpen: false, type: null, data: null }),
// }));

// export const useModal = () => {
//     const { onOpen, onClose, isOpen, type, data } = useModalStore()
//     return {
//         openModal: onOpen,
//         closeModal: onClose,
//         isOpen,
//         type,
//         data
//     }
// }