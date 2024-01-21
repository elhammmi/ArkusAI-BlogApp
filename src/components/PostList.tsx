import {
  Pagination,
  Card,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { getPostList } from "../storage/blogStorageActions";
import { PostInterface } from "../types";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const PostList = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  const postListDiv: React.RefObject<HTMLInputElement> = useRef(null);
  const postsPerPage = 8;

  const [currentData, setCurrentData] = useState<PostInterface[]>([]);

  // Pagination settings
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const data = getPostList();
    const begin = (page - 1) * postsPerPage;
    setPageCount(Math.ceil(data.length / postsPerPage));
    const end = begin + postsPerPage;
    if (!data || data.length === 0) return;
    setCurrentData(data.slice(begin, end));
  }, [page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    postListDiv.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <Grid container ref={postListDiv}>
        <Grid item md={4}>
          <Link to={`/post/edit/`}>
            <Fab
              color="success"
              variant="extended"
              aria-label="add"
              style={{
                position: "fixed",
                bottom: 0,
                right: 0,
                zIndex: 2000,
                margin: 10,
              }}
            >
              <AddIcon />
              {!isMobile && <span>Add post</span>}
            </Fab>
          </Link>
        </Grid>
        <Grid item sm={12} md={12} lg={12}>
          <h1 style={{ textAlign: "center" }}>Latest Posts</h1>
        </Grid>

        {currentData.map((post: PostInterface) => (
          <Grid key={post.id} item sm={12} md={4} lg={4}>
            <Link
              key={post.id}
              to={`/post/${post.id}`}
              className="post-link"
              style={{ textDecoration: "none" }}
            >
              <Card key={post.id} className="post-card">
                {post.imgUrl && (
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="auto"
                    image={post.imgUrl}
                  />
                )}

                <CardContent>
                  <Typography variant="h5" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.content}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={pageCount}
        page={page}
        onChange={handlePageChange}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
        className="pagination"
      />
    </>
  );
};

export default PostList;
