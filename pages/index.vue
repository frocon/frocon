<template>
  <div id="app">
    <BlocklyComponent
      id="blockly"
      ref="blocklyComponent"
      :options="options"
    ></BlocklyComponent>
    <p id="code">
      <button @click="changeCode()">Show JavaScript</button>
      {{ code }}
    </p>
  </div>
</template>

<script>
import BlocklyComponent from '@/components/BlocklyComponent.vue'
import '@/blockly/prompt'
import '@/blockly/custom_renderer'
import Blockly from 'blockly'

export default {
  name: 'App',
  components: {
    BlocklyComponent,
  },
  data() {
    return {
      code: '',
      options: {
        renderer: 'flowchart',
        grid: {
          spacing: 25,
          length: 3,
          colour: '#ccc',
          snap: true,
        },
        toolbox: `<xml>
        <category name="論理" colour="%{BKY_LOGIC_HUE}">
        <block type="controls_if"></block>
        <block type="logic_compare"></block>
        <block type="logic_operation"></block>
        <block type="logic_negate"></block>
        <block type="logic_boolean"></block>
        </category>
        <category name="繰り返し" colour="%{BKY_LOOPS_HUE}">
        <block type="controls_repeat_ext">
        <value name="TIMES">
        <block type="math_number">
        <field name="NUM">10</field>
        </block>
        </value>
        </block>
        <block type="controls_whileUntil"></block>
        </category>
        <category name="数値演算" colour="%{BKY_MATH_HUE}">
        <block type="math_number">
        <field name="NUM">123</field>
        </block>
        <block type="math_arithmetic"></block>
        <block type="math_single"></block>
        </category>
        <category name="文字列" colour="%{BKY_TEXTS_HUE}">
        <block type="text"></block>
        <block type="text_length"></block>
        <block type="text_print"></block>
        </category>
        <category name="変数" custom="VARIABLE" colour="%{BKY_VARIABLES_HUE}">
        </category>
        </xml>`,
      },
    }
  },
  methods: {
    changeCode() {
      this.code = Blockly.JavaScript.workspaceToCode(
        this.$refs.blocklyComponent.workspace
      )
    },
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
html,
body {
  margin: 0;
}
#code {
  position: absolute;
  right: 0;
  top: 0;
  width: 50%;
  height: 100%;
  margin: 0;
  background-color: beige;
}
#blockly {
  position: absolute;
  left: 0;
  top: 0;
  width: 50%;
  height: 100%;
}
</style>
