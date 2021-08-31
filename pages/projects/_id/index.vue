<template>
  <Card :name="name" :updated-at="updatedAt" />
</template>

<script lang="ts">
export default {
  data() {
    return {
      name: 'project',
      updatedAt: new Date(),
    }
  },
}
</script>
