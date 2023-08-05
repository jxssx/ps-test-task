<template>
  <q-page class="flex flex-center bg-grey-2">
    <edit-user-form v-if="isAuthenticated"></edit-user-form>
    <div v-if="!isAuthenticated" class="main-text">
      Пожалуйста, войдите или зарегистрируйтесь
    </div>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'src/store';
import EditUserForm from 'src/components/EditUserForm.vue';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const $store = useStore();
    const isAuthenticated = computed(
      () => $store.getters['auth/isAuthenticated']
    );
    const me= computed(
      () => $store.getters['auth/getMe']
    );
    console.log(me);
    return { isAuthenticated, me };
  },
  components: { EditUserForm },
});
</script>

<style>
.main-text {
  font-size: 30px;
}
</style>
