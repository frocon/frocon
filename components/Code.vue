<template>
  <div class="max-h-full overflow-scroll">
    <pre class="p-4 text-xl"><code v-html="highlight(code)" /></pre>
  </div>
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
      return html
    },
  },
})
</script>
