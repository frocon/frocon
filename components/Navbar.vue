<template>
  <nav
    class="
      font-sans
      flex flex-col
      text-center
      sm:flex-row sm:text-left sm:justify-between
      py-4
      px-6
      bg-main
      shadow
      sm:items-baseline
      w-full
    "
  >
    <div class="mb-2 sm:mb-0">
      <a href="/projects" class="text-2xl no-underline text-white font-semibold"
        >frocon</a
      >
    </div>
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="white"
        class="bi bi-three-dots"
        viewBox="0 0 16 16"
      >
        <path
          d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
        />
      </svg>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>
