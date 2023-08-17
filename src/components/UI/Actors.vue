<template>
    <div class="actors">
        <div class="actors__item" v-for="actor in actors" :key="actor.id">
            <img v-lazy="getMovieUrl + getMovieSize + actor.profile_path" alt="">
            <span>{{ actor.name }}</span>
        </div>
    </div>
</template>

<script setup>
import {useActors} from '@/stores/actors.js'
import {computed} from 'vue'
import { useUpcoming } from '@/stores/Upcoming';
const upcomingStore = useUpcoming()

const getMovieUrl = computed(() => upcomingStore.movieUrl)
const getMovieSize = computed(() => upcomingStore.movieSize)

const actorsStores = useActors()

actorsStores.getActors({type: props.type, id: props.id})

const props = defineProps({
    type: String,
    id: Number,
    count: Number
})

const actors = computed(() => {
   let actorsArray = props.type == 'movie' ? actorsStores.actorsMovies : actorsStores.actorsTvs
   if (actorsArray) {
    return actorsArray.splice(0, props.count)
   }
   
   
})

</script>

<style lang="scss" scoped>
.actors{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 15px;
    max-width: 450px;
    width: 100%;
    
    &__item{
        display: flex;
        align-items: center;
        gap: 10px;
        border-radius: 25px;
        border: 1px solid #FFF;
        background: rgba(20, 20, 20, 0.50);
        overflow: hidden;
        
        & img{
            width: 50px;
            height: 50px;
            border-radius: 50%;
            object-fit: cover;
        }
        
        & span{
            color: #FFF;
            padding-right: 15px;
            font-size: 16px;
            font-weight: 400;
            line-height: 30px;
        }
    }
}



</style>