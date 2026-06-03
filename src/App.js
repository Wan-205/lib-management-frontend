import { Routes, Route } from "react-router-dom";
import Interface from "./components/Interface";
import Book from "./components/Book";
import Reader from "./components/Reader"
import Login from "./components/Login";
import Borrow from "./components/Borrow";
import Settings from "./components/Settings";
import Register from "./components/Register";
import Person from "./components/Person";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Interface />} />
      <Route path="/book" element={<Book />} />
      <Route path="/reader" element={<Reader />} />
      <Route path="/borrow" element={<Borrow />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/person" element={<Person />} />
    </Routes>
  );
}

export default App;