<template>
  <div>
    <h1>Listado de Clientes</h1>
    <ClientList :clients="clients"/>
    <PaginationNumbers :total-pages="totalPages" :current-page="currentPage" @page-changed="number => getPage(number)"/>
    <LoadingModal v-if="isLoading"/>
  </div>
</template>

<script setup lang="ts">
import ClientList from '../components/ClientList.vue';
import PaginationNumbers from '../components/PaginationNumbers.vue';
import LoadingModal from '@/shared/components/LoadingModal.vue';
import useClients from '../composables/useClients';
const {isLoading, clients, getPage, totalPages, currentPage} = useClients();
</script>

<style>

</style>