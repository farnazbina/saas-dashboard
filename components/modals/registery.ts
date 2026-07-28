import { ModalType } from "@/stores/modalStore"
import React from "react"
import CreateProjectModal from "./CreateProjectModal"

interface ModalComponentProps {
    isOpen: boolean
    onClose: () => void
    data?: unknown
}

export const modalRegistery: Record<ModalType, React.ComponentType<ModalComponentProps>> = {
    createProject: CreateProjectModal
}