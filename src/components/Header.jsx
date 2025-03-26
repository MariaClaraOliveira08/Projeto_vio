import React from "react";
import  AppBar  from "@mui/material/AppBar";
import  Toolbar  from "@mui/material/Toolbar";
import  AccountCircleIcon  from "@mui/icons-material/AccountCircle";
import IconButton  from "@mui/material/IconButton";

const Header = () => {
    return(
        <AppBar sx={{backgroundColor:'red'}}>
            <Toolbar>
                <IconButton>
                    <AccountCircleIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}
export default Header;
