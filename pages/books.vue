<!-- Template -->
<template>
  <div>
    <BookHeadline />
    <BookInformation />
  </div>
</template>

<!-- Script -->
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BookHeadline from '~/components/books/BookHeadline.vue'
import BookInformation from '~/components/books/BookInformation.vue'

@Component({
  components: {
    BookHeadline,
    BookInformation
  }
})

export default class Books extends Vue {}
</script>
