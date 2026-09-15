'use client'
import { Plus } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

const AddNewProject = () => {
    const queryClient = useQueryClient();

    // تابع پیش‌بارگذاری همه داده‌های مورد نیاز مودال
    const prefetchModalData = () => {
        // فقط اگر داده‌ها در کش نباشند، درخواست می‌زنیم
        const queryKeys = [
            ['categories'],
            ['clients'],
            ['users'],
        ];

        queryKeys.forEach((key) => {
            queryClient.prefetchQuery({
                queryKey: key,
                queryFn: () => fetch(`/api/${key[0]}`).then(res => res.json()),
                staleTime: 5 * 60 * 1000, // ۵ دقیقه کش معتبر
            });
        });
    };

    return (
        <Link
            href='/projects/create'
            className="flex items-center gap-x-1 bg-primary rounded-sm px-4 py-2 text-primary-foreground text-sm"
            onMouseEnter={prefetchModalData}
        >
            <Plus size={14} /> New Project
        </Link>
    );
};

export default AddNewProject;