import React, {useRef, useState} from 'react';
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
        },
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
  };

  const sanitizeFileName = (filename) => {
    return filename.replace(/[^a-zA-Z0-9]/g, '').slice(0, 10); // Remove special characters and limit length to 10
  };
  
  const saveQRCode = async () => {
    try {
      await viewShotRef.current.capture().then(async (uri) => {
        const sanitizedQRCode = qrCode ? sanitizeFileName(qrCode) : 'QRCode';
        const randomIdentifier = Math.random().toString(36).slice(2, 8);
        const uniqueFileName = `${sanitizedQRCode}_${randomIdentifier}.png`;
        const path = `${RNFS.DownloadDirectoryPath}/${uniqueFileName}`;
  
        await RNFS.moveFile(uri, path);
        await RNFS.scanFile(path);
        Alert.alert('🎉 Success!', 'Your QR Code is ready and saved!');
        console.log('File saved to:', path);
      });
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
      <View className="bg-purple-950 p-10 rounded-3xl">
        <ViewShot
          ref={viewShotRef}
          options={{format: 'png', quality: 1.0, width: 220, height: 220}}>
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
        onPress={handleDownloadQRCode}>
        <Text className="text-white text-center text-lg font-semibold">
          Download QR Code 📥
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Generator;
