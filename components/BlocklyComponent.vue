<template>
  <div>
    <div id="blocklyDiv" class="blocklyDiv"></div>
    <xml ref="blocklyToolbox" style="display: none"></xml>
  </div>
</template>

<script lang="ts">
import Blockly from 'blockly'
import * as BlocklyPython from 'blockly/python'
import '@/blockly/blocks'
import options from '@/blockly/options'
import Vue from 'vue'

export default Vue.extend({
  name: 'BlocklyComponent',
  props: {
    source: {
      type: String,
      required: true,
    },
    updateCode: {
      type: Function,
      required: true,
    },
    updateSource: {
      type: Function,
      required: true,
    },
  },
  data(): {
    workspace: (Blockly.Workspace & Blockly.WorkspaceSvg) | null
  } {
    return {
      workspace: null,
    }
  },
  watch: {
    source(source: string) {
      this.updateWorkspace(source)
    },
  },
  mounted() {
    /* eslint-disable no-import-assign */
    Object.assign(BlocklyPython, {
      STATEMENT_PREFIX: `js.highlightLine(%lineno)\njs.highlightBlock(%1)\n`,
    })
    Object.assign(BlocklyPython, { STATEMENT_SUFFIX: `await js.nextStep()\n` })
    /* eslint-disable no-import-assign */
    this.workspace = Blockly.inject('blocklyDiv', options)
    this.updateWorkspace(this.$props.source)
    this.workspace.addChangeListener((event: any) => {
      if (!this.workspace) return
      if (!event.isUiEvent) {
        this.$props.updateCode(BlocklyPython.workspaceToCode(this.workspace))
        const xml = Blockly.Xml.domToText(
          Blockly.Xml.workspaceToDom(this.workspace)
        )
        this.$props.updateSource(xml)
      }
    })
    ;(window as any).highlightBlock = (id: string) => {
      if (!this.workspace) return
      this.workspace.highlightBlock(id)
    }
  },
  methods: {
    updateWorkspace(source: string) {
      if (!this.workspace) return
      this.workspace.clear()
      const dom = Blockly.Xml.textToDom(source)
      Blockly.Xml.domToWorkspace(dom, this.workspace)
    },
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.blocklyDiv {
  height: 100%;
  width: 100%;
  text-align: left;
}
</style>
