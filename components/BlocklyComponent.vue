<template>
  <div>
    <div id="blocklyDiv" class="blocklyDiv"></div>
    <xml ref="blocklyToolbox" style="display: none"></xml>
  </div>
</template>

<script>
import Blockly from 'blockly'
import 'blockly/python'

export default {
  name: 'BlocklyComponent',
  props: {
    source: {
      type: String,
      required: true,
    },
    options: {
      type: Object,
      default: null,
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
  data() {
    return {
      workspace: null,
    }
  },
  watch: {
    source(source, _oldSource) {
      this.updateWorkspace(source)
    },
  },
  mounted() {
    const options = this.$props.options || {}
    if (!options.toolbox) {
      options.toolbox = this.$refs.blocklyToolbox
    }
    this.workspace = Blockly.inject('blocklyDiv', options)
    this.updateWorkspace(this.$props.source)
    this.workspace.addChangeListener(() => {
      this.$props.updateCode(Blockly.Python.workspaceToCode(this.workspace))
      const xml = Blockly.Xml.domToText(
        Blockly.Xml.workspaceToDom(this.workspace)
      )
      this.$props.updateSource(xml)
    })
  },
  methods: {
    updateWorkspace(source) {
      this.workspace.clear()
      const dom = Blockly.Xml.textToDom(source)
      Blockly.Xml.domToWorkspace(dom, this.workspace)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.blocklyDiv {
  height: 100%;
  width: 100%;
  text-align: left;
}
</style>
