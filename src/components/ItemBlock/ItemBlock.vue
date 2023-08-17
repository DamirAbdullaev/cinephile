<template>
    <div class="main__info" :class="{ active: open }" v-if="current">  
        <img @click="$emit('close')" src="@/assets/images/close.svg" class="main__info-close" alt="">
        <div class="main__info_block">
            <img class="main__info_block-bg" v-lazy="getMovieUrl + getMovieSize + current.backdrop_path" alt="">
            <h2>{{ current.title || current.name }}</h2>
            <p>{{ current.overview }}</p>
            <div class="main__info_desc">
                <span>{{ getYear }}{{ getGenres }} </span>
                <span>{{ hours }}h {{ minutes }}m</span>
            </div>
            <Actors :type="props.type" :id="current.id" :count="4"/>
            <router-link :to="`/${type}/` + current.id">
                <BtnMore />
            </router-link>
        </div>
    </div>
</template>

<script setup>

import { useUpcoming } from '@/stores/Upcoming';
import { ref, computed } from "vue";

const upcomingStore = useUpcoming()

const getMovieUrl = computed(() => upcomingStore.movieUrl)
const getMovieSize = computed(() => upcomingStore.movieSize)

upcomingStore.getConfiguration()

const props = defineProps(['open', 'current', 'type'])

const getYear = computed(() => new Date(props.current.release_date).getFullYear() || new Date(props.current.first_air_date).getFullYear())
const getGenres = computed(() => props.current.genres.reduce((acc, item) => acc + `, ${item.name}`, ''))

const hours =  computed(() => Math.floor(props.current.runtime / 60) || Math.floor(props.current.number_of_episodes / 60))
const minutes =  computed(() => props.current.runtime % 60 || props.current.number_of_episodes % 60)

</script>