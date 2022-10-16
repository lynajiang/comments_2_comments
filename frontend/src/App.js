import './App.css';
import { Comments } from './update.js';
import StyledPaper from './update.js';
import message from './update.js';
import Typography from '@mui/material/Typography';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <Typography>COMMENTS 2 COMMENTS</Typography>
          <Comments></Comments>
        </p>
      </header>
    </div>
  );
}

export default App;

