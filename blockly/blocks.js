import Blockly from 'blockly'
import 'blockly/python'

Blockly.Blocks.print = {
  init() {
    this.appendValueInput('text').setCheck(null).appendField('print')
    this.setInputsInline(false)
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(160)
    this.setTooltip('')
    this.setHelpUrl('')
  },
}

Blockly.Python.print = function (block) {
  const text = Blockly.Python.valueToCode(
    block,
    'text',
    Blockly.Python.ORDER_ATOMIC
  )
  const code = `js.print(${text})\n`
  return code
}
