import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/post/:id" element={<PostDetail />} />
    </Routes>
  </BrowserRouter>
);
