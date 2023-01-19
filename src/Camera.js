import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {RNCamera} from 'react-native-camera'
import { useCamera } from 'react-native-camera-hooks'
import { useSelector, useDispatch } from 'react-redux'
import { setTask } from '../readux/action'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Camera({navigation, route}) {

    const [{cameraRef}, {takePicture}] = useCamera(null)
    const { tasks } = useSelector(state => state.taskReducer)
   const dispatch = useDispatch()
   


    const cameraHandler = async()=> {
        try {
         const data = await takePicture()  
         const filePath = data.uri
        
         console.log(filePath)
         capturePicture(route.params.id, filePath );
         navigation.goBack()
        } catch (error) {
            console.log(error)
        }
    }

    const capturePicture =(id, path)=> {
        const index = tasks.findIndex((task) =>{
            task.ID === id 
            console.log(task.ID + 'id')
        })
         
         console.log(id + 'camera')
      
         console.log(index + 'hello')
       
        if (index > -1) {
         let newTask = [...tasks]
          newTask[index].Image = path
          AsyncStorage.setItem('Task', JSON.stringify(newTask))
          .then(() => {
            dispatch(setTask(newTask))
            Alert.alert('Success', "Your Image successfuly saved")
            navigation.navigate('Task')
          }).catch(error=> {
              console.log(error)
          })
        } 
        


      } 
    
  return (
    <View style={styles.body}>
      <RNCamera
      ref={cameraRef}
      type={RNCamera.Constants.Type.back}
      style={styles.preview}
      >
          <TouchableOpacity style={styles.capture} onPress={()=> cameraHandler()}>
              <Text>Capture</Text>
          </TouchableOpacity>
      </RNCamera>
    </View>
  )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    preview:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    capture:{
        width: 120,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#2E86C1',
        marginBottom: 10,
    }

})