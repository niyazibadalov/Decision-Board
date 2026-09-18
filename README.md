# Decision Board Application

Decision Board is a modern and responsive React application designed to help users create decisions, add options, and visually determine the final outcome.

---

## Tech Stack

* React (Vite)
* Tailwind CSS (v4)
* JavaScript (ES6+)
* LocalStorage API

---

## Key Features

* Create Decisions: Create new decision topics with a title and at least two initial options.
* Add Options: Dynamically add new options to any existing decision.
* Select Option: Select an option and view the immediate result clearly on the screen.
* Delete Decision: Remove unwanted decisions from the list.
* State Persistence: All data persists across page reloads using LocalStorage.

---

## Technical Approach & Design Decisions

### 1. Handling Duplicate Option Clicks (Idempotent State)
To prevent unnecessary state updates and calculation errors when a user clicks the same option multiple times, an idempotent approach was implemented in state management.

In the `selectOption` handler, the function checks whether the clicked option matches the currently active option ID:
```javascript
if (dec.selectedOptionId === optionId) return dec;