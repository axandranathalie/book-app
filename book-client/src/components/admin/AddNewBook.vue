<!-- components/admin/AddNewBook.vue -->
<script setup lang="ts">
/**
 * AddNewBook - Form to submit a new book to the database.
 */
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '@/composables/useApi'
import BaseInput from '@/components/global/BaseInput.vue'

const { API_URL } = useApi()
const router = useRouter()

const form = ref({
  title: '',
  description: '',
  author: '',
  genres: '',
  image: '',
  published_year: '',
})

/**
 * Handles form submission by sending POST request to API.
 */
const submitForm = async () => {
  try {
    const genresArray = form.value.genres.split(',').map((genre) => genre.trim())
    const payload = {
      ...form.value,
      genres: genresArray,
      published_year: Number(form.value.published_year),
    }

    const response = await fetch(`${API_URL}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`Failed to add book: ${response.statusText}`)
    }

    alert('Book added successfully!')
    form.value = {
      title: '',
      description: '',
      author: '',
      genres: '',
      image: '',
      published_year: '',
    }

    router.push({ name: 'admin_books' })
  } catch (error) {
    console.error('Error adding book:', error)
    alert('Failed to add book. Please try again.')
  }
}
</script>

<template>
  <section class="add-new-book">
    <h2>Add a New Book</h2>
    <form @submit.prevent="submitForm">
      <BaseInput
        id="title"
        name="Title"
        v-model="form.title"
        type="text"
        placeholder="Enter book title"
        required
      />
      <BaseInput
        id="description"
        name="Description"
        v-model="form.description"
        type="textarea"
        placeholder="Enter book description"
        :rows="5"
        required
      />
      <BaseInput
        id="author"
        name="Author"
        v-model="form.author"
        type="text"
        placeholder="Enter author's name"
        required
      />
      <BaseInput
        id="genres"
        name="Genres"
        v-model="form.genres"
        type="text"
        placeholder="Enter genres (comma-separated)"
        required
      />
      <BaseInput
        id="image"
        name="Image URL"
        v-model="form.image"
        type="text"
        placeholder="Enter image URL"
        required
      />
      <BaseInput
        id="published_year"
        name="Published Year"
        v-model="form.published_year"
        type="number"
        placeholder="Enter published year"
        required
      />
      <button type="submit" class="submit-button">Add Book</button>
    </form>
  </section>
</template>

<style scoped lang="scss">
.add-new-book {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h2 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .submit-button {
    padding: 0.5rem 1rem;
    background-color: var(--color-action-primary);
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
      background-color: var(--color-action-primary-hover);
    }
  }
}
</style>
