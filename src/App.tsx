import React from "react";
import { Provider } from 'react-redux';
import "./assets/styles/global.css";

import Routes from "./routes";
import makeStore from './redux'

const store = makeStore();

function App() {
    return (
        <Provider store={store}>
            <Routes />
        </Provider>);
}

export default App;
