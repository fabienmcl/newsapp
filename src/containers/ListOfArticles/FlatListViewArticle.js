import Expo, { SQLite } from 'expo';
import React, { Component } from 'react';
import { 
  StyleSheet, 
  Platform, 
  View, 
  ActivityIndicator, 
  FlatList, 
  Image,
  Alert, 
  YellowBox, 
  TouchableOpacity, 
  Dimensions,
  StatusBar
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem } from 'native-base';
import SideMenu from 'react-native-side-menu';
import Menu from '../SideMenu/Menu';
const screen = Dimensions.get('window');
const db = SQLite.openDatabase('db.db');
const demoDataNews = [
  {
    title: 'À lui seul, l’iPhone X a compté pour 35 % des bénéfices de l’industrie au Q4 2017',
    rating: 'mer 11:51:16',
    image: 'https://www.numerama.com/content/uploads/2017/11/iphone-x-une-2.jpg',
    plot: "Ciblé pour son prix exorbitant, révoltant pour certains, l'iPhone X fait le bonheur des comptes d'Apple.L’iPhone X a une encoche. L’iPhone X est sorti trop tôt. L’iPhone X est cher. Mais l’iPhone X rapporte beaucoup, beaucoup d’argent, suggérant une marge à nulle autre pareille pour Apple. Les chiffres du cabinet d’analyse Counterpoint, partagés par CNBC, mettent en avant la mainmise du flagship ultra premium sur un marché global très stable : durant le quatrième trimestre de l’année 2017, l’iPhone X a pesé pour 35 % des bénéfices à lui tout seul, malgré des ventes supposément inférieures aux attentes de la firme de Cupertino. C’est dire. ",
    url:'https://www.numerama.com/tech/346171-a-lui-seul-liphone-x-a-compte-pour-35-des-benefices-de-lindustrie-au-q4-2017.html',
    isSaved:false,
    isRejected : false
  },
  {
    title: 'Snapchat permet désormais de créer ses propres filtres pour les visages',
    rating: 'mer 11:51:16',
    image: 'https://www.numerama.com/content/uploads/2017/05/snapchat.jpg',
    plot: "Snapchat permet à ses utilisateurs américains de créer des filtres pour les visages. Ils sont cependant payants, et non permanents, car associés à une localisation et une heure précises.",
    url:'https://www.numerama.com/tech/328280-snapchat-permet-desormais-de-creer-ses-propres-filtres-pour-les-visages.html',
    isSaved:false,
    isRejected : false
  },
  {
    title: 'Microsoft dévoile un nouvel OS basé sur Linux',
    rating: '18/04/18 à 09h42 ',
    image: 'https://dyw7ncnq1en5l.cloudfront.net/optim/news/73/73481/microsoft-loves-linux-1-750x422.jpg',
    plot: "À Redmond, on a dû beaucoup en rire avant de monter sur scène pour annoncer un système d'exploitation maison basé sur Linux. Le moment quasi historique a eu lieu lors du grand colloque RSA (16-20 avril, San Francisco), spécialement dédié à la sécurité de l'information. Les équipes de Microsoft en ont profité pour présenter une solution complète pour objets connectés et c'est justement là qu'intervient la mise en place d'un OS surprise. Azure Sphere OS, c'est son nom, pourra ainsi équiper tout ce que l'on peut imaginer en solutions connectées pour les entreprises soucieuses de leur sécurité.Le système fait ainsi partie de l'ensemble Azure Sphere, sorte de cercle vertueux réunissant microcontrôleur et système d'exploitation sous l'égide d'une sécurité \"cloud\" chère à Microsoft. C'est donc sur la partie système qu'intervient ce Linux aménagé. Pour le géant américain, il s'agit d'une première en 43 ans, ajoutant faire face à une étape importante pour l'entreprise. Néanmoins, Microsoft s'est déjà rapproché du système créé par Linus Torvalds en accueillant Ubuntu sur le Windows Store ou avec l'intégration de l'interpréteur Bash au sein de Windows 10. ",
    url: 'https://www.lesnumeriques.com/appli-logiciel/microsoft-devoile-nouvel-os-base-sur-linux-n73481.html',
    isSaved:false,
    isRejected : false  
 
  },
  {
    title: 'WhatsApp est désormais (officiellement) interdit aux moins de 16 ans dans l’UE',
    rating: 'mer 11:48:16',
    image: 'https://www.numerama.com/content/uploads/2018/04/whatsapp.jpg',
    plot: "Pour se conformer au RGPD qui entre en application le 25 mai 2018 dans l'Union européenne, la messagerie de Facebook relève l'âge minimum d'utilisation de 13 à 16 ans. Mais dans les faits, cette décision semble peu applicable.",
    url: 'https://www.numerama.com/tech/350206-whatsapp-est-desormais-officiellement-interdit-aux-moins-de-16-ans-dans-lue.html',
    isSaved:false,
    isRejected : false
  },
  {
    title: 'YouTube Kids : les parents peuvent n’autoriser que des vidéos validées par des humains',
    rating: 'hier a 18:27',
    image: 'https://www.numerama.com/content/uploads/2016/05/youtube-1920.jpg',
    plot: 'Critiqué pour le fonctionnement de ses algorithmes, YouTube Kids offre désormais la possibilité aux parents de filtrer davantage les contenus. Ils peuvent autoriser la visibilité des de vidéos uniquement validées par des modérateurs humains.',
    url: 'https://www.numerama.com/tech/350639-youtube-kids-les-parents-peuvent-nautoriser-que-des-videos-validees-par-des-humains.html',
    isSaved:false,
    isRejected : false
  },
  {
    title: 'Quand Google Maps se met à utiliser les fast-foods dans la navigation',
    rating: 'hier 10:06:16',
    image: 'https://dyw7ncnq1en5l.cloudfront.net/optim/news/73/73489/5ad6edf02e75a__300_170.jpg',
    plot: "Comme l'attestent plusieurs utilisateurs américains de Google Maps, le service de navigation teste actuellement une nouvelle manière de dicter le guidage qui s'avère être beaucoup plus proche de celle des humains. Ainsi, au lieu d'entendre le sempiternel \"dans 100 mètres, tournez à droite\", Google Maps a commencé à dicter à certains utilisateurs américains intégrés à un échantillon de test des directions telles que : \"Tournez à droite après le Burger King\" ; \"À droite après le White Castle\" ; \"Prenez à droite après le KFC\".Si l'on met de côté la surreprésentation des enseignes de restauration rapide — nous sommes aux États-Unis —, il faut avouer que cette manière de présenter la route à suivre est bien plus claire. Les \"Prendre à gauche au troisième feu\" et autres \"Sortez du rond-point par la quatrième sortie\" pouvant parfois donner lieu à des hésitations."
    ,url: 'https://www.lesnumeriques.com/vie-du-net/quand-google-maps-se-met-a-utiliser-fast-foods-dans-navigation-n73489.html',
    isSaved:false,
    isRejected : false
  },
  {
    title: 'Snappables : Snapchat veut que vous grimaciez pour jouer',
    rating: 'mer 11:51:16',
    image: 'https://www.numerama.com/content/uploads/2018/04/snappables-hero-shot.jpg',
    plot: "Snapchat vient de lancer Snappables, une nouvelle option qui permet de contrôler des jeux en réalité augmentée par les expressions du visage. Ces nouvelles Lenses seront déployées cette semaine sur Android et iOS.",
    url:'https://www.numerama.com/tech/350662-snappables-snapchat-veut-que-vous-grimaciez-pour-jouer.html',
    isSaved:false,
    isRejected : false
  },
  {
    title: 'Grève à la RATP : le trafic sera légèrement perturbé jeudi',
    rating: '18/04/18 à 09h42 ',
    image: 'http://s1.lprs1.fr/images/2018/04/18/7670484_e1b8f7dc-42e1-11e8-9275-09e60a2c58a8-1_1000x625.jpg',
    plot:"Ce n’est pas un appel à la grève, « mais plutôt une possibilité offerte aux salariés qui le souhaitent d’aller manifester », explique-t-on à l’Unsa RATP.Les trois organisations syndicales de la RATP (CGT, Sud et Unsa) ont déposé un préavis de grève pour cette nouvelle journée de mobilisation de jeudi. Etudiants, personnels hospitaliers ou encore cheminots ont prévu de manifester pour « stopper la régression sociale ».En conséquence, le trafic sera légèrement perturbé sur les RER et bus, et normal sur le reste du réseau RATP.",
    url: 'http://www.leparisien.fr/info-paris-ile-de-france-oise/transports/preavis-de-greve-a-la-ratp-trafic-legerement-perturbe-ce-jeudi-18-04-2018-7670484.php',
    isSaved:false,
    isRejected : false
  
  },
   {
    title: 'Le code d’un téléphone peut être exigé en garde à vue',
    rating: ' 18/04/2018 à 11:30 ',
    image: 'https://img.igen.fr/2018/4/macgpic-1524040054-72614127157932-sc-jpt.jpg',
    plot:"Une décision du Conseil constitutionnel délivrée le 30 mars dernier et signalée cette semaine par le quotidien Le Monde permet aux forces de l’ordre d’exiger le code de déverrouillage d’un téléphone, d’une tablette ou d’un ordinateur à tout suspect en garde à vue. Un refus d’obtempérer est alors passible de poursuites qui peuvent aboutir à une peine de trois ans d’emprisonnement et d’une amende de 270 000 €. ",
    url: 'https://www.igen.fr/ailleurs/2018/04/le-code-dun-telephone-peut-etre-exige-en-garde-vue-103705',
    isSaved:false,
    isRejected : false
  },
  {
    title: 'Fortnite : une fac américaine offre une bourse aux joueurs talentueux',
    rating: ' 18/04/2018 à 11:30 ',
    image: 'https://www.numerama.com/content/uploads/2018/04/fortnite2fbattle-royale2ffortnite-sniper-1920x1080-f072fcef414cbe680e369a16a8d059d8a01c7636.jpg',
    plot:"Le succès de Fortnite ne tarit pas. Le jeu s'offre une place dans le programme esport de l'université américaine de l'Ohio qui, pour marquer le coup, a décidé d'offrir une bourse aux joueurs assez talentueux pour rejoindre leur programme. ",
    url: 'https://www.numerama.com/tech/349224-fortnite-une-fac-americaine-offre-une-bourse-aux-joueurs-talentueux.html',
    isSaved:false,
    isRejected : false
  },
];
export default class Project extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { 
      isLoading: true, 
      isOpen: false, 
      selectedItem: 'recommandation', 
      items: null, 
      newscastSaved : null,
      newscasts : null,
    }
    YellowBox.ignoreWarnings(['Warning: componentWillMount is deprecated','Warning: componentWillReceiveProps is deprecated',]);
  }
 
  SaveItem( { item, index } ){
    console.log(item.title);
    //https://stackoverflow.com/questions/46994262/how-to-update-a-single-item-in-flatlist-in-react-native
    const posts = this.state.dataSource;
    const targetPost = posts[index];

    // Flip the 'clicled' property of the targetPost
    targetPost.isSaved = !targetPost.isSaved;

    // Then update targetPost in 'posts'
    // You probably don't need the following line.
    posts[index] = targetPost;

    // Then reset the 'state.posts' property
    this.setState({ posts });
    if(targetPost.isSaved == true){
      this.add(targetPost);
    }else{
      this.remove(targetPost)
    }
  }
  RejectItem( { item, index } ){
    console.log(item.title);
    //https://stackoverflow.com/questions/46994262/how-to-update-a-single-item-in-flatlist-in-react-native
    const posts = this.state.dataSource;
    const targetPost = posts[index];

    // Flip the 'clicled' property of the targetPost
    targetPost.isRejected = !targetPost.isRejected;

    // Then update targetPost in 'posts'
    // You probably don't need the following line.
    posts[index] = targetPost;
    console.log(posts[index])
    // Then reset the 'state.posts' property
    this.setState({ posts });
  }
  
  GetItem (item) {
    //Alert.alert(item.title);
    console.log(item.title);
    Actions.webviewcustom(item);
    //Actions.webviewcustomProto(item);
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
    return 
      fetch('https://reactnativecode.000webhostapp.com/FlowersList.php')
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
  loadDataLocal=()=>{
    this.setState({
      isLoading : false,
      dataSource : demoDataNews,
    })
  }
  /*
  title: 'Snappables : Snapchat veut que vous grimaciez pour jouer',
    rating: 'mer 11:51:16',
    image: 'https://www.numerama.com/content/uploads/2018/04/snappables-hero-shot.jpg',
    large: 'https://www.numerama.com/content/uploads/2018/04/snappables-hero-shot.jpg',
    plot: "Snapchat vient de lancer Snappables, une nouvelle option qui permet de contrôler des jeux en réalité augmentée par les expressions du visage. Ces nouvelles Lenses seront déployées cette semaine sur Android et iOS.",
    url:
  */
  componentDidMount(){
    //this.webCall();
    this.loadDataLocal();
    db.transaction(tx => {
      tx.executeSql(
        'DROP TABLE newscastSaved;'
      );
      tx.executeSql(
        'DROP TABLE newscasts;'
      );
      tx.executeSql('create table if not exists newscastSaved (id integer primary key not null, done int, title text,image text,url text);');
      tx.executeSql(
        "create table if not exists newscasts ( id integer primary key not null, title text not null,image text not null,url text not null,isSaved integer default 0, isRejected integer default 0 );"
      );
      this.insertDataInNewscasts();
    });
    
  }
  insertDataInNewscasts(){
    const posts = this.state.dataSource;
    for(item in posts){
      //console.log(item)
      this.insertRow(posts[item])
    }
    db.transaction(tx => {
      tx.executeSql('select * from newscasts', [], (_, { rows }) =>
        console.log(JSON.stringify(rows))
      );
    });
    db.transaction(tx => {
      tx.executeSql('select * from newscastSaved', [], (_, { rows }) =>
        console.log(JSON.stringify(rows))
      );
    });
    
  }
  insertRow(post){
    //console.log(post["title"])
    db.transaction(tx => {
      tx.executeSql('insert into newscasts (title, image, url, isSaved, isRejected) values (?, ?, ?,0,0)', [post["title"], post["image"], post["url"]]);
    });
  }
  add(article) {
    db.transaction(
      tx => {
        tx.executeSql('insert into newscastSaved (done, title, image, url ) values (0, ?, ?, ?)', [article.title, article.image, article.url]);
        tx.executeSql('select * from newscastSaved', [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      //null,
      //this.update
    );
    this.update()
  }
  remove(article) {
    db.transaction(
      tx => {
        tx.executeSql('delete from newscastSaved  where title = ?', [article.title]);
        tx.executeSql('select * from newscastSaved', [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      //null,
      //this.update
    );
    this.update()
  }
  update() {
    console.log("update flatlistview")
    //console.log(this.state.items)
    //update le symbole > clicked for de merde
    /*db.transaction(tx => {
      tx.executeSql(
        `select * from items where done = ?;`,
        [this.props.done ? 1 : 0],
        (_, { rows: { _array } }) => this.setState({ items: _array })
      );
    });*/
  }

  _sideMenuPress(){
    console.log("le menu le menu le menu");
    this.toggle();
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
    if(this.state.selectedItem != 'recommandation'){
      console.log("chargement de la page "+this.state.selectedItem)
      switch(this.state.selectedItem){
        case 'favoris' : Actions.favoris() 
          break;
        case 'historique' : Actions.historique()
          break;
        case 'compte' : Actions.monCompte()
          break;
        case 'concept' : Actions.concept()
          break;
      }
      this.setState({
        selectedItem: 'recommandation',
      });
    }
    
  }

  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item,
  });
  _onPressItem = (id) => {
    // updater functions are preferred for transactional updates
    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return {selected};
    });
    console.log("_onPressItem")
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
    return (
      
      
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
      
      >
      
      <View style={styles.MainContainer}>
      {/*<Header
        leftComponent={{ icon: 'menu', color: '#fff', onPress:()=>this._sideMenuPress()}}
        centerComponent={{ text: 'Renewal', style: { color: '#fff' } }} 
        outerContainerStyles={{ backgroundColor: '#212121' }}
      />*/}
      
      <Header style={{backgroundColor: '#212121'}}>
        <StatusBar barStyle="light-content"/>
          <Left>
              
            <Button transparent>
              <Icon name='menu' style={{ color: '#fff'}}   onPress={()=>this._sideMenuPress()} />
            </Button>
              
          </Left>
          <Body>
            <Title style={{color:'white'}}>Renewal</Title>
          </Body>
          <Right>
            {/*
            <Button transparent>
              <Icon name='ios-settings-outline' style={{color:'white'}}/>
            </Button> */}
           </Right>
        </Header>
        <FlatList
          data={ this.state.dataSource }
          extraData={this.state}
          ItemSeparatorComponent = {this.FlatListItemSeparator}
          renderItem={({item, index}) => 
            
            <View  onPressItem={this._onPressItem}  >
              <View style={{flex:1, backgroundColor: item.isRejected ? "#484848" : "#fff" }}>
                <TouchableOpacity onPress={item.isRejected? console.log("item isRejected") : this.GetItem.bind(this, item)} >
                  <Image source = {{ uri: item.image }} 
                    style={{
                      height: screen.height / 5,
                      opacity: item.isRejected ? 0.3:1,
                      margin: 7,
                      borderRadius : 7,
                      justifyContent: 'center', 
                      alignItems: 'center',
                    }}//style={styles.imageView} 
                    onPress={this.GetItem.bind(this, item)} />
                </TouchableOpacity>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width:'100%', }}>
                  <Icon name={item.isSaved ? "ios-download" :"ios-download-outline"} style={styles.iconStyle}    onPress={()=>item.isRejected ? console.log("error") :this.SaveItem( { item, index } )} />
                    <Text  style={styles.textView} onPress={item.isRejected? console.log("item isRejected") :this.GetItem.bind(this, item)}>{item.title}</Text>
                  <Icon name={item.isRejected ? "ios-checkmark" :"ios-close"}  style={{color: 'black', width :'10%', paddingLeft: '3%', alignItems: 'center', justifyContent: 'center',color: item.isRejected ? "green" :"red"}}   onPress={()=>this.RejectItem( { item, index } )} />
                </View>
              </View>
            </View>   
          }
          keyExtractor={(item, index) => index.toString()}
          />
      </View>
      </SideMenu>
   );
  }
}

 
const styles = StyleSheet.create({
  MainContainer :{
    justifyContent: 'center',
    flex:1,
    backgroundColor : "white"
    //margin: 5,
    //marginTop: (Platform.OS === 'ios') ? 20 : 0,  
  },
  imageView: {
    height: screen.height / 5,

    margin: 7,
    borderRadius : 7,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  textView: { 
    textAlignVertical:'center',
    textAlign: 'center',
    padding:10,
    color: '#000',
    width : '80%',

  },
  iconStyle:{
    color: 'black',
    width :'10%',
    paddingLeft: '3%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

/**
 * https://react-native.canny.io/feature-requests/p/scrollview-animation-events-eg-onscrollanimationend
 */