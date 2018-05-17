import Expo, { SQLite, Font, AppLoading } from 'expo';
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
    plot: "Ciblé pour son prix exorbitant, révoltant pour certains, l'iPhone X fait le bonheur des comptes d'Apple.L’iPhone X a une encoche. L’iPhone X est sorti trop tôt. L’iPhone X est cher. Mais l’iPhone X rapporte beaucoup, beaucoup d’argent, suggérant une marge à nulle autre pareille pour Apple. Les chiffres du cabinet d’analyse Counterpoint, partagés par CNBC, mettent en avant la mainmise du flagship ultra premium sur un marché global très stable : durant le quatrième trimestre de l’année 2017, l’iPhone X a pesé pour 35 % des bénéfices à lui tout seul, malgré des ventes supposément inférieures aux attentes de la firme de Cupertino. C’est dire. ",
    image: 'https://www.numerama.com/content/uploads/2017/11/iphone-x-une-2.jpg',
    url:'https://www.numerama.com/tech/346171-a-lui-seul-liphone-x-a-compte-pour-35-des-benefices-de-lindustrie-au-q4-2017.html',
    isSaved:0,
    isRejected : 0
  },
  {
    title: 'Snapchat permet désormais de créer ses propres filtres pour les visages',
    plot: "Snapchat permet à ses utilisateurs américains de créer des filtres pour les visages. Ils sont cependant payants, et non permanents, car associés à une localisation et une heure précises.",
    image: 'https://www.numerama.com/content/uploads/2017/05/snapchat.jpg',
    url:'https://www.numerama.com/tech/328280-snapchat-permet-desormais-de-creer-ses-propres-filtres-pour-les-visages.html',
    isSaved:false,
    isRejected : false
  },
  {
    title: 'Microsoft dévoile un nouvel OS basé sur Linux',
    plot: "À Redmond, on a dû beaucoup en rire avant de monter sur scène pour annoncer un système d'exploitation maison basé sur Linux. Le moment quasi historique a eu lieu lors du grand colloque RSA (16-20 avril, San Francisco), spécialement dédié à la sécurité de l'information. Les équipes de Microsoft en ont profité pour présenter une solution complète pour objets connectés et c'est justement là qu'intervient la mise en place d'un OS surprise. Azure Sphere OS, c'est son nom, pourra ainsi équiper tout ce que l'on peut imaginer en solutions connectées pour les entreprises soucieuses de leur sécurité.Le système fait ainsi partie de l'ensemble Azure Sphere, sorte de cercle vertueux réunissant microcontrôleur et système d'exploitation sous l'égide d'une sécurité \"cloud\" chère à Microsoft. C'est donc sur la partie système qu'intervient ce Linux aménagé. Pour le géant américain, il s'agit d'une première en 43 ans, ajoutant faire face à une étape importante pour l'entreprise. Néanmoins, Microsoft s'est déjà rapproché du système créé par Linus Torvalds en accueillant Ubuntu sur le Windows Store ou avec l'intégration de l'interpréteur Bash au sein de Windows 10. ",
    image: 'https://dyw7ncnq1en5l.cloudfront.net/optim/news/73/73481/microsoft-loves-linux-1-750x422.jpg',
    url: 'https://www.lesnumeriques.com/appli-logiciel/microsoft-devoile-nouvel-os-base-sur-linux-n73481.html',
    isSaved:0,
    isRejected : 0  
 
  },
  {
    title: 'WhatsApp est désormais (officiellement) interdit aux moins de 16 ans dans l’UE',
    plot: "Pour se conformer au RGPD qui entre en application le 25 mai 2018 dans l'Union européenne, la messagerie de Facebook relève l'âge minimum d'utilisation de 13 à 16 ans. Mais dans les faits, cette décision semble peu applicable.",
    image: 'https://www.numerama.com/content/uploads/2018/04/whatsapp.jpg',
    url: 'https://www.numerama.com/tech/350206-whatsapp-est-desormais-officiellement-interdit-aux-moins-de-16-ans-dans-lue.html',
    isSaved:0,
    isRejected : 0
  },
  {
    title: 'YouTube Kids : les parents peuvent n’autoriser que des vidéos validées par des humains',
    plot: 'Critiqué pour le fonctionnement de ses algorithmes, YouTube Kids offre désormais la possibilité aux parents de filtrer davantage les contenus. Ils peuvent autoriser la visibilité des de vidéos uniquement validées par des modérateurs humains.',
    image: 'https://www.numerama.com/content/uploads/2016/05/youtube-1920.jpg',
    url: 'https://www.numerama.com/tech/350639-youtube-kids-les-parents-peuvent-nautoriser-que-des-videos-validees-par-des-humains.html',
    isSaved:false,
    isRejected : false
  },
  {
    title: 'Quand Google Maps se met à utiliser les fast-foods dans la navigation',
    plot: "Comme l'attestent plusieurs utilisateurs américains de Google Maps, le service de navigation teste actuellement une nouvelle manière de dicter le guidage qui s'avère être beaucoup plus proche de celle des humains. Ainsi, au lieu d'entendre le sempiternel \"dans 100 mètres, tournez à droite\", Google Maps a commencé à dicter à certains utilisateurs américains intégrés à un échantillon de test des directions telles que : \"Tournez à droite après le Burger King\" ; \"À droite après le White Castle\" ; \"Prenez à droite après le KFC\".Si l'on met de côté la surreprésentation des enseignes de restauration rapide — nous sommes aux États-Unis —, il faut avouer que cette manière de présenter la route à suivre est bien plus claire. Les \"Prendre à gauche au troisième feu\" et autres \"Sortez du rond-point par la quatrième sortie\" pouvant parfois donner lieu à des hésitations.",
    image: 'https://dyw7ncnq1en5l.cloudfront.net/optim/news/73/73489/5ad6edf02e75a__300_170.jpg',
    url: 'https://www.lesnumeriques.com/vie-du-net/quand-google-maps-se-met-a-utiliser-fast-foods-dans-navigation-n73489.html',
    isSaved:0,
    isRejected : 0
  },
  {
    title: 'Snappables : Snapchat veut que vous grimaciez pour jouer',
    plot: "Snapchat vient de lancer Snappables, une nouvelle option qui permet de contrôler des jeux en réalité augmentée par les expressions du visage. Ces nouvelles Lenses seront déployées cette semaine sur Android et iOS.",
    image: 'https://www.numerama.com/content/uploads/2018/04/snappables-hero-shot.jpg',
    url:'https://www.numerama.com/tech/350662-snappables-snapchat-veut-que-vous-grimaciez-pour-jouer.html',
    isSaved:0,
    isRejected : 0
  },
  {
    title: 'Grève à la RATP : le trafic sera légèrement perturbé jeudi',
    plot:"Ce n’est pas un appel à la grève, « mais plutôt une possibilité offerte aux salariés qui le souhaitent d’aller manifester », explique-t-on à l’Unsa RATP.Les trois organisations syndicales de la RATP (CGT, Sud et Unsa) ont déposé un préavis de grève pour cette nouvelle journée de mobilisation de jeudi. Etudiants, personnels hospitaliers ou encore cheminots ont prévu de manifester pour « stopper la régression sociale ».En conséquence, le trafic sera légèrement perturbé sur les RER et bus, et normal sur le reste du réseau RATP.",
    image: 'http://s1.lprs1.fr/images/2018/04/18/7670484_e1b8f7dc-42e1-11e8-9275-09e60a2c58a8-1_1000x625.jpg',
    url: 'http://www.leparisien.fr/info-paris-ile-de-france-oise/transports/preavis-de-greve-a-la-ratp-trafic-legerement-perturbe-ce-jeudi-18-04-2018-7670484.php',
    isSaved:0,
    isRejected : 0
  
  },
   {
    title: 'Le code d’un téléphone peut être exigé en garde à vue',
    plot:"Une décision du Conseil constitutionnel délivrée le 30 mars dernier et signalée cette semaine par le quotidien Le Monde permet aux forces de l’ordre d’exiger le code de déverrouillage d’un téléphone, d’une tablette ou d’un ordinateur à tout suspect en garde à vue. Un refus d’obtempérer est alors passible de poursuites qui peuvent aboutir à une peine de trois ans d’emprisonnement et d’une amende de 270 000 €. ",
    image: 'https://img.igen.fr/2018/4/macgpic-1524040054-72614127157932-sc-jpt.jpg',
    url: 'https://www.igen.fr/ailleurs/2018/04/le-code-dun-telephone-peut-etre-exige-en-garde-vue-103705',
    isSaved:0,
    isRejected : 0
  },
  {
    title: 'Fortnite : une fac américaine offre une bourse aux joueurs talentueux',
    plot:"Le succès de Fortnite ne tarit pas. Le jeu s'offre une place dans le programme esport de l'université américaine de l'Ohio qui, pour marquer le coup, a décidé d'offrir une bourse aux joueurs assez talentueux pour rejoindre leur programme. ",
    image: 'https://www.numerama.com/content/uploads/2018/04/fortnite2fbattle-royale2ffortnite-sniper-1920x1080-f072fcef414cbe680e369a16a8d059d8a01c7636.jpg',
    url: 'https://www.numerama.com/tech/349224-fortnite-une-fac-americaine-offre-une-bourse-aux-joueurs-talentueux.html',
    isSaved:0,
    isRejected : 0
  },
];
const demoDataNewsMore = [
  {
    title: "Qu’est-ce qu’un smartphone blockchain ?",
    plot: "La startup israélienne Sirin Labs souhaite financer un « smartphone blockchain ». Derrière ce projet pas forcément viable, se cache l'enjeu de l'adoption grand public de l'écosystème d'applications qui émerge autour d'Ethereum et d'autres crypto-monnaies. Le 16 mai 2018, HTC a également annoncé un smartphone « blockchain ».",
    image: "https://www.numerama.com/content/uploads/2017/11/smartblock.jpg",
    url: "https://www.numerama.com/tech/296090-quest-ce-quun-smartphone-blockchain-du-reve-impossible-a-la-revolution-des-usages.html",
    isSaved:0,
    isRejected : 0
  },
  {
    title: "Gmail : comment activer le mode hors ligne",
    plot: "Gmail a activé la possibilité de consulter vos mails hors connexion. On vous montre comment l'activer en 3 clics.",
    image: "https://www.numerama.com/content/uploads/2015/09/gmail-ouvrir.jpg",
    url: "https://www.numerama.com/tech/373481-gmail-comment-activer-le-mode-hors-ligne.html",
    isSaved:0,
    isRejected : 0
  },
  {
    title: "MacBook Pro : après la pétition, place à l’action en justice",
    plot: "Deux utilisateurs de MacBook Pro équipés d'un clavier « papillon » ont déposé un recours collectif auprès d'un tribunal de Californie. Ils réclament des dédommagements pour tous ceux ayant été forcés de passer par le SAV. ",
    image: "https://www.numerama.com/content/uploads/2016/12/macbook-pro-5.jpg",
    url: "https://www.numerama.com/tech/372714-claviers-papillon-des-macbook-pro-apres-la-petition-place-a-laction-en-justice.html",
    isSaved:0,
    isRejected : 0
  },
  {
    title: "Android P fermera automatiquement les applications plantées ",
    plot: "Vous n’êtes vous jamais retrouvé face à une application plantée qui vous demande d’attendre ou de la fermer ? Android P n’a plus de patience : il la fermera automatiquement.",
    image: "http://images.frandroid.com/wp-content/uploads/2018/05/androidp-twitter-630x323.jpg",
    url: "http://www.frandroid.com/android/mises-a-jour-android/504635_android-p-fermera-automatiquement-les-applications-plantees#",
    isSaved:0,
    isRejected : 0
  },
  {
    title: "YouTube teste la navigation privée sur son app",
    plot: "L’application YouTube est en train de tester un mode de navigation privée qui pourrait être bien pratique. Et ce, sans aucune arrière pensée.",
    image: "http://images.frandroid.com/wp-content/uploads/2018/05/youtube-navigation-privee-630x354.jpg",
    url: "http://www.frandroid.com/android/applications/google-apps/504395_youtube-teste-la-navigation-privee-sur-son-app-une-bonne-nouvelle-en-toute-innocence",
    isSaved:0,
    isRejected : 0
  },
  {
    title: "Microsoft voudrait concurrencer l'iPad avec des tablettes Surface à partir de 400 $",
    plot: "Les nouvelles ardoises destinées à se vendre en grand volume auraient un écran 10, des coins plus arrondis que les autres Surface, et un port USB-C. C’est Intel qui fournirait le processeur de ces appareils, qui auraient une autonomie d’environ 9 h 30, soit quatre heures de moins que ce dont est capable la Surface Pro. Un choix qui peut paraître étrange alors que Microsoft s’est associé à Qualcomm pour permettre l’émergence de machines sous Windows plus autonomes.",
    image: "https://img.igen.fr/2018/5/macgpic-1526473793-113252436470942-sc-jpt.jpg",
    url: "https://www.igen.fr/ailleurs/2018/05/microsoft-voudrait-concurrencer-lipad-avec-des-tablettes-surface-partir-de-400",
    isSaved:0,
    isRejected : 0
  },/*
  {
    title: "?",
    plot: "",
    image: "",
    url: "",
    isSaved:0,
    isRejected : 0
  },*/
];
export default class Project extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { 
      isLoading: true, 
      isOpen: false, 
      refreshing: true,
      selectedItem: 'recommandation', 
      items: null,
      newscastsState : null,
      newscastSavedState : null
    }
    YellowBox.ignoreWarnings(['Warning: componentWillMount is deprecated','Warning: componentWillReceiveProps is deprecated',]);
  }
  async componentDidMount(){
    //this.webCall();
    //this.createSqlTable();
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });
    this.update();
    //this.init().then(this.select());
    
  }
 
  
  
  
  
  
  
  /*
    Partie archive
  */
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
    Partie Storage SQLite
  */


  initData(){
    this._initSqlTable().then(this._insertDataLocalToSQL());
  }
  _initSqlTable = async () => {
    await this.executeSql('DROP TABLE newscastSaved;');
    await this.executeSql('DROP TABLE newscasts;');
    await this.executeSql('create table if not exists newscastSaved (id integer primary key , done int, title text,image text,url text);');
    await this.executeSql('create table if not exists newscasts ( id integer primary key , title text not null,image text not null,url text not null,isSaved integer default 0, isRejected integer default 0 );');
  }
  _insertDataLocalToSQL = async () =>{
    for (item in demoDataNewsMore){
      const post = demoDataNewsMore[item]
      //console.log(post)
      await this.executeSql('insert into newscasts (title, image, url, isSaved, isRejected) values (?, ?, ?,0,0)', [post["title"], post["image"], post["url"]]);
    }
  }
  
  update = async () => {
    console.log("je suis dans update")
    await this.executeSql('select * from newscastSaved', []).then(newscastSavedState => this.setState({newscastSavedState})  );
    await this.executeSql('select * from newscasts', []).then(newscastsState => this.setState({newscastsState})  );
    this.setState({
      refreshing: false, 
      isLoading : false,
    })
    //console.log(this.state)
  }

  init = async () => {
    //await this.executeSql('create table if not exists locations (latitude numeric, longitude numeric);');
    await this.executeSql('create table if not exists newscastSaved (id integer primary key AUTOINCREMENT, done int, title text,image text,url text);');
    await this.executeSql('create table if not exists newscasts ( id integer primary key AUTOINCREMENT, title text not null,image text not null,url text not null,isSaved integer default 0, isRejected integer default 0 );');
    this._insert().then(this.select)
  }
  
  _insert = async () => {
    for (item in demoDataNews){
      const post = demoDataNews[item]
      await this.executeSql('insert into newscasts (title, image, url, isSaved, isRejected) values (?, ?, ?,0,0)', [post["title"], post["image"], post["url"]]);
    }
    return true
  }
  
   select = async () => {
    this.executeSql('select * from newscasts', []).then(newscastsState => this.setState({newscastsState})  );
    this.executeSql('select * from newscastSaved', []).then(newscastSavedState => this.setState({newscastSavedState})  );
    console.log(this.state)
    this.setState({ refreshing: false, isLoading : false, })
  }
  executeSql = async (sql, params = []) => {
    return new Promise((resolve, reject) => db.transaction(tx => {
      tx.executeSql(sql, params, (_, { rows }) => resolve(rows._array), reject)
    }))
  }
  _clear = async () => {
    this.setState({ refreshing: true, isLoading : true, })
    this.executeSql('delete from newscasts').then(
      this.executeSql('delete from newscastSaved').then(
        this.init().then(this.select)));
  }
  _toggleFav = async({ item, index })=>{
    console.log(item.title);
    //this.update()
    if(!item.isSaved){
      await this.executeSql('insert into newscastSaved (done, title, image, url ) values (0, ?, ?, ?)', [item.title, item.image, item.url]).then(
        await this.executeSql('update  newscasts set isSaved = ? where title = ?', [!item.isSaved, item.title]).then(this.update().then(Actions.refresh()))
      )
    }else{
      await this.executeSql('delete from newscastSaved  where title = ?', [item.title]).then(
        await this.executeSql('update  newscasts set isSaved = ? where title = ?', [!item.isSaved, item.title]).then(this.update().then(Actions.refresh()))
      )
    }
    
    //return true
  
  }
  _toggleReject = async({ item, index })=>{
    console.log(item.title);
    await this.executeSql('update  newscasts set isRejected = ? where title = ?', [!item.isRejected, item.title]).then(this.update().then(Actions.refresh()))
    //return true
  }

  onEndReached= async () => {
    console.log("onEndReached")
    for (item in demoDataNewsMore){
      const post = demoDataNewsMore[item]
      //if(this.state.isLoading==false && this.state.refreshing){
        await this.executeSql('insert into newscasts (title, image, url, isSaved, isRejected) values (?, ?, ?,0,0)', [post["title"], post["image"], post["url"]]);
      //}    
    }
    this.update()
  };

  /*
    Partie side menu
  */
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

  
  

  /*
    Partie Flastlist
  */

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
  _onPressOnItem (item) {
    //Alert.alert(item.title);
    console.log(item.title);
    Actions.webviewcustom(item);
    //Actions.webviewcustomProto(item);
  }
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
      
      <View style={{ justifyContent: 'center', flex:1,backgroundColor : "#212121",paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}} >
      
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
            <Button transparent>
              <Icon name='ios-refresh' style={{ color: '#fff'}}   onPress={()=>this.initData()}/>
            </Button>
          </Right>
        </Header>
        <FlatList
          data={ this.state.newscastsState }
          extraData={this.state}
          ItemSeparatorComponent = {this.FlatListItemSeparator}
          renderItem={({item, index}) => 
            
            <View  onPressItem={this._onPressItem}  >
              <View style={{flex:1, backgroundColor: item.isRejected ? "#484848" : "#fff" }}>
                <TouchableOpacity onPress={item.isRejected? console.log("item isRejected") : this._onPressOnItem.bind(this, item)} >
                  <Image source = {{ uri: item.image }} 
                    style={{
                      height: screen.height / 5,
                      opacity: item.isRejected ? 0.3:1,
                      margin: 7,
                      borderRadius : 7,
                      justifyContent: 'center', 
                      alignItems: 'center',
                    }}//style={styles.imageView} 
                    onPress={this._onPressOnItem.bind(this, item)}
                     />
                </TouchableOpacity>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width:'100%', }}>
                  <Icon name={item.isSaved ? "ios-download" :"ios-download-outline"} style={styles.iconStyle}    onPress={()=>item.isRejected ? console.log("error") :this._toggleFav( { item, index } )} />
                    <Text  style={styles.textView} onPress={item.isRejected? console.log("item isRejected") :this._onPressOnItem.bind(this, item)}>{item.title}</Text>
                  <Icon name={item.isRejected ? "ios-checkmark" :"ios-close"}  style={{color: 'black', width :'10%', paddingLeft: '3%', alignItems: 'center', justifyContent: 'center',color: item.isRejected ? "green" :"red"}}   onPress={()=>this._toggleReject( { item, index } )} />
                </View>
              </View>
            </View>   
          }
          keyExtractor={(item, index) => index.toString()}
          onRefresh={this._clear}
          refreshing={this.state.refreshing}
          onEndReached={() => this.state.isLoading==false&& this.state.refreshing==false ?  this.onEndReached() : console.log("attend mon bonhomme")}
          onEndReachedThreshold={0.5} 
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