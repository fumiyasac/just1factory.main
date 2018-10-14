<template>
  <b-container>
    <div class="introduction_block">
      <h2>Developer's Profile</h2>
      <b-row>
        <b-col cols="3">
          <avatar />
        </b-col>
        <b-col cols="9">
          <profile />
          <hr>
          <skills />
          <hr>
          <social-link />
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import Avatar from '~/components/index/parts_introduction/Avatar.vue'
import Profile from '~/components/index/parts_introduction/Profile.vue'
import Skills from '~/components/index/parts_introduction/Skills.vue'
import SocialLink from '~/components/index/parts_introduction/SocialLink.vue'

export default {
  name: 'Introduction',
  components: {
    Avatar,
    Profile,
    Skills,
    SocialLink
  }
}
</script>

<style>
.introduction_block {
  padding-top: 80px;
}
.introduction_block h2 {
  padding: 0 0 20px 0;
  color: #444444;
  font-size: 26px;
  font-family: 'Palatino', 'Helvetica Neue', Arial, sans-serif;
}
</style>
