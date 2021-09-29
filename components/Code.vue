<template>
  <div class="h-5/6 overflow-scroll">
    <pre class="p-4 text-xl"><code ref="output" /></pre>
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
    isStepExecution: {
      type: Boolean,
      default: false,
    },
    setResolveNextStep: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      highlighted: '',
      resolveNextStep: () => {},
    }
  },
  watch: {
    code(code: string) {
      // ハイライトに関する関数は表示しない
      this.highlighted = this.highlight(code)
    },
    highlighted(highlighted: string) {
      this.displayHighlightedCode(highlighted)
    },
    isStepExecution(isStepExecution: boolean) {
      if (!isStepExecution) this.displayHighlightedCode(this.highlighted)
    },
  },
  mounted() {
    this.highlighted = this.highlight(this.$props.code)
    ;(window as any).highlightLine = (index: number) => {
      if (!this.$props.isStepExecution) return
      const emptyIndex: number[] = []
      let emptyCount = 0
      const splitted = this.highlighted
        .split('\n')
        .filter((line: string, index: number) => {
          if (!line) {
            emptyIndex.push(index - ++emptyCount)
          }
          return line
        })
      splitted[index] =
        '<span class="highlight-bg">' + splitted[index] + '</span>'
      const joined = splitted
        .map((line: string, index: number) => {
          if (emptyIndex.includes(index)) {
            return line + '\n'
          }
          return line
        })
        .join('\n')
      this.displayHighlightedCode(joined)
    }
    ;(window as any).nextStep = async () => {
      if (!this.$props.isStepExecution) return
      await this.nextStep()
    }
  },
  methods: {
    highlight(code: string): string {
      return highlightjs.highlightAuto(
        code
          .split('\n')
          .filter((line: string) => {
            const trimmed = line.trim()
            return !(
              trimmed.startsWith('js.highlight') ||
              trimmed.startsWith('await js.nextStep')
            )
          })
          .join('\n'),
        ['python']
      ).value
    },
    async nextStep() {
      return await new Promise<void>((resolve) => {
        this.$props.setResolveNextStep(() => {
          resolve()
        })
      })
    },
    onClickStepExecution() {
      this.resolveNextStep()
    },
    displayHighlightedCode(highlightedCode: string) {
      const output = this.$refs.output as Element
      if (output) {
        output.innerHTML = highlightedCode
      }
    },
  },
})
</script>

<style>
.highlight-bg {
  background-color: #ffffcc;
}
</style>
