<template>
  <div>
    <Button @click.native="onClickStepExecution">ステップ実行</Button>
    <div class="max-h-full overflow-scroll">
      <pre class="p-4 text-xl"><code ref="output" /></pre>
    </div>
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
  data() {
    return {
      highlighted: '',
      stepExecutionFlag: true,
      resolveNextStep: () => {},
    }
  },
  watch: {
    code(code: string) {
      // ハイライトに関する関数は表示しない
      this.highlighted = this.highlight(
        code
          .split('\n')
          .filter((line: string) => {
            const trimmed = line.trim()
            return !(
              trimmed.startsWith('js.highlightBlock') ||
              trimmed.startsWith('await js.highlightLine')
            )
          })
          .join('\n')
      )
    },
  },
  mounted() {
    ;(window as any).highlightLine = async (index: number) => {
      await this.nextStep()
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
      const output = this.$refs.output as Element
      const joined = splitted
        .map((line: string, index: number) => {
          if (emptyIndex.includes(index)) return line + '\n'
          return line
        })
        .join('\n')
      if (output) {
        output.innerHTML = joined
      }
    }
  },
  methods: {
    highlight(code: string): string {
      return highlightjs.highlightAuto(code, ['python']).value
    },
    async nextStep() {
      return await new Promise<void>((resolve) => {
        this.resolveNextStep = () => {
          resolve()
        }
      })
    },
    onClickStepExecution() {
      this.resolveNextStep()
    },
  },
})
</script>

<style>
.highlight-bg {
  background-color: #ffffcc;
}
</style>
