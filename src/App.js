import React, {Component} from 'react';
import './App.css';
import 'tachyons';
import {
    Switch,
    Route,
    Redirect,
    withRouter
} from "react-router-dom";
import SignIn from './Pages/SignIn/SignIn.js';
import Sidebar from "./Components/Sidebar/Sidebar";
import {store} from './Assets/Database/Store.js';
import AdminPanel from "./Pages/AdminPanel/AdminPanel";
import SeniorPanel from "./Pages/SeniorPanel/SeniorPanel";
import JuniorPanel from "./Pages/JuniorPanel/JuniorPanel";
import JuniorPayment from "./Components/JuniorPayment/JuniorPayment";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                designation: 'client',
                telecaller_id: '',
            }
        }
    }

    setUser = (username,password) => {
        const data = store.users.filter((item) => item.username===username && item.password===password);
        const user = {
            username: data[0].username,
            designation: data[0].designation,
            telecaller_id: data[0].telecaller_id
        }
        this.setState({user: user}, () => {
            this.props.history.push(`/${this.state.user.designation}`);
        })
    }

    signOut = () => {
        const user = {
            username: '',
            designation: 'client',
            telecaller_id: ''
        }
        this.setState({user: user}, () => {
            this.props.history.push('/');
        })
    }

    render() {
        console.log(this.state);
        const {designation} = this.state.user;
        return (
            <div className="App">
                <Switch>
                    <Route exact path="/"><h1>hello world</h1></Route>
                    <Route path={"/admin"}><Sidebar designation={designation} signOut={this.signOut}/><AdminPanel/></Route>
                    <Route path={"/senior"}><Sidebar designation={designation} signOut={this.signOut}/><SeniorPanel/></Route>
                    <Route path={"/junior"}><Sidebar designation={designation} signOut={this.signOut}/><JuniorPanel/></Route>
                    <Route path='/signin'>
                        <Sidebar designation={designation} />
                        <SignIn setUser={this.setUser}/>
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);