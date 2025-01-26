<!-- Template -->
<template>
  <b-navbar class="navbar_block" color="dark" toggleable="md" type="dark" sticky>
    <b-navbar-toggle target="nav_collapse" />
    <b-navbar-brand class="logo_font" href="/">
      Just1factory
    </b-navbar-brand>
    <b-collapse id="nav_collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-navbar-nav>
          <b-nav-item href="/books">
            Books
          </b-nav-item>
          <b-nav-item href="/https://techblog-just1factory.vercel.app/" target="_blank">
            Private
          </b-nav-item>
          <b-nav-item href="https://speakerdeck.com/fumiyasac0921" target="_blank">
            Speaker Deck
          </b-nav-item>
          <b-nav-item href="https://github.com/fumiyasac" target="_blank">
            GitHub
          </b-nav-item>
        </b-navbar-nav>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<!-- Script -->
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component

export default class NavigationBar extends Vue {}
</script>

<!-- Style -->
<style>
.navbar_block {
  background-color: #444444;
}
.logo_font {
  font-size: 22px;
  font-family: 'Palatino', 'Arial Narrow', Arial, sans-serif;
}
a.nav-link {
  font-family: 'Palatino', 'Arial Narrow', Arial, sans-serif;
  font-weight: bold;
}
</style>
