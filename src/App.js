import React, {Component} from 'react';

import AOS from 'aos';//AOS import for animation
import 'aos/dist/aos.css';

// redux
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions.js';

// reselect
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "./redux/user/user.selectors";

// css
import './App.css';
import 'tachyons';

// router
import {
    Switch,
    Route,
    Redirect,
    withRouter
} from "react-router-dom";

// components
import SignIn from './Pages/SignIn/SignIn.js';
import Sidebar from "./Components/Sidebar/Sidebar";
import {store} from './Assets/Database/Store.js';
import AdminPanel from "./Pages/AdminPanel/AdminPanel";
import SeniorPanel from "./Pages/SeniorPanel/SeniorPanel";
import JuniorPanel from "./Pages/JuniorPanel/JuniorPanel";
import HomePanel from "./Pages/HomePanel/HomePanel";
import BasicCourseForm from "./Components/BasicCourseForm/BasicCourseForm";
import ProCourseForm from "./Components/ProCourseForm/ProCourseForm";

class App extends Component {

    componentDidMount() {
        const {currentUser} = this.props;
        const {designation} = currentUser;
        if (currentUser.designation !== 'client') {
            this.props.history.push(`/${designation}/profile`);
        }
    }

    setUser = (username, password) => {

        const {setCurrentUser} = this.props;

        fetch('https://aqueous-mesa-28052.herokuapp.com/signin', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                username: username,
                password: password
                })
             })
        .then(response => response.json())
        .then(resp => {
            if(resp[0].telecaller_id)
            {
                const user = {
                    username: resp[0].telecaller_name,
                    designation: resp[0].designation,
                    telecaller_id: resp[0].telecaller_id
                }
                setCurrentUser(user)
                this.props.history.push(`/${resp[0].designation}/profile`);
            }
            else if(resp==='Wrong Credentails')
            {
                alert(resp);
            }
        })
        .catch(err => console.log(err))
    }

    signOut = () => {
        const {setCurrentUser} = this.props;
        const user = {
            username: '',
            designation: 'client',
            telecaller_id: ''
        }
        setCurrentUser(user);
        this.props.history.push('/');
    }

    render() {
        AOS.init();
        return (
            <div className="App">
                <Switch>
                    <Route exact path="/"><HomePanel/></Route>
                    <Route path="/basicform"><BasicCourseForm/></Route>
                    <Route path="/proform"><ProCourseForm/></Route>
                    <Route path={"/admin"}><Sidebar signOut={this.signOut}/><AdminPanel/></Route>
                    <Route path={"/senior"}><Sidebar signOut={this.signOut}/><SeniorPanel/></Route>
                    <Route path={"/junior"}><Sidebar signOut={this.signOut}/><JuniorPanel/></Route>
                    <Route path='/signin'>
                        <Sidebar signOut={this.signOut}/>
                        <SignIn setUser={this.setUser}/>
                    </Route>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));