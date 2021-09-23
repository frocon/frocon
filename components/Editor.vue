<template>
  <div class="flex h-full w-full">
    <div class="w-1/2">
      <BlocklyComponent
        id="blockly"
        :source="source"
        :update-code="updateCode"
        :update-source="updateSource"
        class="h-full"
      ></BlocklyComponent>
    </div>
    <div class="w-1/2 overflow-scroll">
      <div class="space-x-4 w-hull">
        <div v-if="isStepExecution" class="inline-block">
          <Button @click.native="resolveNextStep">次のステップ</Button>
          <Button @click.native="stopStepExecution">停止</Button>
        </div>
        <div v-else class="inline-block">
          <Button @click.native="evalute">実行</Button>
          <Button @click.native="stepExecution">ステップ実行</Button>
        </div>
      </div>
      <div class="h-1/2">
        <Code
          :code="code"
          :is-step-execution="isStepExecution"
          :set-resolve-next-step="setResolveNextStep"
        />
      </div>
      <div class="h-1/2">
        <ProgramOutput
          :code="code"
          :is-step-execution="isStepExecution"
          :set-evalute="setEvalute"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import '@/blockly/prompt'
import Vue from 'vue'

export default Vue.extend({
  name: 'Editor',
  props: {
    source: {
      type: String,
      required: true,
    },
    updateSource: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      code: '',
      isStepExecution: false,
      resolveNextStep: () => {},
      evalute: () => {},
      removeLineHighlight: () => {},
    }
  },
  methods: {
    updateCode(code: string) {
      this.code = code
    },
    setResolveNextStep(resolveNextStep: () => void) {
      this.resolveNextStep = resolveNextStep
    },
    setEvalute(evalute: () => void) {
      this.evalute = evalute
    },
    stopStepExecution() {
      this.isStepExecution = false
    },
    stepExecution() {
      this.isStepExecution = true
      this.evalute()
    },
  },
})
</script>

<style>
.blocklyScrollbarHandle {
  display: none;
}
</style>
