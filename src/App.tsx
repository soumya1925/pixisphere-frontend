import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CategoryPage from './pages/CategoryPage';
import ProfilePage from './pages/ProfilePage';
import './App.scss'

function App() {

  return (
    <>
  
     <BrowserRouter>
     <Routes>
        <Route path="/" element={<CategoryPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
