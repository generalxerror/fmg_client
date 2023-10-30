<template>
  <div class="pixelop-font mt-8 flex flex-col items-center text-lg font-bold uppercase">
    <div class="text-center text-danger">
      Found an <span class="font-bold underline">app</span> or <span class="font-bold underline">game</span>
      on the play store that is full of ads, barely usable or uses fake promotion ads?
    </div>
    <NuxtLink
      to="/reports/new"
      class="mt-2 bg-danger px-8 py-2 text-white transition-all duration-200 ease-in-out hover:shadow-lg"
    >
      Report it here
    </NuxtLink>
  </div>
</template>
