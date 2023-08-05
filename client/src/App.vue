<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { api } from 'boot/axios';

export default defineComponent({
  name: 'App',
  beforeCreate() {
      this.$store.dispatch('auth/init');
      const token = this.$store.getters['auth/getToken'];
      console.log(token);
      if (token) {
        api.defaults.headers.common.Authorization = 'Bearer ' + token.access;
      } else {
        api.defaults.headers.common.Authorization = '';
      }
  },
});
</script>
