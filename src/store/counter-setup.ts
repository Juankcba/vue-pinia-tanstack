import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCounterSetupStore = defineStore('counterSetup', () => {
    const count = ref<number>(0);
    const lastChanged = ref<Date>();
    const incrementBy = (value: number) => {
        count.value += value;
        lastChanged.value = new Date();
    }
    return {
        //state properties
        count,
        lastChanged,
        //getters
        squareCount: computed(() => count.value * count.value),

        //actions
        incrementBy,
        increment: () => incrementBy(1)
    }
})