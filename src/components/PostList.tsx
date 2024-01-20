import {
  Pagination,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { getPostList } from "../storage/blogStorageActions";

const PostList = () => {
  const data = getPostList();
  // Pagination settings
  const blogPosts = 200;
  const postsPerPage = 10;
  const pageCount = Math.ceil(blogPosts / postsPerPage);

  // State for current page
  const [currentPage, setCurrentPage] = useState(1);

  // Handle page change
  const handlePageChange = (value: any) => {
    setCurrentPage(value);
  };

  // Display posts for the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  //const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div>
      <div className="post-list-container">
        {/* Display current page posts */}

        {data.map((item) => (
          <Card key={item.id} className="post-card">
            <CardMedia
              component="img"
              alt="green iguana"
              height="auto"
              image={item.imgUrl}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.content}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Pagination component */}
      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
        className="pagination"
      />
    </div>
  );
};

export default PostList;
