<template>
    <div class="upcoming" v-if="getUpcomingMovies">
        <UpcomingItem v-for="(movie, i) in getUpcomingMovies" :key="movie.id" :movie="movie" :i="i" :slideView="slideView" :nextMovie="getUpcomingMovies[i + 1 == getUpcomingMovies.length ? 0 : i + 1]" @slideNext="slideNext"/>
    </div>
    
    <Loader v-else />
</template>

<script setup>
import UpcomingItem from './UpcomingItem.vue';
import {useUpcoming} from '@/stores/Upcoming.js'
import {computed, ref, onMounted} from 'vue'


const upcomingStore = useUpcoming()
const getUpcomingMovies = computed(() => upcomingStore.upcoming)
const slideView = ref(0)
let timeOut = ref(0)


const slideNext = () => {
    clearTimeout(timeOut)
    slide()
}

const slide = () => {
    getUpcomingMovies.value.length - 1 == slideView.value ? slideView.value = 0 : slideView.value++
    
    timeOut = setTimeout(() => slide(), 10000);
}

onMounted(() => {
    timeOut = setTimeout(() => slide(), 10000);
}),


upcomingStore.getUpcoming()
upcomingStore.getConfiguration()


</script>