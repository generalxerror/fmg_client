<template>
  <div class="flex w-full bg-primary p-2 text-sm font-bold uppercase text-white">
    &copy; {{ format(new Date(), 'yyyy') }} Fair Mobile Games
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
</script>
