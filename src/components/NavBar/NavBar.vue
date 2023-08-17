<template>
    <nav class="nav" id="nav">
        <div class="nav__item container">
            <router-link to="/" @click="burgerMenu = false">
                <img src="@/assets/images/Logo.svg" alt="Logo" class="logo">
            </router-link>
            
            <ul class="nav__item_links" :class="{active: burgerMenu}" @click="burgerMenu = false">
                <li v-for="link in links" :key="link.title">
                    <router-link class="nav__item_links-link" :to="link.url">{{ link.title }}</router-link>
                </li>
                <li>
                   <router-link to="/search" class="nav__item_links-link">
                    <img src="@/assets/images/search.svg" alt="search">
                   </router-link> 
                </li>
            </ul>
            
            <button class="nav__item_menu" @click="burgerMenu = !burgerMenu">
                <img src="@/assets/images/menu.svg" alt="">
            </button>
        </div>
    </nav>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue'

const links = ref([
    {title: 'Главная', url: '/'},
    {title: 'Фильмы', url: '/movie'},
    {title: 'Сериалы', url: '/tv'},
])


let burgerMenu = ref(false)
</script>