<script setup>
    import { ref } from 'vue'

    defineProps({
        src: String,
        size: Number,
        radius: Number
    })
</script>

<template>
    <div class="ipfs-wrapper" :style="{
        width: `${size}px`,
        height: `${size}px`,
    }">
        <ipfs-media :src="src">
            <template #media="props">
                <img
                    class="ipfs-img"
                    :src="props.ipfsFinal"
                    @error="props.handleError"
                    @load="props.handleLoaded"
                    :style="{
                        width: size+'px',
                        height: size+'px',
                        'border-radius':radius+'px'
                    }"
                />
            </template>
            <template #placeholder>
                <div class="ipfs-placeholder" :style="{ 
                    width: size+'px',
                    height: size+'px',
                    'border-radius':radius+'px'
                }"/>
            </template>
        </ipfs-media>
    </div>
</template>

<style src="../styles/styles.css" lang="css"/>