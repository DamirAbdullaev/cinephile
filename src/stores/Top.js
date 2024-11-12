import {defineStore} from 'pinia'
import {apiKey} from '@/url'
import axios from 'axios'


export const useTop = defineStore({
    
    id: 'top',
    
    state: () => ({
        url: 'https://api.themoviedb.org/3/movie/top_rated',
        top: null,
    }),
    
    actions: {
        async getTop() {
            try {
                let res = await axios.get(`${this.url}?api_key=${apiKey}&language=RU`)
                this.top = res.data.results.splice(10)
                
            } catch (error) {
                console.error('Произошла ошибка в получениe предстоящиx TOP 10 фильмов ' + error);
            }
        },
    }
})