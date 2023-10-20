<template>
  <div>
    this is the auth page
    <a href="http://localhost:8000/api/auth/redirect">
      Continue with Google
    </a>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['guest']
})
</script>
