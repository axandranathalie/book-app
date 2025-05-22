<script setup lang="ts">
import { defineProps } from 'vue'

interface Book {
  _id: string
  title: string
  author: string
  published_year: number
  genres: string[]
  image: string
  averageRating: number
  reviews: Array<any>
}

const props = defineProps<{
  book: Book
}>()
</script>

<template>
  <article class="book-card">
    <img class="book-card__image" :src="book.image" :alt="'Book cover for ' + book.title" />

    <div class="book-card__content">
      <div class="book-card__info">
        <h2 class="book-card__title">{{ book.title }}</h2>
        <p class="book-card__year">{{ book.published_year }}</p>
        <p class="book-card__author">By {{ book.author }}</p>

        <p class="book-card__genres">
          <span v-for="(genre, index) in book.genres" :key="genre" class="book-card__genre">
            {{ genre }}<span v-if="index < book.genres.length - 1">, </span>
          </span>
        </p>

        <div class="book-card__rating">
          <span
            v-for="i in 5"
            :key="i"
            class="book-card__star"
            :class="{ filled: i <= Math.floor(book.averageRating) }"
          >
            ★
          </span>
          <span class="book-card__reviews">
            - {{ book.reviews.length }} {{ book.reviews.length === 1 ? 'review' : 'reviews' }}
          </span>
        </div>
      </div>

      <div class="book-card__footer">
        <router-link
          class="book-card__link"
          :to="{ name: 'book-review', params: { id: book._id } }"
          :aria-label="`Read more about ${book.title}`"
        >
          READ MORE
        </router-link>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
@use '@abstracts/mixins/flex-center' as *;

.book-card {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  border-bottom: 1px solid var(--color-action-primary-hover);
  min-height: fn-rem(170);
  font-family: var(--font-secondary);
  padding-bottom: 1rem;

  &__image {
    max-width: fn-rem(103);
    max-height: fn-rem(150);
    height: auto;
    object-fit: contain;
    margin-block: auto;
  }

  &__content {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: space-between;
  }

  &__info {
    &__title {
      font-size: fn-rem(20);
      font-weight: bold;
    }

    &__year,
    &__genres {
      font-style: italic;
    }

    &__genres {
      font-weight: 550;
    }
  }

  &__title {
    font-size: fn-rem(20);
    font-weight: bold;
  }

  &__year,
  &__genres {
    font-style: italic;
  }

  &__genre {
    font-weight: 550;
  }

  &__rating {
    display: flex;
    gap: 2px;
    font-size: 1.5rem;
    flex-direction: row;
    align-items: center;
  }

  &__star {
    color: var(--color-ratingstar-empty);

    &.filled {
      color: var(--color-ratingstar-filled);
    }

    &.half {
      color: linear-gradient(
        to right,
        var(--color-ratingstar-filled),
        var(--color-ratingstar-empty)
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  &__reviews {
    font-size: 1rem;
    text-align: center;
    font-style: italic;
  }

  &__footer {
    @include mix-flex-center(column);
  }

  .book-card__link {
    font-size: fn-rem(18);
    text-decoration: underline;
    text-underline-offset: fn-rem(4);
    @include mix-flex-center(column);
    min-width: 10ch;
    padding: 0 0.25rem;
    line-height: 1;
    padding-block: 1rem;
    transition:
      transform 0.2s ease,
      background-color 0.2s ease,
      outline 0.2s ease;

    // Hover (muspekare)
    &:hover {
      transform: scale(1.05);
      border-radius: 0.25rem;
      text-decoration: none;
    }

    &:focus-visible {
      outline: 2px solid var(--color-action-primary-focus);
      transform: scale(1.05);
      border-radius: 0.25rem;
      text-decoration: none;
    }

    // Aktiv (klick)
    &:active {
      animation: shrink 120ms ease-in-out;
    }
  }

  @keyframes shrink {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.95);
    }
    100% {
      transform: scale(1);
    }
  }
}
</style>
