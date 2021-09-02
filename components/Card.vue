<template>
  <div class="p-10">
    <!--Card 1-->
    <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white pb-4">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ project.name }}</div>
        <p class="text-gray-600 text-sm">
          <span class="font-bold">{{ project.role }}</span> として参加しています
        </p>
        <p class="text-gray-500 text-xs">
          最終更新
          {{ $dateFns.format(project.updatedAt, 'yyyy-MM-dd HH:mm:ss') }}
        </p>
      </div>
      <div class="px-6 pt-4 pb-2">
        <ul class="list-none">
          <li v-for="tag in project.tags" :key="tag.id" class="float-left">
            <span
              class="
                inline-block
                bg-gray-200
                rounded-full
                px-3
                py-1
                text-sm
                font-semibold
                text-gray-700
                mr-2
                mb-2
              "
              >#{{ tag.name }}</span
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Card',
  props: {
    project: {
      type: Object,
      default: () => {
        return {
          id: '',
          name: '',
          updatedAt: new Date(),
          role: '',
          tags: {
            id: '',
            name: '',
          },
        }
      },
    },
  },
}
</script>
