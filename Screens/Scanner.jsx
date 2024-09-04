import React, { useState } from 'react';
import { View, Alert, Text, TouchableOpacity } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-remix-icon';
// import { Clipboard } from 'react-native';

const Scanner = () => {
  const [flashMode, setFlashMode] = useState(RNCamera.Constants.FlashMode.off);
  const [cameraType, setCameraType] = useState('back');
  const [scannedData, setScannedData] = useState(
    '',
  );

  const toggleFlash = () => {
    setFlashMode(
      flashMode === RNCamera.Constants.FlashMode.off
        ? RNCamera.Constants.FlashMode.torch
        : RNCamera.Constants.FlashMode.off
    );
  };

  const copyUrl = async () => {
   
    try {
      // await Clipboard.setString(scannedData);
      
      Alert.alert(
        'Copied!',
        'The URL has been copied to your clipboard.',
      );

     
    } catch (error) {
      Alert.alert('Error', 'Failed to copy URL to clipboard.');
    }

   
};

  const switchCamera = () => {
    setCameraType(cameraType === 'back' ? 'front' : 'back');
  };

  return (
    <View className="w-screen h-[100%] items-center justify-center">
      <QRCodeScanner
        onRead={({ data }) => {
          setScannedData(data);
        }}
        reactivate={true}
        reactivateTimeout={2000}
        containerStyle={{ width: '100%', height: '100%' }} 
        cameraStyle={{ width: '100%', height: '100%' }}
        showMarker={true}
        flashMode={flashMode}
        cameraType={cameraType}
        markerStyle={{ borderColor: '#39FF14', borderWidth: 4 }}
      />

      <View className="absolute bottom-4 left-4 right-4 flex-row justify-between items-center">
        <TouchableOpacity
          onPress={switchCamera}
          className="bg-gray-700 p-4 rounded-2xl"
        >
          <Icon name="camera-switch-fill" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleFlash}
         
          className={`${flashMode === RNCamera.Constants.FlashMode.off ? 'bg-gray-700' : 'bg-yellow-300'} p-4 rounded-2xl`}
        >
          <Icon
            name={
              flashMode === RNCamera.Constants.FlashMode.off
                ? 'lightbulb-line'
                : 'lightbulb-fill'
            }
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
      {scannedData ? (
        <View className="absolute bottom-24 left-4 right-4 p-4 bg-gray-700 rounded-lg shadow-lg flex-row items-center justify-between">
          <Text className="text-white text-center text-lg">
            {`${scannedData.slice(0, 35)}...`}
          </Text>
          <TouchableOpacity onPress={copyUrl}>
            <Text>
              <Icon name="file-copy-line" size={20} color="#fff" />
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default Scanner;
