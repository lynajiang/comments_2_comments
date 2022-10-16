import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useEffect } from 'react';


const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 400,
    color: theme.palette.text.primary,
}));


const Comments = () => {
    const [data, setData] = useState(undefined)
    React.useEffect(()=>{
        message()
    }, [])
    
    const message = async () => {
        const FLASK_ENDPOINT = "http://127.0.0.1:5646/"
        const response = await fetch(FLASK_ENDPOINT, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        setData(data) 
    }
    
    return (
        <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
        <StyledPaper
        sx={{
            my: 1,
            mx: 'auto',
            p: 2,
        }}
        >
        <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
        <Avatar>W</Avatar>
        </Grid>
        <Grid item xs>
        <Typography>{data !== undefined && JSON.stringify(data)}</Typography>
        </Grid>
        </Grid>
        </StyledPaper>
        </Box>
        );
    }
    
    export default Comments;