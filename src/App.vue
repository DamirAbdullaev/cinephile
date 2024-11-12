<template>
  <div class="wrapper">
    <NavBar />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import Footer from './components/Footer/Footer.vue';
import NavBar from './components/NavBar/NavBar.vue';


</script>