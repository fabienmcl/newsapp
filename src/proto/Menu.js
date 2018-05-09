import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem } from 'native-base';
import {Actions} from 'react-native-router-flux';
const window = Dimensions.get('window');
const uri = 'https://icon-icons.com/icons2/933/PNG/512/settings-cogwheel-button_icon-icons.com_72559.png';


function onPressItem(item){
    //console.log("item du menu pressed is : "+item)
    onItemSelected('Favoris')
}
export default function Menu({ onItemSelected }) {
  return (
    <Container style={{backgroundColor:'#212121'}}>
        <Header style={styles.header}>
          <Left>
              {/*
            <Button transparent>
              <Icon name='menu' />
            </Button>
              */}
          </Left>
          <Body>
            <Title style={{color:'white'}}>Renewal</Title>
          </Body>
          <Right>
            <Button transparent onPress={()=>console.log("parametre")}>
              <Icon name='ios-settings-outline' style={{color:'white'}}/>
            </Button>
           </Right>
        </Header>
        <Content  style={{backgroundColor:'#212121'}} >
            <List style={{backgroundColor:'#424242', marginTop:5}}>
                <ListItem iconLeft onPress={() =>  onItemSelected('recommandation')}>
                    <Icon name="ios-trending-up-outline" style={styles.iconItem} />
                        <Text style={styles.textItem} >Recommandation d'article</Text>
                </ListItem>
                <ListItem iconLeft onPress={() => onItemSelected('favoris')}>
                    <Icon name="ios-star-outline" style={styles.iconItem} />
                    <Text style={styles.textItem}  >Favoris</Text>
                </ListItem>
                <ListItem iconLeft onPress={() => onItemSelected('historique')}>
                    <Icon name="ios-stats-outline" style={styles.iconItem} />
                    <Text style={styles.textItem}  >Historique</Text>
                </ListItem>
                <ListItem iconLeft onPress={() => onItemSelected('compte')}>
                    <Icon name="ios-person" style={styles.iconItem} />
                    <Text style={styles.textItem} >Mon compte</Text>
                </ListItem>
            </List>
           
        </Content>
        <Footer style={{ backgroundColor: '#212121'}} >
          <FooterTab>
            <Button full onPress={() => onItemSelected('concept')}>
              <Text >Le concept</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
    iconItem:{
        color: 'white', 
        marginRight:10
    },
    textItem:{
        color: 'white', 
    },
    header:{
        backgroundColor: '#212121',
        marginBottom:5
    },
    TouchableOpacityStyle:{
 
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
      },
     
      FloatingButtonStyle: {
     
        resizeMode: 'contain',
        width: 50,
        height: 50,
      }
});