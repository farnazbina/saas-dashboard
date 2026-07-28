'use client'
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/stores/modalStore";
import { Plus } from "lucide-react";
const AddNewProject = () => {
    const { onOpen } = useModalStore()
    return (
        <Button size='lg' onClick={() => onOpen('createProject')}><Plus /> New Project</Button>
    )
}
export default AddNewProject