<template>
    
    <Transition name="upcoming__item">
        <div class="upcoming__item" v-if="slideView == i">
            <img :src="getMovieUrl + getMovieSize + movie.backdrop_path" alt="bg" class="upcoming__item_bg">
            <h1 class="upcoming__item_title">{{ movie.title }}</h1>
            <p class="upcoming__item_text">{{ movie.overview }}</p>
            
            <router-link :to="'/movie/' + movie.id">
                <BtnMore />
            </router-link>
            
            <div class="upcoming__item_next" @click="$emit(`slideNext`)">
                <div class="upcoming__item_next-desc">
                    <p>Следующий</p>
                    <span>{{ nextMovie.title }}</span>
                </div>
                <img :src="getMovieUrl + getMovieSize + nextMovie.backdrop_path" alt="">
                
                <div class="upcoming__item_next_loading">
                    <div class="upcoming__item_next_loading-line"></div>
                </div>
            </div>
        </div>
    </Transition>
    
</template>

<script setup>

import { useUpcoming } from '@/stores/Upcoming';
import { computed } from "vue";

const upcomingStore = useUpcoming()

const getMovieUrl = computed(() => upcomingStore.movieUrl)
const getMovieSize = computed(() => upcomingStore.movieSize)

upcomingStore.getConfiguration()






const props = defineProps({
    movie:{
        typeof: Object
    },
    i:{
        typeof: Number
    },
    slideView:{
        typeof: Number
    },
    nextMovie:{
        typeof: Number
    }
})

</script>