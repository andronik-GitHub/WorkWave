import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "../../redux/slices/auth";
import { Link, Navigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import { useContext, useState } from "react";

import userIcon from '../../img/user-icon.svg';
import addIcon from '../../img/add-icon.svg';
import { useTheme } from "@emotion/react";


const Projects = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();

    const [showUserBox, setShowUserBox] = useState(false);


    if (!isAuth) return <Navigate to='/' />

    const onClickLogout = () => {
        if (window.confirm('Ви дійсно хочете вийти?')) {
            dispatch(logout());
            window.localStorage.removeItem('token');
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Box sx={{
                width: '1300px',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    height: '100px',
                    alignItems: 'center'
                }}>
                    <Typography variant="h4" sx={{ fontSize: 32 }}>Projects</Typography>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <Button 
                            sx={{
                                color: colors.white[500], 
                                fontSize: 18,
                                display: 'flex',
                                justifyContent: 'space-around',
                                width: '200px',
                                height: '50px',
                                backgroundColor: colors.azureBlaze[500],
                                borderRadius: '10px',
                            }}>
                            <img width='20' height="20" src={addIcon} />
                            New project
                        </Button>
                        <Button 
                            onClick={() => showUserBox ? setShowUserBox(false) : setShowUserBox(true)}
                            sx={{
                            position: 'relative',
                            maxWidth: '50px',
                            minWidth: '50px',
                            maxHeight: '50px',
                            minHeight: '50px',
                            borderRadius: '100%',
                            border: '1px solid #C3C8D4',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            marginLeft: '30px',
                        }}>
                            <img width='30' height="30" src={userIcon} />
                            <Box sx={{
                                position: 'absolute',
                                right: '0px',
                                top: '60px',
                                backgroundColor: colors.midnightStone[500],
                                width: '280px',
                                height: '120px',
                                borderRadius: '10px',
                                display: showUserBox ? 'flex' : 'none',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: '10px'
                            }}>
                                <Box sx={{
                                    width: 1,
                                    height: '80px',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}>
                                    <Box sx={{
                                        width: '50px',
                                        height: '50px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '1px solid #C3C8D4', 
                                        borderRadius: '100px',
                                        padding: '5px',
                                    }}>
                                        <img width='30' height="30" src={userIcon} />
                                    </Box>
                                    <Box sx={{marginLeft: '10px'}}>
                                        <Typography sx={{fontSize: 14}}>UserName</Typography>
                                        <Typography sx={{fontSize: 12}}>User email</Typography>
                                    </Box>
                                </Box>

                                
                                <Box sx={{
                                    width: 1,
                                    height: '80px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderTop: '2px solid #C3C8D4',
                                    marginTop: '10px'
                                }}>
                                    <Button 
                                        onClick={onClickLogout} 
                                        variant='contained' 
                                        sx={{
                                            height: '30px',
                                            fontSize: '14px'
                                        }}
                                    >
                                        LogOut
                                    </Button>
                                </Box>
                            </Box>
                        </Button>
                    </Box>
                </Box>
                
                <Box>
                    <p>isAuth: {`${isAuth}`}</p>
                    <Button variant='contained'><Link to='/'>To home</Link></Button>
                    <Button onClick={onClickLogout} variant='contained' color='error'>LogOut</Button>
                </Box>
            </Box>
        </Box>
    );
}

export default Projects;