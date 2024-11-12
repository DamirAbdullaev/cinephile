<template>
  <div class="container">
    <div class="main__search">
      <input type="text" placeholder="Найти фильм, сериал..." v-model="text">
    </div>

    <div class="main__search_list" v-if="searchItem">
      <SearchContent v-for="item in searchItem" :key="item.id" :item="item" />
    </div>
    
    <div class="main__catalog_list" v-if="allContent">
        <router-link class="main__catalog_list-item" :to="`/movie/` + item.id" v-for="item in allContent" :key="item.id">       
          <img v-lazy="getMovieUrl + getMovieSize + item.backdrop_path" alt="">
          <h2>{{ item.title || item.name }}</h2>
        </router-link>    
    </div>
  </div>
</template>

<script setup>
import SearchContent from '@/components/Search/SearchContent.vue'; 
import { useSearch } from "@/stores/Search.js";
import { ref, watch, computed, onMounted } from "vue";
import { usePopular } from "@/stores/Popular.js";
import { useUpcoming } from '@/stores/Upcoming';

const popularStores = usePopular()
const searchStores = useSearch() 
const upcomingStore = useUpcoming()

const getMovieUrl = computed(() => upcomingStore.movieUrl)
const getMovieSize = computed(() => upcomingStore.movieSize)

let type = ref('')
let text = ref('')
      
if (text.value == '') {
  type.value = 'movie';
}else{
  type.value = '';
}

popularStores.getPopular({type: type.value })
upcomingStore.getConfiguration()


const currentPage = ref(1)
const allContent = ref([])
const storage = ref([])


watch(text, (newValue, oldValue) => {
    if (newValue !== '') {
        allContent.value = []
    }else{
      allContent.value = storage.value
    }
});

let loading = ref(false)

const getContent = async () => {
    if (!loading.value) {
        loading.value = true;
        await popularStores.getPopular({ type: type.value, page: currentPage.value });

        let popular =  popularStores.popularMovies        
        allContent.value.push(...popular);
        storage.value.push(...popular);

        loading.value = false;

        currentPage.value++;
    }
};


onMounted(() => {
    window.onscroll = () => {
        if (text.value === '') {
            scrollY + window.innerHeight >= document.body.scrollHeight - 100 ? getContent() : '';
        }
    }
    
    if (text.value === '') {
        getContent()
    }
})




let timer = null
let searchItem = computed(() => searchStores.result)


watch(text, (val) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
      searchStores.getSearch(val);
  }, 500);
});
</script>