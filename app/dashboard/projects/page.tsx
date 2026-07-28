import AddNewProject from "@/components/dashboard/AddNewProject";


export default function ProjectsPage() {
    return (
        <>
            <div className="flex justify-between items-center">
                <h1 className="text-text text-lg font-semibold">Projects</h1>
                <AddNewProject />
            </div>
        </>
    )
}