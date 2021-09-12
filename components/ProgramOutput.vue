<template>
  <div class="max-h-full overflow-scroll">
    <p class="p-4 text-xl">{{ output }}</p>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'ProgramOutput',
  props: {
    code: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      output: '',
      pyodide: null,
      isPyodideLoaded: false,
    }
  },
  watch: {
    code (code) {
      this.runPython(code)
    },
  },
  mounted() {
    if (!window.loadPyodide) {
      const script = document.createElement('script')
      script.onload = async () => {
        window.pyodide = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.18.0/full/',
        })
        this.isPyodideLoaded = true
        this.runPython(this.$props.code)
      }
      script.type = 'text/javascript'
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.18.0/full/pyodide.js'
      document.head.appendChild(script)
    }
  },
  methods: {
    runPython(code) {
      if (this.isPyodideLoaded) this.output = window.pyodide.runPython(code)
    },
  },
})
</script>
