import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import PushNotification from 'react-native-push-notification';


export default function Splash({navigation}) {
    useEffect(()=>{
    createChannels()
     setTimeout(() => {
       navigation.navigate("My Tasks")  
     }, 2000);
    },[])


    const createChannels=()=>{
      PushNotification.createChannel({
        channelId: 'task-channel',
        channelName: 'Task Channel'
      })
    }
  return (
    <View style={styles.body}>
        <Image
        style={styles.img}
        source={require('../assets/todo.png')}
        />
      <Text style={styles.text}>Your ToDo List</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#52BE80',
        paddingBottom: 80

    },
    img: {
        width: 300,
        height: 300,
       
       
    },
    text: {
        fontSize: 35,
        
    }
})