<template>
  <img v-if="finalSrc" :src="finalSrc" :style="{ width: size + 'px', height: size + 'px' }">
  <div class="placeholder" v-if="!finalSrc" :style="{ width: size + 'px', height: size + 'px' }"/>
</template>

<script>
import { inject } from 'vue'

export default {
  setup() {
    const fetchImage = inject('fetchImage')
    return { fetchImage }
  },
  name: 'IPFSImage',
  data() {
    return {
      finalSrc: '',
    }
  },
  props: ['src', 'size'],
  async mounted() {
    if (this.src) {
      this.finalSrc = await this.fetchImage(this.src)
    }
  },
  watch: {
    async src(newSrc) {
      this.finalSrc = await this.fetchImage(newSrc)
      console.log(this.finalSrc)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
    height: 100px;
    position: relative;
  }

  @keyframes shimmer{
    0%{ background-position: -468px 0 }
    100%{ background-position: 468px 0 }
  }
</style>