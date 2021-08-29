import Blockly from 'blockly'
import Swal from 'sweetalert2'

const renameVar = function (name) {
  return name
}

Blockly.prompt = function (_msg, _defaultValue, callback) {
  Swal.fire({
    title: '変数:',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off',
    },
    showCancelButton: true,
    cancelButtonText: 'キャンセル',
    confirmButtonText: '確定',
    showLoaderOnConfirm: true,
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.value) {
      callback(renameVar(result.value))
    }
  })
}
