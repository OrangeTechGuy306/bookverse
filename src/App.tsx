import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignInPage from "./pages/signin"
import DashboardPage from "./pages/dashboard"
import UsersPage from "./pages/users"
import BooksPage from "./pages/books"
import UploadBookPage from "./pages/upload-book"
import ViewBooks from "./pages/view-book"
import AdminsPage from "./pages/admins"



function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/upload" element={<UploadBookPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/view/:id" element={<ViewBooks />} />
        <Route path="/admins" element={<AdminsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
