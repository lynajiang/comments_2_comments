import './App.css';
import TypeComment from './comment.js';
import Comments from './update.js';
import StyledPaper from './update.js';
import message from './update.js';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Comments 2 Comments
          <Comments></Comments>
          <TypeComment></TypeComment>
        </p>
      </header>
    </div>
  );
}

export default App;

