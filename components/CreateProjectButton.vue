<template>
  <Button @click.native="onClickCreateProject"> 新規作成 </Button>
</template>

<script>
import Swal from 'sweetalert2'
import Vue from 'vue'
import { $axios } from '@/utils/api'

export default Vue.extend({
  name: 'CreateProjectButton',
  props: {
    onSubmit: {
      type: Function,
      required: true,
    },
  },
  methods: {
    onClickCreateProject() {
      Swal.fire({
        title: 'プロジェクトを作成',
        input: 'text',
        showCancelButton: true,
        cancelButtonText: 'キャンセル',
        confirmButtonText: '作成',
        showLoaderOnConfirm: true,
        allowOutSideClick: () => !Swal.isLoading(),
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await $axios.post('/api/projects', {
            project: { name: result.value },
          })
          this.$props.onSubmit(res.data.id)
        }
      })
    },
  },
})
</script>
