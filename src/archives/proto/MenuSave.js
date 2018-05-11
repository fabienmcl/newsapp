import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';
import { Header } from 'react-native-elements';
import { Icon, Footer } from 'native-base';
const window = Dimensions.get('window');
const uri = 'https://icon-icons.com/icons2/933/PNG/512/settings-cogwheel-button_icon-icons.com_72559.png';

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#212121',
    paddingLeft: 20,
  },
  container: {
    marginBottom: 20,
    marginTop: 20,
  },
  param: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  home: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
    color:'white'
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
    color:'#FAFAFA'
  },
});
function onPressItem(item){
    console.log("item du menu pressed is : "+item)
    //onItemSelected('Favoris')
}
export default function Menu({ onItemSelected }) {
  return (
    <View style={styles.menu}>
        <Header

            leftComponent={<Text style={{ color: 'white'}}> Renewal </Text>}
            centerComponent={<Icon name="md-cog" style={{ color: 'white'}}/>}
            outerContainerStyles={{ backgroundColor: '#212121', borderBottomWidth:0 }}
            />
     
      <Text
        onPress={() => onPressItem('recommandation d article')}
        style={styles.home}
        >
        Recommandation d'article
      </Text>
     <Text
        onPress={() => onItemSelected('Favoris')}
        style={styles.item}
      >
        Favoris
      </Text>
      <Text
        onPress={() => onItemSelected('Favoris')}
        style={styles.item}
      >
        Historique
      </Text>
      <Text
        onPress={() => onItemSelected('Favoris')}
        style={styles.item}
      >
        Mon compte
      </Text>
      <Text
        onPress={() => onItemSelected('Favoris')}
        style={styles.item}
      >
        le concept
      </Text> 
        <Footer>
            <Text> footer </Text>
        </Footer>
    </View>
  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};