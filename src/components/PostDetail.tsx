import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import { getPost } from "../storage/blogStorageActions";
import { useParams } from "react-router";
import PageNotFound from "./PageNotFound";
import ErrorPage from "./ErrorPage";
import moment from "moment";
const PostDetail = () => {
  const { id } = useParams();
  if (!id || isNaN(parseInt(id))) return <ErrorPage />;
  const post = getPost(parseInt(id));
  if (!post) {
    return <PageNotFound />;
  }

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
          <Typography variant="body1">{post.content}</Typography>

          <Divider />

          <Button variant="contained" color="primary">
            Edit Post
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default PostDetail;
