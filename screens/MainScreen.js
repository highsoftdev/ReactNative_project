import React, { Component } from 'react';
import {Label, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text,InputGroup,Input} from 'native-base';
import {GET, POST, SERVER} from "../utils/nioUtils";
import Communications from 'react-native-communications';
import PopupDialog, {DialogButton, DialogTitle, SlideAnimation } from 'react-native-popup-dialog';
import {ScrollView} from 'react-native';
import { Dimensions } from 'react-native';
import {
    MenuContext,
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';



import {
    Image,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Alert,
    AsyncStorage,
    View,
    TextInput,
    ToolbarAndroid,


} from 'react-native';

const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});

const  uuid = "ACCESS_KEY";
const  remember = "REMEMBER_ME";


export default class Home extends Component {

    static navigationOptions = {header: null};


    constructor(props, ctx) {
        super(props, ctx);

        // Event Listener for orientation changes
    Dimensions.addEventListener('change', () => {
        if(this.state.popup!=null && this.state.isDialogShown.toString() == 'true'){
          this.state.popup.dismiss();
          this.state.popup.show(); 
        }

    });  
    


        this.state = {
            isDialogShown: false,
            popup: null,
            isLoading: true,
            arrayholder: [],
            userid: '',
            opened: true,
            height: 0.6,
            width: Dimensions.get('window').width<Dimensions.get('window').height? Dimensions.get('window').width-10 : Dimensions.get('window').height-10,
            isMoreDetail: false,
            text: '',
            company_name: '',
            contact_name: '',
            email: '',
            phone_mobile: '',
            phone_office: '',
            position:'',
            street:'',
            town:'',
            zip:'',
            field:'',
            department:'',
            fax:'',
        }

        this.goSearch = this.goSearch.bind(this);
        this.showDetail = this.showDetail.bind(this);
        this.phoneClick1 = this.phoneClick1.bind(this);
        this.phoneClick2 = this.phoneClick2.bind(this);
        this.emailClick = this.emailClick.bind(this);
        /*this._getuserid();*/

    }

    async _getuserid() {

        try {
            let uid = await AsyncStorage.getItem(uuid);



              if(uid==null)
              {



              }

            console.log(uid)
            GET(SERVER() + 'user/getList/' + uid).then(({body}) => {


                this.setState({

                    isLoading: false,

                    arrayholder: body.data,
                    dataSource: body.data,


                });





                console.log(body);


            }).catch(err => {
                console.log(err);
            })

        } catch (error) {
            // Error saving data
            console.log(error);



        }


    }


    onOptionSelect(value) {
        this.setState({opened: true});
    }

    onTriggerPress() {
        this.setState({opened: true});
    }

    onBackdropPress() {
        this.setState({opened: true});
    }
    phoneClick1(value){
        if(this.state.phone_office != '-')
            Communications.phonecall(this.state.phone_office, true);
    }
    phoneClick2(value){
        if(this.state.phone_mobile != '-')
            Communications.phonecall(this.state.phone_mobile, true);
    }
    emailClick(value){
        let emailList = [];
        emailList.push(this.state.email);
        Communications.email(emailList, null, null, null, '');   
    }
    showDetail(item){
        //Communications.phonecall(item.phone_mobile, true);
        this.setState({company_name: item.company_name?item.company_name:'-'});
        this.setState({contact_name: item.contact_name?item.contact_name:'-'});
        this.setState({email: item.email?item.email:'-'});
        this.setState({phone_mobile: item.phone_mobile?item.phone_mobile:'-'});
        this.setState({phone_office: item.phone_office?item.phone_office:'-'});
        this.setState({position: item.position?item.position:'-'});
        this.setState({street: item.street?item.street:'-'});
        this.setState({town: item.town?item.town:'-'});
        this.setState({zip: item.zip?item.zip:'-'});
        this.setState({field: item.field?item.field:'-'});
        this.setState({department: item.department?item.department:'-'});
        this.setState({fax: item.fax?item.fax:'-'});

        this.popupDialog.show();

    }
    componentDidMount() {

        /*    var uuid  =this.state.userid*/


        this._getuserid();

        /* let uid =   AsyncStorage.getItem(uuid);

              console.warn(uid);
         GET(SERVER() + 'user/getList/'+uid).then(({body}) => {


             this.setState({

                 isLoading: false,

                 arrayholder: body.data,
                 dataSource: body.data,


             });


             Alert.alert(JSON.stringify(body.data));


             console.log(body);


         }).catch(err => {
             console.log(err);
         })
 */

    }


    ListViewItemSeparator = () => {
        return (
            <View
                style ={styles.separator}
            />
        );
    }

    /*  SearchFilterFunction(text){



          const newData = arrayholder.filter(function(item){
              const itemData = item.title.toUpperCase()
              const textData = text.toUpperCase()
              return itemData.indexOf(textData) > -1
          });
          this.setState({
              dataSource: this.state.dataSource.cloneWithRows(newData),
              text: text
          })
      }
  */


    goSearch(text) {
        let list = this.search(text, this.state.arrayholder, ['contact_name', 'company_name']);
        this.setState({
            text: text,
            dataSource: list
        })


    }


    search(text, list, sequence) {
        let filteredList = [];

        for (let i = 0; i < list.length; i++) {
            for (var item = 0; item < sequence.length; item++) {
                if (list[i][sequence[item]].toString().toLowerCase().indexOf(text.toLowerCase()) !== -1) {
                    filteredList.push(list[i]);
                    break;
                }
            }
        }
        return filteredList;
    }


    async removeUid() {

      ``

        try {
            await  AsyncStorage.removeItem(uuid);
            await  AsyncStorage.removeItem(remember);
            this.props.navigation.push("Login");
            console.log()


        }

        catch (error) {
            this.props.navigation.push("Login");

            console.log(error);


        }


    }

    _orientationDidChange(orientation) {
      console.log(orientation)
    }






    render() {
        const CheckedOption = (props) => (
            <MenuOption value={props.value} text={(props.checked ? '\u2713 ' : '') + props.text} />
        )

        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20,}}>
                    <ActivityIndicator/>
                </View>
            )
        }



        return (

            <Container style={styles.container}>
            <PopupDialog
                height={this.state.height}
                width={this.state.width}
                onShown = {()=>{
                  this.setState({isDialogShown: true});
                }}
                onDismissed = {()=>{
                  this.setState({isDialogShown: false});
                }}
                dialogTitle={
                  <TouchableOpacity onPress={() => {
                            this.popupDialog.dismiss();
                            this.setState({height:0.6});
                            this.setState({isMoreDetail: false});                          
                          }}>
                    <Text style={{textAlign: 'right', marginTop:10, marginRight:20, fontSize:20, color: '#707070'}}>X</Text>
                  </TouchableOpacity>
                }
            actions={[
                        <DialogButton
                          text={this.state.isMoreDetail? 'weniger anzeigen':'mehr anzeigen'}
                          onPress={() => {
                            !this.state.isMoreDetail? this.setState({height:0.8}):this.setState({height:0.6});  
                            this.setState({isMoreDetail: !this.state.isMoreDetail});                          
                          }}
                          key="button-1"
                        />,
                        
                        
                      ]}
                ref={(popupDialog) => { this.popupDialog = popupDialog; this.state.popup = popupDialog;}}
                dialogAnimation={slideAnimation}
            >
                <View style={styles.popup}>

                <ScrollView contentContainerStyle={{width:'100%'}}>
                <View style={{flex:1, width:'100%'}}>
                <View style={{width:'1%', borderWidth:0}}>
                </View>

                  <View style={{width:'98%',borderWidth:0}}>
                  <View style={{flexDirection: 'row',  marginTop:10}}>
                    <Label style={{fontSize:17,borderWidth:0,width:'34%'}}>Firme:</Label>
                    <View style={{width:'1%'}}></View>
                    <Text style={{fontWeight: 'bold',fontSize:17,borderWidth:0,width:'65%'}}>{this.state.company_name}</Text>
                  </View>  

                  <View style={{flexDirection: 'row', marginTop:10}}>
                    <Label style={{fontSize:17,borderWidth:0,width:'34%'}}>Name:</Label>
                    <View style={{width:'1%'}}></View>
                    <Text style={{fontWeight: 'bold', fontSize:17,borderWidth:0,width:'65%'}}>{this.state.contact_name}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginTop:10}}>
                    <Label style={{fontSize:17,borderWidth:0,width:'34%'}}>Email:</Label>
                    <View style={{width:'1%'}}></View>
                    <TouchableHighlight  style={{width:'65%'}} onPress={() => {this.emailClick(this)}}>
                    <Text style={{fontWeight: 'bold', fontSize:17, color: '#00677f'}}>{this.state.email}</Text>
                    </TouchableHighlight>
                  </View>

                  <View style={{flexDirection: 'row', marginTop:10}}>
                    <Label style={{fontSize:17,borderWidth:0,width:'34%'}}>Festnetz:</Label>
                    <View style={{width:'1%'}}></View>
                    <TouchableHighlight   style={{width:'65%'}} onPress={() => {this.phoneClick1(this)}}>
                    <Text style={{fontWeight: 'bold', fontSize:17, color: '#00677f'}}>{this.state.phone_office}</Text>
                    </TouchableHighlight>
                  </View>

                  <View style={{flexDirection: 'row', marginTop:10}}>
                    <Label style={{fontSize:17,borderWidth:0,width:'34%'}}>Handy:</Label>
                    <View style={{width:'1%'}}></View>
                    <TouchableHighlight   style={{width:'65%'}} onPress={() => {this.phoneClick2(this)}}>
                    <Text style={{fontWeight: 'bold', fontSize:17, color: '#00677f'}}>{this.state.phone_mobile}</Text>
                    </TouchableHighlight>
                  </View>
                  { 
                    this.state.isMoreDetail && 
                    <View>

                   <View style={{flexDirection: 'row', marginTop:10}}>
                    <Label style={{fontSize:17,borderWidth:0,width:'34%'}}>Position:</Label>
                    <View style={{width:'1%'}}></View>
                    <Text style={{fontWeight: 'bold', fontSize:17,borderWidth:0,width:'65%'}}>{this.state.position}</Text>
                  </View>

                   <View style={{flexDirection: 'row', marginTop:2}}>
                    <Label style={{fontSize:17,borderWidth:0,width:'34%'}}>Bereich:</Label>
                    <View style={{width:'1%'}}></View>
                    <Text style={{fontWeight: 'bold', fontSize:17,borderWidth:0,width:'65%'}}>{this.state.field}</Text>
                  </View>

                   <View style={{flexDirection: 'row', marginTop:2}}>
                    <Label style={{fontSize:17,borderWidth:0,width:'34%'}}>Abteilung:</Label>
                    <View style={{width:'1%'}}></View>
                    <Text style={{fontWeight: 'bold', fontSize:17,borderWidth:0,width:'65%'}}>{this.state.department}</Text>
                  </View>

                   <View style={{flexDirection: 'row', marginTop:2}}>
                    <Label style={{fontSize:17,borderWidth:0,width:'34%'}}>Strasse:</Label>
                    <View style={{width:'1%'}}></View>
                    <Text style={{fontWeight: 'bold', fontSize:17,borderWidth:0,width:'65%'}}>{this.state.street}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginTop:2}}>
                    <Label style={{fontSize:17,borderWidth:0,width:'34%'}}>Stadt:</Label>
                    <View style={{width:'1%'}}></View>
                    <Text style={{fontWeight: 'bold', fontSize:17,borderWidth:0,width:'65%'}}>{this.state.town}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginTop:2}}>
                    <Label style={{fontSize:17,borderWidth:0,width:'34%'}}>PLZ:</Label>
                    <View style={{width:'1%'}}></View>
                    <Text style={{fontWeight: 'bold', fontSize:17,borderWidth:0,width:'65%'}}>{this.state.zip}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginTop:2}}>
                    <Label style={{fontSize:17,borderWidth:0,width:'34%'}}>Fax:</Label>
                    <View style={{width:'1%'}}></View>
                    <Text style={{fontWeight: 'bold', fontSize:17,borderWidth:0,width:'65%'}}>{this.state.fax}</Text>
                  </View>
                  </View>

              }
              </View>
                <View style={{width:'1%',borderWidth:0}}>
                </View>
                </View>
                  </ScrollView>
                </View>
            </PopupDialog>

                <Header  style={{backgroundColor:'#fff'}}>

                    <Left>
                        <Text style={{fontSize:20, fontWeight: 'bold', color: '#707070'}}>FFTelBu</Text>

                     </Left>

                    <Right>

                        <View >

                            <TouchableHighlight  onPress={() => this.removeUid()}>

                            <Image style ={{width:32,height:32}}
                                   source={require('../images/image.png')}
                            />
                            </TouchableHighlight>
                        </View>




                    </Right>
                </Header>

                <View style = {styles.input_text_view_email}>
                <Image style ={styles.icon_style} source={require('../images/search.png')}/>
                    <TextInput style={{marginLeft:5,width:300,fontSize:16}}
                        onChangeText={(text) => this.goSearch(text)} underlineColorAndroid='transparent'
                               placeholder = "Suche"
                   />
                </View>

                <View style={styles.listview_style}>
                    <FlatList
                        data={this.state.dataSource}
                        renderItem={({item}) =><View onChangeText={(val) => this.setState({title_text:val})}  style ={styles.items_style}>
                            <TouchableHighlight style ={{underlayColor:'#00677f', flex:1, borderBottomWidth:0, borderTopWidth:0}} onPress={() => this.showDetail(item)}>
                                <View style={{flex:1, borderBottomWidth:0, borderTopWidth:0}}>
                            <Text style={{marginLeft:5,fontSize:18, flex:1, borderBottomWidth:0, borderTopWidth:0}}>{item.contact_name} </Text>
                           <Text style={{marginLeft:5,flex:1,fontSize:14,  borderBottomWidth:0, borderTopWidth:0}}>{item.company_name}</Text>
                                </View>
                            </TouchableHighlight>
                           </View>
                       }
                        ItemSeparatorComponent= {this.ListViewItemSeparator}
                        keyExtractor={(item) => item.title}

                    />


                </View>

                
            </Container>



        );
    }
}

const styles = StyleSheet.create({
    container: {
          flex:1,
       /* justifyContent: 'center',*/

       height:100,
        backgroundColor: '#FFF',
    },
    popup: {
        flex: 1,
        alignItems: 'center',
       /* justifyContent: 'center',*/
        flexDirection: 'column'
    },
    listview_style:{

        flex: 1,

        flexDirection: 'column',
    },


    items_style:{

            borderWidth:1,
            borderColor:'#ECF0F1',
            borderBottomColor:'white',

    },

    TextInputStyleClass:{

        textAlign: 'center',
        height: 40,
        borderWidth: 1,
        borderColor: '#009688',
        borderRadius: 7 ,
        backgroundColor : "#FFFFFF"

    },

    input_text_view_email:{

        marginTop:1,
        borderWidth:2,
        borderRadius: 0.5,
        borderColor: '#CCD1D1',
        borderBottomColor:'#00677f',
        backgroundColor:'#FFF',
        flexDirection:'row'


    },


    icon_style:{
        marginTop:10,
        marginLeft:5,
        width:32,
        height:32
    },



    menu_style:{
        marginTop:30,
        backgroundColor:'red',
        marginLeft:100,


    },

    separator:{
        height: StyleSheet.hairlineWidth,
        width: "100%",
        backgroundColor: "#eee",
        borderBottomWidth: 0,
        borderTopWidth: 0
    }




});

