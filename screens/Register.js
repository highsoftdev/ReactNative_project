import React, { Component } from 'react';
import {GET, POST, SERVER} from "../utils/nioUtils";
import { Container, Content, InputGroup, Input,Button , } from 'native-base';
import {
    StackNavigator,
} from 'react-navigation';
import {
    Platform,
    StyleSheet,
    Text,
    Image,
    AsyncStorage,
    TextInput,
    CheckBox,
    ActivityIndicator,
    ScrollView,
    Alert,
    View
} from 'react-native';
const  uuid = "ACCESS_KEY";

export default class Register extends Component {
  static navigationOptions = {header: null};
  constructor() {
        super();
        this.state = {
            showMe:false,
            email: "",
            isLoading:false,
            password :"",
            confirm_password :"",
            validate_email:"",
            validate_password:"",
            _email_validation: false,
            password_validation: false,
            confirmpassword_validation: false,
            userid:'',
            errors :[],
        }
    }
    password_validation(password)

    {
        this.setState({password_validation:false})


          if(password.length>0)
          {

              this.setState({password_validation:true})

              this.setState({password:password})
              this.setState({validate_password:''})
          }
          else{
              this.setState({password_validation:false})
              this.setState({validate_password:'Geben Sie bitte Ihr Kennwort ein und bestätigen Sie dieses.'})
          }							
         
    }
    _signin(){
      this.props.navigation.push('Login');
    }

    confirmpassword_validation(password)
    {
        this.setState({confirmpassword_validation:false})


          if(password.length>0)
          {

              this.setState({confirmpassword_validation:true})
              this.setState({confirm_password:password})
              this.setState({validate_password:''})
          }
          else{
              this.setState({confirmpassword_validation:false})
              this.setState({validate_password:'Geben Sie bitte Ihr Kennwort ein und bestätigen Sie dieses.'})
          }
          
    }

    email_validation(email){

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
         let empty  = '';

          if(email==''){	
              this.setState({validate_email:'Bitte geben Sie Ihre Email-Adresse ein.'})
              this.setState({_email_validation:false})

          }
        else if(reg.test(email) && (email.toLowerCase().indexOf('@daimler.com')>0 || email.toLowerCase().indexOf('@graubner-gmbh.de')>0)){
              this.setState({email:email});
              this.setState({validate_email:''})
              this.setState({_email_validation:true})
        }
        else if(reg.test(email) && (email.toLowerCase().indexOf('@daimler.com')<=0 && email.toLowerCase().indexOf('@graubner-gmbh.de')<=0)){
              this.setState({_email_validation: false});
              this.setState({validate_email:'Email-Adresse soll @daimler.com oder @graubner-gmbh.de enthalten.'})
            }
        else {
              this.setState({_email_validation: false});
              this.setState({email:email});
              this.setState({validate_email:'Ungültige Email-Adresse'})
          }
      }
      async _add_user_id(userid)
      {
          try {

              await AsyncStorage.setItem(uuid,userid);
              /*setItem(uuid, userid);*/
              this.props.navigation.push('Home');
          } catch (error) {

              Alert.alert("error");
              // Error saving data
          }


      }
      _registeruser(){
        if(this.state.isLoading==false){


        this.email_validation(this.state.email);
        this.password_validation(this.state.password);
        this.confirmpassword_validation(this.state.confirm_password);
        if(this.state._email_validation && this.state.password_validation && this.state.confirmpassword_validation){
          if(this.state.password != this.state.confirm_password){
            this.setState({validate_password:'Keine Übereinstimmung!'}) 
          }else{							
            this.setState({isLoading:true})
              this.setState({validate_password:''});
              this.setState({validate_email:''});
              let data = {
                email: this.state.email,
                password: this.state.password
              };
              POST(SERVER() + 'user/mobile/register', data).then(({body}) => {
                if(!body.status){
                    this.setState({validate_email:body.message});
                }
                 else{
                    Alert.alert("Bitte überprüfen Sie Ihre Emails.");
                  }			
                  this.setState({isLoading:false})
                }).catch(err => {                  
                  console.log(err);
                   this.setState({isLoading:false})
              })
          }
        }
        }
    }

  render() {
    
    return (
      <ScrollView style = {{backgroundColor:'#fff'}}>
            <View style={styles.container}>
                <View >
                    <Image style ={styles.image_style}
                        source={require('../images/icon.png')}
                    />
                </View>

                <View style = {styles.input_text_view_email}>
                <TextInput  style = {styles.input_text_style} placeholder="Email Addresse"  underlineColorAndroid='transparent' keyboardType= 'email-address'
                            onChangeText={(email) => this.email_validation(email)}
                            />
                  </View>

                <Text style ={[styles.email_validation_text,!this.state._email_validation? styles.error_text:null]}>{this.state.validate_email}</Text>
                <View style = {styles.input_text_view_password}>
                    <TextInput  style = {styles.input_text_style} placeholder="Kennwort"  underlineColorAndroid='transparent'  secureTextEntry={true}    onChangeText={(password) => this.password_validation(password)} />
                </View>
                <View style = {styles.input_text_view_password}>
                    <TextInput  style = {styles.input_text_style} placeholder="Kennwort bestätigen"  underlineColorAndroid='transparent'  secureTextEntry={true}    onChangeText={(confirm_password) => this.confirmpassword_validation(confirm_password)} />
                </View>
                <Text style ={[styles.email_validation_text,!this.state.confirmpassword_validation || !this.state.password_validation? styles.error_text:null]}>{this.state.validate_password}</Text>
                
                <View style = {styles.register_view}>
                      <Button block style={styles.btn_style} onPress={ () => this._registeruser() }>
                        <Text style={[styles.text, {color: '#fff'}]}>Registrieren</Text>
                      </Button>
                    </View> 

                <View style={styles.forget_regist_link_style}>

                   <View style ={styles.forget_text_view}>

                    <Text style={[styles.text, {textAlign: 'left',color:'#00677f', fontSize:15, marginTop:15}]}  onPress={() => this._signin()}>

                        Einloggen

                    </Text>

                   </View>

                    
                      </View>
                <View >
                    {
                        this.state.isLoading ?

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
       input_text_view_email:{
           marginTop:50,
           borderWidth:2,
           borderRadius: 0.5,
           borderColor: '#CCD1D1',
           width:300,
           borderBottomColor:'#00677f',
           backgroundColor:'#FFF'
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
    input_text_style:{
          height:40,
          textAlignVertical: 'center'
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