<template>
  
    <h3 v-if="isUpdating">Guardando...</h3>
    <h3 v-if="isUpdatingSuccess">Guardado</h3>
    <LoadingModal v-if="isLoading"/>
    <div v-if="client">
      <h1>{{ client.name }}</h1>
      <form @submit.prevent="updateClient(client)">
        <input type="text" placeholder="Nombre del cliente" v-model="client.name"/>
        <br>
        <input type="text" placeholder="Dirección" v-model="client.address"/>
        <br>
        <button :disabled="isUpdating" type="submit">Guardar</button>
      </form>
    </div>
  <code>
    {{ client }}
  </code>
</template>

<script setup lang="ts">
import LoadingModal from '@/shared/components/LoadingModal.vue';
import useClient from '@/clients/composables/useClient';
import { useRoute, useRouter } from 'vue-router';
import { watch } from 'vue';

const router = useRouter();
const route = useRoute();
const {client, isLoading, isUpdating, isError, updateClient ,isUpdatingSuccess} = useClient(+route.params.id);

watch(isError, () => {
  if(isError.value)
    router.replace('/clients')
})

</script>

<style scoped>
  input{
    width: 100%;
    padding: 5px 10px;
    margin-bottom: 10px;
  }
  button{
    margin-bottom: 10px;
  }
</style>