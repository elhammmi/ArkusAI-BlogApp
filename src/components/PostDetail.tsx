import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import { deletePost, getPost } from "../storage/blogStorageActions";
import { useParams } from "react-router";
import PageNotFound from "./PageNotFound";
import ErrorPage from "./ErrorPage";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const PostDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  if (!id || isNaN(parseInt(id))) return <ErrorPage />;
  const post = getPost(parseInt(id));
  if (!post) {
    return <PageNotFound />;
  }

  const handleEdit = () => {
    navigate(`/post/edit/${post.id}`);
  };

  const handleDelete = () => {
    deletePost(post.id);
    navigate("/");
  };
  return (
    <>
      <Card>
        {post.imgUrl && (
          <CardMedia
            component="img"
            height="300"
            width="500"
            image={post.imgUrl}
            alt="Blog Post Image"
          />
        )}

        <CardContent>
          <Typography variant="h4" gutterBottom>
            {post.title}
          </Typography>

          <Typography variant="subtitle2" color="textSecondary" gutterBottom>
            {moment(post.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          </Typography>

          <Divider />
          <Typography
            sx={(theme) => ({
              mt: 2,
              pl: 0.5,
              pr: 1,
              mb: 2,
            })}
            variant="body1"
          >
            {post.content}
          </Typography>

          <Divider />

          <Button
            sx={(theme) => ({
              mt: 2,
              py: 0.4,
              pl: 0.5,
              pr: 1,
              mr: 1,
            })}
            variant="contained"
            color="primary"
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button
            sx={(theme) => ({
              mt: 2,
              py: 0.4,
              pl: 0.5,
              pr: 1,
            })}
            variant="contained"
            color="error"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default PostDetail;
