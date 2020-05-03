<template>
  <div>
    <BookHeadline />
    <BookInformation />
  </div>
</template>

<script>
import BookHeadline from '~/components/books/BookHeadline.vue'
import BookInformation from '~/components/books/BookInformation.vue'

export default {
  components: {
    BookHeadline,
    BookInformation
  }
}
</script>
