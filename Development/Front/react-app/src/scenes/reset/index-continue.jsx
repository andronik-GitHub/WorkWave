import { Box, TextField, Typography } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import closeEye from '../../img/password-close-icon.svg';
import openEye from '../../img/password-open-icon.svg';

import { fetchUpdate, selectIsAuth } from "../../redux/slices/auth";


const ResetContinue = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isValid
        }
    } = useForm({
        defaultValues: {
            password: '12345',
        },
        mode: 'all',
    });

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    
    const [isContinue, setContinue] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    

    const onSubmit = async (values) => {
        const data = await dispatch(fetchUpdate(values));
        
        if (!data.payload)
            return alert('Не вдалось відновити пароль');
    };

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
                minHeight: !isContinue ? '400px' : '480px',
                width: '400px',
                backgroundColor: colors.midnightStone[500],
                borderRadius: '10px',
                boxShadow: '0px 15px 25px 15px rgba(0, 0, 0, 0.25)',
            }}>
                <Typography variant="h4" align="center" sx={{ margin: '70px 0 50px 0'} }>Reset password</Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: "column",
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: '155px',
                    }}>
                        <Box sx={{
                                position: 'relative', 
                            }}
                        >
                            <TextField 
                                type={ showPassword ? "text" : "password" } 
                                placeholder="Password" 
                                error={Boolean(errors.password?.message)}
                                helperText={errors.password?.message}
                                {...register('password', { required: 'Вкажіть пароль'})}
                                style={{
                                    padding: '0px',
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
                                onClick={() => !showPassword ? setShowPassword(true): setShowPassword(false)} 
                                src={showPassword ? closeEye : openEye} 
                            />
                        </Box>

                        <Box sx={{
                                position: 'relative', 
                            }}
                        >
                            <TextField 
                                type={ showPassword ? "text" : "password" } 
                                placeholder="Confirm Password" 
                                error={Boolean(errors.password?.message)}
                                helperText={errors.password?.message}
                                {...register('confirmPassword', { required: 'Підтвердіть пароль'})}
                                style={{
                                    padding: '0px',
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
                                onClick={() => !showPassword ? setShowPassword(true): setShowPassword(false)} 
                                src={showPassword ? closeEye : openEye} 
                            />
                        </Box>
                    </Box>

                    <input 
                        onClick={() => !isContinue ? setContinue(true) : <Navigate to='/login' />}
                        type="submit" 
                        value="Continue"
                        style={{
                            margin: '45px 0 30px 0',
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
                </form>

                <Box>
                    <Typography style={{ fontSize: 12 }}>
                        Don't have an account?
                        <Link to='/registration' style={{ color: colors.azureBlaze[500]}}> Register</Link>
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

export default ResetContinue;