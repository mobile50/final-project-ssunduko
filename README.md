# Final Project - Book Browser
This is  implementing a book browser and rater. It will allow users to
search for books included in the https://www.googleapis.com/books/v1/volumes
and view additional information as well as rate any book they select.


## Requirements
Must use redux
Must make at least one network call
Must have at least one stack navigator
Must have at least one tab navigator
Must be at least as large in scope as the previous projects

## Notes

This project is using redux for navigation
It makes a networking call to https://www.googleapis.com/books/v1/volumes
It uses both Stack and Tab Navigator
In addition this project is utilizing AsyncStorage to store book rating between application restarts. User is able
rate any book. If book is already rated rating will be updated to the new rating

## Additional Note
Application is still utilizing ListView as opposed to FlatList because FlatList does not support data source refresh