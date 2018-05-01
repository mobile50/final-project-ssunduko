import React from 'react';
import {
    AppRegistry, StyleSheet, Text, View, Button, TextInput, TouchableOpacity, TouchableHighlight, Image,
    AsyncStorage
} from 'react-native';
import StarRating from 'react-native-star-rating';

export default class BookListing extends React.Component {

    static navigationOptions = ({navigation}) => ({

        headerStyle: {
            backgroundColor: '#fff'
        },
        headerTitleStyle: {
            color: '#212121'
        },

    });

    componentWillMount(){
        this.getBooks()
    };

    componentDidMount(){
        this.getBooks();
    };

    getBooks(){
        AsyncStorage.getItem('books').then((value) => {
          if(value != undefined){
            this.setState({books : JSON.parse(value)});
          }
        });
    }

    constructor(props) {
        super(props);

        this.state = {
            book: this.props.navigation.state.params.book,
            title : '',
            starCount: 0,
            review: 'This is a sample review',
            books: []
        };
    };
    onStarRatingPress(rating) {
        this.setState({
          starCount: rating
        });
    };

    setReviewText = (text) => {
      this.setState({ review: text })
    };

    onSubmit(){

        let books = this.state.books;

        books.push({
          review: this.state.review,
          title:this.state.book.volumeInfo.title,
          starCount:this.state.starCount
        });

        AsyncStorage.setItem('books', JSON.stringify(books));

        this.props.navigation.navigate('MyBooks')
    }


  render(){
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
        <Image style={styles.image}
               source={{uri: this.state.book.volumeInfo.imageLinks.thumbnail}}
        />
        <View>
            <Text style={styles.title}>{this.state.book.volumeInfo.title}({this.state.book.volumeInfo.publishedDate})</Text>
        </View>
        <View>
            <Text style={styles.bookInfo}>Rating: {this.state.book.volumeInfo.averageRating}</Text>
            <Text style={styles.bookInfo}> Ratings Count: {this.state.book.volumeInfo.ratingsCount}</Text>
        </View>
        <StarRating
            disabled={false}
            maxStars={5}
            rating={this.state.starCount}
            selectedStar={(rating) => this.onStarRatingPress(rating)}>
        </StarRating>
        <TouchableHighlight
            style={styles.button}
            onPress={this.onSubmit.bind(this)}>
            <Text style={styles.text}>Add Review</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  title:{
    backgroundColor:'#666666',
    padding:5,
    marginBottom:5,
    color:'#ffffff'
  },
  bookInfo:{
    padding:5,
    marginTop:5,
    marginBottom:5,
    backgroundColor:'#333333',
    color:'#ffffff'
  },
  image:{
    width: 400,
    height: 250
  },
  button:{
    backgroundColor:'#066377',
    padding:10,
    margin:10
  },
  text:{
    color:'#ffffff',
    textAlign:'center'
  }

});