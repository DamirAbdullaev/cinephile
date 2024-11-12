<template>
    <section class="main__video" v-if="content">
        <router-link :to="props.type == 'movie' ? '/movie' : '/tv'" class="main__video_title" >
            <h3>{{ props.type == 'movie' ? 'Фильмы' : 'Сериалы' }}</h3>
            <img src="@/assets/images/arrow.png" alt="arrow">
        </router-link>
        
        <swiper :modules="modules" :space-between="25" :navigation="true" :breakpoints="swiperOptions.breakpoints">
          <swiper-slide class="main__video_item" v-for="item in content" :key="item.id" @click="getItem(item)">
            <router-link v-if="isMobile" :to="`/${type}/` + item.id">
              <img v-lazy="getMovieUrl + getMovieSize + item.backdrop_path" alt="movie">
              <div class="rec__list_item-click">
                <h2>{{ props.type == 'movie' ? item.title : item.name }}</h2>
              </div>
            </router-link>
            
            <div class="main__video_item" v-else>
              <img v-lazy="getMovieUrl + getMovieSize + item.backdrop_path" alt="movie">
              <h2>{{ props.type == 'movie' ? item.title : item.name }}</h2>
            </div>
          </swiper-slide>
          
          <swiper-slide class="main__video_item_route">
            <router-link class="main__video_item_route-card" :to="props.type == 'movie' ? 'movie' : 'tv'">
              <img src="@/assets/images/arrow.png" alt="">
              {{ props.type == 'movie' ? 'Все фильмы' : 'Все сериалы'}}
            </router-link>
          </swiper-slide>
        </swiper>
        
        <div class="main__video_block" ref="itemBlock">
          <ItemBlock :open="open" @close="close" :current="current" :type="type"/>
        </div>
        

    </section>
    
    <Loader v-else />
</template>

<script setup>
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { Navigation } from 'swiper/modules';
    import { ref, computed, onMounted, onUnmounted } from "vue";
    import { usePopular } from "@/stores/Popular.js";
    import { useUpcoming } from '@/stores/Upcoming';
    import { useItemById } from '@/stores/ItemById.js'
    

    import ItemBlock from '@/components/ItemBlock/ItemBlock.vue'

    
    import 'swiper/css';
    import 'swiper/css/navigation';
    
    
    // const recStores = useRec()
    const popularStores = usePopular()
    const upcomingStore = useUpcoming()
    const itemByIdStores = useItemById()
        
    const props = defineProps(['type'])
    const modules = ref([Navigation])


    
    const getMovieUrl = computed(() => upcomingStore.movieUrl)
    const getMovieSize = computed(() => upcomingStore.movieSize)
    const content = computed(() => props.type == 'movie' ? popularStores.popularMovies : popularStores.popularTvs)
    const current = ref(null)
    const disabledClick = ref(false)

    
    upcomingStore.getConfiguration()
    popularStores.getPopular({type: props.type})
    
    let swiperOptions = ref({
        breakpoints: {
            320: {
              slidesPerView: 1.1
            },
            350: {
              slidesPerView: 1.5
            },
            440: {
              slidesPerView: 1.8
            },
            680: {
              slidesPerView: 2.5  
            },
            992: {
              slidesPerView: 3.5
            },
            1200: {
              slidesPerView: 4.5
            },
            1400: {
              slidesPerView: 5.5
            },
        }
    })
    
const itemBlock = ref(null)
let previousScrollPosition = 0;   
    
let open = ref(false)
    
const getItem = async (item) => {
  previousScrollPosition = window.scrollY;
  if (disabledClick.value) return
  
  current.value = null
  
  await itemByIdStores.getItemById({type: props.type, id: item.id })
  
  current.value = props.type == 'movie' ? itemByIdStores.itemMovies : itemByIdStores.itemTvs
  
  open.value = true
  
  let itemTop = itemBlock.value.offsetTop
  
  window.scrollTo({
    top: itemTop - nav.clientHeight,
    behavior: 'smooth'
  })
} 


const close = () => {
  open.value = false
  
  props.type == 'movie' ? itemByIdStores.itemMovies = null : itemByIdStores.itemTvs = null
  
  window.scrollTo({
    top: previousScrollPosition,
    behavior: 'smooth'
  });
}

const isMobile = ref(window.innerWidth <= 992)


const handleResize = () => {
  const screenWidt = 992
  disabledClick.value = window.innerWidth < screenWidt
}

const checkSize = () => {
  isMobile.value = window.innerWidth <= 992;
}
  
onMounted(() => {
  window.addEventListener('resize', checkSize)
  checkSize
  
  window.addEventListener('resize', handleResize);
})

onUnmounted(() => {
  window.addEventListener('resize', checkSize)
  checkSize
  
  window.removeEventListener('resize', handleResize);
})
  
</script>