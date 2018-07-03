import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Platform, 
  TouchableOpacity
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem } from 'native-base';
import {Actions} from 'react-native-router-flux';
const window = Dimensions.get('window');
const uri = 'https://icon-icons.com/icons2/933/PNG/512/settings-cogwheel-button_icon-icons.com_72559.png';

import I18n from 'ex-react-native-i18n';

I18n.fallbacks = true
const deviceLocale = I18n.locale

I18n.translations = {
  'en': require("../../i18n/en"),
  'fr': require('../../i18n/fr'),
};

function onPressItem(item){
    //console.log("item du menu pressed is : "+item)
    onItemSelected(item)
}
export default function Menu({ onItemSelected }) { 
  return (
    <Container style={{backgroundColor:'#212121', paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}}>
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
            <Button transparent onPress={() =>  onItemSelected("Settings")}>
              <Icon name='ios-settings-outline' style={{color:'white'}}/>
            </Button>
           </Right>
        </Header>
        <Content  style={{backgroundColor:'#212121'}} >
            <List style={{backgroundColor:'#424242', marginTop:5}}>
                <ListItem iconLeft onPress={() =>  onItemSelected("DiverseRecommendation")}>
                    <Icon name="ios-home-outline" style={styles.iconItem} />
                    <Text style={styles.textItem} >{I18n.t('side_menu_recommendation')}</Text>
                </ListItem>
                <ListItem iconLeft onPress={() => onItemSelected("Favorite")}>
                    <Icon name="ios-star-outline" style={styles.iconItem} />
                    <Text style={styles.textItem}  >{I18n.t('side_menu_fav')}</Text>
                </ListItem>
                <ListItem iconLeft onPress={() => onItemSelected("History")}>
                    <Icon name="ios-stats-outline" style={styles.iconItem} />
                    <Text style={styles.textItem}  >{I18n.t('side_menu_history')}</Text>
                </ListItem>
                <ListItem iconLeft onPress={() => onItemSelected("Account")}>
                    <Icon name="ios-person-outline" style={styles.iconItem} />
                    <Text style={styles.textItem} > {I18n.t('side_menu_account')} </Text>
                </ListItem>
            </List>
           
        </Content>
        <Footer style={{ backgroundColor: '#212121'}} >
          <FooterTab>
            <Button full onPress={() => onItemSelected("SimpleConcept")}>
              <Text >{I18n.t('side_menu_concept')}</Text>
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