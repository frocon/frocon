<template>
  <div>
    <h6 class="text-xl font-bold text-gray-600 pt-4">参加中のプロジェクト</h6>
    <CreateProjectButton :on-submit="redirectToProject" class="mt-4" />
    <ul>
      <li v-for="project in projects" :key="project.id" class="float-left">
        <Card :project="project" />
      </li>
    </ul>
  </div>
</template>

<script>
import { $axios } from '@/utils/api'
import { translateRoleString } from '@/utils/role'
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      projects: [],
    }
  },

  created() {
    $axios.$get('http://localhost:3000/api/projects').then((res) => {
      this.projects = res.map((project) => {
        project.updatedAt = new Date(project.updatedAt)
        project.role = translateRoleString(project.role)
        return project
      })
    })
  },

  methods: {
    redirectToProject(projectId) {
      this.$router.push(`/projects/${projectId}`)
    },
  },
})
</script>
