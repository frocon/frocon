<template>
  <pre class="p-4 text-2xl"><code v-html="highlight(code)" /></pre>
</template>

<script lang="ts">
import Vue from 'vue'
import highlightjs from 'highlightjs'

export default Vue.extend({
  name: 'Code',
  props: {
    code: {
      type: String,
      required: true,
    },
  },
  methods: {
    highlight(code: string) {
      const html = highlightjs.highlightAuto(code, ['python']).value
      console.log(html)
      return html
    },
  },
})
</script>
