import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector, useDispatch } from 'react-redux'
import { setTask, setTaskID } from '../readux/action'
import CheckBox from '@react-native-community/checkbox'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import DatePicker from 'react-native-date-picker'
import PushNotification from 'react-native-push-notification'
import DateTimePicker from '@react-native-community/datetimepicker';


export default function Task({ navigation }) {

  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [done, setDone] = useState(false)
  const [color, setColor] = useState()
  const [date, setDate] = useState(new Date(Date.now()))
  const [open, setOpen] = useState(false)
  const [bell, setBell] = useState(false)
  const [image, setImage] = useState('')

  console.log(image)

  const { tasks, taskID } = useSelector(state => state.taskReducer)
  const dispatch = useDispatch()
  console.log(taskID + 'asd')
  
  useEffect(() => {
    navigation.addListener('focus', ()=> {
      getitem()
    })
    
  }, [])
  const getitem = () => {

    const Task = tasks.find(task => task.ID === taskID)
    if (Task) {
      setTitle(Task.Title)
      setDesc(Task.Desc)
      setDone(Task.Done)
      setColor(Task.Color)
      setDate(Task.Date)
      setBell(Task.Bell)
      setImage(Task.Image)
    }
  }
  const setTaskData = async () => {
    if (title.length === 0) {
      Alert.alert('Warning', 'Write Title')
    } else {
      try {
        let Task = {
          ID: taskID,
          Title: title,
          Desc: desc,
          Done: done,
          Color: color,
          Date: date,
          Bell: bell,
          Image: image
        }
        const index = tasks.findIndex((task) => task.ID === taskID)

        let newTask = []
        if (index > -1) {
          newTask = [...tasks]
          newTask[index] = Task

        } else {
          newTask = [...tasks, Task]
        }
        await AsyncStorage.setItem('Task', JSON.stringify(newTask))
          .then(() => {
            dispatch(setTask(newTask))
            Alert.alert('Success', "Your Task successfuly updated")
            navigation.goBack()
          })


      } catch (error) {
        console.log(error)
      }
    }
  }
  const cancelNotification = (val) => {
    if (val === true) {
      PushNotification.cancelLocalNotification(taskID);
      setOpen(false)
    }
  }
  const createNotification = () => {
    PushNotification.localNotificationSchedule({
      channelId: 'task-channel',
      title: title,
      message: desc,
      allowWhileIdle: true,
      date: date,
      id: taskID,
    })
  }

  return (
    <View style={styles.body}>
      
      {open && <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
          setBell(true)

        }}
        onCancel={() => {
          setOpen(false)
          setBell(false)
        }}
        title='Inform me'
        textColor='#ffffff'
        mode='datetime'


      />}
      {/* {open &&<DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'time'}
          is24Hour={true}
          display="default"
          onChange={(date) => {
            setOpen(false)
            setDate(date)
            setBell(true)
          }}
        />} */}
      <TextInput
        style={styles.input}
        placeholder={'Title'}
        placeholderTextColor="#B2BABB"
        value={title}
        onChangeText={(val) => setTitle(val)}
      />
      <TextInput
        style={styles.input}
        placeholder={'Description'}
        placeholderTextColor="#B2BABB"
        multiline
        value={desc}
        onChangeText={(val) => setDesc(val)}

      />
      <View style={styles.color_bar}>
        <TouchableOpacity style={styles.red}
          onPress={() => setColor('red')}
        >
          {color === 'red' &&
            <FontAwesome5
              name={'check'}
              size={20}
              color={'#B2BABB'}
            />
          }
        </TouchableOpacity>
        <TouchableOpacity style={styles.green}
          onPress={() => setColor('green')}
        >
          {color === 'green' &&
            <FontAwesome5
              name={'check'}
              size={20}
              color={'#B2BABB'}
            />
          }
        </TouchableOpacity>
        <TouchableOpacity style={styles.white}
          onPress={() => setColor('white')}
        >
          {color === 'white' &&
            <FontAwesome5
              name={'check'}
              size={20}
              color={'#B2BABB'}
            />
          }
        </TouchableOpacity>
        <TouchableOpacity style={styles.black}
          onPress={() => setColor('black')}
        >
          {color === 'black' &&
            <FontAwesome5
              name={'check'}
              size={20}
              color={'#B2BABB'}
            />
          }
        </TouchableOpacity>
        <TouchableOpacity style={styles.blue}
          onPress={() => setColor('blue')}
        >
          {color === 'blue' &&
            <FontAwesome5
              name={'check'}
              size={20}
              color={'#B2BABB'}
            />
          }
        </TouchableOpacity>
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.alarm}
          onPress={() => {
            setOpen(true)

          }}
        >
          {bell ? <FontAwesome5
            name='bell'
            color={'#ffffff'}
            size={25}
          /> : <FontAwesome5
            name='bell-slash'
            color={'#ffffff'}
            size={25}
          />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottom_camera} onPress={() => navigation.navigate('Camera', { id: taskID })}>
          <Text style={styles.bottom_text}>Open Camera</Text>

        </TouchableOpacity>
      </View>

      <View >
       {image ?
        <View style={styles.image_body}>
          <Image
            style={styles.image}
            source={{ uri: image }}
          />
          </View>
          : <Text>No Data</Text>}
           
      </View>

      <View style={styles.check}>
        <CheckBox
          value={done}
          onValueChange={(val) => {
            setDone(val)
            cancelNotification(val)

          }}
          tintColors={{ false: '#555555' }}
        />

        <Text style={styles.text}>Is Done</Text>
      </View >

      <TouchableOpacity style={styles.bottom_save} onPress={() => {
        setTaskData()
        { bell ? createNotification() : null }

      }}>
        <Text style={styles.bottom_text}>Save Task</Text>

      </TouchableOpacity>


     


    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: "#555555",
    borderRadius: 10,
    margin: 10,
    textAlign: 'left',
    paddingHorizontal: 10,
    fontSize: 20,
    color: '#000',
    backgroundColor: "#ffffff"

  },
  bottom: {
    flexDirection: 'row',
    width: '100%',
    
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  bottom_save: {
    backgroundColor: '#27AE60',

    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'

  },
  bottom_camera: {
    backgroundColor: '#27AE60',
    flex: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
 
  },
  bottom_text: {

    padding: 10,
    fontSize: 20,
    color: "#ffffff"
  },

  check: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',


  },
  text: {

    fontSize: 20,
    color: "#555555"
  },
  color_bar: {
    flexDirection: 'row',
    marginVertical: 5,
    height: 50,
    borderColor: '#555555',
    borderWidth: 2,
    borderRadius: 10

  },
  red: {
    flex: 1,
    backgroundColor: '#C0392B',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8
  },
  green: {
    flex: 1,
    backgroundColor: '#27AE60',

    justifyContent: 'center',
    alignItems: 'center',

  },
  white: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',

  },
  black: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',

  },
  blue: {
    flex: 1,
    backgroundColor: '#2E86C1',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8
  },
  alarm: {
    flex: 2,
    flexDirection: 'row',
    marginRight: 8,
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#3498DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    elevation: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#555555'
  },
  image_body:{
    width: 200,
    height: 200,
    
  }

})