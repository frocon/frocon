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
      <div class="h-1/2">
        <Code :code="code" />
      </div>
      <div class="h-1/2">
        <ProgramOutput :code="code" />
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
    }
  },
  methods: {
    updateCode(code: string) {
      this.code = code
    },
  },
})
</script>

<style>
.blocklyScrollbarHandle {
  display: none;
}
</style>
