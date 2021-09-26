<template>
  <Button
    class="text-xl mt-4 font-bold text-white mr-10"
    @click.native="openMember"
  >
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="users"
      class="
        svg-inline--fa
        fa-users fa-w-20
        h-6
        w-6
        inline-block
        align-text-bottom
      "
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
    >
      <path
        fill="currentColor"
        d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"
      ></path>
    </svg>
    メンバー
  </Button>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import Swal from 'sweetalert2'
import { $axios } from '~/utils/api'
interface User {
  name: string
}
interface Member {
  user: User
  role: string
}
export default Vue.extend({
  props: {
    members: {
      type: Array as PropType<Member[]>,
      required: true,
    },
  },
  methods: {
    openMember() {
      Swal.fire({
        title: 'メンバー管理',
        icon: 'info',
        html: `
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                  名前
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                  役職
                </th>
                <!-- <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Delete</span>
                </th> -->
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              ${this.members
                .map(
                  (member: Member) =>
                    `<tr>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${member.user.name}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${member.role}</td>
                      <!-- <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" class="text-indigo-600 hover:text-indigo-900">削除</a>
                      </td> -->
                    </tr>`
                )
                .join('')}
            </tbody>
          </table>
        </div>`,
        confirmButtonText: '招待する',
        confirmButtonColor: '#33CAB1',
        cancelButtonText: '閉じる',
        showCancelButton: true,
      }).then((result) => {
        if (!result.isConfirmed) return
        Swal.fire({
          title: 'メンバー招待',
          inputLabel: '招待したいメンバーのメールアドレスを入力してください',
          input: 'email',
        }).then((result) => {
          if (!result.value) return
          const email = result.value
          const projectId = this.$route.params.id
          $axios
            .post(`/api/projects/${projectId}/membership`, { email })
            .then(() => {
              Swal.fire({
                title: '追加されました',
                icon: 'success',
              })
            })
            .catch(() => {
              Swal.fire({
                title: '失敗しました',
                icon: 'error',
              })
            })
        })
      })
    },
  },
})
</script>
