import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom"
import { history } from './helpers/history';
import TaskPage from "./components/TaskPage";
import Login from "./components/User/login";
import ErrorBoundary from "./components/Error";




function App() {
  console.log("REACT_MODE ", process.env.REACT_APP_MODE)
  return (
    <ErrorBoundary>
      <Router history={history} basename="">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/taskpage" component={TaskPage} />
        </Switch>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
