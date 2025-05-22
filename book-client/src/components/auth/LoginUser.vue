<!-- views/LoginUservue -->
<script setup lang="ts">
/**
 * LoginUser - Page view for user login.
 */
import LoginForm from '@/components/auth/LoginForm.vue'
import ButtonCta from '../organism/ButtonCta.vue';
</script>

<template>
  <section class="login">
    <!-- Page heading -->
    <h1 class="login__title">Log in to your account</h1>

    <!-- Description under heading -->
    <p class="login__subtitle">Log in to explore your bookshelf and leave reviews.</p>

    <!-- Login form -->
    <div class="login__form">
      <LoginForm />
    </div>

    <!-- CTA link to register page -->
    <ButtonCta
      class="login__cta"
      heading="Don’t have an account?"
      to="/account/register"
      label="Register"
      message1="Start exploring your favorite books"
      message2="and share your thoughts with other members"
    />
  </section>
</template>

<style scoped lang="scss">
.login {
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
