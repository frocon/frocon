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
    <div>
      <Button @click.native="signOut">ログアウト</Button>
    </div>
  </nav>
</template>

<script lang="ts">
export default {
  name: 'Navbar',
  methods: {
    async signOut() {
      await this.$fire.auth.signOut()
      location.reload()
    },
  },
}
</script>
