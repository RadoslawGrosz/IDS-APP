// /**
//  * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
//  * https://reactnavigation.org/docs/getting-started
//  *
//  */
// import { useAuth } from "../hooks/useAuth";
// import { FontAwesome } from "@expo/vector-icons";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import {
//   NavigationContainer,
//   DefaultTheme,
//   DarkTheme,
// } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { ColorSchemeName, Pressable, View } from "react-native";

// import Colors from "../constants/Colors";
// import useColorScheme from "../hooks/useColorScheme";
// import ModalScreen from "../screens/ModalScreen";
// import NotFoundScreen from "../screens/NotFoundScreen";
// import TabOneScreen from "../screens/TabOneScreen";
// import TabTwoScreen from "../screens/TabTwoScreen";
// import {
//   RootStackParamList,
//   RootTabParamList,
//   RootTabScreenProps,
// } from "../types";
// import LinkingConfiguration from "./LinkingConfiguration";
// import LoginView from "../pages/Login/LoginPage";
// import { useTranslation } from "../App";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import { Button, Menu, Divider, Provider } from "react-native-paper";
// import React from "react";

// export default function Navigation({
//   colorScheme,
// }: {
//   colorScheme: ColorSchemeName;
// }) {
//   return (
//     <NavigationContainer
//       linking={LinkingConfiguration}
//       theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
//     >
//       <RootNavigator />
//     </NavigationContainer>
//   );
// }

// /**
//  * A root stack navigator is often used for displaying modals on top of all other content.
//  * https://reactnavigation.org/docs/modal
//  */
// const Stack = createNativeStackNavigator<RootStackParamList>();

// function RootNavigator() {
//   const { isAuthenticated, login } = useAuth();
//   const { i18n } = useTranslation();

//   return (
//     <Stack.Navigator>
//       {isAuthenticated ? (
//         <>
//           <Stack.Screen
//             name="Root"
//             component={BottomTabNavigator}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="NotFound"
//             component={NotFoundScreen}
//             options={{ title: "Oops!" }}
//           />
//           <Stack.Group screenOptions={{ presentation: "modal" }}>
//             <Stack.Screen name="Modal" component={ModalScreen} />
//           </Stack.Group>
//         </>
//       ) : (
//         <Stack.Screen
//           name="Login"
//           component={LoginView}
//           options={{
//             title: i18n.t("signIn"),
//           }}
//         />
//       )}
//     </Stack.Navigator>
//   );
// }

// /**
//  * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
//  * https://reactnavigation.org/docs/bottom-tab-navigator
//  */
// const BottomTab = createBottomTabNavigator<RootTabParamList>();

// function BottomTabNavigator() {
//   const colorScheme = useColorScheme();
//   const [visible, setVisible] = React.useState(false);

//   const openMenu = () => setVisible(true);

//   const closeMenu = () => setVisible(false);

//   return (
//     <BottomTab.Navigator
//       initialRouteName="TabOne"
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme].tint,
//       }}
//     >
//       <BottomTab.Screen
//         name="TabOne"
//         component={TabOneScreen}
//         options={({ navigation }: RootTabScreenProps<"TabOne">) => ({
//           title: "Tab One",
//           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
//           headerRight: () => (
//             // <Pressable
//             //   onPress={() => navigation.navigate("Modal")}
//             //   style={({ pressed }) => ({
//             //     opacity: pressed ? 0.5 : 1,
//             //   })}
//             // >
//             //   <Ionicons
//             //     name="ellipsis-vertical-sharp"
//             //     size={24}
//             //     color="black"
//             //   />
//             // </Pressable>
//             <View>
//               <Provider>
//                 <View
//                   style={{
//                     paddingTop: 50,
//                     flexDirection: "row",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <Menu
//                     visible={visible}
//                     onDismiss={closeMenu}
//                     anchor={<Button onPress={openMenu}>Show menu</Button>}
//                   >
//                     <Menu.Item onPress={() => {}} title="Item 1" />
//                     <Menu.Item onPress={() => {}} title="Item 2" />
//                     <Divider />
//                     <Menu.Item onPress={() => {}} title="Item 3" />
//                   </Menu>
//                 </View>
//               </Provider>
//             </View>
//           ),
//         })}
//       />
//       <BottomTab.Screen
//         name="TabTwo"
//         component={TabTwoScreen}
//         options={{
//           title: "Tab Two",
//           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
//         }}
//       />
//     </BottomTab.Navigator>
//   );
// }

// /**
//  * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
//  */
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>["name"];
//   color: string;
// }) {
//   return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
// }

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackHeaderProps } from '@react-navigation/stack';
import DetailsScreen from '../screens/DetailsScreen';
import HomeScreen from '../screens/HomeScreen';
import { Appbar, Menu } from 'react-native-paper';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from '../App';
import LoginView from '../pages/Login/LoginPage';
import ReleaseScreen from '../screens/replenishment/ReleaseScreen';

const Stack = createStackNavigator();

export default function Navigation() {
  const { isAuthenticated } = useAuth();
  const { i18n } = useTranslation();

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Stack.Navigator
          initialRouteName='Home'
          screenOptions={{
            header: props => <CustomNavigationBar {...props} />
          }}
        >
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Release' component={ReleaseScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen
            name='Login'
            component={LoginView}
            options={{
              title: i18n.t('signIn')
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

function CustomNavigationBar({ navigation, back }: StackHeaderProps) {
  const { logout } = useAuth();
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title='Bogmar' />
      {!back ? (
        <Menu visible={visible} onDismiss={closeMenu} anchor={<Appbar.Action icon='menu' color='black' onPress={openMenu} />}>
          <Menu.Item onPress={logout} title='Logout' />
        </Menu>
      ) : null}
    </Appbar.Header>
  );
}
