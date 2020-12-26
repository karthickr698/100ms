import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import Home from '../Components/Home'
import Person from '../Components/Person'
import '../style.css'

class Routing extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/:name" exact component={Person} />
        <Route render={() => <h1 className="error">404 Not Fount</h1>} />
      </Switch>
    )
  }
}

export default Routing
