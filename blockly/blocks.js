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

Blockly.Blocks.concat_string = {
  init () {
    this.appendValueInput('left').setCheck('String')
    this.appendValueInput('right').setCheck('String').appendField('+')
    this.setInputsInline(true)
    this.setOutput(true, 'String')
    this.setColour(160)
    this.setTooltip('')
    this.setHelpUrl('')
  },
}

Blockly.Python.concat_string = function (block) {
  const left = Blockly.JavaScript.valueToCode(
    block,
    'left',
    Blockly.JavaScript.ORDER_ATOMIC
  )
  const right = Blockly.JavaScript.valueToCode(
    block,
    'right',
    Blockly.JavaScript.ORDER_ATOMIC
  )
  const code = `${left} + ${right}`
  return [code, Blockly.JavaScript.ORDER_NONE]
}

Blockly.Blocks.math_arithmetic = {
  init () {
    this.appendValueInput('A').setCheck('Number')
    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        ['+', 'ADD'],
        ['-', 'MINUS'],
        ['*', 'MULTIPLY'],
        ['/', 'DIVIDE'],
        ['%', 'MOD'],
        ['^', 'POWER'],
      ]),
      'OP'
    )
    this.appendValueInput('B').setCheck('Number')
    this.setInputsInline(true)
    this.setOutput(true, 'Number')
    this.setColour(230)
    this.setTooltip('')
    this.setHelpUrl('')
  },
}

Blockly.Python.math_arithmetic = function (block) {
  // Basic arithmetic operators, and power.
  const OPERATORS = {
    ADD: [' + ', Blockly.Python.ORDER_ADDITIVE],
    MINUS: [' - ', Blockly.Python.ORDER_ADDITIVE],
    MULTIPLY: [' * ', Blockly.Python.ORDER_MULTIPLICATIVE],
    DIVIDE: [' / ', Blockly.Python.ORDER_MULTIPLICATIVE],
    MOD: [' % ', Blockly.Python.ORDER_MULTIPLICATIVE],
    POWER: [' ** ', Blockly.Python.ORDER_EXPONENTIATION],
  }
  const tuple = OPERATORS[block.getFieldValue('OP')]
  const operator = tuple[0]
  const order = tuple[1]
  const argument0 = Blockly.Python.valueToCode(block, 'A', order) || '0'
  const argument1 = Blockly.Python.valueToCode(block, 'B', order) || '0'
  const code = argument0 + operator + argument1
  return [code, order]
  // In case of 'DIVIDE', division between integers returns different results
  // in Python 2 and 3. However, is not an issue since Blockly does not
  // guarantee identical results in all languages.  To do otherwise would
  // require every operator to be wrapped in a function call.  This would kill
  // legibility of the generated code.
}
