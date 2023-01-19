import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useSelector, useDispatch } from 'react-redux'
import { setTask, setTaskID } from '../readux/action'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CheckBox from '@react-native-community/checkbox'
import PushNotification from 'react-native-push-notification'




export default function Done({ navigation }) {

  const { tasks } = useSelector(state => state.taskReducer)
  const dispatch = useDispatch()
 
  
 

  const checkTask = (id, newValue)=> {
    const index = tasks.findIndex(task=> task.ID === id)
    if(index> -1){
      let newTask = [...tasks]
      newTask[index].Done= newValue
      AsyncStorage.setItem("Task", JSON.stringify(newTask))
      .then(()=> {
        dispatch(setTask(newTask))
        Alert.alert('Success!', 'Task state is changed')
      }).catch(error=>console.log(error))
    }
    if(newValue === true){
      
      PushNotification.cancelLocalNotification(id);
      
    }
  }
  const deleteItem =(ID)=> {
   const filterTask = tasks.filter(task => task.ID !== ID)
   AsyncStorage.setItem('Task', JSON.stringify(filterTask))
   .then(()=>{
     dispatch(setTask(filterTask))
     Alert.alert('Success', 'Task successfuly deleted')
   })
   .catch((error)=> {
     console.log(error)
   })
  }
  


  return (
    <View style={styles.body}>
      
      <FlatList

        data={tasks.filter(task=>task.Done === true)}
        renderItem={({ item }) => (
          <TouchableOpacity 
          style={styles.item}
          onPress={()=> {
            dispatch(setTaskID(item.ID))
            navigation.navigate('Task')
          }}
          >
            <View style={styles.item_row}>
            <View
              style={[{backgroundColor: 
               item.Color === 'red'? '#C0392B':
               item.Color === 'green'? '#27AE60':
               item.Color === 'black'? '#000000':
               item.Color === 'blue'? '#2E86C1': '#ffffff'
              },
               styles.color_row]}
              >

              </View>
              <CheckBox
              value={item.Done}
              tintColors={{ false: '#555555'}}
              onValueChange={(newValue)=> checkTask(item.ID, newValue)}
              />
            <View style={styles.item_body}>
              
            <Text style={styles.task_title}>{item.Title}</Text>
            <Text style={styles.task_desc}
            numberOfLines={1}
            >
              {item.Desc}
            </Text>
            </View>
            <TouchableOpacity style={styles.trash}
            onPress={()=> {deleteItem(item.ID)}}
            >
            <FontAwesome5
              name='trash'
              color={'#E74C3C'}
              size={25}
              />
            </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,

  },
  
  task_title: {
    fontSize: 30,
    color: "#000",
    fontWeight: 'bold',
    margin: 5,


  },
  task_desc: {
    fontSize: 20,
    color: "#999999",
    margin: 5,
  },
  item_row: {
   flexDirection: 'row',
   alignItems: 'center'
  },
  item_body: {
  flex: 1
  },
  item: {

    marginHorizontal: 10,
    marginVertical: 7,
    paddingRight: 10,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 5,

  },
  trash:{
   alignItems: 'center',
   justifyContent: 'center',
   width: 50,
   height: 52,
  },
  color_row: {
    flexDirection: 'row',
    width: 20,
    height: 100,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  }
})