<template>
  <div>
    <Navbar />
    <div class="h-full bg-primary">
      <div class="container mx-auto">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<style>
body,
html {
  height: 100%;
}
div#__nuxt,
#__layout,
#__layout > div {
  height: 100%;
}
</style>
