import React, { Component } from 'react';
 
import { StyleSheet, Platform, View, ActivityIndicator, FlatList, Text, Image, Alert, YellowBox } from 'react-native';
 
export default class Project extends Component {
 
 constructor(props) {
 
   super(props);
 
   this.state = {
 
     isLoading: true
 
   }
 
   YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
  ]);
 
 }
 
GetItem (flower_name) {
  
 Alert.alert(flower_name);
 
 }
 
 FlatListItemSeparator = () => {
   return (
     <View
       style={{
         height: .5,
         width: "100%",
         backgroundColor: "#000",
       }}
     />
   );
 }
 
 webCall=()=>{
 
  return fetch('https://reactnativecode.000webhostapp.com/FlowersList.php')
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             isLoading: false,
             dataSource: responseJson
           }, function() {
             // In this block you can do something with new state.
           });
         })
         .catch((error) => {
           console.error(error);
         });
 
 }
 
 componentDidMount(){
 
  this.webCall();
 
 }
 
 render() {
 
   if (this.state.isLoading) {
     return (
 
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
 
         <ActivityIndicator size="large" />
 
       </View>
       
     );
 
   }
 
   return (
 
     <View style={styles.MainContainer}>
 
       <FlatList
       
        data={ this.state.dataSource }
        
        ItemSeparatorComponent = {this.FlatListItemSeparator}
 
        renderItem={({item}) => 
        
            <View style={{flex:1, flexDirection: 'row'}}>
    
              <Image source = {{ uri: item.flower_image_url }} style={styles.imageView} />
            
              <Text onPress={this.GetItem.bind(this, item.flower_name)} style={styles.textView} >{item.flower_name}</Text>
 
            </View>
        
          }
 
        keyExtractor={(item, index) => index.toString()}
        
        />
 
     </View>
   );
 }
}
 
const styles = StyleSheet.create({
 
MainContainer :{
 
    justifyContent: 'center',
    flex:1,
    margin: 5,
    marginTop: (Platform.OS === 'ios') ? 20 : 0,
 
},
 
imageView: {
 
    width: '50%',
    height: 100 ,
    margin: 7,
    borderRadius : 7
 
},
 
textView: {
 
    width:'50%', 
    textAlignVertical:'center',
    padding:10,
    color: '#000'
 
}
 
});