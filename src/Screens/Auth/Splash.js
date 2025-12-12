import React, { useRef, useEffect } from 'react';
import { View, Image, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from '../../Constants/PixelRatio';
import NavigationService from '../../Services/Navigation';
import { FONTS } from '../../Constants/Fonts';

const { width } = Dimensions.get('window');

const Splash = () => {
  const rotateAnim1 = useRef(new Animated.Value(0)).current; // For 2nd layer
  const rotateAnim2 = useRef(new Animated.Value(0)).current; // For 3rd layer

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim1, {
        toValue: 1,
        duration: 6000,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.timing(rotateAnim2, {
        toValue: 1,
        duration: 9000, // slower for outer orbit
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin1 = rotateAnim1.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const spin2 = rotateAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

     useEffect(() => {
        setTimeout(() => {
            NavigationService.navigate('UserStack');
        }, 4000);
    }, []);

  return (
    <LinearGradient colors={['#9b5de5', '#6a4c93']} style={styles.container}>
      {/* App Name & Subtitle */}
      <Text style={styles.location}>Whispr</Text>
      <Text style={styles.distance}>Your secrets. Your chat.</Text>

      {/* First Orbit (Emojis ❤️🔥😍😄) */}
      <Animated.View style={[styles.orbitContainer1, { transform: [{ rotate: spin1 }] }]}>
        <View style={[styles.planet, { top: -60 }]}>
          <Text style={styles.emoji}>❤️</Text>
        </View>
        <View style={[styles.planet, { right: -60 }]}>
          <Text style={styles.emoji}>🔥</Text>
        </View>
        <View style={[styles.planet, { bottom: -60 }]}>
          <Text style={styles.emoji}>😍</Text>
        </View>
        <View style={[styles.planet, { left: -60 }]}>
          <Text style={styles.emoji}>😄</Text>
        </View>
      </Animated.View>

      {/* Second Orbit (Your existing icons) */}
      <Animated.View style={[styles.orbitContainer2, { transform: [{ rotate: spin2 }] }]}>
        <View style={[styles.planet, { top: -80 }]}>
          <Image source={require('../../assets/images/audio.png')} style={styles.icon} />
        </View>
        <View style={[styles.planet, { right: -80 }]}>
          <Image source={require('../../assets/images/video-call.png')} style={styles.icon} />
        </View>
        <View style={[styles.planet, { bottom: -80 }]}>
          <Image source={require('../../assets/images/call.png')} style={styles.icon} />
        </View>
        <View style={[styles.planet, { left: -80 }]}>
          <Image source={require('../../assets/images/comment.png')} style={styles.icon} />
        </View>
      </Animated.View>

      {/* Center Sun */}
      <View style={styles.centerCircle}>
        <Image source={require('../../assets/images/logo.png')} style={styles.centerImage} />
      </View>
    </LinearGradient>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  location: {
    color: '#fff',
    fontSize: moderateScale(22),
    fontFamily:FONTS.OpenSans.bold,
    position: 'absolute',
    top: moderateScale(60),
  },
  distance: {
    color: '#fff',
    fontSize: moderateScale(12),
    position: 'absolute',
    top: moderateScale(90),
       fontFamily:FONTS.OpenSans.regular,
  },
  orbitContainer1: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: moderateScale(60),
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
     borderStyle: 'dashed',
  },
  orbitContainer2: {
    width: moderateScale(160),
    height: moderateScale(160),
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: moderateScale(90),
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
  },
  planet: {
    position: 'absolute',
  },
  emoji: {
    fontSize: moderateScale(22),
  },
  icon: {
    width: moderateScale(35),
    height: moderateScale(35),
    resizeMode: 'contain',
    tintColor: '#5e17eb',
  },
  centerCircle: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(45),
    overflow: 'hidden',
  },
  centerImage: {
    width: '100%',
    height: '100%',
  },
});
