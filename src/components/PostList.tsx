import {
  Pagination,
  Card,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
  Box,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { getPostList } from "../storage/blogStorageActions";
import { PostInterface } from "../types";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DrawerAppBar from "./Navbar";
import moment from "moment";

const bgImage = "https://images.unsplash.com/photo-1585437025779-fef015374b81?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
const PostList = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  const postListDiv: React.RefObject<HTMLInputElement> = useRef(null);
  const postsPerPage = 6;

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
  const gridStyles = {
    padding: '6rem', // You can adjust the value as needed
  };
  return (
    <>
      <Grid sx={gridStyles} container ref={postListDiv}>

        <DrawerAppBar />
        <Grid item sm={12} md={12}>
          <Box
            sx={{
              backgroundImage: `url(${bgImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "385px",
              webkitBorderRadius: "5px",
              mozBorderRadius: "5px",
              borderRadius: "5px",
              border: "none"
            }}
          >
          </Box>
          <Box style={{ borderBottom: "1rem solid #1976d2", marginBottom: "2rem" }}>
            <Typography style={{ marginTop: "1rem" }} component="h1" variant="h3" color="inherit" gutterBottom>
              Latest Posts
            </Typography>
            <Typography color="inherit" paragraph>
              {moment().format('MMMM Do YYYY, h:mm:ss a')}
            </Typography>
          </Box>
        </Grid>
        <Grid container spacing={2}>
          {currentData.map((post: PostInterface) => (

            <Grid key={post.id} item sm={12} md={4} lg={4} spacing={2}>
              <Link
                key={post.id}
                to={`/post/${post.id}`}
                className="post-link"
                style={{ textDecoration: "none" }}
              >
                <Card key={post.id} >
                  {post.imgUrl && (
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="300px"
                      image={post.imgUrl}
                    />
                  )}

                  <CardContent>
                    <Typography variant="h5" component="div">
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{
                      maxWidth: '100%',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 8,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }} >
                      {post.content}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>

          ))}
        </Grid>
      </Grid >
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
