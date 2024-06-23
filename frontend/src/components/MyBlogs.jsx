import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
  styled,
} from "@mui/material";

import { toast } from "react-toastify";
import Close from "@mui/icons-material/Close";
import blogManager from "../manager/blogManager";
import { useEffect, useState } from "react";

const StyleModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledModalContent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)",
  padding: theme.spacing(2, 4, 3),
  borderRadius: "20px",
  outline: "none",
  position: "relative",
}));

const UpdateModal = ({ open, handleClose, blog ,getblogs}) => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        body: blog.body,
      });
    }
  }, [blog]);

  const { title, body } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    blogManager
      .updateBlogById(blog._id, formData)
      .then((res) => {
        toast.success("Blog updated successfully!");
        getblogs()
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Failed to update blog");
      });
    handleClose();
  };

  return (
    <StyleModal
      open={open}
      onClose={handleClose}
      aria-labelledby="update-modal-title"
      aria-describedby="update-modal-description"
    >
      <StyledModalContent>
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <Close />
        </IconButton>
        <Typography variant="h5" align="center" gutterBottom>
          Update Post
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Body"
                name="body"
                value={body}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Update Post
              </Button>
            </Grid>
          </Grid>
        </form>
      </StyledModalContent>
    </StyleModal>
  );
};

export default UpdateModal;
