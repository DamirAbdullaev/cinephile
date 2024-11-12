import { defineStore } from 'pinia';
import { apiKeyY } from '@/url';  // Убедитесь, что apiKeyY правильно импортирован
import axios from 'axios';

export const useRecItem = defineStore({
    id: 'getRecItem',

    state: () => ({
        videoId: '',    // ID видео YouTube
    }),

    actions: {
        async getRecItem(movieTitle) {
            try {
                const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                    params: {
                        part: 'snippet',
                        q: movieTitle + ' trailer', // Поиск по названию фильма и ключевому слову 'трейлер'
                        type: 'video',
                        maxResults: 1,
                        key: apiKeyY, // Используем импортированный ключ API
                    },
                });

                // Проверяем, есть ли данные в ответе
                if (response.data.items && response.data.items.length > 0) {
                    const video = response.data.items[0];
                    this.videoId = video.id.videoId;
                } else {
                    console.error('Видео не найдено');
                }
            } catch (error) {
                console.error('Произошла ошибка в получении рекомендованных фильмов или сериалов по его id: ' + error);
            }
        },
    },
});
