import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import ChatHeader from '../../Components/Header/ChatHeader';
import { useTheme } from '../../../ThemeContext';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const demoMessages = [
  { id: '1', type: 'text', text: 'Hey, how are you?', sender: 'receiver', status: 'seen' },
  { id: '2', type: 'image', uri: require('../../assets/images/theme2.jpg'), sender: 'sender', status: 'sent' },
  { id: '3', type: 'text', text: 'Nice pic 😍', sender: 'receiver', status: 'seen' },
  { id: '4', type: 'doc', fileName: 'Resume.pdf', sender: 'sender', status: 'seen' },
  { id: '5', type: 'doc', fileName: 'Resume.pdf', sender: 'sender', status: 'seen' },
  { id: '6', type: 'doc', fileName: 'Resume.pdf', sender: 'sender', status: 'seen' },
  { id: '7', type: 'doc', fileName: 'Resume.pdf', sender: 'receiver', status: 'seen' },
  { id: '8', type: 'doc', fileName: 'Resume.pdf', sender: 'sender', status: 'sent' },
  { id: '9', type: 'text', text: 'ok✌️', sender: 'receiver', status: 'seen' },
];

const ChatScreen = () => {
  const { chatBackground } = useTheme();
  const [showOptions, setShowOptions] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState(demoMessages);

  const renderMessage = ({ item }) => {
    const isSender = item.sender === 'sender';

    console.log('----------------------item',item);


    let content;
    switch (item.type) {
      case 'text':
        content = <Text style={styles.messageText}>{item.text}</Text>;
        break;
      case 'image':
        content = (
          
          <Image
             source={typeof item.uri === 'number' ? item.uri : { uri: item.uri }}
            style={{ width: 150, height: 150, borderRadius: 10 , resizeMode:'cover'}}
          />
        );
        break;
      case 'doc':
        content = (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name="file-pdf-box" size={22} color="white" />
            <Text style={[styles.messageText, { marginLeft: 5 }]}>{item.fileName}</Text>
          </View>
        );
        break;
      default:
        content = <Text style={styles.messageText}>Unsupported type</Text>;
    }

    return (
      <View
        style={[
          styles.messageRow,
          { justifyContent: isSender ? 'flex-end' : 'flex-start' },
        ]}
      >
        <LinearGradient
          colors={['#5e17eb', '#9b5de5', '#6a4c93']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.messageBubble,
            { borderTopLeftRadius: isSender ? 15 : 0, borderTopRightRadius: isSender ? 0 : 15 },
          ]}
        >
          {content}

          {isSender && (
            <View style={styles.tickContainer}>
              {item.status === 'sent' && (
                <Ionicons name="checkmark" size={16} color="white" />
              )}
              {item.status === 'seen' && (
                <Ionicons name="checkmark-done" size={16} color="white" />
              )}
            </View>
          )}
        </LinearGradient>
      </View>
    );
  };

  const handleSend = () => {
    if (inputText.trim().length > 0) {
      setMessages((prev) => [
        ...prev,
        {
          id: String(prev.length + 1),
          type: 'text',
          text: inputText,
          sender: 'sender',
          status: 'sent',
        },
      ]);
      setInputText('');
    }
  };

  return (
    <ImageBackground
      source={
        chatBackground
          ? { uri: chatBackground }
          : require('../../assets/images/defultback.jpg')
      }
      style={styles.bg}
      resizeMode="cover"
    >
      <ChatHeader />


      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // keyboardVerticalOffset={-60}
      >
        <View style={styles.overlay}>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            contentContainerStyle={{ padding: 10, paddingBottom: 0 }}
          />

          {/* Input box */}
          <View style={styles.inputWrapper}>
            <TouchableOpacity onPress={() => setShowOptions(true)} style={styles.iconBtn}>
              <Ionicons name="attach" size={24} color="blue" />
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Type a message"
              placeholderTextColor="#aaa"
              value={inputText}
              onChangeText={setInputText}
              multiline
            />

            <TouchableOpacity onPress={handleSend} style={styles.iconBtn}>
              <Ionicons name="send" size={24} color="blue" />
            </TouchableOpacity>
          </View>


        </View>

      </KeyboardAvoidingView>

      {/* Attachment Options */}
      <Modal transparent visible={showOptions} animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setShowOptions(false)}
        >
          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.optionBtn}>
              <FontAwesome name="image" size={24} color="red" />
              <Text style={styles.optionText}>Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionBtn}>
              <Ionicons name="videocam" size={24} color="blue" />
              <Text style={styles.optionText}>Video</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionBtn}>
              <Ionicons name="mic" size={24} color="green" />
              <Text style={styles.optionText}>Audio</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionBtn}>
              <MaterialCommunityIcons name="file" size={24} color="yellow" />
              <Text style={styles.optionText}>Document</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionBtn}>
              <Ionicons name="link" size={24} color="orange" />
              <Text style={styles.optionText}>Link</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionBtn}>
              <Ionicons name="user" size={24} color="pink" />
              <Text style={styles.optionText}>Link</Text>
            </TouchableOpacity>

          </View>
        </TouchableOpacity>
      </Modal>
    </ImageBackground>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)'
    // backgroundColor:'red'
  },
  messageRow: {
    flexDirection: 'row',
    marginVertical: 5
  },
  messageBubble: {
    maxWidth: '78%',
    padding: 10,
    borderRadius: 15,
  },
  messageText: {
    color: 'white',
    ontSize: 15
  },
  tickContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 3
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 15,
    backgroundColor: '#f4f0f0ff',
    // marginTop:50
    // paddingBottom:-60
  },
  input: {
    flex: 1,
    backgroundColor: '#dfdcdcff',
    color: 'white',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 6,
    maxHeight: 120,
  },
  iconBtn: {
    padding: 6,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    // backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    alignSelf: 'center'
  },
  optionsContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    height: 250,
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  optionBtn: {
    alignItems: 'center',
    height: 80,
    width: 85,
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 3,
    marginTop: 10
  },
  optionText: {
    color: '#000',
    fontSize: 12,
    marginTop: 3
  },
});
