import React, { Component } from "react";
import { FlatList, Text, Image } from "react-native";
import { Card } from "react-native-elements";

const data = [
  {
    id : '1',
    imageSource: '../images/facebook.png',
    title: "something"
  },
  {
    id : '2',
    imageSource: '../images/facebook.png',
    title: "something"
  },
  {
    id : '3',
    imageSource: '../images/facebook.png',
    title: "something"
  },
  {
    id : '4',
    imageSource: '../images/facebook.png',
    title: "something"
  },
  {
    id : '5',
    imageSource: '../images/facebook.png',
    title: "something"
  },
  {
    id : '6',
    imageSource: '../images/facebook.png',
    title: "something"
  },
];

export default class HorizontalFlatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data
    };
  }

  render() {
    return (
      <FlatList
        horizontal
        data={this.state.data}
        renderItem={({ item: rowData }) => {
          return (
            <Card
              title={null}
              //image={{ require: rowData.imageSource }}
              containerStyle={{ padding: 0, width: 60, height:60 }}
            >  
                source={require('../images/linkedin.png')} />
            </Card>
          );
        }}
        keyExtractor={(item, index) => index}
      />
    );
  }
}