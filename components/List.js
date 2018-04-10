import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native'

class List extends Component {
   data = {
      news: [
         {
            id: 0,
            name: 'iPhone 8 et 8 Plus : la version rouge est arrivée',
            content : 'Quam ob rem id primum videamus, si placet, quatenus amor in amicitia progredi debeat.'  ,
         },
         {
            id: 1,
            name: 'Elon Musk dévoile le moule principal de la Big Falcon Rocket',
            content : 'Quam ob rem id primum videamus, si placet, quatenus amor in amicitia progredi debeat.'  ,
         },
         {
            id: 2,
            name: 'La Cour de justice de l’UE tranche : Uber pourra être régulé comme une entreprise de transports',
            content : 'Quam ob rem id primum videamus, si placet, quatenus amor in amicitia progredi debeat.'  ,
         },
         {
            id: 3,
            name: 'Vous pouvez désormais savoir si Cambridge Analytica a mis la main sur vos données',
            content : 'Quam ob rem id primum videamus, si placet, quatenus amor in amicitia progredi debeat.'  ,
         }
      ]
   }
   alertItemName = (item) => {
      alert(item.name) 
   }
   render() {
      return (
         <View> 
            {
                this.data.news.map((item, index) => (
                  <TouchableOpacity
                     key = {item.id}
                     style = {styles.container}
                     onPress = {() => this.alertItemName(item)}>
                     <Image
                        style={{width: 50, height: 50, marginRight: 18}}
                        source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                    />
                     <Text style = {styles.title}>
                        {item.name}
                     </Text>
                     <Text style = {styles.text}>
                        {item.content}
                     </Text>
                  </TouchableOpacity>
                ))
            }
         </View>
      )
   }
}
export default List

const styles = StyleSheet.create ({
   container: {
      padding: 10,
      marginTop: 3,
      backgroundColor: '#F5F5F5',
      alignItems: 'center',
   },
   title: {
      color: '#212121',
      fontSize: 20,
      fontWeight: 'bold',
      justifyContent: 'center',
    alignItems: 'center',
   },
   content:{
    color: '#4f603c',
    justifyContent: 'center',
    alignItems: 'center',
    }
})