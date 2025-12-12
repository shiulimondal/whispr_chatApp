import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { moderateScale } from '../../Constants/PixelRatio'
import { FONTS } from '../../Constants/Fonts'
import NavigationService from '../../Services/Navigation'

const ChatList = ({index,item}) => {
    return (
        <TouchableOpacity 
        onPress={()=>NavigationService.navigate('ChatScreen')}
        activeOpacity={0.6} index={index} style={styles.Container}>
            <View style={styles.usercircle}>
                <Image source={item?.user_img} style={styles.img_sty} />
            </View>
            <View style={styles.chat_view}>
                <View style={styles.message_view}>
                    <Text style={{
                        ...styles.title_txt
                    }}>{item?.name}</Text>
                    <Text numberOfLines={1} style={{
                        ...styles.message_txt,
                    }}>{item?.lastMessage}</Text>
                </View>

                <View>
                    <Text style={{...styles.TimeAndDate_txt}}>{item?.time}</Text>
                    {
                        item?.pending == null ?
                        null
                        :
                          <View style={styles.pending_circle}>
                        <Text style={{...styles.pendin_txt}}>{item?.pending}</Text>
                    </View>
                    }
                  

                </View>
            </View>

        </TouchableOpacity>
    )
}

export default ChatList

const styles = StyleSheet.create({
    Container: {
        padding: moderateScale(15),
        paddingTop:moderateScale(0),
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom:moderateScale(20)
    },
    usercircle: {
        height: moderateScale(42),
        width: moderateScale(42),
        borderRadius: moderateScale(28),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6a4c93'
    },
    img_sty: {
        height: moderateScale(40),
        width: moderateScale(40),
        borderRadius: moderateScale(22),
        resizeMode: 'cover'
    },
    chat_view: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: moderateScale(10),

    },
    title_txt: {
        fontSize: moderateScale(16),
        fontFamily: FONTS.Poppins.medium
    },
    message_txt: {
        fontFamily: FONTS.OpenSans.medium,
        fontSize: moderateScale(13)
    },
    message_view: {
        maxWidth: '87%',
    },
    pending_circle: {
        height: moderateScale(20),
        width: moderateScale(20),
        borderRadius: moderateScale(15),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6a4c93'
    },
    TimeAndDate_txt:{
        fontFamily:FONTS.Poppins.regular,
        fontSize:moderateScale(11)
    },
    pendin_txt:{
         fontFamily:FONTS.Poppins.semibold,
        fontSize:moderateScale(12),
        marginTop:moderateScale(3)
    }
})