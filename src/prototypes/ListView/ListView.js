import React, { Component } from 'react';
import { ListView, RefreshControl, Text, TouchableWithoutFeedback, Dimensions  } from 'react-native';
import Row from '../../components/Row';
import {
    NavigationActions ,
  } from 'react-navigation';
  /*
  import Header from './Header'; 
  import ListS from './List'; 
  import ListV from './ListView';
  import Movie from './Movie';
  import Vide from './Vide';
  import Home from './App';*/
  import {Actions} from 'react-native-router-flux';
  const demoDataNews = [
    //http://www.lefigaro.fr/flash-eco/2018/04/26/97002-20180426FILWWW00129-banlieues-borloo-propose-un-fonds-de-5-milliards-d-euros.php

    {
      title: 'À lui seul, l’iPhone X a compté pour 35 % des bénéfices de l’industrie au Q4 2017',
      rating: 'mer 11:51:16',
      image: 'https://www.numerama.com/content/uploads/2017/11/iphone-x-une-2.jpg',
      large: 'https://www.numerama.com/content/uploads/2017/11/iphone-x-une-2.jpg',
      plot: "Ciblé pour son prix exorbitant, révoltant pour certains, l'iPhone X fait le bonheur des comptes d'Apple.L’iPhone X a une encoche. L’iPhone X est sorti trop tôt. L’iPhone X est cher. Mais l’iPhone X rapporte beaucoup, beaucoup d’argent, suggérant une marge à nulle autre pareille pour Apple. Les chiffres du cabinet d’analyse Counterpoint, partagés par CNBC, mettent en avant la mainmise du flagship ultra premium sur un marché global très stable : durant le quatrième trimestre de l’année 2017, l’iPhone X a pesé pour 35 % des bénéfices à lui tout seul, malgré des ventes supposément inférieures aux attentes de la firme de Cupertino. C’est dire. ",
      url:'https://www.numerama.com/tech/346171-a-lui-seul-liphone-x-a-compte-pour-35-des-benefices-de-lindustrie-au-q4-2017.html'
    },
    {
      title: 'Snapchat permet désormais de créer ses propres filtres pour les visages',
      rating: 'mer 11:51:16',
      image: 'https://www.numerama.com/content/uploads/2017/05/snapchat.jpg',
      large: 'https://www.numerama.com/content/uploads/2017/05/snapchat.jpg',
      plot: "Snapchat permet à ses utilisateurs américains de créer des filtres pour les visages. Ils sont cependant payants, et non permanents, car associés à une localisation et une heure précises.",
      url:'https://www.numerama.com/tech/328280-snapchat-permet-desormais-de-creer-ses-propres-filtres-pour-les-visages.html'
    },
    {
      title: 'Microsoft dévoile un nouvel OS basé sur Linux',
      rating: '18/04/18 à 09h42 ',
      image: 'https://dyw7ncnq1en5l.cloudfront.net/optim/news/73/73481/microsoft-loves-linux-1-750x422.jpg',
      large: 'https://dyw7ncnq1en5l.cloudfront.net/optim/news/73/73481/microsoft-loves-linux-1-750x422.jpg',
      plot: "À Redmond, on a dû beaucoup en rire avant de monter sur scène pour annoncer un système d'exploitation maison basé sur Linux. Le moment quasi historique a eu lieu lors du grand colloque RSA (16-20 avril, San Francisco), spécialement dédié à la sécurité de l'information. Les équipes de Microsoft en ont profité pour présenter une solution complète pour objets connectés et c'est justement là qu'intervient la mise en place d'un OS surprise. Azure Sphere OS, c'est son nom, pourra ainsi équiper tout ce que l'on peut imaginer en solutions connectées pour les entreprises soucieuses de leur sécurité.Le système fait ainsi partie de l'ensemble Azure Sphere, sorte de cercle vertueux réunissant microcontrôleur et système d'exploitation sous l'égide d'une sécurité \"cloud\" chère à Microsoft. C'est donc sur la partie système qu'intervient ce Linux aménagé. Pour le géant américain, il s'agit d'une première en 43 ans, ajoutant faire face à une étape importante pour l'entreprise. Néanmoins, Microsoft s'est déjà rapproché du système créé par Linus Torvalds en accueillant Ubuntu sur le Windows Store ou avec l'intégration de l'interpréteur Bash au sein de Windows 10. ",
      url: 'https://www.lesnumeriques.com/appli-logiciel/microsoft-devoile-nouvel-os-base-sur-linux-n73481.html'   
   
    },
    {
      title: 'WhatsApp est désormais (officiellement) interdit aux moins de 16 ans dans l’UE',
      rating: 'mer 11:48:16',
      image: 'https://www.numerama.com/content/uploads/2018/04/whatsapp.jpg',
      large: 'https://www.numerama.com/content/uploads/2018/04/whatsapp.jpg',
      plot: "Pour se conformer au RGPD qui entre en application le 25 mai 2018 dans l'Union européenne, la messagerie de Facebook relève l'âge minimum d'utilisation de 13 à 16 ans. Mais dans les faits, cette décision semble peu applicable.",
      url: 'https://www.numerama.com/tech/350206-whatsapp-est-desormais-officiellement-interdit-aux-moins-de-16-ans-dans-lue.html'
    },
    {
      title: 'YouTube Kids : les parents peuvent n’autoriser que des vidéos validées par des humains',
      rating: 'hier a 18:27',
      image: 'https://www.numerama.com/content/uploads/2016/05/youtube-1920.jpg',
      large: 'https://www.numerama.com/content/uploads/2016/05/youtube-1920.jpg',
      plot: 'Critiqué pour le fonctionnement de ses algorithmes, YouTube Kids offre désormais la possibilité aux parents de filtrer davantage les contenus. Ils peuvent autoriser la visibilité des de vidéos uniquement validées par des modérateurs humains.',
      url: 'https://www.numerama.com/tech/350639-youtube-kids-les-parents-peuvent-nautoriser-que-des-videos-validees-par-des-humains.html'
    },
    {
      title: 'Quand Google Maps se met à utiliser les fast-foods dans la navigation',
      rating: 'hier 10:06:16',
      image: 'https://dyw7ncnq1en5l.cloudfront.net/optim/news/73/73489/5ad6edf02e75a__300_170.jpg',
      large: 'https://dyw7ncnq1en5l.cloudfront.net/optim/news/73/73489/istock-535415075.jpg',
      plot: "Comme l'attestent plusieurs utilisateurs américains de Google Maps, le service de navigation teste actuellement une nouvelle manière de dicter le guidage qui s'avère être beaucoup plus proche de celle des humains. Ainsi, au lieu d'entendre le sempiternel \"dans 100 mètres, tournez à droite\", Google Maps a commencé à dicter à certains utilisateurs américains intégrés à un échantillon de test des directions telles que : \"Tournez à droite après le Burger King\" ; \"À droite après le White Castle\" ; \"Prenez à droite après le KFC\".Si l'on met de côté la surreprésentation des enseignes de restauration rapide — nous sommes aux États-Unis —, il faut avouer que cette manière de présenter la route à suivre est bien plus claire. Les \"Prendre à gauche au troisième feu\" et autres \"Sortez du rond-point par la quatrième sortie\" pouvant parfois donner lieu à des hésitations."
      ,url: 'https://www.lesnumeriques.com/vie-du-net/quand-google-maps-se-met-a-utiliser-fast-foods-dans-navigation-n73489.html'
    },
    {
      title: 'Snappables : Snapchat veut que vous grimaciez pour jouer',
      rating: 'mer 11:51:16',
      image: 'https://www.numerama.com/content/uploads/2018/04/snappables-hero-shot.jpg',
      large: 'https://www.numerama.com/content/uploads/2018/04/snappables-hero-shot.jpg',
      plot: "Snapchat vient de lancer Snappables, une nouvelle option qui permet de contrôler des jeux en réalité augmentée par les expressions du visage. Ces nouvelles Lenses seront déployées cette semaine sur Android et iOS.",
      url:'https://www.numerama.com/tech/350662-snappables-snapchat-veut-que-vous-grimaciez-pour-jouer.html'
    },
    {
      title: 'Grève à la RATP : le trafic sera légèrement perturbé jeudi',
      rating: '18/04/18 à 09h42 ',
      image: 'http://s1.lprs1.fr/images/2018/04/18/7670484_e1b8f7dc-42e1-11e8-9275-09e60a2c58a8-1_1000x625.jpg',
      large: 'http://s1.lprs1.fr/images/2018/04/18/7670484_e1b8f7dc-42e1-11e8-9275-09e60a2c58a8-1_1000x625.jpg',
      plot:"Ce n’est pas un appel à la grève, « mais plutôt une possibilité offerte aux salariés qui le souhaitent d’aller manifester », explique-t-on à l’Unsa RATP.Les trois organisations syndicales de la RATP (CGT, Sud et Unsa) ont déposé un préavis de grève pour cette nouvelle journée de mobilisation de jeudi. Etudiants, personnels hospitaliers ou encore cheminots ont prévu de manifester pour « stopper la régression sociale ».En conséquence, le trafic sera légèrement perturbé sur les RER et bus, et normal sur le reste du réseau RATP.",
      url: 'http://www.leparisien.fr/info-paris-ile-de-france-oise/transports/preavis-de-greve-a-la-ratp-trafic-legerement-perturbe-ce-jeudi-18-04-2018-7670484.php'  
    
    },
     {
      title: 'Le code d’un téléphone peut être exigé en garde à vue',
      rating: ' 18/04/2018 à 11:30 ',
      image: 'https://img.igen.fr/2018/4/macgpic-1524040054-72614127157932-sc-jpt.jpg',
      large: 'https://img.igen.fr/2018/4/macgpic-1524040054-72614127157932-sc-jpt.jpg',
      plot:"Une décision du Conseil constitutionnel délivrée le 30 mars dernier et signalée cette semaine par le quotidien Le Monde permet aux forces de l’ordre d’exiger le code de déverrouillage d’un téléphone, d’une tablette ou d’un ordinateur à tout suspect en garde à vue. Un refus d’obtempérer est alors passible de poursuites qui peuvent aboutir à une peine de trois ans d’emprisonnement et d’une amende de 270 000 €. ",
      url: 'https://www.igen.fr/ailleurs/2018/04/le-code-dun-telephone-peut-etre-exige-en-garde-vue-103705'
    },
    {
      title: 'Fortnite : une fac américaine offre une bourse aux joueurs talentueux',
      rating: ' 18/04/2018 à 11:30 ',
      image: 'https://www.numerama.com/content/uploads/2018/04/fortnite2fbattle-royale2ffortnite-sniper-1920x1080-f072fcef414cbe680e369a16a8d059d8a01c7636.jpg',
      large: 'https://www.numerama.com/content/uploads/2018/04/fortnite2fbattle-royale2ffortnite-sniper-1920x1080-f072fcef414cbe680e369a16a8d059d8a01c7636.jpg',
      plot:"Le succès de Fortnite ne tarit pas. Le jeu s'offre une place dans le programme esport de l'université américaine de l'Ohio qui, pour marquer le coup, a décidé d'offrir une bourse aux joueurs assez talentueux pour rejoindre leur programme. ",
      url: 'https://www.numerama.com/tech/349224-fortnite-une-fac-americaine-offre-une-bourse-aux-joueurs-talentueux.html'
    },
  ];

const demoData = [
    {
      title: 'Zootopia',
      rating: 98,
      image: 'https://resizing.flixster.com/KlpTsb1_ZvS6qRLZHs9ao5LC8rk=/740x290/v1.bjsxMDQ5NDU2O2o7MTcxNTc7MTIwMDsyMDQ4OzEzMjU',
      large: 'https://resizing.flixster.com/IBgqlHT_rKpHSVNsM0sXqbV4LRQ=/fit-in/1152x864/v1.bjsxMDQ5NDU2O2o7MTcxNTc7MTIwMDsyMDQ4OzEzMjU',
      plot: "The modern mammal metropolis of Zootopia is a city like no other. Comprised of habitat neighborhoods like ritzy Sahara Square and frigid Tundratown, it's a melting pot where animals from every environment live together-a place where no matter what you are, from the biggest elephant to the smallest shrew, you can be anything. But when rookie Officer Judy Hopps (voice of Ginnifer Goodwin) arrives, she discovers that being the first bunny on a police force of big, tough animals isn't so easy. Determined to prove herself, she jumps at the opportunity to crack a case, even if it means partnering with a fast-talking, scam-artist...",
    },
    {
      title: 'Hell or High Water',
      rating: 98,
      image: 'https://resizing.flixster.com/LLIZ382Kh4RT6CT9gqiUIEo0mBg=/740x290/v1.bjsxMTE5MTAzO2o7MTcxNTc7MTIwMDszMDAwOzIwMDA',
      large: 'https://resizing.flixster.com/DkiyuHT_3ElnSROaH9SmrU6PaSg=/fit-in/1152x864/v1.bjsxMTE5MTAzO2o7MTcxNTc7MTIwMDszMDAwOzIwMDA',
      plot: 'Texas brothers--Toby (Chris Pine), and Tanner (Ben Foster), come together after years divided to rob branches of the bank threatening to foreclose on their family land. For them, the hold-ups are just part of a last-ditch scheme to take back a future that seemed to have been stolen from under them. Justice seems to be theirs, until they find themselves on the radar of Texas Ranger, Marcus (Jeff Bridges) looking for one last grand pursuit on the eve of his retirement, and his half-Comanche partner, Alberto (Gil Birmingham). As the brothers plot a final bank heist to complete their scheme, and with the Rangers on their heels, a...',
    },
    {
      title: 'The Jungle Book',
      rating: 95,
      image: 'https://resizing.flixster.com/4n38K0ACGyX61Pwe7prYKrN4Eu0=/740x290/v1.bjsxMDUzNDE0O2o7MTcxNTc7MTIwMDsyMDk4OzExNzQ',
      large: 'https://resizing.flixster.com/Oye7lbY02WO0WV_KugmP5FlYHEA=/fit-in/1152x864/v1.bjs5NDIxMDM7ajsxNzE1NTsxMjAwOzUwMDA7MjgxMw',
      plot: 'In this reimagining of the classic collection of stories by Rudyard Kipling, director Jon Favreau uses visually stunning CGI to create the community of animals surrounding Mowgli (Neel Sethi), a human boy adopted by a pack of wolves. The appearance of a villainous tiger named Shere Khan (voiced byIdris Elba) forces Mowgli\'s guardian, the panther Bagheera (Ben Kingsley), to shepherd the child to safety in the "man village." Along the way, the boy meets an affable, lazy bear named Baloo (Bill Murray), as well as a snake with hypnotic powers (Scarlett Johansson) and an orangutan (Christopher Walken) who wants to harness...',
    },
    {
      title: 'Love & Friendship',
      rating: 98,
      image: 'https://resizing.flixster.com/eW-nwFBWfzeD-IY08qy6gI-prgc=/740x290/v1.bjsxMDk4NjAyO2o7MTcxNTc7MTIwMDs2MTQ0OzQwOTY',
      large: 'https://resizing.flixster.com/M25ijUAdQfuQpWm7BJr_ggz2X6M=/fit-in/1152x864/v1.bjsxMDk4NjAyO2o7MTcxNTc7MTIwMDs2MTQ0OzQwOTY',
      plot: 'Beautiful young widow Lady Susan Vernon visits to the estate of her in-laws to wait out the colourful rumours about her dalliances circulating through polite society. Whilst ensconced there, she decides to secure a husband for herself and a future for her eligible but reluctant daughter, Frederica. In doing so she attracts the simultaneous attentions of the young, handsome Reginald DeCourcy, the rich and silly Sir James Martin and the divinely handsome, but married, Lord Manwaring, complicating matters severely...',
    },
    {
      title: 'Finding Dory',
      rating: 94,
      image: 'https://resizing.flixster.com/S8_NJxnxvIA9tKpzeUnQudSDlTw=/740x290/v1.bjsxMTI5MDgyO2o7MTcxNTg7MTIwMDsxODAwOzg0MA',
      large: 'https://resizing.flixster.com/nmL3PCIDGK7eOxL-fcAZ8ApNb34=/fit-in/1152x864/v1.bjsxMDU5OTI3O2o7MTcxNTc7MTIwMDs0MjcyOzIzMDI',
      plot: '"Finding Dory" reunites the friendly-but-forgetful blue tang fish with her loved ones, and everyone learns a few things about the true meaning of family along the way. The all-new big-screen adventure dives into theaters in 2016, taking moviegoers back to the extraordinary underwater world from the original film...',
    },
    {
      title: 'Hunt for the Wilderpeople',
      rating: 98,
      image: 'https://resizing.flixster.com/Z2wwu1dCuCecg4TzOeJe82c_kjU=/740x290/v1.bjsxMDkyNjEyO2o7MTcxNTc7MTIwMDsyMDQ4OzEzNjM',
      large: 'https://resizing.flixster.com/yV1MZxQiMaVx8I3qfYbO0rDJLNg=/fit-in/1152x864/v1.bjsxMDkyNjEyO2o7MTcxNTc7MTIwMDsyMDQ4OzEzNjM',
      plot: 'Raised on hip-hop and foster care, defiant city kid Ricky gets a fresh start in the New Zealand countryside. He quickly finds himself at home with his new foster family: the loving Aunt Bella, the cantankerous Uncle Hec, and dog Tupac. When a tragedy strikes that threatens to ship Ricky to another home, both he and Hec go on the run in the bush. As a national manhunt ensues, the newly branded outlaws must face their options: go out in a blaze of glory or overcome their differences and survive as a family. Equal parts road comedy and rousing adventure story, director Taika Waititi (WHAT WE DO IN THE SHADOWS, upcoming...',
    },
    {
      title: 'Kubo and the Two Strings',
      rating: 97,
      image: 'https://resizing.flixster.com/6mem3h1225eHWjxuIp7DbwsQl5I=/740x290/v1.bjsxMTUxNzQ5O2o7MTcxNTg7MTIwMDsyMDQ4Ozg1OA',
      large: 'https://resizing.flixster.com/aA0m4xiyBEDpyCSZ5U-e_apqueI=/fit-in/1152x864/v1.bjsxMDE1NjA4O2o7MTcxNTY7MTIwMDsxMDI0OzEwMjQ',
      plot: 'Kubo and the Two Strings is an epic action-adventure set in a fantastical Japan from acclaimed animation studio LAIKA. Clever, kindhearted Kubo (voiced by Art Parkinson of "Game of Thrones") ekes out a humble living, telling stories to the people of his seaside town including Hosato (George Takei), Akihiro (Cary-Hiroyuki Tagawa), and Kameyo (Academy Award nominee Brenda Vaccaro). But his relatively quiet existence is shattered when he accidentally summons a spirit from his past which storms down from the heavens to enforce an age-old vendetta. Now on the run, Kubo joins forces with Monkey (Academy Award...',
    },
    {
      title: 'Captain America: Civil War',
      rating: 90,
      image: 'https://resizing.flixster.com/b4pCL3JsCWG7cHVQHSuKQICkGY4=/740x290/v1.bjsxMDYyMDcwO2o7MTcxNTc7MTIwMDsyMDAwOzEzMzM',
      large: 'https://resizing.flixster.com/Gqa03F1e9dz4oQR0NjrxUOxbYMc=/fit-in/1152x864/v1.aDsxMzQ5MzE7ajsxNzE0NjsxMjAwOzIxNTg7MTEzNg',
      plot: 'Marvel\'s "Captain America: Civil War" finds Steve Rogers leading the newly formed team of Avengers in their continued efforts to safeguard humanity. But after another incident involving the Avengers results in collateral damage, political pressure mounts to install a system of accountability, headed by a governing body to oversee and direct the team. The new status quo fractures the Avengers, resulting in two camps-one led by Steve Rogers and his desire for the Avengers to remain free to defend humanity without government interference, and the other following Tony Stark\'s surprising decision to support government...',
    },
    {
      title: 'Sing Street',
      rating: 97,
      image: 'https://resizing.flixster.com/D8Vx220eg3b8Rs_mNnB1UXQtB7Y=/740x290/v1.bjsxMDc1MjQ4O2o7MTcxNTc7MTIwMDsxMTcxOzc2OA',
      large: 'https://resizing.flixster.com/KgXoAetuj_hehmjej-tzme82SEg=/fit-in/1152x864/v1.bjsxMDc1MjQ4O2o7MTcxNTc7MTIwMDsxMTcxOzc2OA',
      plot: 'From director John Carney (ONCE, BEGIN AGAIN), SING STREET takes us back to 1980s Dublin seen through the eyes of a 14-year-old boy named Conor (Ferdia Walsh-Peelo) who is looking for a break from a home strained by his parents\' relationship and money troubles, while trying to adjust to his new inner-city public school where the kids are rough and the teachers are rougher. He finds a glimmer of hope in the mysterious, über-cool and beautiful Raphina (Lucy Boynton), and with the aim of winning her heart he invites her to star in his band\'s music videos. There\'s only one problem: he\'s not part of a band...yet. She...',
    },
    {
      title: 'Moonlight',
      rating: 99,
      image: 'https://resizing.flixster.com/uqgUagErgMx2ew7AUMX8pfU8ehQ=/740x290/v1.bjsxMjI0NTk3O2o7MTcxNTk7MTIwMDsxMjgwOzcyMA',
      large: 'https://resizing.flixster.com/uFehzMj2094RvPYwVaza7Ev6ec4=/fit-in/1152x864/v1.bjsxMjM2MDY2O2o7MTcxNTk7MTIwMDsyMDcyOzIwNzI',
      plot: 'The tender, heartbreaking story of a young man\'s struggle to find himself, told across three defining chapters in his life as he experiences the ecstasy, pain, and beauty of falling in love, while grappling with his own sexuality.',
    },
  ];
const {width, height} = Dimensions.get('window')
console.log(width, height)
  export default class List extends React.Component  {
    constructor(props)
    {
        super(props);

    }
    static navigationOptions = {
        title: "SmartNews",
        headerLeft: null
    }
    
    
    /**
     * Store the data for ListView
     */
    state = {
        // ListView DataSource object
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        // Used for RefreshControl
        isRefreshing: false,
      }
      
    /**
     * Call _fetchData after component has been mounted
     */
    componentDidMount() {
        // Fetch Data
        this._fetchData();

        setInterval( () => {
          this.setState({
            curTime : new Date().toLocaleString()
          })
        },1000)
      }
  
    /**
     * Prepare demo data for ListView component
     */
    _fetchData = () => {
        // Data is being refreshed
        this.setState({ isRefreshing: true });
        this.setState({
          // Fill up DataSource with demo data
          dataSource: this.state.dataSource.cloneWithRows(demoDataNews),
          // Data has been refreshed by now
          isRefreshing: false,
          // set Date 
          curTime : new Date().toLocaleString(),
        });
      }
  
    /**
     * Render a row
     */
    alertItemName = (item) => {
        alert(item.title)
        //this.props.navigation.dispatch(navigateAction)
        //navigate("WelcomeView", {screen: "WelcomeView"})
     }
    _renderRow = (movie) => {
        //const { navigate } = this.props.navigation
        return (
          <Row
            // Pass movie object
            movie={movie}
            // Pass a function to handle row presses
            
            onPress={()=>{ 
                console.log(movie.url)
                //Actions.webviewcustom(movie)
                Actions.details(movie)
              }}
          />
        );
      }
      _handleScroll = (event) => {
        const oneRow = (height/3)+5;
        console.log("##################################");
        //console.log(event.nativeEvent);
        //console.log(this.state); 
        console.log(this.state.curTime)
        console.log("la taille :"+height);
        const taille = event.nativeEvent.layoutMeasurement.height;
        console.log("La position du scroll :"+event.nativeEvent.contentOffset.y)
        console.log("ta taille de la listView :"+event.nativeEvent.contentSize.height)
        console.log("le nombre de row:"+this.state.dataSource._cachedRowCount);
        console.log("la taille d'un seul row:"+(event.nativeEvent.contentSize.height/this.state.dataSource._cachedRowCount));
        //sachant que l'ecran fait 603
        


        if(event.nativeEvent.contentOffset.y > (event.nativeEvent.contentSize.height/this.state.dataSource._cachedRowCount)){
          //split('-')[0]
          const logRow = event.nativeEvent.contentOffset.y/(event.nativeEvent.contentSize.height/this.state.dataSource._cachedRowCount)+" ";
          const logRowPercent = "0."+logRow.split('.')[1];
          const logRowID = logRow.split('.')[0]
          console.log("% du premier article afficher : "+(1-logRowPercent));
          console.log("taille en px du premier row affiché "+(1-logRowPercent)*(event.nativeEvent.contentSize.height/this.state.dataSource._cachedRowCount));
          const sizeFistRow = (1-logRowPercent)*(event.nativeEvent.contentSize.height/this.state.dataSource._cachedRowCount);
          const nbDeRow = (taille-sizeFistRow)+" ";
          console.log("reste en px : "+nbDeRow+" le reste en nb : "+ nbDeRow/(event.nativeEvent.contentSize.height/this.state.dataSource._cachedRowCount));
          const logRowLast = nbDeRow/(event.nativeEvent.contentSize.height/this.state.dataSource._cachedRowCount)+ " ";
          const logRowLastPercent = "0."+logRowLast.split('.')[1];
          console.log("% du dernier article afficher : "+logRowLastPercent);
        }else{
          //cas le scroll a pas encore dépassé un article
          //console.log("id du premier article afficher : "+(event.nativeEvent.contentSize.height/this.state.dataSource._cachedRowCount))
          console.log("% du premier article afficher : "+(1-(event.nativeEvent.contentOffset.y/(event.nativeEvent.contentSize.height/this.state.dataSource._cachedRowCount))));
          console.log("taille en px du premier row affiché : "+(1-(event.nativeEvent.contentOffset.y/(event.nativeEvent.contentSize.height/this.state.dataSource._cachedRowCount)))*(event.nativeEvent.contentSize.height/this.state.dataSource._cachedRowCount));
          const sizeFistRow = (1-(event.nativeEvent.contentOffset.y/(event.nativeEvent.contentSize.height/this.state.dataSource._cachedRowCount)))*(event.nativeEvent.contentSize.height/this.state.dataSource._cachedRowCount);
          
        }


        
       
        console.log("##################################");

        //si event.nativeEvent.contentOffset.y + layoutMeasurement.height = contentSize.height
          // > alors l'utilisateur est la fin de la page. 
        //console.log("nb de px affiché : "+height+" postion px haut :"+event.nativeEvent.contentOffset.y);
       } 
    /** 
     * Renders the list
     */
    
    render() {
        return (
          <TouchableWithoutFeedback >
          <ListView height={height}
            onScroll={this._handleScroll}
            // Data source from state
            dataSource={this.state.dataSource}
            // Row renderer method
            renderRow={this._renderRow}
            // Refresh the list on pull down
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this._fetchData}
              />
            }
          />
          </TouchableWithoutFeedback>

        );
      }
  }

//https://rationalappdev.com/react-native-list-app-complete-how-to-guide/