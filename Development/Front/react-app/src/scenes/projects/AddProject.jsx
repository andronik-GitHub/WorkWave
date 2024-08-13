import { useTheme } from "@emotion/react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { tokens } from "../../theme";
import { useForm } from "react-hook-form";
import { useState } from "react";


const AddProject = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isValid
        }
    } = useForm({
        defaultValues: {
            projectName: 'Temp Project Name - ' + Math.random(100000000, 999999999),
            projectDescription: '',
        },
        mode: 'all',
    });


    const onSubmit = async (values) => {
        alert(`${values.projectName} ${values.projectDescription ? "\n" + values.projectDescription : ""}`);
    };
    
    return (
        <Box
            onClick={props.toggleCreateProject}
            sx={{
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 1,
                height: 1,
                background: 'rgba(0, 0, 0, 0.35)',
                zIndex: '1000'
            }}
        >
            <Box 
                onClick={(e) => e.stopPropagation()}
                sx={{
                    height: '300px',
                    width: '450px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '10px',
                    backgroundColor: colors.midnightStone[500],
                    boxShadow: '0px 15px 25px 15px rgba(0, 0, 0, 0.25)',
                }}
            >
                <form 
                    onSubmit={handleSubmit(onSubmit)}
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                    }}
                >
                    <Typography variant="h4" mb={1.5}>Project creation</Typography>
                    <TextField 
                        type="projectName" 
                        placeholder="Project name"
                        {...register('projectName')}
                    />
                    <TextField 
                        type="projectDescription" 
                        placeholder="Project description"
                        {...register('projectDescription')}
                    />

                    <Button 
                        type="submit"
                        sx={{
                            color: colors.white[500], 
                            fontSize: 18,
                            display: 'flex',
                            justifyContent: 'space-around',
                            width: '200px',
                            height: '50px',
                            backgroundColor: colors.azureBlaze[500],
                            borderRadius: '10px',
                            textTransform: 'none',
                        }}>
                        Add project
                    </Button>
                </form>
            </Box>
        </Box>
    );
}

export default AddProject;