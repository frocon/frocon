<template>
  <div class="p-10">
    <!--Card 1-->
    <div class="max-w-sm rounded overflow-hidden shadow-lg">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ name }}</div>
        <p class="text-gray-500 text-sm">
          最終更新 {{ $dateFns.format(updatedAt, 'yyyy-MM-dd HH:mm:ss') }}
        </p>
      </div>
      <div class="px-6 pt-4 pb-2">
        <ul>
          <li v-for="tag in tags" :key="tag.id">
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
    id: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    updatedAt: {
      type: Date,
      default: null,
    },
    tags: {
      type: {
        id: String,
        name: String,
      },
      default: {
        id: '',
        name: '',
      },
    },
  },
}
</script>
