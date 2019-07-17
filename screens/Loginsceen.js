import React, { Component } from 'react';
import { Container, Content, InputGroup, Input,Button , } from 'native-base';
import {GET, POST, SERVER} from "../utils/nioUtils";
import {
    StackNavigator,
} from 'react-navigation';
import  CheckBox  from 'react-native-check-box'

import {
    Platform,
    StyleSheet,
    Text,
    Image,
    AsyncStorage,
    TextInput,
    ActivityIndicator,
    ScrollView,
    Alert,
    View
} from 'react-native';
const  uuid = "ACCESS_KEY";
const  remember = "REMEMBER_ME";

export default class Log extends Component<> {
    static navigationOptions = { header: null };
    constructor() {
        super();
        console.disableYellowBox = true;
        this.rememberme = false

        this.state = {
            showMe:false,
            email: "",
            isLoading:false,
            password :"",
            validate_email:"",
            validate_password:"",
            validation: true,
            userid:'',
            errors :[],
        }
    }
    async _add_user_id(userid)
    {
        try {

            await AsyncStorage.setItem(uuid,userid);
            if(this.rememberme){              
              await AsyncStorage.setItem(remember,'true');
            }
            /*setItem(uuid, userid);*/
            this.props.navigation.push('Home');
        } catch (error) {

            Alert.alert("error");
            // Error saving data
        }


    }


    async  _getuserid()
    {

        try {
         let value =  await AsyncStorage.getItem(uuid)/*setItem(uuid, userid);*/
            Alert.alert(value);
             this.this.props.navigation.push("Home");
        } catch (error) {
            // Error saving data


        }

    }

    async _handlePress() {
      
        if (this.state.validation == true) {
            let data = {
                email: this.state.email,
                password: this.state.password,
            };
            POST(SERVER() + 'user/mobile/login', data).then(({body}) => {
                if(!body.status){
                    Alert.alert(body.message);
                    this.setState({validate_email:body.message});
                }
                else if(body.status) {
                    var userid = body.data.uuid;
                   this._add_user_id(userid)

                }


            }).catch(err => {

                console.log(err);
            })


        }

        else {



        }
    }


    _registeruser(){
        this.props.navigation.push('Register');
        /*if (this.state.validation == true) {
            let data = {
                email: this.state.email,
            };
            POST('http://62.138.23.77:3002/user/mobile/register', data).then(({body}) => {



                    Alert.alert(body.message);


                console.log(body);

            }).catch(err => {
                console.log(err);
            })
        }

        else {

        }*/

    }

    _forgotPassword(){

      this.props.navigation.push('Forgot');
        /*if (this.state.validation == true) {

            let data = {
                email: this.state.email,

            };
            POST('http://62.138.23.77:3002/user/mobile/forgetPassword', data).then(({body}) => {

                this.setState({isLoading: false})
                Alert.alert(body.message);
                console.log(body.message);

            }).catch(err => {
                console.log(err);
            })
        }

        else {

        }*/
    }
    email_validation(email){

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
         let empty  = '';

          if(email==''){
              this.setState({validate_email:'Geben Sie bitte Ihre Email-Adresse ein.'})
              this.setState({validation:false})

          }
        else if(reg.test(email) && (email.toLowerCase().indexOf('@daimler.com')>0 || email.toLowerCase().indexOf('@graubner-gmbh.de')>0)){
              this.setState({email:email});
              this.setState({validate_email:''});
              this.setState({validation:true});
        }
        else if(reg.test(email) && (email.toLowerCase().indexOf('@daimler.com')<=0 && email.toLowerCase().indexOf('@graubner-gmbh.de')<=0)){
              this.setState({validation: false});
              this.setState({validate_email:'Email-Adresse soll @daimler.com oder @graubner-gmbh.de enthalten.'});
            }
        else {
              this.setState({validation: false});
              this.setState({email:email});
              this.setState({validate_email:'Ungültige Email-Adresse'});
          }
      }
      
    password_validation(password)

    {
        this.setState({validation:false})


          if(password.length>0)
          {

              this.setState({validation:true})

              this.setState({password:password})

          }

             else if(password<=0){


              this.setState({validation:false})

              this.setState({validate_password:'Geben Sie bitte Ihr Kennwort ein.'})
          }
    }
    clickRememberMe(){
      this.rememberme = !this.rememberme;
    }
    render() {

        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20,}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return (

            <ScrollView style = {{backgroundColor:'#fff'}}>
            <View style={styles.container}>
                <View >
                    <Image style ={styles.image_style}
                        source={require('../images/icon.png')}
                    />
                </View>

                <View style = {styles.input_text_view_email}>
                <TextInput  style = {styles.input_text_style} placeholder="Email Adresse"  underlineColorAndroid='transparent' keyboardType= 'email-address'
                            onChangeText={(email) => this.email_validation(email)}
                            />
                  </View>

                <Text style ={[styles.email_validation_text,!this.state.validation? styles.error_text:null]}>{this.state.validate_email}</Text>
                <View style = {styles.input_text_view_password}>
                    <TextInput  style = {styles.input_text_style} placeholder="Kennwort"  underlineColorAndroid='transparent'  secureTextEntry={true}    onChangeText={(password) => this.password_validation(password)} />

                </View>
                <Text style ={[styles.email_validation_text,!this.state.validation? styles.error_text:null]}>{this.state.validate_password}</Text>
               <View style ={styles.check_box_view}>
                   <CheckBox style = {styles.check_box} isChecked={this.rememberme}     rightText='Eingeloggt bleiben' onClick={()=>this.clickRememberMe()}/>
               </View>
                <View  style={styles.btn_view_style}>
                <Button block style={styles.btn_style} onPress={() => this._handlePress()}>
                    <Text style={[styles.text, {color: '#fff'}]}>Einloggen</Text>
                </Button>
                </View>
                <View style = {styles.register_view}>
                      <Button block style={styles.btn_style} onPress={ () => this._registeruser() }>
                        <Text style={[styles.text, {color: '#fff'}]}>Registrieren</Text>
                      </Button>
                    </View>
                <View style={styles.forget_regist_link_style}>

                   <View style ={styles.forget_text_view}>

                    <Text style={[styles.text, {textAlign: 'left',color:'#00677f', fontSize:15, marginTop:15}]}  onPress={() => this._forgotPassword()}>

                        Kennwort vergessen?

                    </Text>

                   </View>

                    
                      </View>
                <View >
                    {
                        this.state.showMe ?

                            <ActivityIndicator />
                            :
                            <View>



                            </View>

                    }
                </View>
            </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        backgroundColor: '#FFF',
        flexDirection: 'column',
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

       image_style : {
        marginTop:30,
        height:100,
        width:100,
       },

       input_text_style:{
          height:40,
          textAlignVertical: 'center'
       },

       input_text_view_email:{
           marginTop:50,
           borderWidth:2,
           borderRadius: 0.5,
           borderColor: '#CCD1D1',
           width:300,
           borderBottomColor:'#00677f',
           backgroundColor:'#FFF',

},
    input_text_view_password:{
        marginTop:30,
        borderWidth:2,
        borderRadius: 0.5,
        borderColor: '#CCD1D1',
        width:300,
        borderBottomColor:'#00677f',
        backgroundColor:'#FFF',
    },
    check_box_view: {
         width:300,
         marginTop:15,
         alignItems:'flex-start',
         backgroundColor: '#FFF',
         flexDirection: 'row',
    },
      email_validation_text:{
        marginTop:5,
          color:'#00677f',
      },

    check_box:{
      flex: 1, 
      padding: 10
    },

    check_box_text:{

        marginTop:5,
        width:100,

    },


    btn_style:{

        marginTop:15,
        width:300,
        backgroundColor: '#00677f',
        borderRadius:10,


    },

    forget_regist_link_style:{
           marginTop:10,
           width:280,
           flexDirection:'row',
           alignItems:'center',
           justifyContent:'space-between',
    },

    forget_text_view:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    register_view:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },

    error_text:{
         borderColor:'red',
        backgroundColor:'red',
    }

});
