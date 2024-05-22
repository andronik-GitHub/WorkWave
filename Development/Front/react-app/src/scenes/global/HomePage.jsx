import { Box, MenuItem, Typography, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import { useContext } from "react";
import { Link } from "react-router-dom";


const HomePage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    return (
        <Box display='flex'>
            <MenuItem>
                <Link to={'/registration'} style={{ color: colors.white[500] }}>
                    <Typography>Registration</Typography>
                </Link>
            </MenuItem>
            
            <MenuItem>
                <Link to={'/login'} style={{ color: colors.white[500] }}>
                    <Typography>Login</Typography>
                </Link>
            </MenuItem>
            
            <MenuItem>
                <Link to={'/projects'} style={{ color: colors.white[500] }}>
                    <Typography>Projects</Typography>
                </Link>
            </MenuItem>
        </Box>
    );
}

export default HomePage;