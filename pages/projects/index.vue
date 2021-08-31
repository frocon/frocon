<template>
  <ul>
    <li v-for="project in projects" :key="project.id" class="float-left">
      <Card :project="project" />
    </li>
  </ul>
</template>

<script>
import { $axios } from '@/utils/api'
import { translateRoleString } from '@/utils/role'
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      projects: [
        {
          id: '',
          name: '',
          updatedAt: new Date(),
          role: '',
          tags: [
            {
              id: '',
              name: '',
            },
          ],
        },
      ],
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
})
</script>
