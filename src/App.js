import React, {Component} from 'react';
import './App.css';
import 'tachyons';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import SignIn from './Pages/SignIn/SignIn.js';
import Sidebar from "./Components/Sidebar/Sidebar";

class App extends Component {
    constructor() {
        super();
        this.state = {
            panel: false
        }
    }

    togglePanel = () => {
        this.setState({panel: !this.state.panel});
    }

    render() {
        return (
            <div className="App">
                <Sidebar/>
                <Switch>
                    <Route exact path="/"><h1>hello world</h1></Route>
                    <Route path='/signin'>
                        <SignIn/>
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default App;