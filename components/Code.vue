<template>
  <pre class="p-4"><code v-html="highlight(code)" /></pre>
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
      const html = highlightjs.highlightAuto(code, ['javascript']).value
      console.log(html)
      return html
    },
  },
})
</script>
