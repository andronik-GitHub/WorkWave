import { Box, TextField, Typography } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchReset, selectIsAuth } from "../../redux/slices/auth";


const Reset = () => {
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
            email: 'constellationoblivion@gmail.com',
        },
        mode: 'all',
    });

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    
    const [isContinue, setContinue] = useState(false);
    

    const onSubmit = async (values) => {
        const data = await dispatch(fetchReset(values));
        
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

                <form onSubmit={handleSubmit(onSubmit)} style={{ display: !isContinue ? 'inline-block' : 'none' }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: "column",
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: isContinue ? '135px' : '60px',
                    }}>
                        <TextField 
                            type="email" 
                            placeholder="Email" 
                            error={Boolean(errors.email?.message)}
                            helperText={errors.email?.message}
                            {...register('email', { required: 'Вкажіть пошту'})}
                            style={{
                                display: !isContinue ? 'flex' : 'none',
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

                <Typography sx={{
                    display: isContinue ? 'inline-block' : 'none',
                    width: '350px',
                    textAlign: 'center',
                    fontSize: 18,
                    margin: '20px 0 50px 0',
                }}>
                    Further instructions on how to reset your password have been sent to your email
                </Typography>

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

export default Reset;