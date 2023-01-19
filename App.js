/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Splash from './src/Splash';
import ToDo from './src/ToDo';
import Done from './src/Done';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Task from './src/Task';
import {Provider} from 'react-redux'
import { store } from './readux/store';
import Camera from './src/Camera';




const Tab =createBottomTabNavigator()

function HomeTab(){
  return (
<Tab.Navigator
screenOptions={({route})=>({
  tabBarIcon: ({focused, color, size})=> {
    let iconName;
    if(route.name === 'ToDo'){
      iconName = 'clipboard-list'
      size = focused ? 25: 20
    } else if(route.name === 'Done'){
      iconName = 'clipboard-check'
      size = focused ? 25: 20
    }

    return (
      <FontAwesome5
      name= {iconName}
      color= {color}
      size= {size}
      />
    )
  },
  tabBarActiveTintColor: '#3498DB',
  tabBarInactiveTintColor: 'gray',
  tabBarLabelStyle: {fontSize: 15, fontWeight: 'bold'},
  headerShown: false,
 
  
})}
>
  <Tab.Screen
  name='ToDo'
  component={ToDo}
  />
  <Tab.Screen
  name='Done'
  component={Done}
  />
</Tab.Navigator>
  );
}
const RootStack = createNativeStackNavigator();
const App= () => {
  

  return (
    <Provider store={store}>
   <NavigationContainer>
   <RootStack.Navigator
   screenOptions={{
     headerStyle: {
       backgroundColor: '#3498DB',
     },
     headerTintColor: '#fff',
     headerTitleStyle: {
       fontWeight: 'bold'
     },
     headerTitleAlign: 'center',
     
   }}
   >
     <RootStack.Screen
     name='Splash'
     component={Splash}
     options={{
       headerShown: false
     }}
     />
     <RootStack.Screen
     name='My Tasks'
     component={HomeTab}
     options={{
       headerBackVisible: false
     }}
     />
     <RootStack.Screen
     name='Task'
     component={Task}
     />
     <RootStack.Screen
     name='Camera'
     component={Camera}
     />
     
   </RootStack.Navigator>
   </NavigationContainer> 
   </Provider>
  );
};


export default App;
