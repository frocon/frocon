<template>
  <EditableText class="ml-10" :text="project.name" :on-submit="renameProject" />
</template>

<script lang="ts">
import { $axios } from '@/utils/api'
import Vue from 'vue'

export default Vue.extend({
  layout: 'fullwidth',

  async asyncData({ params }) {
    const res = await $axios.$get(
      `http://localhost:3000/api/projects/${params.id}`
    )
    const project = {
      id: res.id,
      name: res.name,
      updatedAt: new Date(res.updatedAt),
    }
    const programs = res.programs.map(
      (program: { id: string; name: string; updatedAt: Date }) => {
        program.updatedAt = new Date(program.updatedAt)
        return program
      }
    )

    const tags = res.tags

    return { project, programs, tags }
  },
  data() {
    return {
      project: {
        id: '',
        name: '',
        updatedAt: new Date(),
      },
      programs: {
        id: '',
        name: '',
        source: '',
        updatedAt: new Date(),
      },
      tags: {
        id: '',
        name: '',
      },
    }
  },
  head() {
    return { title: (this as any).project.name }
  },

  methods: {
    renameProject(name: string) {
      $axios
        .$patch(`http://localhost:3000/api/projects/${this.$route.params.id}`, {
          project: { name },
        })
        .then((res) => {
          Vue.set(this.project, 'name', res.name)
        })
    },
  },
})
</script>
