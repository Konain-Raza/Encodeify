import { View, Text, TouchableOpacity, Animated } from 'react-native';
import React from 'react';
import Generator from './Screens/Generator';
import Scanner from './Screens/Scanner';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-remix-icon';

const App = () => {
  const Tab = createBottomTabNavigator();
  const animatedValue = React.useRef(new Animated.Value(1)).current;
  const horizontalTranslate = React.useRef(new Animated.Value(0)).current;

  const handlePress = (onPress) => {
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

  const tabBarIconStyle = () => ({
    transform: [
      { scale: animatedValue },
      { translateX: horizontalTranslate },
    ],
  });

  const tabBarLabelStyle = ({ focused }) => ({
    className: focused ? 'text-transparent font-semibold text-lg' : 'text-gray-400 font-semibold text-base',
  });

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={() => ({
          
          tabBarStyle: {
            width: '80%',
            alignSelf: 'center',
            backgroundColor: 'white',
            borderRadius: 15,
            marginBottom: 10,
            paddingVertical: 1,
            height: 80,
            marginHorizontal: 10,
            justifyContent: 'center',
            alignItems: 'center',
          },
          tabBarLabelStyle: tabBarLabelStyle,
          tabBarIconStyle: tabBarIconStyle,
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#9ca3af',
          tabBarActiveBackgroundColor: '#6d28d9',
          tabBarItemStyle: {
            borderRadius: 10,
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 10,
          },
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => handlePress(props.onPress)}
            />
          ),
        })}
      >
        
        <Tab.Screen
          name="Generator"
          component={Generator}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="ri-qr-code-line" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Scanner"
          component={Scanner}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="qr-scan-2-line" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
