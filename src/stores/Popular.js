import {defineStore} from 'pinia'
import {apiKey, getUrl} from '@/url'
import axios from 'axios'


export const usePopular = defineStore({
    
    id: 'popular',
    
    state: () => ({
        url: 'https://api.themoviedb.org/3/',
        popularMovies: null,
        popularTvs: null
    }),
    
    actions: {
        async getPopular({type, page = 1}) {
            try {
                let res = await axios.get(`${this.url}${type}/popular?api_key=${apiKey}&language=RU&page=${page}`)
                let data = res.data.results
            
                type == 'movie' ? this.popularMovies = data : this.popularTvs = data
            } catch (error) {
                console.error('Произошла ошибка в получениe предстоящиx фильмов ' + error);
            }
        },
    }
})