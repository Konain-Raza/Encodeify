import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Platform,
  PermissionsAndroid,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';

const Generator = () => {
  const [qrCode, setQRCode] = useState('');
  const viewShotRef = useRef(null);

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Permission to save to storage',
          message: 'App needs permission to save to storage to capture QR code',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const handleDownloadQRCode = async () => {
    if (Platform.OS === 'android') {
      const hasPermission = await requestStoragePermission();
      if (hasPermission) {
        await saveQRCode();
      } else {
        console.log('Permission denied');
      }
    } else {
      await saveQRCode();
    }
    setQRCode('');
  };
  const saveQRCode = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      const date = new Date();
      const formattedDate = date.toISOString().replace(/[-:.TZ]/g, '');
      const path = `${RNFS.DownloadDirectoryPath}/${qrCode || 'QRCode'}_${formattedDate}.png`;
  
      await RNFS.writeFile(path, uri, 'base64');
      await RNFS.scanFile(path);
      Alert.alert('🎉 Success!', 'Your QR Code is ready and saved!');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to download QR Code');
    }
  };
  

  return (
    <View className="flex-1 items-center justify-center bg-gray-900 p-6">
      <Text className="text-3xl text-white mb-6 font-gilroyBold">
        Craft Your QR Code ✨
      </Text>
      <View className='bg-purple-950 p-10 rounded-3xl'>
        <ViewShot
          ref={viewShotRef}
          options={{ format: 'png', quality: 1.0, width: 220, height: 220 }}
        >
          <View className="p-4 bg-white shadow-lg border-black rounded-md">
            <QRCode
              value={qrCode || 'https://konainraza.vercel.app'}
              size={150}
              color="black"
              backgroundColor="white"
            />
          </View>
        </ViewShot>
      </View>
      <TextInput
        className="w-full p-4 mt-8 mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter text for QR Code"
        placeholderTextColor="#888"
        onChangeText={text => setQRCode(text)}
      />
      <TouchableOpacity
        className="w-full bg-purple-950 py-4 rounded-lg"
        onPress={handleDownloadQRCode}
      >
        <Text className="text-white text-center text-lg font-semibold">
          Download QR Code 📥
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Generator;
