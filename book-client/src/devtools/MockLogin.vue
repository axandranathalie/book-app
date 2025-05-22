<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import BaseAction from '@/components/atoms/BaseAction.vue'

const auth = useAuthStore()
const router = useRouter()

function loginAsUser() {
  auth.fakeLogin(false)
  router.go(0)
}

function loginAsAdmin() {
  auth.fakeLogin(true)
  router.go(0)
}

function logout() {
  auth.logout()
  router.go(0)
}
</script>

<template>
  <article class="fakeauth">
    <h2>Fake auth – for dev</h2>

    <div class="actions">
      <div class="action">
        <h3>Login as user</h3>
        <BaseAction as="button" variant="secondary" @click="loginAsUser" label="Log in" />
      </div>

      <div class="action">
        <h3>Login as admin</h3>
        <BaseAction as="button" variant="secondary" @click="loginAsAdmin" label="Logga in" />
      </div>

      <div class="action">
        <h3>Log out</h3>
        <BaseAction as="button" variant="secondary" @click="logout" label="Log out" />
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
h2 {
  text-align: center;
  font-size: fn-rem(36);
  margin-bottom: 0.5rem;
  font-weight: 600;
}

h3 {
  font-weight: 400;
  font-size: fn-rem(28);
  margin: 0.5rem 0;
}

p {
  text-align: center;
  font-size: fn-rem(16);
  margin-bottom: 1rem;
}

article {
  margin-bottom: 2rem;
  padding: 1rem;
}

.fakeauth {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: fn-rem(24);
  margin: fn-rem(32) auto;
  padding: fn-rem(16);
}

.actions {
  @include mix-flex-center(column);
  max-width: fn-rem(500);
  gap: fn-rem(32);
}

.action {
  width: 100%;
  @include mix-flex-center(column);
  gap: fn-rem(12);
}
</style>
