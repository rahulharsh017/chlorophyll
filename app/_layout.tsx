import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
        <Provider store={store}>
      <Drawer // Apply custom styles to the drawer
      >
        <Drawer.Screen
          name="index"
          options={{
            title: 'Home',
            headerStyle: { backgroundColor: '#53E540' }, // Set the header background color
            headerTintColor: 'white', // Set the header text color
          }}
        />
        <Drawer.Screen
          name="BlogScreen"
          options={{
            title: 'Blog',
            headerStyle: { backgroundColor: '#53E540' },
            headerTintColor: 'white',
          }}
        />
        <Drawer.Screen
          name="ShopScreen"
          options={{
            title: 'Shop',
            headerStyle: { backgroundColor: '#53E540' },
            headerTintColor: 'white',
          }}
        />
         <Drawer.Screen
          name="CartScreen"
          options={{
            title: 'Cart',
            headerStyle: { backgroundColor: '#53E540' },
            headerTintColor: 'white',
          }}
        />
        <Drawer.Screen
          name="PaymentsScreen"
          options={{
            title: 'Payments',
            headerStyle: { backgroundColor: '#53E540' },
            headerTintColor: 'white',
            drawerItemStyle: { height: 0 }
          }}
        />
        <Drawer.Screen
          name="TulsiScreen"
          options={{
            title: 'Tulsi',
            headerStyle: { backgroundColor: '#53E540' },
            headerTintColor: 'white',
          }}
        />
      </Drawer>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#24FF07', // Set the background color of the drawer layout
  },
  drawer: {
    backgroundColor: '#24FF07', // Set the background color of the drawer (slider)
    width: '80%', // You can adjust the width of the drawer if needed
  },
});