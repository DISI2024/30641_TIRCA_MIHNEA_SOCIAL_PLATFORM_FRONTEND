import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {Persistor, store} from "./redux/store";
import {PersistGate} from "redux-persist/integration/react";
import {RouterProvider} from "react-router-dom";
import pageRouter from "./routing/PageRouter";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={Persistor}>
                <RouterProvider router={pageRouter}/>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
