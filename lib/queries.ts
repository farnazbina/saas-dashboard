import { useQuery } from "@tanstack/react-query";

const fetcher = async (url: string) => {
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed to fetch.')
    return res.json()
}

export function useCategories() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: () => fetcher('/api/categories'),
        staleTime: Infinity
    })
}

export function useClients() {
    return useQuery({
        queryKey: ['clients'],
        queryFn: () => fetcher('/api/clients'),
        staleTime: Infinity
    })
}

export function useUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => fetcher('/api/users'),
        staleTime: Infinity
    })
}

export function useTeamLeads() {
    return useQuery({
        queryKey: ['teamLeads'],
        queryFn: () => fetcher('/api/teamLeads'),
        staleTime: Infinity
    })
}