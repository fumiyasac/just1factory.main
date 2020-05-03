<template>
  <div>
    <Message />
    <Introduction />
    <SocialLink />
    <Information />
  </div>
</template>

<script>
import Message from '~/components/index/Message.vue'
import Introduction from '~/components/index/Introduction.vue'
import SocialLink from '~/components/index/SocialLink.vue'
import Information from '~/components/index/Information.vue'

export default {
  components: {
    Message,
    Introduction,
    SocialLink,
    Information
  }
}
</script>
