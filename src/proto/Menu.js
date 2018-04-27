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

const window = Dimensions.get('window');
const uri = 'https://icon-icons.com/icons2/933/PNG/512/settings-cogwheel-button_icon-icons.com_72559.png';

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'white',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
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
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
});
function onPressItem(item){
    console.log("item du menu pressed is : "+item)
    //onItemSelected('Favoris')
}
export default function Menu({ onItemSelected }) {
  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <View style={styles.avatarContainer}>
        {/*<Text style={styles.name}>Recommandation d'article </Text> */}
        <Image
          style={styles.avatar}
          source={{ uri }}
        />
      </View>
      <Text
        onPress={() => onPressItem('recommandation d article')}
        style={styles.item}
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
    </ScrollView>
  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};