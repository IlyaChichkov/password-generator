<template>
  <PasswordGenerator/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PasswordGenerator from "@/components/PasswordGenerator.vue";

import './App.css';

export default defineComponent({
  name: 'App',
  components: {
    PasswordGenerator

  }
});
</script>

<style lang="scss">

</style>
