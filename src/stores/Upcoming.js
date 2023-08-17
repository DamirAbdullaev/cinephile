import {defineStore} from 'pinia'
import {apiKey, getUrl} from '@/url'
import axios from 'axios'


export const useUpcoming = defineStore({
    
    id: 'upcoming',
    
    state: () => ({
        url: 'https://api.themoviedb.org/3/movie/upcoming',
        upcoming: null,
        movieUrl: null,
        movieSize: null,
    }),
    
    actions: {
        async getUpcoming() {
            try {
                let res = await axios.get(`${this.url}?api_key=${apiKey}&language=ru-RU`)
                this.upcoming = res.data.results
            } catch (error) {
                console.error('Произошла ошибка в получениe предстоящиx фильмов' + error);
            }
        },
        
        async getConfiguration() {
            try {
                let res = await axios.get(`${getUrl}?api_key=${apiKey}`)
                this.movieUrl = res.data.images.base_url
                this.movieSize = res.data.images.backdrop_sizes[3]
            } catch (error) {
                console.error('Произошла ошибка в получениe картинок для фильмов' + error);
            }
        }
    }
})