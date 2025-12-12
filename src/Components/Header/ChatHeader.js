import { Image, Modal, StyleSheet, Text, TouchableOpacity, View, Pressable, Platform } from 'react-native'
import React, { useState } from 'react'
import { moderateScale } from '../../Constants/PixelRatio'
import Icon from '../../Ui/Icon'
import { FONTS } from '../../Constants/Fonts'
import NavigationService from '../../Services/Navigation'

const ChatHeader = () => {
    const [openModal, setOpenModal] = useState(false)
  

    const handelOpenModal = () => setOpenModal(true)
    const handelCloseModal = () => setOpenModal(false)

    return (
        <View style={styles.Container}>
            <View style={styles.topView}>
                <View style={styles.subView}>
                    <TouchableOpacity onPress={() => NavigationService.goBack()} activeOpacity={0.6}>
                        <Icon type={'MaterialIcons'} name={'arrow-back'} size={22} />
                    </TouchableOpacity>

                    <Image source={require('../../assets/images/user2.jpg')} style={styles.user_img} />
                    <Text numberOfLines={1} style={styles.appTitle}>Jay Bro 😎</Text>
                </View>

                <View style={styles.sub_secView}>
                    <Icon type={'Octicons'} name={'device-camera-video'} size={18} />
                    <Icon type={'Ionicons'} name={'call-outline'} size={20} />
                    <TouchableOpacity onPress={handelOpenModal}>
                        <Icon type={'Entypo'} name={'dots-three-vertical'} size={18} />
                    </TouchableOpacity>
                </View>
            </View>


            {/* <View style={{...styles.modalOverlay
                
            }}>
                <View style={styles.dropdownMenu}>

                </View>
            </View> */}

            <Modal
                visible={openModal}
                animationType="fade"
                transparent
                onRequestClose={handelCloseModal}
            >
                {/* background overlay */}
                <Pressable style={styles.modalOverlay} onPress={handelCloseModal} />

                {/* dropdown menu */}
                <View style={styles.dropdownMenu}>
                    <TouchableOpacity style={styles.menuItem} onPress={handelCloseModal}>
                        <Text style={styles.menuText}>View Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={handelCloseModal}>
                        <Text style={styles.menuText}>Mute Notifications</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            handelCloseModal();
                            NavigationService.navigate('ChatThemeScreen');
                        }}
                        style={styles.menuItem}
                    >
                        <Text style={styles.menuText}>Chat theme</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={handelCloseModal}>
                        <Text style={styles.menuText}>Block</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

        </View>
    )
}

export default ChatHeader

const styles = StyleSheet.create({
    Container: {
        padding: moderateScale(15),
        paddingTop: 0,
        backgroundColor: '#fff',
    },
    topView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    user_img: {
        height: moderateScale(30),
        width: moderateScale(30),
        borderRadius: moderateScale(20),
        marginHorizontal: moderateScale(7)
    },
    appTitle: {
        fontSize: moderateScale(16),
        fontFamily: FONTS.OpenSans.semibold,
        maxWidth: '70%'
    },
    subView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '70%'
    },
    sub_secView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '30%'
    },
modalOverlay: { 
  flex: 1, 
//   backgroundColor: 'rgba(0,0,0,0.1)' // now visible dim background 
},
dropdownMenu: {
  position: 'absolute',
  top: moderateScale(30), 
  right: moderateScale(15),
  backgroundColor: '#fff',
  paddingVertical: 8,
  borderRadius: moderateScale(5),
  elevation: 5,
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 2 },
},
menuItem: { paddingVertical: 10, paddingHorizontal: 15 },
    menuText: { fontSize: 14, fontFamily: FONTS.OpenSans.regular },
})
