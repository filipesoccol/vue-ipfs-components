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
      this.tryFetchMedia(this.src)
    }
  },
  watch: {
    async src(newSrc) {
      this.tryFetchMedia(newSrc)
    }
  },
  methods: {
    async tryFetchMedia(src) {
      try {
        const result = await Promise.race([
          this.fetchImage(src),
          new Promise( (resolve, reject) => {
            setTimeout(reject, 5000);
          })
        ])
        this.finalSrc = result
      } catch (err) {
        this.tryFetchMedia(src)
      }
    }
  }
}
</script>