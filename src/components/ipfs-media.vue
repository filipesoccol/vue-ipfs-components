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
      console.log('PREDEFINED MEDIA')
      this.tryFetchMedia(this.src)
    }
  },
  watch: {
    src(newSrc) {
      console.log('CHANGED MEDIA')
      this.tryFetchMedia(newSrc)
    }
  },
  methods: {
    async tryFetchMedia(src) {
      try {
        const result = await this.fetchImage(src)
        this.finalSrc = result
      } catch (err) {
        console.log('Not Able to load Image', err)
      }
    }
  }
}
</script>