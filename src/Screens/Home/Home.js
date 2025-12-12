import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import HomeHeader from '../../Components/Header/HomeHeader'
import ChatList from '../../Components/HomeCard/ChatList'
import { moderateScale } from '../../Constants/PixelRatio'
import Icon from '../../Ui/Icon'
import { FONTS } from '../../Constants/Fonts'

const Home = () => {

  const chatData = [
    { id: "1", name: "Ket", lastMessage: "Hey there!", user_img: require('../../assets/images/user1.jpg'), time: "22.53", pending: null },
    { id: "2", name: "Alice Smith", lastMessage: "See you soon.", user_img: require('../../assets/images/user2.jpg'), time: "23.45", pending: "3" },
    { id: "3", name: "Bob Brown", lastMessage: "What's up?", user_img: require('../../assets/images/user3.jpg'), time: "19.07", pending: "1" },
    { id: "4", name: "Jay Bro 😎", lastMessage: "hey bro. Did u kno the incident. Today i just make chatlist", user_img: require('../../assets/images/user2.jpg'), time: "8/15/25", pending: null },
    { id: "5", name: "Alina", lastMessage: "Hey there!", user_img: require('../../assets/images/user1.jpg'), time: "22.53", pending: null },
    { id: "6", name: "James", lastMessage: "See you soon.", user_img: require('../../assets/images/user2.jpg'), time: "23.45", pending: "3" },
    { id: "7", name: "Smith ", lastMessage: "What's up?", user_img: require('../../assets/images/user3.jpg'), time: "19.07", pending: "1" },
    { id: "8", name: "Marlin", lastMessage: "hey bro. Did u kno the incident. Today i just make chatlist", user_img: require('../../assets/images/user1.jpg'), time: "8/15/25", pending: null },
    { id: "9", name: "Emily", lastMessage: "Hey there!", user_img: require('../../assets/images/user1.jpg'), time: "22.53", pending: null },
    { id: "10", name: "Alice Smith", lastMessage: "See you soon.", user_img: require('../../assets/images/user2.jpg'), time: "23.45", pending: "3" },
    { id: "11", name: "Trip Buddy's 🏍️", lastMessage: "What's up?", user_img: require('../../assets/images/user3.jpg'), time: "19.07", pending: "1" },
    { id: "12", name: "April", lastMessage: "hey bro. Did u kno the incident. Today i just make chatlist", user_img: require('../../assets/images/user1.jpg'), time: "8/15/25", pending: null },
  ];

  return (
    <View style={styles.Container}>
      <HomeHeader />


      <FlatList
        data={chatData}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ChatList
            index={index}
            item={item}
          />
        )}
        contentContainerStyle={{
          paddingBottom: moderateScale(70),
          paddingTop: moderateScale(10)
        }}
        ListFooterComponent={
          <View style={styles.bottom_message_view}>

             <Icon type={'MaterialIcons'} name={'security'} size={11} color={'#9b5de5'} />
            <Text style={{...styles.bottom_text }}>
              Chats Protected Under <Text style={{ color: '#9b5de5' }}>Security Policy</Text>
            </Text>
          </View>
        }
      />
      <TouchableOpacity activeOpacity={0.9} style={{ ...styles.plus_circle, backgroundColor: '#9b5de5' }}>
        <Icon type={'AntDesign'} name={'plus'} size={25} color={'#fff'} />
      </TouchableOpacity>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  bottom_message_view:{
    marginTop:moderateScale(30),
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center'
  },
  bottom_text:{
    fontFamily:FONTS.OpenSans.regular,
    fontSize:moderateScale(11),
    marginLeft:moderateScale(5)
  },
  plus_circle: {
    height: moderateScale(50),
    width: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(25),
    position: 'absolute',
    right: moderateScale(20),
    bottom: moderateScale(40)
  }
})