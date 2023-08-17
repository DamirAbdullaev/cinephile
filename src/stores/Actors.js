import {defineStore} from 'pinia'
import {apiKey} from '@/url'
import axios from 'axios'


export const useActors = defineStore({
    
    id: 'actors',
    
    state: () => ({
        url: 'https://api.themoviedb.org/3/',
        actorsMovies: null,
        actorsTvs: null
    }),
    
    actions: {
        async getActors({type, id}) {
            try {
                let res = await axios.get(`${this.url}${type}/${id}/credits?api_key=${apiKey}&language=RU`)
                let data = res.data.cast
                    
                type == 'movie' ? this.actorsMovies = data : this.actorsTvs = data

            } catch (error) {
                console.error('Произошла ошибка в получениe фильма или сериала по его id ' + error);
            }
        },
    }
})