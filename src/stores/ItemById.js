import {defineStore} from 'pinia'
import {apiKey} from '@/url'
import axios from 'axios'


export const useItemById = defineStore({
    
    id: 'itembyid',
    
    state: () => ({
        url: 'https://api.themoviedb.org/3/',
        itemMovies: null,
        itemTvs: null
    }),
    
    actions: {
        async getItemById({type, id}) {
            try {
                let res = await axios.get(`${this.url}${type}/${id}?api_key=${apiKey}&language=RU`)
                
                let data = res.data
                
                type == 'movie' ? this.itemMovies = data : this.itemTvs = data

            } catch (error) {
                console.error('Произошла ошибка в получениe фильма или сериала по его id ' + error);
            }
        },
    }
})