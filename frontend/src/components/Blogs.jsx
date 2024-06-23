import { Box, Button, Card, CardContent, Container, Grid, Stack, Typography } from "@mui/material";

import blogManager from "../manager/blogManager";


function Blogs({posts,isMyPost,handleUpdate}) {
  
 const handleDelete=async (blogId)=>{
   try {
    await  blogManager.deleteBlogById(blogId);
    
   } catch (error) {
    console.log(error);
   }
 }
 
 

  return (
    <Container maxWidth="md" mt={4}>
      <Typography variant="h4" gutterBottom>
        My Posts
      </Typography>
      <Grid container spacing={3}>
        {posts?.map(post => (
          <Grid item xs={12} md={6} key={post._id}>
            <Card>
              <CardContent>
                <Typography variant="h4" >{post.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {new Date(post.timestamp).toLocaleDateString()} {/* Format timestamp as desired */}
                </Typography>
                <Typography variant="body1" mt={2}>
                  {post.body.substring(0, 150)}... {/* Display a preview of the post body */}
                </Typography>
                <Box mt={2}>
                 {isMyPost ?(<Stack direction={'row'} justifyContent={'flex-end'}>
                  <Button  onClick={()=>{
                     handleDelete(post?._id)
                  }} variant="contained" color="primary" style={{marginRight:'8px'}}>
                    Delete
                  </Button>
                  <Button onClick={()=>{
                    handleUpdate(post)
                  }} variant="contained" color="primary">
                    update
                  </Button>

                 </Stack>): ('') }
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Blogs;
