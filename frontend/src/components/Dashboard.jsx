import { Box } from "@mui/material";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import PostModal from "./PostModal";
import Blogs from "./Blogs";
import blogManager from "../manager/blogManager";
import { toast } from "react-toastify";
import UpdateModal from "./MyBlogs";
const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isMyPost,setIsMyPost]=useState(false);
  const [data,setData] =useState([]);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleOpenUpdateModal = (blog) => {
    setSelectedBlog(blog);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    setSelectedBlog(null);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
 
 const handleIsMyPost=()=>{
   setIsMyPost(true)
 }

 const handleDelete=async (blogId)=>{
  try {
   await  blogManager.deleteBlogById(blogId);
   toast.success("Delete Successfully")
   getblogs()
  } catch (error) {
   console.log(error);
  }
}

const getblogs=async ()=>{
  try {
     if(isMyPost){
   const res=  await  blogManager.getBlogById()
      setData(res?.data);
     }else {
     const res= await  blogManager.getBlogInfo() ;
      setData(res?.data)
    }
  } catch (error) {
    console.log("Error",error);
  }
}

 useEffect(()=>{
  getblogs()
  },[isMyPost,openModal])

  return (
    <>
      
      <Navbar openModal={openModal} handleCloseModal={handleCloseModal} setOpenModal={setOpenModal} handleIsMyPost={handleIsMyPost} />
       {openModal && (<PostModal open={openModal} handleClose={handleCloseModal}/>)}
      <Box mt={3}>
        <Blogs posts={data}  isMyPost={isMyPost} handleUpdate={handleOpenUpdateModal} handleDelete={handleDelete} />
      </Box>
      {openUpdateModal && (
        <UpdateModal
          open={openUpdateModal}
          handleClose={handleCloseUpdateModal}
          blog={selectedBlog}
          getblogs={getblogs}
        />
      )}
    </>
  );
};

export default Dashboard;