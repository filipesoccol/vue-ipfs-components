<template>
  <slot name="media" v-if="finalSrc" :ipfsFinal="finalSrc"/>
  <slot name="placeholder" v-if="!finalSrc"/>
</template>

<script>
import { inject } from 'vue'

export default {
  setup() {
    const fetchImage = inject('fetchImage')
    return { fetchImage }
  },
  name: 'IPFSMedia',
  data() {
    return {
      finalSrc: '',
    }
  },
  props: ['src'],
  async mounted() {
    if (this.src) {
      this.finalSrc = await this.fetchImage(this.src)
    }
  },
  watch: {
    async src(newSrc) {
      this.finalSrc = await this.fetchImage(newSrc)
    }
  }
}
</script>