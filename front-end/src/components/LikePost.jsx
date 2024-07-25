import React from "react";
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function LikePost () {
    return (
        <IconButton>
            <FavoriteBorderIcon />
        </IconButton>
    );
}
export default LikePost;