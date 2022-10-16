import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Check from '@mui/icons-material/Check';
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
  const [italic, setItalic] = React.useState(false);
  const [fontWeight, setFontWeight] = React.useState('normal');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [text, setText] = React.useState("");
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
        setData(data) 
    }

  return (
      <>
    {
        data.map(comment => (
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
<Typography>{JSON.stringify(comment)}</Typography>
</Grid>
</Grid>
</StyledPaper>
</Box>
        ))
    }
    <FormControl>
      <FormLabel>Your comment</FormLabel>
      <Textarea
        value={text}
        onChange={(e)=>setText(e.target.value)}
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
            <IconButton
              variant="plain"
              color="neutral"
              onClick={(event) => setAnchorEl(event.currentTarget)}
            >
              <FormatBold />
              <KeyboardArrowDown fontSize="md" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              size="sm"
              placement="bottom-start"
              sx={{ '--List-decorator-size': '24px' }}
            >
              {['200', 'normal', 'bold'].map((weight) => (
                <MenuItem
                  key={weight}
                  selected={fontWeight === weight}
                  onClick={() => {
                    setFontWeight(weight);
                    setAnchorEl(null);
                  }}
                  sx={{ fontWeight: weight }}
                >
                  <ListItemDecorator>
                    {fontWeight === weight && <Check fontSize="sm" />}
                  </ListItemDecorator>
                  {weight === '200' ? 'lighter' : weight}
                </MenuItem>
              ))}
            </Menu>
            <IconButton
              variant={italic ? 'soft' : 'plain'}
              color={italic ? 'primary' : 'neutral'}
              aria-pressed={italic}
              onClick={() => setItalic((bool) => !bool)}
            >
              <FormatItalic />
            </IconButton>
            <Button sx={{ ml: 'auto' }}
              onClick={async () => {
                const date = new Date();
                const dateString = date.toISOString();
                console.log(dateString);
                const FLASK_ENDPOINT = "http://127.0.0.1:5646/"
                const response = fetch(FLASK_ENDPOINT, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },  
                  body: JSON.stringify({
                    'author': "sue",
                    'comment_data': text,
                    'time_posted': dateString,
                    'num_likes': 5000,
                    'num_dislikes': 0,
                    'group_time': 10
                  })
                });
                
                setData([...data, {
                    'author': "sue",
                    'comment_data': text,
                    'time_posted': dateString,
                    'num_likes': 5000,
                    'num_dislikes': 0,
                    'group_time': 10
                  }])
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
    </>
  );
}

export { Comments };