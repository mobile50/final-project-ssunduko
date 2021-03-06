import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux'
import {configureStore, persistor} from "./redux/app-redux";

import AppWithNavigationState from './AppNavigator';

const store = configureStore();

class App extends React.Component {
    render() {
        console.log("test App render");

        return (
            <Provider store={store}>
                <AppWithNavigationState/>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('App', () => App);
export default App;