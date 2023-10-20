<template>
  <div class="sticky top-0 flex w-full items-center justify-between bg-white px-4 shadow-xl">
    <NuxtLink
      to="/"
    >
      <div class="flex items-center">
        <div>
          <img
            class="h-8"
            src="~assets/images/logo.png"
            alt="fair mobile games logo"
          >
        </div>
        <div class="p-4 font-bold text-gray-400">
          FairMobile.Games
        </div>
      </div>
    </NuxtLink>

    <NuxtLink
      to="/auth"
    >
      <div class="text-3xl">
        <font-awesome-icon :icon="['fas', 'circle-user']" />
      </div>
    </NuxtLink>
  </div>
</template>
