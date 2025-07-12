# 📸 Pixisphere Frontend

Pixisphere is a modern photography marketplace web application where users can explore, filter, and connect with photographers. This frontend is built using **React**, styled with **Material UI (MUI)** and **SASS**, and supports seamless UI interactions with modals, carousels, skeleton loaders, and more.

---

# 🚀 Deployment
The project is deployed on Vercel and can be accessed at:

🔗 https://pixisphere-frontend-a9v7iowsw-soumya-rouls-projects.vercel.app

---

## 🚀 Features Implemented

### ✅ General UI
- 🎨 **Responsive layout** using MUI `Box`, `Grid`, and custom SCSS styling.
- 🌄 **Homepage with photographer cards**, images, and profile quick view.
- 🧭 **Routing** via React Router.

---

### 🔍 Search and Filter
- 🔎 **Search bar** for photographer name.
- 🧃 **Filters** for:
  - Price range (`Slider`)
  - Ratings (`Checkbox`)
  - Photography styles (Traditional, Candid, Studio, Outdoor)
  - City (Dropdown Select)
- ✨ Styled filter panel header with custom `Mirage` brand logo.

---

### 👤 Photographer Profile Page
- 🧑‍💼 Profile details including name, bio, pricing, styles, tags, and rating.
- 🖼️ **Portfolio Gallery** with:
  -Organized image cards showcasing the photographer’s work.
  -Click-to-Enlarge: Clicking on any image opens it in a full-screen lightbox with carousel functionality — allowing users to swipe or navigate through all shots in an immersive viewer.
- 📝 **Inquiry Modal**:
  - Validated form (name, email, message)
  - SweetAlert2 confirmation on submit

---

### 🗂️ Data Handling
- 📦 **Photographer data fetched from JSON server**:
  `https://my-json-server.typicode.com/soumya1925/backendgb/photographers`
- 🔄 **Redux Toolkit** used for:
  - Fetching and storing photographer list
  - Filtering logic
  - Pagination with "Load More"

---

### ⏳ UX Enhancements
- 🌀 **Skeleton Loaders** used while fetching photographer data.
- ✅ Clean form validation and user feedback via SweetAlert.

---

## 🧰 Tech Stack

| Tool            | Description                            |
|-----------------|----------------------------------------|
| React           | Frontend UI                            |
| TypeScript      | Type safety                            |
| Redux Toolkit   | State management                       |
| MUI             | UI components & design                 |
| SCSS            | Custom styles                          |
| Axios           | HTTP requests                          |
| React Router    | Routing                                |
| SweetAlert2     | Alert dialogs                          |
| React Photo View | Lightbox image carousel                |
| JSON Server     | Mock API for development               |

---


## 🧪 Running Locally

### Clone the repo
```bash
git clone https://github.com/soumya1925/pixisphere-frontend.git
cd pixisphere-frontend
