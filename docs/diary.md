## 📖 Group 11 – Project Diary

**Project:** _Peach Pages – Bookshelf Review_
**Slogan:** _"Review the shelf, not just the story."_

A daily log of progress, task division, design and code decisions during development.

---

### 📅 2025-05-07 – Kickoff & Task Assignment

- Assigned core responsibilities:

  - **Auth & Users** → Therese
  - **Books** → Jonatan
  - **Reviews** → Alexandra

- Alexandra and Jonatan created and connected a MongoDB database for the backend (`books-api`).

- Therese initialized the GitHub repository and invited collaborators.

---

### 📅 2025-05-08 – Client Setup & Visual Identity

- Alexandra and Jonatan finalized the `book-api` backend, including **endpoints** and **MongoDB structure**.
- Therese focused on client and design direction:

  - Created **logotype**, **brand identity**, and **slogan**
  - Designed **login** and **register** views in Figma
  - Initialized `books-client` using **Vue 3**, **TypeScript**, and **SCSS**
  - Set up SCSS structure with folders: `abstracts`, `base`, `layout`, `themes`
  - Added reusable mixins/functions and media queries for responsiveness
  - Configured `vite.config.ts` for **global SCSS injection** and **alias resolution**

_The SCSS structure and utility setup are suggested defaults and open for discussion and adjustment in the group._

---

### 📅 2025-05-09 – Component Setup & Page Responsibilities

- We divided the main client pages according to the project requirements.

- Therese began by building the first atomic components: **BaseInput** and **BaseButton**.

- She is responsible for the shared layout and user-related pages:

  - **Landing page**, **Header**, **Navigation/Menu**
  - **Login** and **Register** views
  - **User dashboard ("My Pages")** in the admin panel

- Jonatan and Alexandra are continuing to build their respective feature areas:

  - **Books** Jonatan: book list, individual book pages, and admin views:

    - Built the public book list view displaying all available books
    - Implemented navigation from the list to each book’s detail page
    - Created a form for adding new books with all required MongoDB fields

  - **Reviews** Alexandra: review functionality and integration with books:
    - Built review creation and listing features linked to individual books
    - Developed a shared book detail view showing book info and its reviews
    - Created a reusable StarRating.vue component for 1–5 star selection
    - Integrated the rating component into both the form and review display
    - Connected review data dynamically via API for real-time updates

> We'll update the task division as designs are finalized and implementation progresses.

## **Plan** : upload db exports and try setup on monday may 12th, 2025

---

### 📅 2025-05-14 – Final Refinements & Deployment Setup

- Jonatan implemented the admin panel for books and exported db collections:

  - Created a password-protected admin view for managing books
  - Displayed all books in a table format
  - Built a form to create new books, covering all MongoDB fields
  - Exported and imported sample book data to the database for testing
  - Exported MongoDB collections and imported them into /db folder

- Therese is finalizing the admin panel for users:
  - Completed login functionality for both users and admin
  - Created a password-protected admin view to manage users
  - Displays all users in a table format.

---

### 📅 2025-05-16 – Project conclusion

Overall, the project went well, and we are satisfied with both the final result and the collaboration within our group.

- The development of the API progressed smoothly and was completed quickly without major issues.
- The frontend development also went well, though it came with some challenges. As a team, we supported each other throughout the process and ensured that responsibilities were shared fairly.
- Towards the end of the project, progress slowed slightly due to the lack of a predefined route structure for the website, which led to some uncertainty in implementation. In hindsight, planning our route layout earlier would have improved efficiency in the final stages.

Despite this, the experience was positive and productive, and we gained valuable insights into both backend and frontend development, as well as teamwork and project coordination.
