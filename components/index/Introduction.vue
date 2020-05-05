<!-- Template -->
<template>
  <b-container>
    <div class="introduction_block">
      <h2>Developer's Profile</h2>
      <b-row>
        <b-col cols="3">
          <Avatar />
        </b-col>
        <b-col cols="9">
          <Profile />
          <hr>
          <Skills />
          <hr>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<!-- Script -->
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Avatar from '~/components/index/parts_introduction/Avatar.vue'
import Profile from '~/components/index/parts_introduction/Profile.vue'
import Skills from '~/components/index/parts_introduction/Skills.vue'

@Component({
  components: {
    Avatar,
    Profile,
    Skills
  }
})

export default class Introduction extends Vue {}
</script>

<!-- Style -->
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
