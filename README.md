# 🧪 Rick and Morty Web App

<p align="center">
    <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHY1ZG5nNm12ZWQ1bTl6aTQ2anN3bjh5am96cDUydnp5eHQ1MTR3YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vlTQxIogBuTxkVhEeW/giphy.gif" alt="Video Demo" width="500">
</p>

---

## ⚠️ Important note

> This project was developed with the help of AI (GitHub Copilot), YouTube videos, and online resources. Not all of the code was written from scratch by me, but **I focused on understanding and adapting every part**. My goal wasn't just to make it work, but **to learn how to do it**.

---

## 🎮 Features

- View characters with status, gender, image, and last known location.
- Filter characters by status, gender, and species.
- Search characters by name.
- Browse episodes and see the characters featured in them.
- View locations and their residents.
- Dynamic pagination (Prev/Next buttons and numbered pages).

---

## 🚀 How to Run

1. Clone the repository
2. Open the index.html file in your browser (double-click or drag it into a browser window).

✅ No backend or server needed. Everything runs client-side.

---

## 📌 Code Overview

script.js

- DOMContentLoaded: Waits for the DOM to load before running scripts.

- Menu Toggle: Opens/closes the sidebar menu and shifts the main content.

- Page Detection: Checks which page you're on (index.html, episodes.html, or location.html) and runs the corresponding functions.

---

## ⚙️ Main Functions
1. loadPaginatedCharacters(page)
    Fetches a paginated list of characters and displays them using charactersRNM().

2. loadEpisodes(page)
    Fetches episodes and displays characters from each episode.

3. loadLocations(page)
    Fetches locations and displays residents of each location.

4. charactersRNM(data)
Creates a character card with:
    - Image
    - Name
    - Last known location
    - Status badge (Alive, Dead, Unknown)
    - Gender badge with icon (♂️ ♀️ ⚧️ ❓)
    - buildPagination(info, loadFunc)
    - Builds the pagination UI with Prev, Next, and page buttons using API metadata.

---

## 🔍 Filters and Search

1. setupSearch()
    Adds functionality to the search button to find characters by name.

2. setupFilters()
Enables filtering by:
    - Status (Alive, Dead, Unknown)
    - Species (Human, Alien, etc.)
    - Gender (Male, Female, Genderless, Unknown)
  
3. setupEpisodeFilters()
    Filters characters by episode ID using buttons.

4. setupLocationFilters()
    Filters residents by location ID using buttons.

---

## 📚 Credits and resources used

- Rick and Morty API
- GitHub Copilot
- ChatGPT
- YouTube: FreeCodeCamp Español, Carpi Coder

---

## 👨‍💻 Author
josglf26
