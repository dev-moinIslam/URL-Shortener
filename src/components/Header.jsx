import * as React from "react";
/* ----------------------------- MUI COMPONENTS ----------------------------- */
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";



const mainPages = [
  { label: "Home", path: "/" },
  { label: "Edit", path: "/edit" },
  { label: "History", path: "/list"},
];

const Header = () => {
  const location = useLocation();

  return (
    <React.Fragment>
      <CssBaseline />
      {/* /* ------------------------- Large device Style ------------------------ */}
      <Box
        sx={{ flexGrow: 1, display: { xs: "flex", md: "flex", sm: "flex" } }}
      >
        <AppBar
          sx={{
            position: "fixed",
            boxShadow: "none",
            background: "#fbfaf8",
            borderRradius: "16px",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
               {/* /* ------------------------- Logo text start ------------------------ */}
              <Link to="/" style={{textDecoration:'none'}}>
                <Typography sx={{color:'orangered',fontFamily: "Noto Serif",fontStyle:'italic',fontWeight:600,fontSize:'25px'}}>
                    Shorti<span style={{background:'orangered',color:'white',padding:'2px 5px',borderRadius:'5px'}}>fy</span>  
                </Typography>
              </Link>
              {/* /* ------------------------- Logo text end ------------------------ */}
              <Box
                sx={{
                  display: { xs: "none", sm: "flex", md: "flex" },
                  flexGrow: 1,
                }}
              >
              </Box>
              <Box
                sx={{
                  display: { xs: "flex", md: "flex" },
                  flexGrow: 1,
                  justifyContent: "center",
                }}
              >
                {/* /* ------------------------- Menu start ------------------------ */}
                {mainPages.map((page, index) => (
                  <Button
                    component={Link}
                    key={index}
                    to={page.path}
                    sx={{
                      my: 1,
                      color:
                      location.pathname === `${page.path}`
                        ? "GrayText"
                        : "orangered",
                      fontFamily:'Noto Serif',
                      fontWeight: 500,
                      textTransform: "none",
                      fontSize: { xs: "11px", sm: "14px" },
                    }}
                  >
                    {page.label}
                  </Button>
                ))}
                {/* /* ------------------------- Menu End ------------------------ */}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </React.Fragment>
  );
};

export default Header;
