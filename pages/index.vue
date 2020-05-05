<!-- Template -->
<template>
  <div>
    <Message />
    <Introduction />
    <SocialLink />
    <Information />
  </div>
</template>

<!-- Script -->
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Message from '~/components/index/Message.vue'
import Introduction from '~/components/index/Introduction.vue'
import SocialLink from '~/components/index/SocialLink.vue'
import Information from '~/components/index/Information.vue'

@Component({
  components: {
    Message,
    Introduction,
    SocialLink,
    Information
  }
})

export default class Index extends Vue {}
</script>
