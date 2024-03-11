import Decks from "./pages/Decks";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Deck from "./pages/Deck";

const Routers = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Decks />} />
            <Route path="/decks/:deckId" element={<Deck />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={"not foubd"} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Routers;
