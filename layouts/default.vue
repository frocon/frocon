<template>
  <client-only>
    <div class="bg-primary">
      <Navbar />
      <div class="h-full">
        <div class="container mx-auto">
          <Nuxt />
        </div>
      </div>
    </div>
  </client-only>
</template>

<style>
html,
body,
div#__nuxt,
#__layout,
#__layout > div {
  height: 100vh !important;
}
</style>
