import React from 'react';
import {AppRegistry, FlatList, TouchableOpacity, Dimensions, StyleSheet, Text,
    TextInput, ListView, View, TouchableHighlight, Image } from 'react-native';
import { StackNavigator, TabNavigator } from "react-navigation";
import {Provider} from 'react-redux'
import {store} from "./redux/redux";

import BookListing from './components/BookListing'
import MyBooks from './components/MyBooks'

class App extends React.Component {

  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#fff'
    },
    headerTitleStyle: {
      color: '#212121'
    },

    title: 'Search'
  };

  getBooks(searchString){

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchString}`)
      .then(r => r.json())
      .then((r) => {
        this.setState({
            bookSource: this.state.bookSource.cloneWithRows(r.items),
        });
      })
      .catch(err => console.log('Error:', err));
  }

  renderBooks(book){
    const { navigate } = this.props.navigation;
    return(
          <TouchableHighlight onPress={()=> navigate('BookListing',{book})}>
            <View style={styles.row}>
              <View style={styles.bookInfo}>
                <Text style={styles.title}>
                    {book.volumeInfo.title}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
    )
  };

  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      bookSource: dataSource,
    };
    this.renderBooks = this.renderBooks.bind(this);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
        <Provider store={store}>
          <View style={styles.container}>
            <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                  placeholder="Search Books ..."
                  onChangeText={(text) => this.getBooks(text)}
                  value={this.state.text}
            />
            <ListView
              dataSource = {this.state.bookSource}
              renderRow = {this.renderBooks}
            />
          </View>
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'center',
      padding: 12,
      backgroundColor: '#666666',
      marginBottom: 3
    },

    bookInfo: {
      flex: 1,
      marginLeft:5
    },

    title: {
      color: '#ffffff',
      fontSize: 18
    },

    image: {
      width: 70,
      height: 70
    }
});


const HomeStack = StackNavigator({
  Search: { screen: App },
  BookListing: { screen: BookListing },
});

const MyStack = StackNavigator({
  MyBooks: { screen: MyBooks },
  BookListing: { screen: BookListing },
});

export default TabNavigator({
    Search: { screen: HomeStack },
    MyBooks: { screen: MyStack },
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

AppRegistry.registerComponent('App', () => App);