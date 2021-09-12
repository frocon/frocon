<template>
  <div>
    <div id="blocklyDiv" class="blocklyDiv"></div>
    <xml ref="blocklyToolbox" style="display: none"></xml>
  </div>
</template>

<script>
import Blockly from 'blockly'

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
    this.workspace.addChangeListener((event) => {
      this.$props.updateCode(Blockly.JavaScript.workspaceToCode(this.workspace))
      const xml = Blockly.Xml.domToText(
        Blockly.Xml.workspaceToDom(this.workspace)
      )
      if (event.type == Blockly.Events.BLOCK_CHANGE) {
        const eventJsonObject = event.toJson()
        const eventJsonString = JSON.stringify(eventJsonObject)
        this.$props.updateSource(xml, eventJsonString)
      }
    })
  },
  methods: {
    updateWorkspace(source) {
      this.workspace.clear()
      const dom = Blockly.Xml.textToDom(source)
      Blockly.Xml.domToWorkspace(dom, this.workspace)
    },
    whenIgnitionEventUpdate(changeCode) {
      const codeObj = JSON.parse(changeCode)
      const workspaceEvent = Blockly.Events.fromJson(codeObj, this.workspace)
      workspaceEvent.run(true)
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
