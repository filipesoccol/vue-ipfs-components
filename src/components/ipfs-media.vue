<template>
  <slot name="media" v-if="finalSrc" :ipfsFinal="finalSrc"/>
  <slot name="placeholder" v-if="!finalSrc"/>
</template>

<script>
import { inject } from 'vue'

export default {
  setup() {
    const fetchContent = inject('fetchContent')
    return { fetchContent }
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
    src(newSrc) {
      this.tryFetchMedia(newSrc)
    }
  },
  methods: {
    async tryFetchMedia(src) {
      try {
        const result = await this.fetchContent(src)
        this.finalSrc = result
      } catch (err) {
        console.log('Not Able to load Image', err)
      }
    }
  }
}
</script>