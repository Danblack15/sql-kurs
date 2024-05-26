<template>
  <HeaderBlock />
  <main>
    <router-view />
  </main>
</template>

<script>
import HeaderBlock from '@/components/HeaderBlock'

export default {
  components: {
    HeaderBlock
  }
}
</script>