import { Box, MenuItem, TextField, Typography, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import closeEye from '../../img/password-close-icon.svg';
import openEye from '../../img/password-open-icon.svg';

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegistration, selectIsAuth } from "../../redux/slices/auth";


const Registration = () => {
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
            email: '',
            password: '',
        },
        mode: 'all',
    });

    const [isContinue, setContinue] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const onSubmit = async (values) => {
        const data = await dispatch(fetchRegistration(values));
        
        if (!data.payload)
            return alert(`Не вдалось зареєструватись`);

        if ('toke' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        }
        else {
            return alert('Не вдалось зареєструватись');
        }
    };

    if (isAuth) return <Navigate to='/projects' />;

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
                boxShadow: '0px 15px 25px 15px rgba(0, 0, 0, 0.25)',
            }}>
                <Typography variant="h4" align="center" sx={{ margin: '70px 0 50px 0'} }>Registration</Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: "column",
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: isContinue ? '155px' : '60px'
                    }}>
                        <TextField 
                            type="email" 
                            placeholder="Email" 
                            error={Boolean(errors.email?.message)}
                            helperText={errors.email?.message}
                            {...register('email', { required: 'Вкажіть пошту'})}
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
                        
                        <Box sx={{
                                position: 'relative', 
                                display: isContinue ? 'inline-block' : 'none'
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
                                alt="Show password image"
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
                        onClick={() => !isContinue ? setContinue(true) : isContinue}
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