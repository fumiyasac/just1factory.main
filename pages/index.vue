<template>
  <div>
    <carousel />
    <message />
    <introduction />
    <information />
  </div>
</template>

<script>
import Carousel from '~/components/index/Carousel.vue'
import Message from '~/components/index/Message.vue'
import Introduction from '~/components/index/Introduction.vue'
import Information from '~/components/index/Information.vue'

export default {
  components: {
    Carousel,
    Message,
    Introduction,
    Information
  }
}
</script>
