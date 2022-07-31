import './App.css';
import Header from './components/Header' // imp shortcut from es7
import NotesListPage from './pages/NotesListPage'
import NotePage from './pages/NotePage'
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
// import your route components too

function App() {
  // You have container and container dark to change styling.
  return (
    <Router>
      <div className="container dark">
        <div className="app">
          <Header />
          <Routes>
          <Route path="/" exact element = {<NotesListPage />}></Route>
          <Route path="/note/:id" element = {<NotePage />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
