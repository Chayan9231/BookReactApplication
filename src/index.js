import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MyForm from './MyForm';
import AllBookDetails from './AllBookDetails';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import Notfound from './notFound';
import './index.css';

const routing = (
  <Router>
    <div>
    <ul>
        <li>
          <Link activeclassname="active" to="/">Home</Link>
        </li>
        <li>
          <Link activeclassname="active" to="/books">Available Books</Link>
        </li>
        <li>
          <Link activeclassname="active" to="/addBook">Add Book Information</Link>
        </li>
      </ul>
      <Switch>
      <Route exact path="/" component={App} />
      <Route path="/books" component={AllBookDetails} />
      <Route path="/addBook" component={MyForm} />
      <Route component={Notfound} />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));


serviceWorker.unregister();
