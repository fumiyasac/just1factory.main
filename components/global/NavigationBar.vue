<template>
  <b-navbar class="navbar_block" color="dark" toggleable="md" type="dark" sticky>
    <b-navbar-toggle target="nav_collapse" />
    <b-navbar-brand class="logo_font" href="/">Just1factory</b-navbar-brand>
    <b-collapse id="nav_collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-navbar-nav>
          <b-nav-item href="/books">BOOKS</b-nav-item>
          <b-nav-item href="https://www.wantedly.com/users/291450" target="_blank">Wantedly</b-nav-item>
        </b-navbar-nav>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'NavigationBar'
}
</script>

<style>
.navbar_block {
  background-color: #444444;
}
.logo_font {
  font-size: 22px;
  font-family: 'Palatino', 'Arial Narrow', Arial, sans-serif;
}
</style>
