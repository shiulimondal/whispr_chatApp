import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '../../../ThemeContext';
import NavigationService from '../../Services/Navigation';

const defaultThemes = [
  require('../../assets/images/theme1.jpg'),
  require('../../assets/images/theme2.jpg'),
  require('../../assets/images/theme3.jpg'),
];

const ChatThemeScreen = () => {
  const { chatBackground, setChatBackground } = useTheme();
  const [selected, setSelected] = useState(chatBackground);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Chat Theme</Text>

      {/* Default Themes */}
      <View style={styles.themeRow}>
        {defaultThemes.map((theme, i) => {
          const uri = Image.resolveAssetSource(theme).uri;
          return (
            <TouchableOpacity
              key={i}
              onPress={() => {
                setChatBackground(uri);
                setSelected(uri);
                NavigationService.goBack()
              }}
              style={[
                styles.themeWrapper,
                selected === uri && styles.selectedBorder,
              ]}
            >
              {/* Dim image so it's not too bright */}
              <Image source={theme} style={styles.themeImg} />
              {selected === uri && (
                <View style={styles.overlay}>
                  <Text style={styles.checkMark}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default ChatThemeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 18, marginBottom: 20, fontWeight: '600' },
  themeRow: { flexDirection: 'row', flexWrap: 'wrap' },
  themeWrapper: {
    margin: 8,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative'
  },
  selectedBorder: { borderColor: '#1C81E9' },
  themeImg: {
    width: 100,
    height: 150,
    borderRadius: 8,
    opacity: 0.85, // slightly dimmed
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMark: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
});
