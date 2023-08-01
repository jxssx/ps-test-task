<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <q-card-section class="text-center">
            <div class="text-grey-9 text-h4 text-weight-bold">
              Вход в аккаунт
            </div>
          </q-card-section>
          <q-form @submit.prevent="onSumbit">
            <q-card-section>
              <q-input dense outlined v-model="login.email" label="Email" />
              <q-input
                dense
                outlined
                class="q-mt-md"
                v-model="login.password"
                type="password"
                label="Пароль"
              />
            </q-card-section>
            <q-card-section>
              <q-btn
                style="border-radius: 8px"
                color="dark"
                rounded
                size="md"
                label="Войти"
                no-caps
                class="full-width"
                type="submit"
              ></q-btn>
            </q-card-section>
          </q-form>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { QVueGlobals, useQuasar } from 'quasar';
import { ref } from 'vue';
import { useStore } from 'src/store';
import { useRouter } from 'vue-router';
import { isValidEmail } from '../utils/validators';
let $q: QVueGlobals;

export default {
  name: 'LoginUser',
  setup() {
    const $store = useStore();
    const $router = useRouter();
    const isAuthenticated = $store.getters['auth/isAuthenticated'];
    if (isAuthenticated) {
      const toPath = '/';
      $router.push(toPath);
    }
    const login = ref({ email: '', password: '' });
    const onSumbit = async () => {
      if (!login.value.email || !login.value.password) {
        $q.notify({
          type: 'negative',
          message: 'Поля не должны быть пустыми',
        });
      } else if (login.value.password.length < 5) {
        $q.notify({
          type: 'negative',
          message: 'Длина пароля должна быть не меньше 5 символов',
        });
      } else if (!isValidEmail(login.value.email)) {
        $q.notify({
          type: 'negative',
          message: 'Введите корректный email',
        });
      } else {
        try {
          await $store.dispatch('auth/doLogin', login.value);
          const toPath = '/';
          $router.push(toPath);
        } catch (error) {
          $q.notify({
            type: 'negative',
            message: 'Неверные данные',
          });
        }
      }
    };

    return { login, onSumbit, $store };
  },
  mounted() {
    $q = useQuasar();
  },
};
</script>

<style scoped lang="sass">
.my_card
  width: 30rem
  border-radius: 8px
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)
</style>
../utils/validators
