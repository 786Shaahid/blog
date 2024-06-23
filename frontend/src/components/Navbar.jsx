import { AppBar, Box, Button, Container, Drawer, IconButton, Link, List, ListItem, ListItemText, Toolbar, Typography, styled } from "@mui/material";
import { useNavigate,NavLink } from "react-router-dom";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  color: '#fff',
  fontFamily:" sans-serif",
  textDecoration: 'none',
  marginRight: '1rem',
  '&.active': {
    
    color: theme.palette.secondary.main,
  },
}));

const Navbar = ({openModal,setOpenModal,handleIsMyPost}) => {
  const navigate = useNavigate();
 
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    setOpenDrawer(false);  
   };

  
  const handleMyPosts = () => {
    navigate("/my-post");
    setOpenDrawer(false); 
  };

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem  onClick={handleOpenModal}>
          
          <ListItemText primary="Create Post" />
        </ListItem>
        <ListItem  onClick={handleLogout}>
          
          <ListItemText primary="Logout" />
        </ListItem>
        <ListItem  onClick={handleIsMyPost}>
          
          <ListItemText primary="My Posts" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="absolute" component="nav">
      <Container>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h6"
              noWrap
              component={NavLink}
              to="/"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                marginRight: '2rem',
              }}
            >
              Blogs
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              <Button
                 component={Link}
                onClick={handleOpenModal}
                sx={{ color: '#fff', marginRight: '1rem' }}
              >
                Create Post
              </Button>
              <Button
                component={Link} 
                onClick={handleIsMyPost}
                sx={{ color: '#fff' }}
              >
                My Posts
              </Button>
              <Button
                onClick={handleLogout}
                sx={{ color: '#fff', marginRight: '1rem' }}
              >
                Logout
              </Button>
            </Box>
          </Box>
          {/* Hamburger Menu for Mobile */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ marginRight: '1rem' }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={openDrawer}
              onClose={toggleDrawer(false)}
            >
              {DrawerList}
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
