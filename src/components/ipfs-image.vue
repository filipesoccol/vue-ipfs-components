<script setup>
    import { ref } from 'vue'

    defineProps({
        src: String,
        width: Number,
        height: Number
    })
</script>

<template>
    <div class="ipfs-wrapper" :style="{
        width: `${width}px`,
        height: `${height}px`,
    }">
        <ipfs-media :src="src">
            <template #media="props">
                <img
                    class="ipfs-img"
                    :src="props.ipfsFinal"
                    @error="props.handleError"
                    @load="props.handleLoaded"
                    :style="{
                        width: width+'px',
                        height: height+'px'
                    }
                "/>
            </template>
            <template #placeholder>
                <div class="ipfs-placeholder" :style="{ 
                    width: width+'px',
                    height: height+'px'
                }"/>
            </template>
        </ipfs-media>
    </div>
</template>

<style src="../styles/styles.css" lang="css"/>