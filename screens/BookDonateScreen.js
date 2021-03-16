import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class BookDonateScreen extends Component{
    constructor(){
        super()
        this.state = {
            requestedBooksList: []
        }
        this.requestRef = null
    }
}

getRequestBooksList = ()=>{
    this.requestRef = db.CollectionReference("requested_books")
    .onSnapshot((snapshot)=>{
        var requestBooksList = snapshot.docs.map(document => document.data());
        this.setState({
            requestBooksList: requestBooksList
        });
    })
}

componentDidMount(){
    this.getRequestedBookList()
}

componentWillUnmount(){
    this.requestRef();
}

keyExtractor = (item, index) => index.toString()

rederItem = ({item, i}) =>{
    return(
        <ListItem
        key={i}
        title={item.book_name}
        subtitle={item.reason_to_request}
        titleStyle={{ color: 'black', fontWeight: 'bold'}}
        rightElelment={
            <TouchableOpacity style={styles.button}></TouchableOpacity>
        }
    )
}