import clientsApi from "@/api/clients-api";
import type { Client } from "../interfaces/client";
import { useQuery } from "@tanstack/vue-query";
import { useClientsStore } from "@/store/clients";
import { storeToRefs } from "pinia";
import { watch, computed } from "vue";

const getClients = async (page: number): Promise<Client[]> => {
    const { data } = await clientsApi.get<Client[]>(`/clients?_page=${page}`);
    return data;
}

const useClients = () => {
    const store = useClientsStore();
    const { currentPage, clients, totalPages } = storeToRefs(store)
    const { isLoading, data } = useQuery({
        queryKey: ['clients?page=', currentPage], queryFn: () => getClients(currentPage.value),

    })
    watch(data, clients => {
        if (clients)
            store.setClients(clients);
    }, { immediate: true })
    return {
        clients,
        currentPage,
        isLoading,
        totalPages,

        getPage(page: number) {
            store.setPage(page)
        },
        totalPagesNumbers: computed(
            () => [...new Array(totalPages.value)].map((value, index) => index + 1)
        )
    }
}

export default useClients;