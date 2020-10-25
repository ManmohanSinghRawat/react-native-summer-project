import React, {Component} from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Input, Icon , CheckBox, Button } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as Permissions from 'expo-permissions';
import { createBottomTabNavigator } from  'react-navigation';
import {baseUrl} from '../shared/BaseUrl';

class LoginTab extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }

    componentDidMount() {
        SecureStore.getItemAsync('userinfo')
            .then((userdata) => {
                let userinfo = JSON.parse(userdata);
                if (userinfo) {
                    this.setState({username: userinfo.username});
                    this.setState({password: userinfo.password});
                    this.setState({remember: true})
                }
            })
    }

    static navigationOptions = {
        title: 'Login',
        tabBarIcon: ({tintColor}) => (
            <Icon 
                name='sign-in'
                type='font-awesome'
                size={24}
                iconStyle={{color: tintColor}}
            />
        )
    };

    handleLogin(){
        console.log(JSON.stringify(this.state));
        if(this.state.remember){
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({username: this.state.username, password: this.state.password})
            ).catch((error) => console.log('Could not save user info', error));
        }
        else{
            SecureStore.deleteItemAsync('userinfo')
                .catch((error) => console.log('Could not delete user info', error));
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <Input
                    placeholder='Username'
                    leftIcon={<Icon type='font-awesome' name='user-o' />} 
                    containerStyle ={styles.formInput}
                    onChangeText ={(username) => this.setState({username})}
                    value = {this.state.username}
                ></Input>
                 <Input
                    placeholder='Password'
                    leftIcon={<Icon type='font-awesome' name='key' />} 
                    containerStyle ={styles.formInput}
                    onChangeText ={(password) => this.setState({password})}
                    value = {this.state.password}
                ></Input>
                <CheckBox
                    title="Remember Me"
                    checked={this.state.remember}
                    onPress={() => this.setState({remember : !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                ></CheckBox>
                <View style={styles.formButton}>
                    <Button
                        title="Login"
                        onPress={() => this.handleLogin() }
                        icon={
                            <Icon 
                                size={24}
                                name='sign-in'
                                type='font-awesome'
                                color='white'
                            />
                        }
                        buttonStyle={{backgroundColor:'#512DA8'}}
                    ></Button>
                    <View  style={styles.formButton}>
                        <Button
                            title="Register"
                            clear
                            onPress={() => this.props.navigation.navigate('Register') }
                            icon={
                                <Icon 
                                    size={24}
                                    name='user-plus'
                                    type='font-awesome'
                                    color='blue'
                                />
                            }
                            titleStyle={{color:'blue'}}
                        />
                    </View>
                </View>
            </View>
        );
    }
} 


class RegisterTab extends Component{
    constructor(props){
        super(props);
        this.state ={
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl + 'images/logo.png'
        }
    }

    static navigationOptions = {
        title: 'Login',
        tabBarIcon: ({tintColor}) => (
            <Icon 
                name='sign-in'
                type='font-awesome'
                size={24}
                iconStyle={{color: tintColor}}
            />
        )
    };

    getImageFromCamera = async() => {
        let permission = await Permissions.askAsync(Permissions.CAMERA);
        let cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if(permission.status === 'granted' && cameraRollPermission.status === 'granted'){
            let imagecapture = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [5, 4],
            });
            if(!imagecapture.cancelled){
                this.imageProcess(imagecapture.uri);
            }
        }
    }

    getImageFromGallery = async() => {
        let imagecapture = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [5, 4],
        });
        if(!imagecapture.cancelled){
            this.imageProcess(imagecapture.uri);
        }
    }

    imageProcess = async (imageurl) => {
        let processedImage = await ImageManipulator.manipulateAsync(
            imageurl, 
            [
                {resize: {width: 500}}
            ],
            {format: 'png'}
        );
        console.log(processedImage);
        this.setState({imageUrl: processedImage.uri });
    }

    handleRegister() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember)
            SecureStore.setItemAsync('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))
                .catch((error) => console.log('Could not save user info', error));
    }

    render(){
        return (
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <View style={{flex:1, margin:5}}>
                        <Image 
                            source={{uri: this.state.imageUrl}} 
                            loadingIndicatorSource={require('./images/logo.png')}
                            style={styles.image} 
                        />
                    </View>
                    <View style={{flex:1, margin:5}}>
                        <Button
                            title="Camera"
                            onPress={this.getImageFromCamera}
                        />
                    </View>
                    <View style={{flex:1, margin:5}}>
                        <Button
                            title="Gallery"
                            onPress={this.getImageFromGallery}
                        />
                    </View>
                </View>
                <Input
                    placeholder="First Name"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(firstname) => this.setState({firstname})}
                    value={this.state.firstname}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Last Name"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(lastname) => this.setState({lastname})}
                    value={this.state.lastname}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Email"
                    leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder='Username'
                    leftIcon={<Icon type='font-awesome' name='user-o' />} 
                    containerStyle ={styles.formInput}
                    onChangeText ={(username) => this.setState({username})}
                    value = {this.state.username}
                ></Input>
                 <Input
                    placeholder='Password'
                    leftIcon={<Icon type='font-awesome' name='key' />} 
                    containerStyle ={styles.formInput}
                    onChangeText ={(password) => this.setState({password})}
                    value = {this.state.password}
                ></Input>
                <CheckBox
                    title="Remember Me"
                    checked={this.state.remember}
                    onPress={() => this.setState({remember : !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                ></CheckBox>
                <View style={styles.formButton}>
                    <Button
                        title="Register"
                        onPress={() => this.handleRegister() }
                        icon={
                            <Icon 
                                size={24}
                                name='user-plus'
                                type='font-awesome'
                                color='white'
                            />
                        }
                        buttonStyle={{backgroundColor:'#512DA8'}}
                    ></Button>
                </View>
            </View>
            </ScrollView>
        );
    }
}

const Login = createBottomTabNavigator({
    Login: LoginTab,
    Register: RegisterTab
},
{
    tabBarOptions: {
        activeBackgroundColor: '#9575CD',
        inactiveBackgroundColor: '#D1C4E9',
        activeTintColor: '#ffffff',
        inactiveTintColor: 'gray'
    }
});

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    image: {
      marginBottom: 10,
      width: 80,
      height: 90
    },
    formInput: {
        margin: 0
    },
    formCheckbox: {
        margin: 0,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }
});

export default Login;
