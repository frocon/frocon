<template>
  <div class="h-full">
    <Button @click.native="clearOutput">出力をクリア</Button>
    <div class="h-5/6 overflow-scroll">
      <pre class="p-4 text-xl">{{ output }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
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
    if (!(window as any).pyodide) {
      ;(window as any)
        .loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.18.0/full/',
        })
        .then((pyodide: any) => {
          this.isPyodideLoaded = true
          ;(window as any).pyodide = pyodide
        })
    } else {
      this.isPyodideLoaded = true
    }
    ;(window as any).print = (text: string) => {
      this.output += text + '\n'
    }
  },
  methods: {
    setLineno(code: string) {
      const splittedCode = code.split('\n').filter((line: string) => line)
      let statementCount = 0
      const replaced = splittedCode.map((line: string, index: number) => {
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
          await (window as any).pyodide.runPythonAsync(
            prologue + this.setLineno(code)
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
