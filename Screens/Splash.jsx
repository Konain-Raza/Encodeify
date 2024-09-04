import React from 'react';
import { View, Text, Image } from 'react-native';

const icon = require('../assets/images/icon.png');

const Splash = () => {

  return (
    <View className="flex-1 justify-between bg-gray-900 p-5">
      <View className="flex-1 items-center justify-center">
        <View >
          <Image
            source={icon}
            className="w-36 h-36 mb-6 rounded-3xl"
            resizeMode="contain"
          />
        </View>
        <Text className="text-3xl font-gilroyBold text-white text-center mb-3">
          QR Awaits You! Ready, Set, Go! 🏁
        </Text>
        <Text className="text-lg text-gray-300 text-center px-2 mb-4 font-gilroyBold">
          Explore Encodeify: Where your QR journey begins! Generate, scan, and
          shine in the code-filled universe. 🌠📲
        </Text>
      </View>
      <View className="pb-5">
        <Text className="text-lg font-gilroyBold text-gray-300 text-center bottom-0">
          Made with ❤️ by Konain Raza
        </Text>
      </View>
    </View>
  );
};

export default Splash;
