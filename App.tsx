import React, { useEffect } from "react";
import { UserProfile, UsersList } from "./src/screens";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import { MD3DarkTheme as DefaultTheme } from "react-native-paper";
import * as Font from "expo-font";

export default function App() {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    void (async () => {
      await Font.loadAsync({
        "poppins-regular": require("./src/assets/fonts/Poppins-Light.ttf"),
        "poppins-bold": require("./src/assets/fonts/Poppins-Bold.ttf"),
        "poppins-regular-italic": require("./src/assets/fonts/Poppins-LightItalic.ttf"),
        "poppins-medium": require("./src/assets/fonts/Poppins-SemiBold.ttf"),
      });
    })();
  }, []);

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#4894FE",
      secondary: "#EEF7FF",
    },
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="UsersList">
          <Stack.Screen
            name="UsersList"
            component={UsersList}
            options={{ title: "User List" }}
          />
          <Stack.Screen
            name="UserProfile"
            component={UserProfile}
            options={{ title: "Profile" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
