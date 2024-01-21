import {
  Pagination,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { getPostList } from "../storage/blogStorageActions";
import { PostInterface } from "../types";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Container } from "@mui/system";

const PostList = () => {
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
    <div>
      <Container>
        <Button variant="contained" color="success">
          New post
        </Button>
        <div ref={postListDiv} className="post-list-container">
          {currentData.map((item: PostInterface) => (
            <Link
              key={item.id}
              to={`/post/${item.id}`}
              className="post-link"
              style={{ textDecoration: "none" }}
            >
              <Card key={item.id} className="post-card">
                {item.imgUrl && (
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="auto"
                    image={item.imgUrl}
                  />
                )}

                <CardContent>
                  <Typography variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.content}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
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
      </Container>
    </div>
  );
};

export default PostList;
