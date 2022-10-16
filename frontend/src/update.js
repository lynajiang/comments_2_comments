import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import { flexbox } from '@mui/system';
import { useState } from 'react';
import { useEffect } from 'react';


const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 400,
    color: theme.palette.text.primary,
}));

const relativeTime = (current, previous) => {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    } else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    } else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    } else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
    } else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
    } else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}

const Comments = () => {
  const [italic, setItalic] = React.useState(false);
  const [fontWeight, setFontWeight] = React.useState('normal');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [author, setAuthor] = React.useState("");
  const [comment, setComment] = React.useState("");
  const [data, setData] = useState([])
    React.useEffect(()=>{
        message()
    }, [])
    // when the dependency array (second arg of useEffect) change it's going to call message()



const message = async () => {
    const FLASK_ENDPOINT = "http://127.0.0.1:5646/"
    const response = await fetch(FLASK_ENDPOINT, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    console.log(data);
    setData(data);
}

  return (
    <>
    <div sx={{ border: 1, height: '60%' }}>
    {data && data.map(comment => (
        <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
        <StyledPaper
            sx={{
                my: 1,
                mx: 'auto',
                p: 2,
            }}
        >
        <Grid container wrap="nowrap" spacing={2}>
        <Grid item xs>
        <Typography align="left" sx={{fontWeight: 'bold'}} >
            {JSON.stringify(comment['author']).replace(/['"]+/g, '')}
        </Typography>
        <Typography align="left" sx={{fontWeight: 'light'}}>
        {relativeTime(new Date().getTime(), parseFloat(comment['time_posted']))}
        </Typography>
        <Typography align="left">
            {JSON.stringify(comment['comment_data']).replace(/['"]+/g, '')}
        </Typography>
        </Grid>
        </Grid>
        </StyledPaper>
        </Box>
    ))}
    </div>
    
    <Box sx={{ border: 1 }}>
    <FormControl>
      <FormLabel>Author</FormLabel>
      <Textarea
        value={author}
        onChange={(e)=>setAuthor(e.target.value)}
        placeholder="Your name..."
        minRows={3}
        endDecorator={
          <Box
            sx={{
              display: 'flex',
              gap: 'var(--Textarea-paddingBlock)',
              pt: 'var(--Textarea-paddingBlock)',
              borderTop: '1px solid',
              borderColor: 'divider',
              flex: 'auto',
            }}
          >
          </Box>
        }
        sx={{
          minWidth: 300,
          fontWeight,
          fontStyle: italic ? 'italic' : 'initial',
        }}
      />
    </FormControl>
    <FormControl>
      <FormLabel>Your comment</FormLabel>
      <Textarea
        value={comment}
        onChange={(e)=>setComment(e.target.value)}
        placeholder="Type something here…"
        minRows={3}
        endDecorator={
          <Box
            sx={{
              display: 'flex',
              gap: 'var(--Textarea-paddingBlock)',
              pt: 'var(--Textarea-paddingBlock)',
              borderTop: '1px solid',
              borderColor: 'divider',
              flex: 'auto',
            }}
          >
            <Button sx={{ ml: 'auto' }}
              onClick={async () => {
                const date = new Date();
                // const dateString = date.toISOString();
                const dateString = date.getTime().toString();
                const FLASK_ENDPOINT = "http://127.0.0.1:5646/"
                const response = fetch(FLASK_ENDPOINT, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },  
                  body: JSON.stringify({
                    'author': author,
                    'comment_data': comment,
                    'time_posted': dateString,
                    'num_likes': 5000,
                    'num_dislikes': 0,
                    'group_time': 10
                  })
                });
                
                setData([...data, {
                    'author': author,
                    'comment_data': comment,
                    'time_posted': dateString,
                    'num_likes': 5000,
                    'num_dislikes': 0,
                    'group_time': 10
                  }]);
                setAuthor("")
                setComment("")

              }}>Send</Button>
          </Box>
        }
        sx={{
          minWidth: 300,
          fontWeight,
          fontStyle: italic ? 'italic' : 'initial',
        }}
      />
    </FormControl>
    </Box>
    
    </>
  );
}

export { Comments };