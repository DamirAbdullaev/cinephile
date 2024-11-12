<template>
  <div class=""  v-if="rec">
    <div class="rec">
      <div class="rec__info">
        <div class="rec__info_block">
          <img class="rec__info_block-bg" v-lazy="getMovieUrl + getMovieSize + rec.backdrop_path" alt="">
          <h2>{{ rec.title || rec.name }}</h2>
          <p>{{ rec.overview }}</p>
          
          <div class="rec__info_desc">
            <span>{{ getYear }}{{ getGenres }}</span>
            <span>{{ hours }}h {{ minutes }}m</span>
          </div>
          
          <button class="btnMoree" @click="open()">
            <img src="@/assets/images/clarity_play-solid.png" alt="">
            <span>Смотерть трейлер</span>
          </button>

          <span class="rec__info_block-title">В главных ролях</span>

          <div class="rec__info_card">
            <img class="rec__info_card-bg" v-lazy="getMovieUrl + getMovieSize + rec.backdrop_path" alt="">
          </div>    
        </div>  
      </div>
      <div class="rec__info_actors">
        <RecActors class="rec__info_block-actors" :type="props.type" :id="rec.id" :count="6"/>
      </div>
    </div>
    <div class="" ref="itemBlock">
      <RecItemBlock :movieTitle="rec.original_title || rec.original_name" :openStatus="openStatus" @close="close"/>
    </div>
    <div class="rec__status container">
      <div class="rec__status_window">
        <h2>Бюджет</h2>
        <span>${{ rec.budget || ' 0' }}</span>
      </div>
      <div class="rec__status_window">
        <h2>Сборы</h2>
        <span>${{ rec.revenue || ' 0' }}</span>
      </div>
      <div class="rec__status_window">
        <h2>Статус</h2>
        <span>{{ rec.status }}</span>
      </div>
      <div class="rec__status_window">
        <h2>Исходное название</h2>
        <span>{{ rec.original_title || rec.original_name }}</span>
      </div>
    </div>  
    
    <h2 class="rec__list-title container">{{ rec20 == '' ? 'Похоже что похожих фильмов или сериалов не найдено' : 'Рекомендации' }}</h2>

    <swiper class="rec__list container" :modules="modules" :space-between="24" :navigation="true" :breakpoints="swiperOptions.breakpoints">
      <swiper-slide class="rec__list_item" v-for="item in rec20" :key="item.id">
        <router-link :to="`/${type}/` + item.id" @click="reloadPage">
          <img v-lazy="getMovieUrl + getMovieSize + item.backdrop_path" alt="">
          <div class="rec__list_item-click">
            <h2>{{ item.title || item.name }}</h2>
          </div>

        </router-link>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useItemById } from "@/stores/ItemById.js"
import { useUpcoming } from '@/stores/Upcoming.js'
import { useRec } from '@/stores/Rec.js'
import {computed, onMounted, onUnmounted, ref} from 'vue'

import RecItemBlock from '@/components/RecItemBlock/RecItemBlock.vue'

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/navigation';

const upcomingStore = useUpcoming()
const itemByIdStores = useItemById()
const recStores = useRec()
const route = useRoute()
const modules = ref([Navigation])
const id = ref(route.params.id)

upcomingStore.getConfiguration()
itemByIdStores.getItemById({type: props.type, id: id.value})
recStores.getRec({type: props.type, id: id.value})


const rec = computed(() => props.type == 'movie' ? itemByIdStores.itemMovies : itemByIdStores.itemTvs)
const rec20 = computed(() => props.type == 'movie' ? recStores.recMovies : recStores.recTvs)
const getMovieUrl = computed(() => upcomingStore.movieUrl)
const getMovieSize = computed(() => upcomingStore.movieSize)


const getYear = computed(() => new Date(rec.value.release_date).getFullYear() || new Date(rec.value.first_air_date).getFullYear())
const getGenres = computed(() => rec.value.genres.reduce((acc, item) => acc + `, ${item.name}`, ''))

const hours =  computed(() => Math.floor(rec.value.runtime / 60) || Math.floor(rec.value.number_of_episodes / 60))
const minutes =  computed(() => rec.value.runtime % 60 || rec.value.number_of_episodes % 60)

const reloadPage = () =>{
  setTimeout(() => {
    location.reload();
  }, 100);
}

const props = defineProps({
  type: String
})


let swiperOptions = ref({
        breakpoints: {
            320: {
              slidesPerView: 1  
            },
            576: {
              slidesPerView: 2  
            },
            992: {
              slidesPerView: 2
            },
            1200: {
              slidesPerView: 3
            },
            1400: {
              slidesPerView: 3
            },
        }
})
    

let openStatus = ref(false)
const itemBlock = ref(null)
let previousScrollPosition = 0;

const open = () => {
  previousScrollPosition = window.scrollY;
  openStatus.value = true;
  
  let itemTop = itemBlock.value.offsetTop;
  
  window.scrollTo({
    top: itemTop - nav.clientHeight,
    behavior: 'smooth'
  });
};

const close = () => {
  openStatus.value = false;
  window.scrollTo({
    top: previousScrollPosition,
    behavior: 'smooth'
  });
};
  


</script>