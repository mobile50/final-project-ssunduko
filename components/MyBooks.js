import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableHighlight,
    Image,
    ListView,
    AsyncStorage
} from 'react-native';

export default class MyBooks extends React.Component {

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#fff'
        },
        headerTitleStyle: {
            color: '#212121'
        },
    };

    componentWillMount() {
        // this.getBooks()
    };

    componentDidMount() {
        this.getBooks();
    };

    componentWillUpdate() {
        this.getBooks();
    }

    getBooks() {
        AsyncStorage.getItem('books').then((value) => {
            if (value) {

                let books = JSON.parse(value);

                this.setState({
                    bookSource: this.state.bookSource.cloneWithRows(books)
                });
            } else {

                fetch(`https://www.googleapis.com/books/v1/volumes?q=Testing`)
                    .then(r => r.json())
                    .then((r) => {
                        this.setState({
                            bookSource: this.state.bookSource.cloneWithRows(r.items),
                        });
                    })
                    .catch(err => console.log('Error:', err));
            }
        });
    }

    renderBooks(book) {
        const {navigate} = this.props.navigation;
        return (
            <TouchableHighlight>
                <View style={styles.row}>
                    <View style={styles.bookInfo}>
                        <Text style={styles.title}>
                            {book.title}
                        </Text>
                        <Text style={styles.bookInfo}>Rating: {book.starCount}</Text>
                        <Text style={styles.bookInfo}>Review: {book.review}</Text>
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
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.bookSource}
                    renderRow={this.renderBooks}
                />
            </View>
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
        marginLeft: 5
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