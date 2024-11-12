import {defineStore} from 'pinia'
import {apiKey} from '@/url'
import axios from 'axios'


export const useRec = defineStore({
    
    id: 'Rec',
    
    state: () => ({
        url: 'https://api.themoviedb.org/3/',
        recMovies: null,
        recTvs: null
    }),

    actions: {
        async getRec({type, id}) {
            try {
                let res = await axios.get(`${this.url}${type}/${id}/recommendations?api_key=${apiKey}&language=RU`)                        
                let data = res.data.results
                                
                type == 'movie' ? this.recMovies = data : this.recTvs = data

            } catch (error) {
                console.error('Произошла ошибка в получениe рекомендованных фильмов или сериалов по его id ' + error);
            }
        },
    }
})