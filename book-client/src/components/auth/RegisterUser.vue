<!-- views/RegisterUser.vue -->
<script setup lang="ts">
/**
 * RegisterUser - Page view for user registration.
 */
import RegisterForm from '@/components/auth/RegisterForm.vue'
import ButtonCta from '../organism/ButtonCta.vue';
</script>

<template>
  <section class="register">
    <!-- Page title -->
    <h1 class="register__title">Create your account</h1>

    <!-- Page description -->
    <p class="register__subtitle">Sign up to start exploring your bookshelf and writing reviews.</p>

    <!-- Form component -->
    <div class="register__form">
      <RegisterForm />
    </div>

    <!-- Link to login page -->
    <ButtonCta
      class="register__cta"
      heading="Already have an account?"
      to="/account/login"
      label="Log In"
      message1="Log in to continue reading and sharing"
      message2="your thoughts with the community"
    />
  </section>
</template>

<style scoped lang="scss">
.register {
  margin: auto;
  padding: 2rem;
  width: 100%;
  height: 100%;
  max-width: fn-rem(450);
  @include mix-flex-center(column, 1.5rem);

  &__title {
    font-size: fn-rem(24);
    font-weight: bold;
    text-align: center;
  }

  &__subtitle {
    font-size: fn-rem(16);
    text-align: center;
  }

  &__form {
    width: 85%;
  }

  &__cta {
    margin-top: 2rem;
  }
}
</style>
