import React, { Component } from 'react';
import { Container, Content, InputGroup, Input,Button } from 'native-base';

import {
    Platform,
    StyleSheet,
    Text,
    Image,
    TextInput,
    CheckBox,
    Alert,
    ActivityIndicator,
    View
} from 'react-native';

export default class Login extends Component<Props> {


    constructor() {

        super();
        this.state = {


             showMe:true,

            email: "",

            password :"",
            errors :[],


        }




    }


    _handlePress() {


        Alert.alert(this.state.email);


        this.setState({

            showMe: false,


        })


    }

    render() {

        return (


            <View style={styles.container}>



                <View >
                    <Image style ={styles.image_style}

                        source={require('../images/icon.png')}
                    />
                </View>

                <View style = {styles.input_text_view_email}>
                <TextInput  style = {styles.input_text_style} placeholder="Email Adresse"  underlineColorAndroid='transparent'  onChangeText={(val) => this.setState({email:val})}/>

                  </View>

                <View style = {styles.input_text_view_password}  >

                    <TextInput placeholder= "Kennwort"  underlineColorAndroid='transparent'  secureTextEntry={true}   onChangeText={(val) => this.setState({password:val})}/>

                </View>

               <View>


                   <CheckBox/>



               </View>

                <View  style={styles.btn_view_style}>

                <Button block style={styles.btn_style} onPress={ () => navigate('Home', { name: 'Jane' })} onPress={() => this._handlePress()}>
                    <Text style={[styles.text, {color: '#fff'}]}>Sign in</Text>
                </Button>
                </View>

                <View style={styles.forget_regist_link_style}>

                   <View style ={styles.forget_text_view}>

                    <Text style={[styles.text, {textAlign: 'left',color:'blue'}]}>

                        Forget Password ?

                    </Text>

                   </View>

                    <View style = {styles.register_view}>

                        <Text>

                            <Text style={[styles.text, {color:'blue'}]}>register</Text>


                        </Text>

                    </View>

                      </View>


                <View >

                    {

                        this.state.showMe ?

                        <ActivityIndicator />
                            :
                            <View>

                                <Text>hellow world</Text>

                            </View>

                    }
                </View>



            </View>
        );
    }
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
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

           height:40,

           borderWidth:2,
           borderRadius: 0.5,
           borderColor: '#CCD1D1',
           width:300,
           borderBottomColor:'#00677f',
           backgroundColor:'#FFF'


},


    input_text_style:{



        marginLeft:20,

        textAlign:'center',










        },

    input_text_view_password:{

        marginTop:30,
        borderWidth:2,
        height:40,
        borderRadius: 0.5,
        borderColor: '#CCD1D1',
        width:300,
        borderBottomColor:'#00677f',
        backgroundColor:'#FFF'

    },

    check_box_view: {


    },




    btn_view_style :{





    },

    btn_style:{

        marginTop:20,
        width:280,
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


      /*  flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',*/

    },


    input_text_style:{






    },


    check_box:{


        height:50,

        width:50,


    },






});
