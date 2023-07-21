import React from 'react'
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { Link} from 'react-router-dom';





const pages = [
    { label: 'Home', path: '/' },
    { label: 'Edit', path: '/edit' },
    { label: 'List', path:'/list'}

  ]

const Header = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    /* -------------------------------------------------------------------------- */
    /*                                  All Style                                 */
    /* -------------------------------------------------------------------------- */

    let logoStyle={
      mr: 2,
      display: { xs: 'flex', md: 'none' },
      flexGrow: 1,
      fontFamily: 'monospace',
      fontWeight: 700,
      letterSpacing: '.3rem',
      color: 'inherit',
      textDecoration: 'none',
    }
    let mainLogoStyle={
      mr: 2,
      display: { xs: 'none', md: 'flex' },
      fontFamily: 'monospace',
      fontWeight: 700,
      letterSpacing: '.3rem',
      color: 'inherit',
      textDecoration: 'none',
    }
    let btnBoxStyle={flexGrow:1,
      alignItems:'center',
      justifyContent:'right',
      display: { xs: 'none', md: 'flex' } }

  return (
    <>
      
        <AppBar position="static" sx={{bgcolor:'purple'}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={mainLogoStyle}
          >
            URL Shortener
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon/>
            </IconButton>

            {/* ------------------------- Start navbar menu item ------------------------- */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              
              {pages.map((page,index) => (
                <MenuItem key={index} component={Link} to={page.path} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
            {/* ------------------------- End navbar menu item ------------------------- */}
          </Box>
          
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={logoStyle}
          >
            URL Shortener
          </Typography>
          <Box sx={btnBoxStyle}>

            {/* --------------------- Menu Link to another page Start -------------------- */}
            {pages.map((page,index) => (
              <Button
                key={index} 
                component={Link}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.label}
              </Button>
            ))}
            {/* --------------------- Menu Link to another page End -------------------- */}

          </Box>
          </Toolbar>
          </Container>
        </AppBar>
 
      
    </>
  )
}

export default Header