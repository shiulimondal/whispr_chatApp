import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { moderateScale } from '../../Constants/PixelRatio'
import Icon from '../../Ui/Icon'
import { FONTS } from '../../Constants/Fonts'

const HomeHeader = () => {
    return (
        <View style={styles.Container}>
            <View style={styles.topView}>
                <Text style={styles.appTitle}>Whispr</Text>

                <View style={styles.subView}>
                    <Icon type={'Entypo'} name={'dots-three-vertical'} size={18}/>

           
                </View>
            </View>

            <TextInput
            placeholder='Search here...'
            style={styles.input_sty}
            />
        </View>
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    Container: {
        padding: moderateScale(15),
        paddingTop:moderateScale(25),
        backgroundColor:'#fff',
    },
    topView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    appTitle:{
        fontSize:moderateScale(25),
        fontFamily:FONTS.OpenSans.medium
    },
    subView:{
      flexDirection:'row'  
    },
    input_sty:{
        // borderWidth:1,
        marginTop:moderateScale(10),
        borderRadius:moderateScale(20),
        paddingHorizontal:moderateScale(10),
        backgroundColor:'#f4f4f4ff',
        height:moderateScale(42)
    }
})