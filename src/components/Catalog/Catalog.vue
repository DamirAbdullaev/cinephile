<template>
    <div v-if="allContent">
      <div class="main__catalog container">
        <h2 class="main__catalog_title">{{ title }}</h2>
      </div>
      
      <div class="main__catalog_list container">
        <CatalogItem v-for="item in allContent" :key="item.id" :item="item" :type="props.type"/>
      </div>
    </div>
  </template>


<script setup>

import { computed, ref, onMounted } from "vue";
import { usePopular } from "@/stores/Popular.js";
import CatalogItem from "./CatalogItem.vue";

const popularStores = usePopular()

const props = defineProps({
    type: String
})


let title = computed(() => props.type == 'movie' ? 'Все фильмы' : 'Все сериалы')

const currentPage = ref(1)
const allContent = ref([])

let loading = ref(false)

const getContent = async () => {
    if (!loading.value) {
        loading.value = true
        await popularStores.getPopular({type: props.type, page: currentPage.value })
        
        let popular = props.type == 'movie' ? popularStores.popularMovies : popularStores.popularTvs
        
        allContent.value.push(...popular)
        loading.value = false
        
        currentPage.value++
    }
}


onMounted(() => {
    window.onscroll = () => {
        scrollY + window.innerHeight >= document.body.scrollHeight - 100 ? getContent() : ''
    }
    
    getContent()  
})

</script>