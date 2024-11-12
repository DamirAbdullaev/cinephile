<template>
    <div class="rec__infoo" :class="{ active: openStatus }">
        <img @click="$emit('close')" src="@/assets/images/close.svg" class="rec__infoo-close" alt="">
        <div class="rec__infoo_block">
            <div class="rec__infoo_block-video" v-if="recItemStores.videoId">
                <iframe
                    width="100%"
                    height="100%"
                    :src="`https://www.youtube.com/embed/${recItemStores.videoId}`"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>

            <h2 v-else>Трейлер не найден...</h2>
        </div>
    </div>
</template>

<script setup>
import { watch, onMounted } from 'vue'
import { useRecItem } from "@/stores/RecItemBlock.js"

const props = defineProps(['openStatus', 'movieTitle'])

const recItemStores = useRecItem()

// При монтировании компонента и при изменении movieTitle вызывать getRecItem
const fetchMovieTrailer = () => {
  recItemStores.getRecItem(props.movieTitle)
}

onMounted(() => {
  fetchMovieTrailer() // при монтировании компонента
})

// Отслеживаем изменения в props.movieTitle
watch(() => props.movieTitle, (newTitle, oldTitle) => {
  if (newTitle !== oldTitle) {
    fetchMovieTrailer() // обновляем трейлер, если название фильма изменилось
  }
})
</script>
