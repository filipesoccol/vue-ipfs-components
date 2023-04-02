<script setup>
    import { ref } from 'vue'

    defineProps({
        src: String,
        width: Number,
        height: Number,
        controls: {
            type: Boolean,
            default: true
        },
        muted: {
            type: Boolean,
            default: true
        },
        loop: {
            type: Boolean,
            default: true
        },
        autoplay: {
            type: Boolean,
            default: true
        }
    })
</script>

<template>
    <div class="ipfs-wrapper" :style="{
        width: `${width}px`,
        height: `${height}px`,
    }">
        <ipfs-media :src="src">
            <template #media="props">
                <video
                    class="ipfs-video"
                    :src="props.ipfsFinal"
                    @error="props.handleError"
                    @canplay="props.handleLoaded"
                    :style="{
                        width: width+'px',
                        height: height+'px'
                    }"
                    :controls="controls"
                    :muted="muted"
                    :loop="loop"
                    :autoplay="autoplay"
                />
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