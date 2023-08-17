<template>
    <router-link :to="`/${item.media_type}/` + item.id" class="main__catalog_list-item">
        <img v-lazy="getMovieUrl + getMovieSize + item.poster_path" alt="">
        <h2>{{ item.title || item.name }}</h2>
    </router-link>
</template>

<script setup>
import { useUpcoming } from '@/stores/Upcoming';
import {computed, ref} from 'vue'

    
const upcomingStore = useUpcoming()
const getMovieUrl = computed(() => upcomingStore.movieUrl)
const getMovieSize = computed(() => upcomingStore.movieSize)


upcomingStore.getConfiguration()
upcomingStore.getUpcoming()




const props = defineProps({
    item: Object
})

</script>