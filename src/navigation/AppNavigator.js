import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import CreateTaskScreen from "../screens/CreateTaskScreen";
import TasksScreen from "../screens/TasksScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "../components/ui";
import { View } from "react-native";
import CategoriesScreen from "../screens/CategoriesScreen";
import TaskDetailsScreen from "../screens/TaskDetailsScreen";

const MainStack = createStackNavigator();
const MainTabs = createBottomTabNavigator();

const HomeStack = () => (
  <MainStack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
    }}
  >
    <MainStack.Screen name="HomeScreen" component={HomeScreen} />
    <MainStack.Screen name="TasksScreen" component={TasksScreen} />
    <MainStack.Screen name="TaskDetailsScreen" component={TaskDetailsScreen} />
  </MainStack.Navigator>
);

const CategoriesStack = () => (
  <MainStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="CategoriesScreen"
  >
    <MainStack.Screen name="CategoriesScreen" component={CategoriesScreen} />
    <MainStack.Screen name="TaskScreen" component={TasksScreen} />
    <MainStack.Screen name="TaskDetailsScreen" component={TaskDetailsScreen} />
  </MainStack.Navigator>
);

const AppNavigator = () => {
  return (
    <MainTabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        // tabBarLabel: ({ focused }) => (
        //   <Text
        //     className={`text-xs font-light ${
        //       focused && "font-medium text-slate-900"
        //     }`}
        //   >
        //     {route.name}
        //   </Text>
        // ),
      })}
    >
      <MainTabs.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "ios-home" : "ios-home-outline"}
              size={30}
              color={"#0f172a"}
            />
          ),
        }}
      />
      <MainTabs.Screen
        name="CreateTask"
        component={CreateTaskScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "ios-add-circle" : "ios-add-circle"}
              size={52}
              color={"#0f172a"}
              style={{
                top: -25,
                height: 50,
                width: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          ),
        }}
      />
      <MainTabs.Screen
        name="Categories"
        component={CategoriesStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "ios-folder-open" : "ios-folder-open-outline"}
              size={30}
              color={"#0f172a"}
            />
          ),
        }}
      />
      {/* <MainTabs.Screen name="Details" component={CreateTaskScreen} /> */}
    </MainTabs.Navigator>
  );
};

export default AppNavigator;
