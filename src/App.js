import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import BoardList from './BoardList';
import Write from './Write';


function App() {
  return (
    <div className="container">
      <h1>React Board</h1>
      <BoardList/>
      <Write/>
    </div>
  );
}

export default App;