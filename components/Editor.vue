<template>
  <div class="h-full">
    <div class="h-4/5">
      <BlocklyComponent
        id="blockly"
        :source="source"
        :options="options"
        :update-code="updateCode"
        :update-source="updateSource"
        class="h-full"
      ></BlocklyComponent>
    </div>
    <div class="h-1/5">
      <pre id="codeBlock" v-highlight>
        <code class="javascript">{{ code }}</code>
      </pre>
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
      options: {
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
