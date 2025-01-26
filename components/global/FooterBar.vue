<!-- Template -->
<template>
  <div class="footer">
    <footer class="page-footer">
      <div class="footer-copyright text-center">
        <p class="copyright_text">
          &copy; 2025 Copyright Just1factory
        </p>
      </div>
    </footer>
  </div>
</template>

<!-- Script -->
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class FooterBar extends Vue {}
</script>

<!-- Style -->
<style>
.footer {
  padding: 60px 0;
}
.footer-copyright p {
  color: #888888;
}
</style>
