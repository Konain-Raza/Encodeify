import { View, Text, TouchableOpacity, Animated } from 'react-native';
import React, { useEffect, useState } from 'react';
import Generator from './Screens/Generator';
import Scanner from './Screens/Scanner';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-remix-icon';
import Splash from './Screens/Splash';

const App = () => {
  // console.log("first")
  const [showSplash, setShowSplash] = useState(true); 

  useEffect(() => {

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); 
    return () => clearTimeout(timer);
  }, []);

  const Tab = createBottomTabNavigator();
  const animatedValue = React.useRef(new Animated.Value(1)).current;
  const horizontalTranslate = React.useRef(new Animated.Value(0)).current;

  const handlePress = onPress => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(animatedValue, {
          toValue: 1.2,
          friction: 2,
          tension: 80,
          useNativeDriver: true,
        }),
        Animated.spring(horizontalTranslate, {
          toValue: 10,
          friction: 2,
          tension: 80,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.spring(animatedValue, {
          toValue: 1,
          friction: 2,
          tension: 80,
          useNativeDriver: true,
        }),
        Animated.spring(horizontalTranslate, {
          toValue: 0,
          friction: 2,
          tension: 80,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
    onPress();
  };

  // Render the Splash screen if showSplash is true
  if (showSplash) {
    return <Splash />;
  }
  return (
  <View style={{ flex: 1, backgroundColor: '#111827' }}>
      <NavigationContainer >
      <Tab.Navigator
          screenOptions={() => ({
            headerShown: false,
            tabBarStyle: {
              width: '80%',
              alignSelf: 'center',
              backgroundColor: '#1F2937', // Darker background for tab bar
              borderRadius: 15,
              marginBottom: 10,
              paddingVertical: 0,
              height: 70,
              marginHorizontal: 10,
              justifyContent: 'center',
              alignItems: 'center',
            },
            tabBarLabelStyle: ({ focused }) => ({
              color: focused ? '#ffffff' : '#9ca3af', // White for active, gray for inactive
              fontWeight: '600',
              fontSize: focused ? 16 : 14,
            }),
            tabBarIconStyle: {
              size: 20,
            },
            tabBarActiveTintColor: '#ffffff',
            tabBarInactiveTintColor: '#9ca3af',
            tabBarActiveBackgroundColor: '#6D28D9', // Purple for active background
            tabBarItemStyle: {
              borderRadius: 10,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderRadius: 10,
            },
            tabBarButton: props => (
              <TouchableOpacity
                {...props}
                onPress={() => handlePress(props.onPress)}
              />
          ),
        })}>
        <Tab.Screen
          name="Generator"
          component={Generator}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="ri-qr-code-line" color={color} size={35} />
            ),
          }}
        />
        <Tab.Screen
          name="Scanner"
          component={Scanner}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="qr-scan-2-line" color={color} size={35} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  </View>
  );
};

export default App;
