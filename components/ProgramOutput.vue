<template>
  <div>
    <Button @click.native="clearOutput">出力をクリア</Button>
    <div class="max-h-full overflow-scroll">
      <pre class="p-4 text-xl">{{ output }}</pre>
    </div>
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
    setEvalute: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      output: '',
      isPyodideLoaded: false,
    }
  },
  created() {
    this.$props.setEvalute(this.getEvalute())
  },
  mounted() {
    if (!window.pyodide) {
      window
        .loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.18.0/full/',
        })
        .then((pyodide) => {
          this.isPyodideLoaded = true
          window.pyodide = pyodide
        })
    } else {
      this.isPyodideLoaded = true
    }
    window.print = (text) => {
      this.output += text + '\n'
    }
  },
  methods: {
    setLineno(code) {
      const splittedCode = code.split('\n')
      let statementCount = 0
      const replaced = splittedCode.map((line, index) => {
        if (line.trim().startsWith('js.highlightLine')) {
          if (splittedCode[index + 2].trim().startsWith('await js.nextStep')) {
            return line.replace(
              /%lineno/,
              (index + 1 - ++statementCount * 3).toString()
            )
          }
          return line.replace(
            /%lineno/,
            (index - statementCount++ * 3).toString()
          )
        }
        return line
      })
      return replaced.join('\n')
    },
    getEvalute() {
      return async () => {
        if (this.isPyodideLoaded) {
          const code = this.$props.code
          const prologue = `import js\nimport sys\nimport io\nsys.stdout = io.StringIO()\nawait js.nextStep()\n`
          const dict = pyodide.globals.get('dict')
          await window.pyodide.runPythonAsync(
            prologue + this.setLineno(code),
            dict()
          )
        }
      }
    },
    clearOutput() {
      this.output = ''
    },
  },
})
</script>
