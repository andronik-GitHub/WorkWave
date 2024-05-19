import { Box, MenuItem, TextField, Typography, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import closeEye from '../../img/password-close-icon.svg';
import openEye from '../../img/password-open-icon.svg';

import axios from '../../axios';



const Registration = () => {
    
    const clickPassword = () => {
        if (!showPassword) {
            setShowPassword(true)
            return;
        }
        else {
            setShowPassword(false)
            return;
        }
    };
    
    const clickContinue = () => {
        if (!isContinue) {
            setContinue(true);
            return;
        }
    };

    const updateEmailValue = (e) => {
        setEmail(e.target.value)
    }
    const updatePasswordValue = (e) => {
        setPassword(e.target.value)
    }

    const [isContinue, setContinue] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    return (
        <Box sx={{
            position: 'absolute',
            height: 1,
            width: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: "column",
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: '20px',
                minHeight: isContinue ? '600px' : '500px',
                width: '400px',
                backgroundColor: colors.midnightStone[500],
                borderRadius: '10px',
                boxShadow: '0px 15px 25px 15px rgba(0,0,0,0.25)',
            }}>
                <Typography variant="h4" align="center" sx={{ margin: '70px 0 50px 0'} }>Registration</Typography>

                <Box sx={{
                    display: 'flex',
                    flexDirection: "column",
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: isContinue ? '135px' : '60px'
                }}>
                    <input 
                        onChange={e => updateEmailValue(e)}
                        type="email" 
                        placeholder="Email" 
                        style={{
                            padding: '15px',
                            border: '0',
                            backgroundColor: colors.nightfall[[500]],
                            fontSize: 18,
                            color: colors.white[500],
                            width: '350px',
                            height: '60px',
                            borderRadius: '10px',
                            fontFamily: 'Roboto Slab, sans-serif',
                            fontWeight: 'bold'
                        }} 
                    />
                    
                    <Box sx={{
                            position: 'relative', 
                            display: isContinue ? 'inline-block' : 'none'
                        }}
                    >
                        <input 
                            onChange={e => updatePasswordValue(e)}
                            type={ showPassword ? "text" : "password" } 
                            placeholder="Password" 
                            style={{
                                padding: '15px',
                                border: '0',
                                backgroundColor: colors.nightfall[[500]],
                                fontSize: 18,
                                color: colors.white[500],
                                width: '350px',
                                height: '60px',
                                borderRadius: '10px',
                                fontFamily: 'Roboto Slab, sans-serif',
                                fontWeight: 'bold'
                            }} 
                        />
                        <img 
                            style={{ position: 'absolute', right: 0, margin: '16px'}}
                            height='25' 
                            width='25' 
                            backgroundColor={colors.white[500]} 
                            onClick={clickPassword} 
                            src={showPassword ? closeEye : openEye} 
                        />
                    </Box>
                </Box>

                <input 
                    onClick={clickContinue}
                    type="button" 
                    value="Continue"
                    style={{
                        margin: '30px',
                        padding: '15px',
                        border: '0',
                        backgroundColor: colors.azureBlaze[[500]],
                        fontSize: 18,
                        color: colors.white[500],
                        width: '350px',
                        height: '60px',
                        borderRadius: '10px',
                        fontFamily: 'Roboto Slab, sans-serif',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                />

                <Box>
                    <Typography style={{ fontSize: 12, width: '210px', textAlign: 'center', marginBottom: '50px' }}>
                        By registration up you accept the 
                        <Link to='/' style={{ color: colors.azureBlaze[500]}}> Terms of service </Link> 
                        and 
                        <Link to='/' style={{ color: colors.azureBlaze[500]}}> Privacy policy</Link>
                        </Typography>
                    <Typography style={{ fontSize: 12 }}>
                        Already have an account?
                        <Link to='/login' style={{ color: colors.azureBlaze[500]}}> Log in</Link>
                        </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default Registration;