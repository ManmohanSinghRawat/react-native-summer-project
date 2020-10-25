import React, {Component} from 'react';
import { View, ScrollView , StyleSheet , Image ,Text, ToastAndroid} from "react-native";
import NetInfo from '@react-native-community/netinfo';
import Home from './HomeComponent';
import  {createStackNavigator, createDrawerNavigator, DrawerItems , SafeAreaView}  from 'react-navigation';
import Dishdetail from './DishDetail';
import Menu from './Menu';
import Contact from './Contact';
import AboutUs from './AboutUs';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchComments, fetchDishes, fetchLeaders, fetchPromos } from '../redux/ActionCreater';
import Reserve from './ReservationComponent';
import Favorites from './FavoriatesComponent';
import Login from './LoginComponent';

const mapStateToProps = state => {
  return {
    dish : state.dishReducer,
    leader: state.leaderReducer,
    promo: state.promotionReducer,
    comment: state.commentReducer
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
});

const HomeNavigator = createStackNavigator({
    Home: {screen: Home,}
}, {
    navigationOptions: ({navigation}) => ({
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTitleStyle:{
            color: "#fff"
        },
        headerTintColor: "#fff",
        headerLeft : <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()}/>
    })
});

const LoginNavigator = createStackNavigator({
    Login: {screen: Login}
}, {
    navigationOptions: ({navigation}) => ({
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTitleStyle:{
            color: "#fff"
        },
        headerTintColor: "#fff",
        headerLeft : <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()}/>
    })
});

const AboutUsNavigator = createStackNavigator({
    AboutUs: {screen: AboutUs}
}, {
    navigationOptions: ({navigation}) => ({
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTitleStyle:{
            color: "#fff"
        },
        headerTintColor: "#fff",
        headerLeft : <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()}/>
    })
});

const FavoriteNavigator = createStackNavigator({
    Favorites: {screen: Favorites}
}, {
    navigationOptions: ({navigation}) => ({
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTitleStyle:{
            color: "#fff"
        },
        headerTintColor: "#fff",
        headerLeft : <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()}/>
    })
});

const ReservationNavigator = createStackNavigator({
    Reserve: {screen: Reserve}
}, {
    navigationOptions: ({navigation}) => ({
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTitleStyle:{
            color: "#fff"
        },
        headerTintColor: "#fff",
        headerLeft : <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()}/>
    })
});

const ContactNavigator = createStackNavigator({
    Contact: {screen: Contact}
}, {
    navigationOptions: ({navigation}) => ({
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTitleStyle:{
            color: "#fff"
        },
        headerTintColor: "#fff",
        headerLeft : <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()}/>
    })
});

const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu , 
        navigationOptions: ({navigation}) => ({
            headerLeft : <Icon name='menu' size={24} color='white' onPress={() => navigation.toggleDrawer()}/>  
        })    
    },
    Dishdetail: { screen: Dishdetail}
},
{
    initialRouteName: 'Menu',
    navigationOptions: ({navigation}) => ({
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        }
    })
});

const DrawerHeader = (props) => (
    <ScrollView>
        <SafeAreaView style={style.container} forceInset={{top: "always", horizontal:"never"}}>
            <View style={style.drawerHeader}>
                <View style={{flex: 1}}>
                    <Image style={style.drawerImage} source={require('./images/logo.png')}></Image>
                </View>
                <View style={{flex: 2}}>
                    <Text style={style.drawerHeaderText}>My Resturent</Text>
                </View>
            </View>
        </SafeAreaView>
        <DrawerItems {...props} />
    </ScrollView>
);

const MainNavigator = createDrawerNavigator({
    Home: {
        screen : HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home',
            drawerIcon : ({tintColor, focused}) => (
                <Icon 
                    name = 'home'
                    type = 'font-awesome'
                    size ={24}
                    color = {tintColor}
                /> 
            )
        }
    },
    Menu: {
        screen : MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu',
            drawerIcon : ({tintColor, focused}) => (
                <Icon 
                    name = 'list'
                    type = 'font-awesome'
                    size ={24}
                    color = {tintColor}
                /> 
            )
        }
    },
    Favorite : {
        screen : FavoriteNavigator,
        navigationOptions: {
            title: 'My Favorites',
            drawerLabel: 'My Favorites',
            drawerIcon : ({tintColor}) => (
                <Icon 
                    name = 'heart'
                    type = 'font-awesome'
                    size ={24}
                    color = {tintColor}
                /> 
            )
        }
    },
    Reserve : {
        screen : ReservationNavigator,
        navigationOptions: {
            title: 'Reserve',
            drawerLabel: 'Reserve',
            drawerIcon : ({tintColor, focused}) => (
                <Icon 
                    name = 'cutlery'
                    type = 'font-awesome'
                    size ={24}
                    color = {tintColor}
                /> 
            )
        }
    },
    Contact: {
        screen : ContactNavigator,
        navigationOptions: {
            title: 'Contact',
            drawerLabel: 'Contact',
            drawerIcon : ({tintColor, focused}) => (
                <Icon 
                    name = 'address-card'
                    type = 'font-awesome'
                    size ={22}
                    color = {tintColor}
                /> 
            )
        }
    },
    AboutUs: {
        screen : AboutUsNavigator,
        navigationOptions: {
            title: 'About Us',
            drawerLabel: 'About Us',
            drawerIcon : ({tintColor, focused}) => (
                <Icon 
                    name = 'info-circle'
                    type = 'font-awesome'
                    size ={24}
                    color = {tintColor}
                /> 
            )
        }
    },
    Login: {
        screen : LoginNavigator,
        navigationOptions: {
            title: 'Login',
            drawerLabel: 'Login',
            drawerIcon : ({tintColor, focused}) => (
                <Icon 
                    name = 'sign-in'
                    type = 'font-awesome'
                    size ={24}
                    color = {tintColor}
                /> 
            )
        }
    }
}, {
    drawerBackgroungColor: "#D1C4E9",
    contentComponent: DrawerHeader
});

class Main extends Component {

    componentDidMount(){
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();

        NetInfo.fetch()
            .then((connectionInfo) => {
                ToastAndroid.show('Initial Network Connectivity Type: '
                    + connectionInfo.type ,
                    ToastAndroid.LONG);
            });
    }

    handleconnection = (connectionInfo) => {
        switch (connectionInfo.type) {
            case 'none':
              ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
              break;
            case 'wifi':
              ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
              break;
            case 'cellular':
              ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
              break;
            case 'unknown':
              ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
              break;
            default:
              break;
        }
    }

  render()
  {
    return (
        <View style={{flex:1}}>
            <MainNavigator />
        </View>
        
    );
  }
}

const style = StyleSheet.create({
    container: {
        flex : 1,
        marginTop : -35,
        paddingTop: 35
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        paddingTop: 35,
        height: 175,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
      },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(Main);

