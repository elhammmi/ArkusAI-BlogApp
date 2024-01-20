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

const PostList = () => {
  const postListDiv: React.RefObject<HTMLInputElement> = useRef(null);
  const postsPerPage = 8;
  const data = getPostList();
  const [currentData, setCurrentData] = useState<PostInterface[]>(
    data.slice(postsPerPage)
  );
  // Pagination settings
  let [page, setPage] = useState(1);

  const pageCount = Math.ceil(data.length / postsPerPage);

  useEffect(() => {
    const begin = (page - 1) * postsPerPage;
    const end = begin + postsPerPage;
    setCurrentData(data.slice(begin, end));
  }, [page, data]);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    postListDiv.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      <div ref={postListDiv} className="post-list-container">
        {/* Display current page posts */}

        {currentData.map((item: PostInterface) => (
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
        ))}
      </div>
      {/* Pagination component */}
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
    </div>
  );
};

export default PostList;
