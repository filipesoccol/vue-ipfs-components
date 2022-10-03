<script setup>
    import { ref } from 'vue'

    defineProps({
        src: String,
        size: Number,
        radius: Number
    })
</script>

<template>
    <ipfs-media :src="src">
        <template #media="props">
            <img :src="props.ipfsFinal" :style="{
                width: size+'px',
                height: size+'px',
                'border-radius':radius+'px'
            }"/>
        </template>
        <template #placeholder>
            <div class="placeholder" :style="{ 
                width: size+'px',
                height: size+'px',
                'border-radius':radius+'px'
            }"/>
        </template>
    </ipfs-media>
</template>

<style scoped>
    .placeholder {
        animation-duration: 1.25s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: shimmer;
        animation-timing-function: linear;
        background: rgba(255,255,255,0.2);
        background: linear-gradient(to right, rgba(255,255,255,0.2) 10%, rgba(255,255,255,0.6) 18%, rgba(255,255,255,0.2) 33%);
        background-size: 800px 104px;
    }

    @keyframes shimmer{
        0%{ background-position: -468px 0 }
        100%{ background-position: 468px 0 }
    }
</style>