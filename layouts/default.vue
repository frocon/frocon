<template>
  <client-only>
    <div>
      <Navbar />
      <div class="h-full bg-primary">
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
