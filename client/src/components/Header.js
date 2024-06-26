import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Tabs, Tab } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store";

const Header = ({ theme, colorMode }) => {
  const [value, setValue] = useState();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  return (
    <AppBar
      position="sticky"
      style={{
        margin: "0",
        padding: "8px 10px",
        borderWwidth: "0 0 1px",
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MUI Blog
        </Typography>

        {isLoggedIn && (
          <Box display="flex" marginLeft="auto" marginRight="auto">
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              <Tab LinkComponent={Link} to="/posts" label="posts" />
              <Tab
                LinkComponent={Link}
                to="/profile/posts"
                label="Your posts"
              />
              <Tab LinkComponent={Link} to="/post/create" label="Add post" />
            </Tabs>
          </Box>
        )}
        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <>
              <Button
                LinkComponent={Link}
                to="/auth"
                sx={{ margin: "1", color: "white", display: "block" }}
              >
                Login
              </Button>
              <Button
                LinkComponent={Link}
                to="/auth"
                sx={{ margin: "1", color: "white", display: "block" }}
              >
                Sign up
              </Button>
            </>
          )}
          {isLoggedIn && (
            <Button
              sx={{ margin: "1", color: "white", display: "block" }}
              LinkComponent={Link}
              to="/auth"
              onClick={() => dispatch(authActions.logout())}
            >
              Logout
            </Button>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "background.default",
            color: "text.primary",
            borderRadius: 1,
            p: 3,
          }}
        >
          {theme.palette.mode} mode
          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
