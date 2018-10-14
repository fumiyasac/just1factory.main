<template>
  <div>
    <support-headline />
    <book-information />
    <develop-loadmap />
  </div>
</template>

<script>
import BookInformation from '~/components/support/BookInformation.vue'
import SupportHeadline from '~/components/support/SupportHeadline.vue'
import DevelopLoadmap from '~/components/support/DevelopLoadmap.vue'

export default {
  components: {
    SupportHeadline,
    BookInformation,
    DevelopLoadmap
  }
}
</script>
