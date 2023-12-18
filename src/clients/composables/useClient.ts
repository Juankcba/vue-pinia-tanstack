import { computed, ref, watch } from 'vue';
import type { Client } from '../interfaces/client';
import clientsApi from '@/api/clients-api';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

const getClient = async (id: number): Promise<Client> => {
    const { data } = await clientsApi.get(`/clients/${id}`)
    return data;
}

const updateClient = async (client: Client): Promise<Client> => {
    const { data } = await clientsApi.patch(`/clients/${client.id}`, client);
    return data
}

const useClient = (id: number) => {

    const client = ref<Client>();
    //const queryClient = useQueryClient();
    const { isLoading, data, isError, error } = useQuery({
        queryKey: ['client', id], queryFn: () => getClient(id),
    });

    const clientMutation = useMutation({
        mutationFn: updateClient, onSuccess(data) {
            console.log(data)
        }
    })
    //const queries = queryClient.getQueryCache().findAll( {['clients?page='] })
    watch(data, () => {
        if (data.value)
            client.value = { ...data.value };
    }, { immediate: true })




    return {
        client,
        clientMutation,
        isError,
        isLoading,

        updateClient: clientMutation.mutate,
        isUpdating: computed(() => clientMutation.isPending.value),
        isUpdatingSuccess: computed(() => clientMutation.isSuccess.value),
        isErrorUpdating: computed(() => clientMutation.isError.value)

    }
}

export default useClient;