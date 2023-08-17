<template>
    <div class="rec__infoo" :class="{ active: openStatus }">  
        <img @click="$emit('close')" src="@/assets/images/close.svg" class="rec__infoo-close" alt="">
        <div class="rec__infoo_block">
            <h2>Трейлер не найден...</h2>
        </div>
    </div>
</template>

<script setup>

const props = defineProps(['openStatus'])

</script>