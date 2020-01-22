import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Search from "./Search";
import * as serviceWorker from "./serviceWorker";
//import Post from "./Post";
import Application from "./Application";

ReactDOM.render(<Search />, document.getElementById("root"));
//ReactDOM.render(<DividerExampleVerticalForm />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
