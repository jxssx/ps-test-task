<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <q-card-section class="text-center">
            <div class="text-grey-9 text-h4 text-weight-bold">
              Данные о пользователе
            </div>
          </q-card-section>
          <q-form @submit.prevent="onSubmit">
            <q-card-section>
              <q-input
                dense
                outlined
                v-model="userInfo.firstName"
                label="Имя"
              />
              <q-input
                dense
                outlined
                class="q-mt-md"
                v-model="userInfo.lastName"
                label="Фамилия"
              />
              <q-input
                dense
                outlined
                class="q-mt-md"
                v-model="userInfo.phone"
                label="Номер телефона"
              />
              <q-input
                dense
                outlined
                class="q-mt-md"
                v-model="userInfo.address"
                label="Адрес"
              />
              <q-input
                dense
                outlined
                class="q-mt-md"
                v-model="userInfo.extra"
                label="О себе"
                type="textarea"
                rows="5"
              />
            </q-card-section>

            <q-card-section>
              <q-btn
                style="border-radius: 8px"
                color="dark"
                rounded
                size="md"
                label="Сохранить"
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
import { useStore } from 'src/store';
import { computed, defineComponent, ref } from 'vue';
import { isValidPhoneNumber } from 'src/utils/validators';
import _ from 'lodash';

let $q: QVueGlobals;

export default defineComponent({
  name: 'EditUserForm',
  setup() {
    const $store = useStore();
    const me = computed(() => $store.getters['auth/getMe']);
    const userInfo = ref({
      firstName: me.value.firstName,
      lastName: me.value.lastName,
      address: me.value.address,
      phone: me.value.phone,
      extra: me.value.extra,
    });
    const userInfoPrevious = _.clone(userInfo.value);
    const onSubmit = () => {
      if (!isValidPhoneNumber(userInfo.value.phone)) {
        $q.notify({
          type: 'negative',
          message: 'Введите корректный номер телефона',
        });
      } else if (_.isEqual(userInfoPrevious, userInfo.value)) {
        $q.notify({
          type: 'warning',
          message: 'Пожалуйста, измените данные перед попыткой сохранения',
        });
      } else {
        $store.dispatch('auth/updateUser', userInfo.value);
        $q.notify({
          type: 'positive',
          message: 'Данные успешно изменены',
        });
      }
    };
    return { userInfo, onSubmit };
  },
  mounted() {
    $q = useQuasar();
  },
});
</script>
