import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MenuScreen from "./components/MenuScreen";
import Settings from "./components/Settings";
import GamePlayScreen from "./components/GamePlayScreen";
import store from "./app/store";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name="Menu" component={MenuScreen} />
					<Stack.Screen name="Settings" component={Settings} />
					<Stack.Screen name="PlayGame" component={GamePlayScreen} />
				</Stack.Navigator>
			</NavigationContainer>
			<StatusBar style="auto" hidden={false} />
		</Provider>
	);
}
