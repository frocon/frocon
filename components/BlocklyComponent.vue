<template>
  <div>
    <div id="blocklyDiv" class="blocklyDiv"></div>
    <xml ref="blocklyToolbox" style="display: none">
      <slot></slot>
    </xml>
  </div>
</template>

<script>
import Blockly from 'blockly'
export default {
  name: 'BlocklyComponent',
  props: {
    options: Blockly.Options,
  },
  data() {
    return {
      workspace: null,
    }
  },
  mounted() {
    const options = this.$props.options || {}
    if (!options.toolbox) {
      options.toolbox = this.$refs.blocklyToolbox
    }
    this.workspace = Blockly.inject('blocklyDiv', options)
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
