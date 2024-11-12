<template>
    <section class="main__top">
        <h2 class="main__top_title">
            ТОП
            <span>10</span>
        </h2>
        
        <swiper :modules="modules" :space-between="25" :navigation="true" :breakpoints="swiperOptions.breakpoints">
            <swiper-slide class="main__top_item" v-for="(item, i) in top10" :key="top10.id">
                
                <p>{{ i + 1}}</p>
                <img v-lazy="getMovieUrl + getMovieSize + item.backdrop_path" alt="movie">
              
            </swiper-slide>

        </swiper>
        
    </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import {useTop} from '@/stores/Top.js'
import {computed, ref} from 'vue'
import 'swiper/css';
import 'swiper/css/navigation';
import { useUpcoming } from '@/stores/Upcoming';


const upcomingStore = useUpcoming()
const getMovieUrl = computed(() => upcomingStore.movieUrl)
const getMovieSize = computed(() => upcomingStore.movieSize)
const topStores = useTop()
const top10 = computed(() => topStores.top) 
const modules = ref([Navigation])


topStores.getTop()



let swiperOptions = ref({
    breakpoints: {
        320: {
          slidesPerView: 1.3  
        },
        576: {
          slidesPerView: 2.3  
        },
        992: {
          slidesPerView: 2.3
        },
        1200: {
          slidesPerView: 3.3
        },
        1400: {
          slidesPerView: 3.3
        },
    }
})

</script>