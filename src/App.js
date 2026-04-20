import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./pages/users/UserList";
import UserForm from "./pages/users/UserForm";
import ProductList from "./pages/products/ProductList";
import ProductForm from "./pages/products/ProductForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users" element={<UserList />} />
        <Route path="/users/create" element={<UserForm />} />
        <Route path="/users/edit/:id" element={<UserForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;