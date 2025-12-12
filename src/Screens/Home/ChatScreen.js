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
  SafeAreaView,
  Keyboard,
  Dimensions,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import ChatHeader from '../../Components/Header/ChatHeader';
import { useTheme } from '../../../ThemeContext';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { moderateScale } from '../../Constants/PixelRatio';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const demoMessages = [
  { id: '1', type: 'text', text: 'Hey, how are you?', sender: 'receiver', status: 'seen', time: '10:00 AM' },
  { id: '2', type: 'image', uri: require('../../assets/images/theme2.jpg'), sender: 'sender', status: 'sent', time: '10:01 AM' },
  { id: '3', type: 'text', text: 'Nice pic 😍', sender: 'receiver', status: 'seen', time: '10:02 AM' },
  { id: '4', type: 'doc', fileName: 'Resume.pdf', fileSize: '2.4 MB', sender: 'sender', status: 'seen', time: '10:03 AM' },
  { id: '5', type: 'doc', fileName: 'Project_Proposal.pdf', fileSize: '1.8 MB', sender: 'sender', status: 'seen', time: '10:04 AM' },
  { id: '6', type: 'doc', fileName: 'Design_Guide.pdf', fileSize: '3.2 MB', sender: 'sender', status: 'seen', time: '10:05 AM' },
  { id: '7', type: 'doc', fileName: 'Meeting_Notes.pdf', fileSize: '1.1 MB', sender: 'receiver', status: 'seen', time: '10:06 AM' },
  { id: '8', type: 'text', text: 'Thanks for sending the documents!', sender: 'receiver', status: 'seen', time: '10:07 AM' },
  { id: '9', type: 'text', text: 'You\'re welcome! Let me know if you need anything else.', sender: 'sender', status: 'sent', time: '10:08 AM' },
  { id: '10', type: 'text', text: 'Can you review the project proposal?', sender: 'receiver', status: 'seen', time: '10:09 AM' },
  { id: '11', type: 'text', text: 'Sure, I\'ll check it today.', sender: 'sender', status: 'sent', time: '10:10 AM' },
  { id: '12', type: 'text', text: 'Great! Looking forward to your feedback.', sender: 'receiver', status: 'seen', time: '10:11 AM' },
  { id: '13', type: 'text', text: 'Will share my thoughts by EOD.', sender: 'sender', status: 'sent', time: '10:12 AM' },
];

const ChatScreen = () => {
  const { chatBackground } = useTheme();
  const [showOptions, setShowOptions] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState(demoMessages);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const flatListRef = useRef(null);
  const inputRef = useRef(null);

  console.log("keyboardHeight-------",keyboardHeight);
  

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', (e) => {
      const keyboardHeight = e.endCoordinates.height;
      setKeyboardHeight(keyboardHeight);
      
      // Scroll to bottom when keyboard appears
      setTimeout(() => {
        if (flatListRef.current) {
          flatListRef.current.scrollToEnd({ animated: true });
        }
      }, 100);
    });
    
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    // Initial scroll to bottom
    setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToEnd({ animated: false });
      }
    }, 100);
  }, []);

  const renderMessage = ({ item }) => {
    const isSender = item.sender === 'sender';

    return (
      <View style={[
        styles.messageContainer,
        isSender ? styles.senderContainer : styles.receiverContainer
      ]}>
        <LinearGradient
          colors={isSender ? ['#007AFF', '#5856D6'] : ['#2C2C2E', '#3A3A3C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.messageBubble,
            isSender ? styles.senderBubble : styles.receiverBubble
          ]}
        >
          {item.type === 'text' && (
            <>
              <Text style={styles.messageText}>{item.text}</Text>
              <View style={styles.messageFooter}>
                <Text style={styles.messageTime}>{item.time}</Text>
                {isSender && (
                  <View style={styles.statusIcon}>
                    {item.status === 'sent' && (
                      <Ionicons name="checkmark" size={moderateScale(12)} color="rgba(255,255,255,0.7)" />
                    )}
                    {item.status === 'seen' && (
                      <Ionicons name="checkmark-done" size={moderateScale(12)} color="#34C759" />
                    )}
                  </View>
                )}
              </View>
            </>
          )}

          {item.type === 'image' && (
            <>
              <Image 
                source={item.uri} 
                style={styles.messageImage}
                resizeMode="cover"
              />
              <View style={styles.messageFooter}>
                <Text style={styles.messageTime}>{item.time}</Text>
                {isSender && (
                  <View style={styles.statusIcon}>
                    {item.status === 'sent' && (
                      <Ionicons name="checkmark" size={moderateScale(12)} color="rgba(255,255,255,0.7)" />
                    )}
                    {item.status === 'seen' && (
                      <Ionicons name="checkmark-done" size={moderateScale(12)} color="#34C759" />
                    )}
                  </View>
                )}
              </View>
            </>
          )}

          {item.type === 'doc' && (
            <>
              <TouchableOpacity style={styles.docContainer} activeOpacity={0.7}>
                <MaterialCommunityIcons name="file-pdf-box" size={moderateScale(28)} color="#FF3B30" />
                <View style={styles.docInfo}>
                  <Text style={styles.docFileName} numberOfLines={1}>{item.fileName}</Text>
                  <Text style={styles.docFileSize}>{item.fileSize} • PDF</Text>
                </View>
                <Ionicons name="download-outline" size={moderateScale(20)} color="white" />
              </TouchableOpacity>
              <View style={styles.messageFooter}>
                <Text style={styles.messageTime}>{item.time}</Text>
                {isSender && (
                  <View style={styles.statusIcon}>
                    {item.status === 'sent' && (
                      <Ionicons name="checkmark" size={moderateScale(12)} color="rgba(255,255,255,0.7)" />
                    )}
                    {item.status === 'seen' && (
                      <Ionicons name="checkmark-done" size={moderateScale(12)} color="#34C759" />
                    )}
                  </View>
                )}
              </View>
            </>
          )}
        </LinearGradient>
      </View>
    );
  };

  const handleSend = () => {
    if (inputText.trim().length > 0) {
      const newMessage = {
        id: String(messages.length + 1),
        type: 'text',
        text: inputText,
        sender: 'sender',
        status: 'sent',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
      
      // Scroll to bottom after sending
      setTimeout(() => {
        if (flatListRef.current) {
          flatListRef.current.scrollToEnd({ animated: true });
        }
      }, 100);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={chatBackground ? { uri: chatBackground } : require('../../assets/images/defultback.jpg')}
        style={styles.bg}
        resizeMode="cover"
      >
        <ChatHeader />
        
        {/* Messages List */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            styles.messagesContainer,
            { paddingBottom: moderateScale(20) }
          ]}
          style={styles.messagesList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => {
            flatListRef.current?.scrollToEnd({ animated: false });
          }}
          onLayout={() => {
            flatListRef.current?.scrollToEnd({ animated: false });
          }}
          inverted={false}
          removeClippedSubviews={false}
        />

        {/* Input Area */}
        <View style={[styles.inputContainer, { marginBottom: keyboardHeight }]}>
          <View style={styles.inputWrapper}>
            <TouchableOpacity 
              onPress={() => setShowOptions(true)} 
              style={styles.attachButton}
            >
              <Ionicons name="add-circle" size={moderateScale(30)} color="#007AFF" />
            </TouchableOpacity>

            <TextInput
              ref={inputRef}
              style={styles.textInput}
              placeholder="Type a message..."
              placeholderTextColor="#8E8E93"
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={1000}
              onFocus={() => {
                setTimeout(() => {
                  flatListRef.current?.scrollToEnd({ animated: true });
                }, 100);
              }}
            />

            {inputText.trim().length > 0 ? (
              <TouchableOpacity 
                onPress={handleSend} 
                style={styles.sendButton}
              >
                <Ionicons name="send" size={moderateScale(24)} color="white" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.micButton}>
                <Ionicons name="mic-outline" size={moderateScale(24)} color="#007AFF" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Attachment Options Modal */}
        <Modal
          transparent={true}
          visible={showOptions}
          animationType="slide"
          onRequestClose={() => setShowOptions(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowOptions(false)}
          >
            <View style={styles.optionsModal}>
              <View style={styles.modalHandle} />
              <View style={styles.optionsGrid}>
                <TouchableOpacity style={styles.optionItem}>
                  <View style={[styles.optionIcon, { backgroundColor: 'rgba(255,59,48,0.1)' }]}>
                    <Ionicons name="image" size={moderateScale(28)} color="#FF3B30" />
                  </View>
                  <Text style={styles.optionLabel}>Photo</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.optionItem}>
                  <View style={[styles.optionIcon, { backgroundColor: 'rgba(0,122,255,0.1)' }]}>
                    <Ionicons name="videocam" size={moderateScale(28)} color="#007AFF" />
                  </View>
                  <Text style={styles.optionLabel}>Video</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.optionItem}>
                  <View style={[styles.optionIcon, { backgroundColor: 'rgba(52,199,89,0.1)' }]}>
                    <Ionicons name="mic" size={moderateScale(28)} color="#34C759" />
                  </View>
                  <Text style={styles.optionLabel}>Audio</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.optionItem}>
                  <View style={[styles.optionIcon, { backgroundColor: 'rgba(255,149,0,0.1)' }]}>
                    <MaterialCommunityIcons name="file" size={moderateScale(28)} color="#FF9500" />
                  </View>
                  <Text style={styles.optionLabel}>Document</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
        
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bg: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
  },
  messagesContainer: {
    paddingHorizontal: moderateScale(12),
    paddingTop: moderateScale(10),
    minHeight: SCREEN_HEIGHT * 0.7,
  },
  messageContainer: {
    marginVertical: moderateScale(6),
    maxWidth: '80%',
  },
  senderContainer: {
    alignSelf: 'flex-end',
  },
  receiverContainer: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    borderRadius: moderateScale(18),
    padding: moderateScale(10),
    maxWidth: '100%',
  },
  senderBubble: {
    borderBottomRightRadius: moderateScale(4),
  },
  receiverBubble: {
    borderBottomLeftRadius: moderateScale(4),
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: moderateScale(14),
    // lineHeight: moderateScale(22),
  },
  messageImage: {
    width: moderateScale(200),
    height: moderateScale(200),
    borderRadius: moderateScale(12),
    marginBottom: moderateScale(8),
    resizeMode:"contain"
  },
  docContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: moderateScale(12),
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(8),
    width: moderateScale(220),
  },
  docInfo: {
    flex: 1,
    marginHorizontal: moderateScale(12),
  },
  docFileName: {
    color: '#FFFFFF',
    fontSize: moderateScale(14),
    fontWeight: '500',
    marginBottom: moderateScale(2),
  },
  docFileSize: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: moderateScale(12),
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: moderateScale(4),
  },
  messageTime: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: moderateScale(11),
    marginRight: moderateScale(4),
  },
  statusIcon: {
    marginLeft: moderateScale(4),
  },
  inputContainer: {
    backgroundColor: '#1C1C1E',
    borderTopWidth: moderateScale(0.5),
    borderTopColor: '#38383A',
    paddingTop: moderateScale(8),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(12),
    paddingBottom: moderateScale(Platform.OS === 'ios' ? 8 : 4),
  },
  attachButton: {
    padding: moderateScale(6),
  },
  textInput: {
    flex: 1,
    backgroundColor: '#2C2C2E',
    color: '#FFFFFF',
    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(Platform.OS === 'ios' ? 10 : 8),
    fontSize: moderateScale(17),
    maxHeight: moderateScale(100),
    marginHorizontal: moderateScale(8),
  },
  sendButton: {
    backgroundColor: '#007AFF',
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: moderateScale(4),
  },
  micButton: {
    padding: moderateScale(6),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  optionsModal: {
    backgroundColor: '#1C1C1E',
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    paddingBottom: moderateScale(Platform.OS === 'ios' ? 34 : 20),
  },
  modalHandle: {
    width: moderateScale(36),
    height: moderateScale(5),
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: moderateScale(3),
    alignSelf: 'center',
    marginTop: moderateScale(12),
    marginBottom: moderateScale(20),
  },
  optionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: moderateScale(16),
    flexWrap: 'wrap',
  },
  optionItem: {
    alignItems: 'center',
    width: moderateScale(90),
    marginBottom: moderateScale(24),
  },
  optionIcon: {
    width: moderateScale(56),
    height: moderateScale(56),
    borderRadius: moderateScale(16),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(8),
  },
  optionLabel: {
    color: '#FFFFFF',
    fontSize: moderateScale(12),
    fontWeight: '500',
  },
});