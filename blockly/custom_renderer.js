import Blockly from 'blockly'

class CustomRenderer extends Blockly.blockRendering.Renderer {
  makeDrawer_(block, info) {
    return new CustomDrawer(block, info)
  }
}

class CustomDrawer extends Blockly.blockRendering.Drawer {}

class CustomConstantsProvider extends Blockly.blockRendering.ConstantProvider {
  constructor() {
    super()
    this.NOTCH_HEIGHT = 10
  }

  init() {
    super.init()
    this.FLOW_PREV_NEXT = this.makeFlowchartPreviousConn()
    this.FLOW_INPUT_OUTPUT = this.makeFlowchartInputConn()
  }

  shapeFor(connection) {
    switch (connection.type) {
      case Blockly.INPUT_VALUE:
      case Blockly.OUTPUT_VALUE:
        return this.FLOW_INPUT_OUTPUT
      case Blockly.PREVIOUS_STATEMENT:
      case Blockly.NEXT_STATEMENT:
        return this.FLOW_PREV_NEXT
      default:
        throw new Error('Unknown connection type')
    }
  }

  makeFlowchartPreviousConn() {
    const width = this.NOTCH_WIDTH
    const height = this.NOTCH_HEIGHT

    function makeMainPath(dir) {
      return Blockly.utils.svgPaths.line([
        Blockly.utils.svgPaths.point(0, height),
        Blockly.utils.svgPaths.point(dir * width, 0),
        Blockly.utils.svgPaths.point(0, -height),
      ])
    }

    const pathLeft = makeMainPath(1)
    const pathRight = makeMainPath(-1)

    return {
      width,
      height,
      pathLeft,
      pathRight,
    }
  }

  makeFlowchartInputConn() {
    const width = this.TAB_WIDTH
    const height = this.TAB_HEIGHT

    /**
     * Since input and output connections share the same shape you can
     * define a function to generate the path for both.
     */
    function makeMainPath(up) {
      return Blockly.utils.svgPaths.line([
        Blockly.utils.svgPaths.point(-width, 0),
        Blockly.utils.svgPaths.point(0, -1 * up * height),
        Blockly.utils.svgPaths.point(width, 0),
      ])
    }

    const pathUp = makeMainPath(1)
    const pathDown = makeMainPath(-1)

    return {
      width,
      height,
      pathDown,
      pathUp,
    }
  }
}

CustomRenderer.prototype.makeConstants_ = function () {
  return new CustomConstantsProvider()
}

const typeRegistry = Blockly.registry.typeMap_.renderer

typeRegistry.flowchart = CustomRenderer
