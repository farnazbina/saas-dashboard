// app/(dashboard)/projects/loading.tsx
import { Skeleton } from '@/components/ui/skeleton'

export default function ProjectsLoading() {
    return (
        <>
            <div className="flex justify-between items-center">
                <h1 className="text-text text-lg font-semibold">Projects</h1>
                <div className="h-10 w-32 bg-muted rounded-md animate-pulse" />
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Skeleton key={i} className="h-48 w-full rounded-lg" />
                ))}
            </div>
        </>
    )
}