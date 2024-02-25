import * as React from "react";
import { useState } from "react";
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

/* -------------------------------- MUI ICON -------------------------------- */
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";











const mainPages = [
  { label: "Home", path: "/", icon: <HomeOutlinedIcon /> },
  { label: "Edit", path: "/edit", icon: <HomeOutlinedIcon /> },
  { label: "History", path: "/list", icon: <AccountBoxOutlinedIcon /> },
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
              <Typography sx={{color:'orangered',fontFamily: "Noto Serif",fontStyle:'italic',fontWeight:600,fontSize:'25px'}}>
                  Shorti<span style={{background:'orangered',color:'white',padding:'2px 5px',borderRadius:'5px'}}>fy</span>  
              </Typography>
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
                            : "black",
                        fontFamily: "Poppins",
                        fontWeight: 400,
                        textTransform: "none",
                        fontSize: { xs: "11px", sm: "14px" },
                      }}
                    >
                      {page.label}
                    </Button>
                  ))}
                </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </React.Fragment>
  );
};

export default Header;
