import React, {useState,useEffect} from 'react'
import {View,Text, StyleSheet,Modal, Image} from 'react-native'
import MeuEstilo from './statics/MeuEstilo'
import HomePage from './Home'
import Api_Specific_Book from './Api_Specific_Book'

import TopMenuWidgets from './TopMenuWidgets'
import CustomizedBtn from './CustomizedButton'

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';


function changePageState(setState, app){
	setState(app);
}

const createButtons = function (func,args, name, id){
	const style_btn = StyleSheet.create({
		backgroundColor : '#3b706a',
		width:"40%",
		height:"40%"
	})
	const styleText = StyleSheet.create({
		fontSize : 15,
	})



	return <CustomizedBtn key={name} textBtn={name} onPress={() => changePageState(func,args)} styleButton={style_btn} styleTextBtn={styleText} />
}

const styles = StyleSheet.create({
		centerView:{
			justifyContent:'center',
			alignItems:'center'
		}
	})

function Home(props){
	return (
		<View style={MeuEstilo.containerPrincipal}>
		<TopMenuWidgets /*buttons={[api_specific]}*/ slogan="Bem Vindo"/>
		<HomePage />
		</View>
		);
}

function BibleApi(props){
	//const [actualApp,setActualApp] = useState()

	/*const api_specific = createButtons(setActualApp,<Api_Specific_Book />, 'Litugia Diaria')*/
	return (
		<View style={MeuEstilo.containerPrincipal}>
		<TopMenuWidgets /*buttons={[api_specific]}*/ slogan="Bible with API"/>
		<Api_Specific_Book />
		</View>
		);
}


function renderScreenIcon(focused, name, icon=require('./statics/homeIcon.png')){

	return <View style={{alignItems:"center",justifyContent:'center',top:0}}>
		<Image
		source={icon}
		resizeMode='contain'
		style={{width: focused ? 30 : 25,
				height: focused ? 30 : 25,
				tintColor: focused ? '#3285a8' : "#748c94"}}>
		</Image>
		<Text style={{color: focused ? '#3285a8' : "#748c94"}}>{name}</Text>
	</View>
}

const styleNavbar= {
	position: 'absolute',
	bottom: 25,
	left:20,
	right:20,
	backgroundColor: "#fff",
	borderRadius: 15,
	height: 90,
	paddingBottom: 10,
	elevation: 5,
	shadowColor: "#7F5DF0",
	shadowOffset:{
		height: 10,
		width: 0
	},
	shadowRadius: 3.5,
}

const Stack = createBottomTabNavigator();

function Navigator(props){
	const [functions, setFunctions] = useState(0);

	const [showModal, setShowModal] = useState(true)

	useEffect(()=>{
		if (functions != 1){
			setTimeout(()=>{
				setShowModal(false)
				setFunctions(1)
			},1300)
			
		}		
	})

  return (
  	<View style={{width:"100%",height:"100%"}}>
  	<Modal
			animationType="fade"
			visible={showModal}
			>

			<View style={[styles.centerView,{width:"100%",height:"100%",backgroundColor:'#ffd4c7'}]}>
				
			<View style={[styles.centerView,{width:'80%',height:'40%',borderRadius:800, elevation:40,shadowColor:"#401001"}]}>	
			<Image 
			style={{width:'80%',height:'80%',resizeMode:"contain",borderRadius:800}}
			source={require('./statics/logo.png')}></Image>
			</View>
			</View>

	</Modal>
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName="Home"

      screenOptions={{ 
      	headerShown: false,
  		tabBarStyle:styleNavbar,
  		tabBarShowLabel: false
  	}
	}>
        <Stack.Screen 
        	name="Home" 
        	component={Home} 
        	options={{
        		tabBarIcon: ({focused})=>renderScreenIcon(focused,"Home" ,require('./statics/homeIcon.png'))

        	}}/>
         <Stack.Screen 
        	name="BibleApi" 
        	component={BibleApi} 
        	options={{
        		tabBarIcon: ({focused})=>renderScreenIcon(focused,"BibleApi" ,require('./statics/bibleIconNav.png'))

        	}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </View>
  );
}


export default Navigator;

