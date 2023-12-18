<template>
  <div>
    <button :disabled="currentPage === 1" @click="emits('pageChanged',currentPage -1)">Anterior</button>
    <button :class="{active: currentPage === number}" v-for="number of totalPagesNumbers" :key="number" @click="emits('pageChanged',number)">{{ number }}</button>
    <button :disabled="currentPage === totalPages" @click="emits('pageChanged',currentPage + 1)">Siguiente</button>
  </div>
</template>

<script setup lang="ts">
import { ref, toRef, watch } from 'vue';

interface Props{
    totalPages: number;
    currentPage: number;
}
interface Emits {
    (e: 'pageChanged', page:number):void
}
const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const currentPage = toRef(props, 'currentPage')
const totalPages = toRef(props, 'totalPages')
const totalPagesNumbers = ref<number[]>([]);


watch(totalPages, () => {
    totalPagesNumbers.value = [...new Array(totalPages.value)].map((value, index) => index + 1)
},{immediate: true})
</script>

<style scoped>
    div{
        margin-top: 10px
    }
    button{
        background-color: transparent;
        border-radius: 5px;
        border: 1px solid var(--color-border);
        color: var(--color-text);
        cursor: pointer;
        margin-right: 5px;
        padding: 10px;
        transition: all .5s;
    }
    button:hover{
        background-color: hsla(160, 100%, 37%, 0.2);
        transition: all .5s;
    }
    button:disabled{
        cursor: not-allowed;
    }
    .active{
        background-color: hsla(160, 100%, 37%, 0.2);
    }
</style>