import React, { Component } from 'react';


import  Login  from './screens/LoginScreen';
import  Log     from  './screens/Loginsceen';
import  Register     from  './screens/Register';
import  Home   from  './screens/MainScreen';
import  Forgot   from  './screens/Forgot';

import {
    StackNavigator,

} from 'react-navigation';


import {
    Platform,
    StyleSheet,
    Text,
    AppRegistry,
    AsyncStorage,
    View, Alert
} from 'react-native';

const  uuid = "ACCESS_KEY";
const  remember = "REMEMBER_ME";

export default class App extends Component<> {


    constructor(props) {

        super(props);

        this.state ={

                userid:null

        }

    }

    componentDidMount() {

        this._getuserid();

    }


    async  _getuserid()
    {

        try {
            let value =  await AsyncStorage.getItem(uuid)/*setItem(uuid, userid);*/
            let rememberme =  await AsyncStorage.getItem(remember)
            if(rememberme == 'true'){
                this.setState({userid:value})
                //this.props.navigation.push("Home");
            }
            
            /*this.this.props.navigation.push("Home");*/
        } catch (error) {
            // Error saving data



        }


    }





    static navigationOptions = {
        headerMode: 'none'
    };

    render() {



        if (this.state.userid!=null) {

            return (
                <View style={styles.container}>


                    <RootStack1/>

                </View>

            );
        }

        else {
            return (
                <View style={styles.container}>


                    <RootStack/>

                </View>

            );
        }
    }
}
const RootStack = StackNavigator(





    {
        Home: { screen: Home },
        Login: { screen: Log },
        Register: { screen: Register },
        Forgot: { screen: Forgot }
    },
    {


        initialRouteName: "Login",

    }
);

const RootStack1 = StackNavigator(

    {
        Home: { screen: Home },
        Login: { screen: Log },
        Register: { screen: Register },
        Forgot: { screen: Forgot }
    },
    {


        initialRouteName: "Home",

    }
);


const styles = StyleSheet.create({
    container: {
        flex:1,

        backgroundColor: '#FFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});


