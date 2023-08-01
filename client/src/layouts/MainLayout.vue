<template>
  <q-layout>
    <q-header
      elevated
      class="text-white"
      style="background: #24292e"
      height-hint="61.59"
    >
      <q-toolbar class="q-py-sm q-px-md">
        <q-toolbar-title><a href="/"> PyShop Test Task </a></q-toolbar-title>

        <q-space />

        <div
          v-if="$q.screen.gt.sm"
          class="GL__toolbar-link q-ml-xs q-gutter-md text-body2 text-weight-bold row items-center no-wrap"
        >
          <a v-if="!isAuthenticated" href="/register" class="text-white"
            >Зарегистрироваться</a
          >
          <a v-if="!isAuthenticated" href="/login" class="text-white">
            Войти
          </a>
          <a
            v-if="isAuthenticated"
            href="#"
            class="text-white"
            @click.prevent="onClickLogout"
          >
            Выйти
          </a>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { useStore } from 'src/store';
import { computed } from 'vue';

export default {
  name: 'MyLayout',
  setup() {
    const $store = useStore();
    const isAuthenticated = computed(
      () => $store.getters['auth/isAuthenticated']
    );
    const onClickLogout = () => {
      $store.dispatch('auth/signOut');
    };
    return { isAuthenticated, onClickLogout };
  },
};
</script>

<style lang="sass">
a
  color: white
  text-decoration: none
.q-toolbar
  background: $primary
  &__title
    font-size: 25px
    padding: 0.2em
.GL
  &__select-GL__menu-link
    .default-type
      visibility: hidden

    &:hover
      background: #0366d6
      color: white
      .q-item__section--side
        color: white
      .default-type
        visibility: visible

  &__toolbar-link
    a
      color: white
      font-size: 16px
      text-decoration: none
      &:hover
        opacity: 0.7

  &__menu-link:hover
    background: #0366d6
    color: white

  &__menu-link-signed-in,
  &__menu-link-status
    &:hover
      & > div
        background: white !important

  &__menu-link-status
    color: $blue-grey-6
    &:hover
      color: $light-blue-9

  &__toolbar-select.q-field--focused
    width: 450px !important
    .q-field__append
      display: none
</style>
