<template>
  <div class="bg-white">
    <nav class="flex flex-col sm:flex-row">
      <button
        v-for="program in programs"
        :key="program.id"
        class="text-gray-600 py-4 px-6 block hover:text-dark focus:outline-none"
        :class="
          selectedId === program.id
            ? 'text-dark border-b-2 font-medium border-dark'
            : ''
        "
        @click="onClickTab(program.id)"
      >
        {{ program.name }}
      </button>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'EditorTab',
  props: {
    programs: {
      type: Array,
      default: () => [],
    },
    selectedId: {
      type: String,
      default: null,
    },
    onClickTab: {
      type: Function,
      required: true,
    },
  },
})
</script>
