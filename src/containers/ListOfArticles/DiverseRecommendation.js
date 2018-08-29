import Expo, { SQLite, Font, AppLoading  } from 'expo';
import React, { Component } from 'react';
import { 
  StyleSheet, 
  Platform, 
  Dimensions,
  PixelRatio,
  View, 
  ActivityIndicator, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  Alert, 
  YellowBox,
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem } from 'native-base';
import {Actions} from 'react-native-router-flux';
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
  },
  {
    title: 'À lui seul, l’iPhone X a compté pour 35 % des bénéfices de l’industrie au Q4 2017',
    plot: "Ciblé pour son prix exorbitant, révoltant pour certains, l'iPhone X fait le bonheur des comptes d'Apple.L’iPhone X a une encoche. L’iPhone X est sorti trop tôt. L’iPhone X est cher. Mais l’iPhone X rapporte beaucoup, beaucoup d’argent, suggérant une marge à nulle autre pareille pour Apple. Les chiffres du cabinet d’analyse Counterpoint, partagés par CNBC, mettent en avant la mainmise du flagship ultra premium sur un marché global très stable : durant le quatrième trimestre de l’année 2017, l’iPhone X a pesé pour 35 % des bénéfices à lui tout seul, malgré des ventes supposément inférieures aux attentes de la firme de Cupertino. C’est dire. ",
    //image: 'https://www.numerama.com/content/uploads/2017/11/iphone-x-une-2.jpg',
    image : 'https://www.iphon.fr/public//2013/Q1/panorama-iphone-ios-6-9.jpg',
    url:'https://www.numerama.com/tech/346171-a-lui-seul-liphone-x-a-compte-pour-35-des-benefices-de-lindustrie-au-q4-2017.html',
    isSaved:0,
    isRejected : 0
  },
];

const demoDataNewsLoadMore = [
  {
    title: 'Une envie de Windows 95 ? Cette application fait renaître l’OS de Microsoft',
    plot: "Après les jeux vidéo, la nostalgie touchera-t-elle de vieux systèmes d’exploitation ? Peut-être. Le développeur Felix Rieseberg s’est amusé à ressusciter Windows 95 dans une application que les utilisateurs Mac, Windows et Linux pourront télécharger.",
    image: 'https://www.numerama.com/content/uploads/2018/08/maxresdefault.jpg',
    url:'https://www.numerama.com/pop-culture/410274-une-envie-de-windows-95-cette-application-fait-renaitre-los-de-microsoft.html',
    isSaved:0,
    isRejected : 0
  },
  {
    title: 'Pour fêter les 500 millions de consoles vendues, Sony a conçu cette magnifique PS4 Pro collector',
    plot: "Acteur majeur du marché des consoles, Sony transforme tout en or avec sa marque PlayStation. Ainsi, tout récemment, il a annoncé avoir écoulé plus de 500 millions de consoles depuis le lancement de la toute première PlayStation, en 1994 (au Japon). Un chiffre colossal, que le constructeur a voulu fêter dignement avec une PlayStation 4 Pro collector limitée à 50 000 exemplaires dans le monde (bon courage pour en trouver une).",
    image: 'https://www.numerama.com/content/uploads/2018/08/sony-ps4-pro-500-millions-15.jpg',
    url:'https://www.numerama.com/pop-culture/410112-pour-feter-les-500-millions-de-consoles-vendues-sony-a-concu-cette-magnifique-ps4-pro-collector.html',
    isSaved:0,
    isRejected : 0
  },
  {
    title: '« Le Monde » refait son site',
    plot: "« Le Monde » fait évoluer son site Web, en commençant par sa page d’accueil.",
    image: 'https://img.lemde.fr/2018/07/12/352/0/3500/2331/184/122/60/0/a222ac2_10821-1n4nge5.ooi4.png',
    url:'https://www.lemonde.fr/refaire-le-monde/article/2018/08/16/le-monde-refait-son-site_5343010_5330899.html',
    isSaved:0,
    isRejected : 0
  },
  {
    title: 'The Legend Of Zelda : Breath of the Wild officiellement placé dans la chronologie de la licence',
    plot: "Ainsi, ce dernier se place en toute fin de la frise chronologique dans ce qui semble être une nouvelle branche, alors que l'épisode précédent, Skyward Sword, reste lui bien accroché au tout début. Vu l'état d'Hyrule dans le titre, ce placement ne semble pas du tout étrange, même si l'on pourrait placer The Wind Waker dans le débat. ",
    image: 'http://image.jeuxvideo.com/medias-md/153358/1533578262-5850-card.jpg',
    url:'http://www.jeuxvideo.com/news/897415/the-legend-of-zelda-breath-of-the-wild-officiellement-place-dans-la-chronologie-de-la-licence.htm',
    isSaved:0,
    isRejected : 0
  },
  {
    title: 'Heures sup’ exonérées : quel impact sur le pouvoir d’achat et le chômage ?',
    plot: "Officiellement, c’est le grand retour du « travail qui paie ». Et donc de l’exonération de charges sur les heures supplémentaires, promesse de campagne d’Emmanuel Macron qui sera appliquée au 1er septembre 2019. L’objectif est louable : augmenter le pouvoir d’achat des salariés et faire en sorte que le travail « paie de mieux en mieux », comme l’a énoncé Édouard Philippe dans le JDD dimanche.",
    image: 'http://s1.lprs1.fr/images/2018/08/27/7866102_7f019644-a9f2-11e8-8956-de5ad4b6bb68-1_1000x625.jpg',
    url:'http://www.leparisien.fr/economie/heures-sup-exonerees-quel-impact-sur-le-pouvoir-d-achat-et-le-chomage-27-08-2018-7866102.php',
    isSaved:0,
    isRejected : 0
  },
  {
    title: 'Ivre, il demande à un gendarme de lui payer son plein',
    plot: "L’homme de 26 ans, sous l’emprise d’alcool et de stupéfiants, avait besoin d’essence mais n’avait pas de carte bancaire. Il s’est adressé à un autre client de la station. Mauvaise pioche, c’était un gendarme au repos.",
    image: 'https://media.ouest-france.fr/v1/pictures/0cc6af850bd0ce1865d6a491ed98d5d5-carquefou-ivre-il-demande-un-gendarme-de-lui-payer-son-plein.jpg',
    url:'https://www.ouest-france.fr/pays-de-la-loire/nantes-44000/carquefou-ivre-il-demande-un-gendarme-de-lui-payer-son-plein-5909000',
    isSaved:0,
    isRejected : 0
  },
  {
    title: 'Ivre, il entre par effraction et se cuisine des lardons',
    plot: "La faim justifie les moyens. Lundi 6 août vers 19 h, un habitant de la rue de Cornouaille, dans le quartier de Kergoat, à Brest, entend du bruit venant de sa cuisine.Intrigué, il va jeter un œil. Il se retrouve nez à nez avec un homme, en fort état d’ébriété, occupé à cuire des lardons. Il a aussi fait brûler un morceau de pain, qui a endommagé le linoléum au sol. L’inconnu est tout simplement entré par la fenêtre de la salle de bains restée ouverte.",
    image: 'https://media.ouest-france.fr/v1/pictures/17db77eae33a82cfdfcd337f27dda78c-brest-ivre-il-entre-par-effraction-et-se-cuisine-des-lardons_1.jpg?width=1260&height=712&fill=0&focuspoint=50%2C50&cropresize=1',
    url:'https://www.ouest-france.fr/bretagne/brest-29200/brest-ivre-il-entre-par-effraction-et-se-cuisine-des-lardons-5913701',
    isSaved:0,
    isRejected : 0
  },
  {
    title: 'Ivre, il "bénit" les gendarmes avec la brosse des toilettes',
    plot: "L’homme de 26 ans, sous l’emprise d’alcool et de stupéfiants, avait besoin d’essence mais n’avait pas de carte bancaire. Il s’est adressé à un autre client de la station. Mauvaise pioche, c’était un gendarme au repos.",
    image: 'https://media.ouest-france.fr/v1/pictures/0cc6af850bd0ce1865d6a491ed98d5d5-carquefou-ivre-il-demande-un-gendarme-de-lui-payer-son-plein.jpg',
    url:'https://www.ouest-france.fr/pays-de-la-loire/angers-49000/segre-ivre-il-benit-les-gendarmes-avec-la-brosse-des-toilettes-5823583',
    isSaved:0,
    isRejected : 0
  },
  {
    title: 'un homme, armé et ivre, vole des lots à une kermesse',
    plot: "L’homme de 26 ans, sous l’emprise d’alcool et de stupéfiants, avait besoin d’essence mais n’avait pas de carte bancaire. Il s’est adressé à un autre client de la station. Mauvaise pioche, c’était un gendarme au repos.",
    image: 'https://static.ladepeche.fr/content/media/image/large/2018/07/03/20180703082847118-0.jpg',
    url:'https://www.ladepeche.fr/article/2018/07/10/2833843-bretagne-homme-arme-ivre-vole-lots-kermesse.html',
    isSaved:0,
    isRejected : 0
  },
  {
    title: 'Ivre et sans permis, un unijambiste conduisant avec un balai provoque un accident ',
    plot: "L’homme de 26 ans, sous l’emprise d’alcool et de stupéfiants, avait besoin d’essence mais n’avait pas de carte bancaire. Il s’est adressé à un autre client de la station. Mauvaise pioche, c’était un gendarme au repos.",
    image: 'https://static.cnews.fr/sites/default/files/styles/image_640_360/public/balai_illustration_cc_quidditch.jpg?itok=v7t6xali',
    url:'https://www.cnews.fr/monde/2017-11-30/brest-ivre-et-sans-permis-un-unijambiste-conduisant-avec-un-balai-provoque-un',
    isSaved:0,
    isRejected : 0
  },
];

export default class Project extends Component {
  constructor(props) {
    super(props);
    var {height, width} = Dimensions.get('window'); 
      this.state = {
        height : screen.height > screen.width ? screen.height : screen.width,
        width : screen.width > screen.height ? screen.width : screen.height,
        isLoading: true,
        globalDataSource : null,
        displayDataSource : null,
        page : 1,
        nbItemPerPage : 5,
        newscastSavedState : null,
        refreshing: false,
        token : null, 
        sizeImageRatio : 210,
        sizeViewRatio : 150,
        ratio : PixelRatio.get(),
        orientation : height > width ? 'portrait' : 'landscape'
      }
      YellowBox.ignoreWarnings([
        'Warning: componentWillMount is deprecated',
        'Warning: componentWillReceiveProps is deprecated',
        'TypeError: undefined is not an object'
      ]);
  }
  async componentDidMount(){
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });
    
    
    await this._initSqlTable();
    await this.webCall();
    
    await this._updateSelectedItems()
    try {
      AsyncStorage.getItem('token', (err, result)=>{
       this.setState({token: result});
       //console.log("mon token de merde "+result)
       })
     } catch (error) {
       // Error saving data
       //console.log("oh mon dieu le token a disparu")
     }
    this.fetchEvent("launch",null)
    Dimensions.addEventListener('change', () => {
      //var {height, width} = Dimensions.get('window'); 
      var deviceHeight = Dimensions.get('window').height;
      var deviceWidth = Dimensions.get('window').width;
      this.setState({
          orientation: deviceHeight > deviceWidth ? 'portrait' : 'landscape',
          height : deviceHeight > deviceWidth ? deviceHeight : deviceWidth,
          width : deviceWidth > deviceHeight ? deviceWidth : deviceHeight,

      });
      console.log(this.state.orientation);
    });
    //console.log("pixel ratio : "+PixelRatio.get())
    //console.log("pixel round : "+PixelRatio.roundToNearestPixel(100))
    //this.getMoviesFromApi();
    //this.getNewsFromApi();
   // await this._generateDisplayItems()
  
  }
  
  fetchEvent =  async (something, someData)=>{
    return someData === null ? 
      console.log("[{Event : "+something+", timestamp :"+Date.now()+"}]")
      :
      console.log("[{Event : "+something+", timestamp :"+Date.now()+","+someData+"}]")
  }
  executeSql = async (sql, params = []) => {
    return new Promise((resolve, reject) => db.transaction(tx => {
      tx.executeSql(sql, params, (_, { rows }) => resolve(rows._array), reject)
    }))
  }
  _initSqlTable = async () => {
    //await this.executeSql('DROP TABLE newscastSaved;');
    //await this.executeSql('DROP TABLE newscasts;');
    await this.executeSql('create table if not exists newscastSaved (id integer primary key , done int, title text,image text,url text);');
    //await this.executeSql('create table if not exists newscasts ( id integer primary key , title text not null,image text not null,url text not null,isSaved integer default 0, isRejected integer default 0 );');
  }
  _updateSelectedItems = async()=>{
    //console.log("update")
    await this.executeSql('select * from newscastSaved', []).then(newscastSavedState => this.setState({newscastSavedState})  );
    await this._checkSavedItems();
  }
  _downloadSqlTableSaved= async () => {
    await this.executeSql('select * from newscastSaved', []).then(newscastSavedState => this.setState({newscastSavedState})  );
  }
  _checkSavedItems(){
    let display = this.state.displayDataSource;
    if(this.state.newscastSavedState != null){
      //console.log(this.state.newscastSavedState[0])
      for(let j=0;this.state.displayDataSource.length!=j;j++){
        //console.log(this.state.newscastSavedState[i].url)
        display[j].isSaved=0;
        for(let i=0;this.state.newscastSavedState.length !=i;i++){
          //console.log(this.state.displayDataSource[j].url)
          if(this.state.newscastSavedState[i].url === this.state.displayDataSource[j].url ){
            //console.log("it's match!")
            display[j].isSaved = 1
    
          }
        }
      }
      this.setState({
        displayDataSource : display
      })
    }
  }
  _generateDisplayItems(){
    console.log("display")
    let pack = []
    let i = this.state.displayDataSource === null ? 0 : this.state.displayDataSource.length;
    while(i != this.state.nbItemPerPage*this.state.page){
      console.log(this.state.globalDataSource[i])
    }
  }
  _onPressOnItem (item) {
    console.log(item)
    
    let pack = {
      title: item.title,
      url:item.url,
      previous : "DiverseRecommendation"
    }
    this.fetchEvent("pressOnItem", "itemClickedTitle : "+item.title+" itemClickedUrl : "+item.url)
    Actions.webview(item);
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
  async webCall(){
    //return fetch('https://129.175.22.71:4243/url/bulk/100')
    //return fetch('https://api.renewal-research.com/news/url/bulk/99')
    return fetch('https://facebook.github.io/react-native/movies.json')
    //return fetch('https://reactnativecode.000webhostapp.com/FlowersList.php')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          //isLoading: false,
          dataSource: responseJson,
          globalDataSource : demoDataNews
        }, function() {
             // In this block you can do something with new state.
             console.log(this.state.dataSource)
            let pack = []
            let i = this.state.displayDataSource === null ? 0 : this.state.displayDataSource.length;
            while(i != this.state.nbItemPerPage*this.state.page){
              //console.log(i)
              //console.log(this.state.globalDataSource[i])
              i++;
              pack.push(this.state.globalDataSource[i])
            }
            this.setState({
              isLoading: false,
              page : this.state.page+1,
              displayDataSource : pack
            })
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  /*_ItemLoadMore = () => {
    let pack = this.state.displayDataSource;
    let i = this.state.displayDataSource === null ? 0 : this.state.displayDataSource.length;
    //if(this.state.displayDataSource[this.state.displayDataSource.length]!=this.state.globalDataSource[this.state.globalDataSource.length] || this.state.nbItemPerPage*this.state.page < this.state.globalDataSource.length){
    if(this.state.nbItemPerPage*this.state.page < this.state.globalDataSource.length){
      while(i != this.state.nbItemPerPage*this.state.page ){
        //console.log(i)
        //console.log(this.state.globalDataSource[i])
        i++;
        pack.push(this.state.globalDataSource[i])
      }
      this.setState({
        page : this.state.page+1,
        displayDataSource : pack
      }) 
    }
    this._updateSelectedItems()
  }*/
  _ItemLoadMore = () => {
    let pack = this.state.displayDataSource;
    let i = this.state.displayDataSource === null ? 0 : this.state.displayDataSource.length;
    let j = this.state.nbItemPerPage*this.state.page > this.state.globalDataSource.length ? this.state.globalDataSource.length : this.state.nbItemPerPage*this.state.page;
    while(i!=j){
      pack.push(this.state.globalDataSource[i])
      i++;
    }
    console.log(pack.length)
    console.log(this.state.globalDataSource.length)
    if(pack.length > this.state.globalDataSource.length/2){
      console.log("################################################ ok ####################################");
      let global = this.state.globalDataSource;
      for(let i=0;i!=demoDataNewsLoadMore.length;i++){
        console.log(demoDataNewsLoadMore[i])
        global.push(demoDataNewsLoadMore[i]);
      }
      this.setState({
        globalDataSource : global
      })
    }
    this.setState({
      page : this.state.page+1,
      displayDataSource : pack
    })
    this._updateSelectedItems()
  }
  _toggleFav = async({ item, index })=>{

    let display = this.state.displayDataSource;
    display[index].isSaved = !display[index].isSaved
    this.setState({
      displayDataSource : display
    })

    display[index].isSaved ? 
      await this.executeSql('insert into newscastSaved (done, title, image, url ) values (0, ?, ?, ?)', [display[index].title, display[index].image, display[index].url])
      :
      await this.executeSql('delete from newscastSaved  where title = ?', [display[index].title])
    display[index].isSaved ? 
      this.fetchEvent('savedNews'," title : "+display[index].title+", url : "+display[index].url)
      :
      this.fetchEvent('unsavedNews'," title : "+display[index].title+", url : "+display[index].url)

  }
  _toggleReject = async({ item, index })=>{
    let display = this.state.displayDataSource;
    display[index].isRejected = !display[index].isRejected
    this.setState({
      displayDataSource : display
    })
    display[index].isRejected ? 
      this.fetchEvent('rejectNews'," title : "+display[index].title+", url : "+display[index].url)
      :
      this.fetchEvent('unrejectNews'," title : "+display[index].title+", url : "+display[index].url)
  }
  async getMoviesFromApi() {
    let response = null;
    let responseJson = null;
    try {
      response = await fetch(
        'https://facebook.github.io/react-native/movies.json'
        );
        responseJson = await response.json();
        console.log(responseJson)
        return responseJson.movies;
    } catch (error) {
      console.error(error);
    }
  }
    async getNewsFromApi() {
        let response = null;
        let responseJson = null;
        try {
            response = await fetch(
            `https://129.175.22.71:4243/news/url/bulk/100`
        );
        responseJson = await response.json();
        console.log(responseJson)
        return responseJson;
        } catch (error) {
        console.error(error);
        }
    }
  
  renderItem=({item, index, nativeEvent}) => (        
    <View  onPressItem={this._onPressItem}  >
      <View style={{flex:1, backgroundColor: item.isRejected ? "#484848" : "#fff"}}>
        <TouchableOpacity onPress={item.isRejected? console.log("item isRejected") : this._onPressOnItem.bind(this, item)} >
          <Image source = {{ uri: item.image }} 
            style={{
              //height: this.state.height / 5,
              height : PixelRatio.roundToNearestPixel(70),//94.5,//135,
              height : Platform.OS === 'ios' ? PixelRatio.roundToNearestPixel(140/PixelRatio.get()) : PixelRatio.roundToNearestPixel(70),
              opacity: item.isRejected ? 0.3:1,
              margin: 1,
              borderRadius : 7,
              justifyContent: 'center', 
              alignItems: 'center',
              
            }}//style={styles.imageView} 
            onPress={this._onPressOnItem.bind(this, item)
            //onPress={this._onScrollItem(nativeEvent)
            
            }
             />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width:'100%',
                      //height: this.state.height / 17

                      height : Platform.OS === 'ios' ? PixelRatio.roundToNearestPixel(100/PixelRatio.get()) : PixelRatio.roundToNearestPixel(50)
        }}>
          <Icon name={item.isSaved ? "ios-download" :"ios-download-outline"} style={styles.iconStyle}    onPress={()=>item.isRejected ? console.log("error") :this._toggleFav( { item, index } )} />
          <Text numberOfLines={2} style={styles.textView} onPress={item.isRejected? console.log("item isRejected") :this._onPressOnItem.bind(this, item)}>{item.title}</Text>
          <Icon name={item.isRejected ? "ios-checkmark" :"ios-close"}  style={{color: 'black', width :'10%', paddingLeft: '3%', alignItems: 'center', justifyContent: 'center',color: item.isRejected ? "green" :"red"}}   onPress={()=>this._toggleReject( { item, index } )} />
        </View>
      </View>
    </View>   
  )
  renderItemLandscape=({item, index, nativeEvent}) => (        
    <View  onPressItem={this._onPressItem}  >
      <View style={{flex:1, flexDirection: 'row', backgroundColor: item.isRejected ? "#484848" : "#fff"}}>
        <TouchableOpacity onPress={item.isRejected? console.log("item isRejected") : this._onPressOnItem.bind(this, item)} >
          <Image source = {{ uri: item.image }} 
            style={{
              //height: this.state.height / 8,
              height: 90,
              width : this.state.width/3,
              opacity: item.isRejected ? 0.3:1,
              margin: 1,
              borderRadius : 7,
              justifyContent: 'center', 
              alignItems: 'center',
              
            }}//style={styles.imageView} 
            onPress={this._onPressOnItem.bind(this, item)
            //onPress={this._onScrollItem(nativeEvent)
            
            }
             />
        </TouchableOpacity>
        <View style={{width:'100%', flexDirection : 'row',  height:90//this.state.height / 8
          }}>
          <Text numberOfLines={3} style={styles.textViewLandscape} onPress={item.isRejected? console.log("item isRejected") :this._onPressOnItem.bind(this, item)}>{item.title}</Text>
          <View style={{alignItems: 'center', justifyContent: 'center', flexDirection : 'column'}} >
            <Icon name={item.isSaved ? "ios-download" :"ios-download-outline"}     onPress={()=>item.isRejected ? console.log("error") :this._toggleFav( { item, index } )} />
            <Icon name={item.isRejected ? "ios-checkmark" :"ios-close"}  style={{color: 'black', alignItems: 'center', justifyContent: 'center',color: item.isRejected ? "green" :"red"}}   onPress={()=>this._toggleReject( { item, index } )} />
          </View>
        </View>
      </View>
    </View>   
  )
  getItemLayout= (data, index) => (
    {length: (screen.height / 17) + (screen.height / 5), offset: (screen.height / 17) + (screen.height / 5) * index, index}
  );
  percentageCalculator= async(sizeOneNews, position)=>{
    let currentItemIndex = 0;
    if(sizeOneNews > position){
      currentItemIndex = 0;
    }else{
      currentItemIndex = (position/sizeOneNews+"").split('.')[0];
    }
    currentItemIndex++;
    console.log(currentItemIndex)
    let positionEndItem = currentItemIndex*sizeOneNews
    //console.log(sizeOneNews)
    //console.log(position)
    //console.log("##################")
    //console.log("positon end "+positionEndItem)
    //console.log(positionEndItem-position)
    let p = ((100*(positionEndItem-position))/sizeOneNews+"").split('.')[0]
    //console.log("percent top :"+p)
    currentItemIndex--;
    return {
        index : currentItemIndex,
        title : this.state.displayDataSource[currentItemIndex].title, 
        url : this.state.displayDataSource[currentItemIndex].url, 
        percent : p+"%"
      };
  }
  percentageCalculatorBottom= async(sizeOneNews, position, sizeGlobalDisplay)=>{
    if(position < sizeGlobalDisplay) {
      let currentItemIndex = (position/sizeOneNews+"").split('.')[0];
    
    let positionEndItem = currentItemIndex*sizeOneNews
    //console.log(sizeOneNews)=
    //console.log("##################")
    //console.log(position)
    //console.log("positon end "+positionEndItem)
    //console.log(position-positionEndItem)
    let p = ((100*(position-positionEndItem))/sizeOneNews+"").split('.')[0]
    //console.log("percent bottom :"+p)
    currentItemIndex++;
    currentItemIndex--;
    return {
        index : currentItemIndex,
        title : this.state.displayDataSource[currentItemIndex].title, 
        url : this.state.displayDataSource[currentItemIndex].url, 
        percent : p+"%"
      };
    }else{
      return null
    }
    
  }
  _onScrollItem = async (nativeEvent) => {
    //console.log("##### detect scroll item ####")
    const sizeGlobalDisplay = nativeEvent.contentSize.height;
    const displayLenght = this.state.displayDataSource.length;
    //let tailleItem =  (screen.height / 17) + (screen.height / 5) + .5 > sizeGlobalDisplay/displayLenght ? (screen.height / 17) + (screen.height / 5) + .5 : sizeGlobalDisplay/displayLenght;
    let tailleItem = sizeGlobalDisplay/displayLenght; 
    const tailleEcran = nativeEvent.layoutMeasurement.height;
    //console.log("taille ecran"+ tailleEcran);
    //console.log("Taille item"+tailleItem);
    //console.log("NB items visible : "+tailleEcran/tailleItem)
    let paquet = [ ];
    const itemTop = await this.percentageCalculator(tailleItem, nativeEvent.contentOffset.y);
    paquet.push(itemTop)
    const itemBottom = await this.percentageCalculatorBottom(tailleItem, nativeEvent.contentOffset.y+tailleEcran,sizeGlobalDisplay);
    let i = await itemTop.index;
    let j = itemBottom === null ? this.state.displayDataSource.length : itemBottom.index;
    //console.log("j : "+j)
    i++;
    for(i; i<j;i++){
      paquet.push(
        {
          index : i,
          title : this.state.displayDataSource[i].title,
          url : this.state.displayDataSource[i].url,
          percentage : "100%"
        }
      )
    }
    paquet.push(itemBottom)
    
    console.log(paquet)
    //console.log(tailleEcran/tailleItem)
    
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
  renderEmpty = () => {
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };
  renderFooter = () => {
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };
  async onRefresh() {
    await console.log('refreshing')
    await this.webCall();
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

      
      <FlatList
          data={ this.state.displayDataSource }
          debug={this.state.debug}
          extraData={this.state}
          refreshing={this.state.isLoading}
          onRefresh={()=>this.onRefresh()}
          ListEmptyComponent={this.renderEmpty}
          ListFooterComponent={this.renderFooter}
          ItemSeparatorComponent = {this.FlatListItemSeparator}
          renderItem={({item, index, nativeEvent}) => this.state.orientation === 'portrait' ? this.renderItem({item, index, nativeEvent}) : this.renderItemLandscape({item, index, nativeEvent}) }
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.5}
          onEndReached={({ distanceFromEnd }) => {
            this._ItemLoadMore();
         }}
         
          ref={ (el) => this._flatList = el }
          
        

          onLayout={ ({nativeEvent}) => {
            //console.log("onLayout")
            //console.log(nativeEvent)
            Platform.OS === 'ios' ? 
            this._flatList.scrollToOffset({
              offset: 1,
              animated: false
           }) :
           this._flatList.getScrollResponder().scrollTo({x: 0, y: 1, animated: true});
          } }
          getItemLayout={(data, index)=>this.getItemLayout(data, index)}
          viewabilityConfig={this.viewabilityConfig}
          onScroll={ ({ nativeEvent }) => {
            this._onScrollItem(nativeEvent);
          }}
          />
        
   );
  }
}
 
const styles = StyleSheet.create({
 
MainContainer :{
 
    justifyContent: 'center',
    flex:1,
    marginTop: (Platform.OS === 'ios') ? 20 : 0,
 
},
imageView: {
  height: screen.height / 5,

  margin: 7,
  borderRadius : 7,
  justifyContent: 'center', 
  alignItems: 'center',
},
offlineContainer: {
  backgroundColor: '#b52424',
  height: 30,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  width : screen.width,
  position: 'absolute',
  top: 30
},
offlineText: { color: '#fff' },
textView: { 
  textAlignVertical:'center',
  textAlign: 'center',
  padding:10,
  color: '#000',
  width : '80%',
  margin:0,
  padding:0

},
textViewLandscape: { 
    //width: screen.height < screen.width ?  screen.width/1.6 : screen.height/2,
    width: '63%',
    textAlignVertical:'center',
    alignItems: 'center',
    textAlign: 'left',
    //textAlign: 'left',
    //paddingTop:screen.height / 20,
    paddingTop: 30,
    //paddingBottom : 30,
    paddingLeft : 10,
    paddingRight : 10,
    //padding : 30,

    color: '#000', 
   // backgroundColor : 'yellow'

},
iconStyle:{
  color: 'black',
  width :'10%',
  paddingLeft: '3%',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop : 0,
  paddingBottom : 0
},
 
});
