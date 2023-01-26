<template>
  <div id="vcomments" style="padding: 20px"></div>
</template>
<script lang="ts">
import Valine from 'valine'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'chat',
  mounted() {
    const ww = new Valine()
    ww.init({
      el: '#vcomments',
      appId: 'KfBL4rBiW0g8PFh8q5PFZHk9-gzGzoHsz',
      appKey: 'd3MrbtyhnyRLBtA63OHzTzb9',
      avatar: 'monsterid',
      placeholder: '敞开心扉吧 完全匿名',
      enableQQ: true
    })
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
