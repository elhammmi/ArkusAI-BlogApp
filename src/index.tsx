import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import PageNotFound from "./components/PageNotFound";
import { seedData } from "./storage/blogStorageActions";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

seedData();
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/post/:id" element={<PostDetail />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>
);
