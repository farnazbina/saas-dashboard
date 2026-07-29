'use client'

import { Button } from "@/components/ui/button";
import { useModalStore } from "@/stores/modalStore";
import { Plus } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

const AddNewProject = () => {
    const { onOpen } = useModalStore();
    const queryClient = useQueryClient();

    // تابع پیش‌بارگذاری همه داده‌های مورد نیاز مودال
    const prefetchModalData = () => {
        // فقط اگر داده‌ها در کش نباشند، درخواست می‌زنیم
        const queryKeys = [
            ['categories'],
            ['clients'],
            ['users'],
            ['teamLeads'],
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
        <Button
            size="lg"
            onClick={() => onOpen('createProject')}
            onMouseEnter={prefetchModalData} // 👈 هنگام هاور، داده‌ها دریافت می‌شوند
        >
            <Plus /> New Project
        </Button>
    );
};

export default AddNewProject;