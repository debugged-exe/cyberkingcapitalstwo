import React,{Component} from 'react';
import './App.css';
import 'tachyons';
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import SignIn from './Pages/SignIn/SignIn.js';
import Header from './Components/Header/Header';
class App extends Component{
    constructor()
    {
        super();
        this.state = {

        }
    }

    render(){
        return (
            <div className="App">
                <Header/>
                <Switch>
                    <Route exact path = "/"><h1>hello world</h1></Route>
                    <Route path = '/signin'>
                        <SignIn />
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default App;