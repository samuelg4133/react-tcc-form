import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Student from "./pages/Student";
import Teacher from "./pages/Teacher";
import Header from "./components/Header";

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Route path="*" component={Header}/>
            <Route exact path='/students' component={Student}/>
            <Route exact path="/teachers" component={Teacher}/>
            <Route exact path="/students/:id" component={Student}/>
        </BrowserRouter>
    );
};

export default RoutesApp;
