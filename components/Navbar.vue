<template>
  <nav
    class="
      font-sans
      flex
      justify-between
      text-center
      py-4
      px-6
      bg-main
      shadow
      sm:items-baseline
      w-full
    "
  >
    <div class="mb-2 sm:mb-0">
      <a href="/" class="text-2xl no-underline text-white font-semibold"
        >ふろこん！</a
      >
    </div>
    <div v-if="isSignout">
      <Button @click.native="signOut">サインアウト</Button>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Navbar',
  computed: {
    isSignout(): Boolean {
      return this.$route.path !== '/login' && this.$route.path !== '/signup'
    },
  },
  methods: {
    async signOut() {
      await this.$fire.auth.signOut()
      location.reload()
    },
  },
})
</script>
