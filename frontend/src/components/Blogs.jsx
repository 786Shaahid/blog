import { Box, Button, Card, CardContent, Container, Grid, Stack, Typography } from "@mui/material";
import blogManager from "../manager/blogManager";

function Blogs({ posts, isMyPost, handleUpdate }) {

  const handleDelete = async (blogId) => {
    try {
      await blogManager.deleteBlogById(blogId);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
       {isMyPost ? "My Post": "Blogs"}
      </Typography>
      <Grid container spacing={3}>
        {posts?.map(post => (
          <Grid item xs={12} md={6} key={post._id}>
            <Card sx={{ minWidth: '25rem', minHeight: 200, display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h5" sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.875rem', color: 'gray', mt: 1 }}>
                  {new Date(post.timestamp).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2, fontSize: '1rem' }}>
                  {post.body}
                </Typography>
              </CardContent>
              {isMyPost && (
                <Box sx={{ p: 2 }}>
                  <Stack direction="row" justifyContent="flex-end" spacing={1}>
                    <Button
                      onClick={() => handleDelete(post?._id)}
                      variant="contained"
                      color="primary"
                      sx={{ mr: 1, backgroundColor: 'primary.main' }}
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => handleUpdate(post)}
                      variant="contained"
                      color="primary"
                      sx={{ backgroundColor: 'secondary.main' }}
                    >
                      Update
                    </Button>
                  </Stack>
                </Box>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Blogs;
