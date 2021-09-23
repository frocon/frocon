<template>
  <div>
    <swal-title>メンバー</swal-title>
    <swal-icon type="info"></swal-icon>
    <swal-html>
      <div
        class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
      >
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  tracking-wider
                "
              >
                名前
              </th>
              <th
                scope="col"
                class="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  tracking-wider
                "
              >
                役職
              </th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="member of members" :key="member.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ member.user.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ member.role }}
              </td>
              <td
                class="
                  px-6
                  py-4
                  whitespace-nowrap
                  text-right text-sm
                  font-medium
                "
              >
                <a href="#" class="text-indigo-600 hover:text-indigo-900"
                  >削除</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </swal-html>
    <swal-button type="cancel"> 閉じる </swal-button>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    members: {
      type: Array,
      required: true,
    },
  },
})
</script>
