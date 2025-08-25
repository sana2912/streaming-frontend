# 🎵 Streaming User Frontend  
# **see this web ** [streaming frontend](https://streaming-front.netlify.app)  
This repository is the **User Frontend** of a streaming application.  
It provides UI for user authentication, content browsing, playlists, and track management.  

---

## 🔗 Project in System  
- **Frontend (User side perform on netlify):** **this repo**  
- **Backend (User side perform on render):** [stream-user-backend](https://github.com/sana2912/streaming-user-backend.git)  
- **Frontend (Admin side perfrom on netlify):** [stream_admin_ui](https://github.com/sana2912/stream_admin_ui.git)  
- **Backend (Admin side perfom on render):** [stream_admin_backned](https://github.com/sana2912/stream_admin_backned.git)  
- **for more understanding see full systems picture:** [image](https://res.cloudinary.com/ddlspu2uq/image/upload/v1756123510/system_d4p3cd.jpg)  
*(see full system diagram in repo image)*  

---

## ⚙️ Tech Stack  
- React.js  
- Context API (for state management)  
- Tailwind CSS (styling)  
- Axios (for API calls)  
- React Router (routing)  

---

## 🚀 Features  
- User authentication (Login / Register)
- User authentication (login / register with google account oauth2.0)
- Browse tracks, albums, playlists like
- Search tracks & albums  
- Play music (mini-player component)  
- Like tracks & manage playlists  

---

## 📂 Project Structure  
src/
├─ assets/ # images, icons, audio, poster
├─ component/ # React components (login, register, navbar, track, album, playlist, etc.)
├─ context/ # React Context for global state
├─ App.jsx # main app component
├─ main.jsx # entry point
└─ index.css # global styles

## 🎵 Track Context (my center state management)

The **Track Context** is a central state manager for the User Frontend, handling audio playback, tracks, albums, playlists, and user authentication.  
It wraps the entire app via `TrackProvide`, allowing any component to access shared state and functions like `play_audio()`, `next_track()`, `seek_func()`, and `sound_volum()`.  

### 📂 Usage
Wrap your app with `TrackProvide` in `main.jsx` or `App.jsx`, then use `useContext(Track_context)` in components to access state and actions.
---

## ▶️ Getting Started  
```bash
# install dependencies
npm install  

# run the app
npm start  # or npm run dev if using Vite
