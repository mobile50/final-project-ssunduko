import React from 'react';
import {connect} from 'react-redux';
import {StackNavigator, TabNavigator, addNavigationHelpers} from "react-navigation";

import {addListener} from "./all-redux";

import MyBooks from "./components/MyBooks";
import BookListing from "./components/BookListing";
import App from "./components/MainView";

const HomeStack = StackNavigator({
    Search: {screen: App},
    BookListing: {screen: BookListing},
});

const MyStack = StackNavigator({
    MyBooks: {screen: MyBooks},
    BookListing: {screen: BookListing},
});

export const AppNavigator = TabNavigator({
        Search: {screen: HomeStack},
        MyBooks: {screen: MyStack},
    }, {
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        tabBarOptions: {
            activeTintColor: '#f2f2f2',
            activeBackgroundColor: '#2EC4B6',
            inactiveTintColor: '#666',
            labelStyle: {
                fontSize: 22,
                padding: 12
            }
        }
    }
);


class AppWithNavigationState extends React.Component {
    render() {
        console.log("test AppWithNavigationState render");

        const {dispatch, nav} = this.props;
        const navigation = addNavigationHelpers({
            dispatch,
            state: nav,
            addListener,
        });

        return (
            <AppNavigator
                navigation={navigation}
            />
        );
    }
}

const mapStateToProps = state => ({
    nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);