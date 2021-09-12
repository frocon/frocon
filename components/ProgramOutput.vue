<template>
  <div class="max-h-full overflow-scroll">
    <pre class="p-4 text-xl">{{ output }}</pre>
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
      isCdnLoaded: false,
      isPyodideLoaded: false,
    }
  },
  watch: {
    isCdnLoaded() {
      window
        .loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.18.0/full/',
        })
        .then((pyodide) => {
          window.pyodide = pyodide
          this.isPyodideLoaded = true
        })
        .catch((err) => {
          console.log(err.toString())
        })
    },
    isPyodideLoaded() {
      this.runPython(this.$props.code)
    },
    code(code) {
      this.runPython(code)
    },
  },
  mounted() {
    if (!window.loadPyodide) {
      const script = document.createElement('script')
      script.onload = () => {
        this.isCdnLoaded = true
      }
      script.type = 'text/javascript'
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.18.0/full/pyodide.js'
      document.head.appendChild(script)
    }
  },
  methods: {
    runPython(code) {
      if (this.isPyodideLoaded) {
        const prologue = `import sys\nimport io\nsys.stdout = io.StringIO()\n`

        const epilogue = `sys.stdout.getvalue()\n`
        const dict = pyodide.pyimport('dict')
        this.output = window.pyodide.runPython(
          prologue + code + epilogue,
          dict()
        )
      }
    },
  },
})
</script>
