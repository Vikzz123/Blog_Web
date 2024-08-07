import { useContext, useEffect } from "react";
import "./App.css";
import { AppContext } from "./context/AppContext";
// import Header from "./components/Header";
// import Blogs from "./components/Blogs";
// import Pagination from "./components/Pagination";
import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import BlogPage from "./Pages/BlogPage";
import CategoryPage from "./Pages/CategoryPage";
import Home from "./Pages/Home";
import TagPage from "./Pages/TagPage";

export default function App() {
  const { fetchBlogPosts } = useContext(AppContext);

  const [searchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const page =  searchParams.get("page") ?? 1;

    if(location.pathname.includes("tags")) {
  
      const tag = location.pathname.split("/").at(-1).replaceAll("-"," ");
      fetchBlogPosts(Number(page), tag);
    }
    else if(location.pathname.includes("categories")) {
      const category = location.pathname.split("/").at(-1).replaceAll("-"," ");
      fetchBlogPosts(Number(page), null, category);
    }
    else {
      fetchBlogPosts(Number(page));
    }
  }, [location.pathname, location.search]);

  return (
    <Routes>
      <Route path="/" element = {<Home/>}   />
      <Route path="/blog/:blogId" element = {<BlogPage/>}   />
      <Route path="/tags/:tag" element = {<TagPage/>}   />
      <Route path="/categories/:category" element = {<CategoryPage/>}   />
    </Routes>
  );
}
