<template>
  <div class="container">
    <div class="information_block">
      <h2 class="message_text">
        Developer's Summary
      </h2>
      <b-card-group deck>
        <MobileEngineer />
        <WebEngineer />
        <Designer />
      </b-card-group>
    </div>
  </div>
</template>
<script>
import Designer from '~/components/index/parts_information/Designer.vue'
import MobileEngineer from '~/components/index/parts_information/MobileEngineer.vue'
import WebEngineer from '~/components/index/parts_information/WebEngineer.vue'
export default {
  name: 'Information',
  components: {
    Designer,
    MobileEngineer,
    WebEngineer
  }
}
</script>
<style>
.information_block {
  padding-top: 80px;
}
.information_block h2 {
  padding: 0 0 20px 0;
  color: #444444;
  font-size: 26px;
  font-family: 'Palatino', 'Helvetica Neue', Arial, sans-serif;
}
</style>
