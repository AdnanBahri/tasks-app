import {
  FlatList,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Text } from "../components/ui";
import { converterDate } from "../utils/util";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { addTask, clearStore } from "../redux/slices/taskSlice";
import TaskContainer from "../components/task";
import { clear } from "../redux/store";

const HomeScreen = ({ navigation }) => {
  const { categories, tasks } = useSelector((state) => state.tasks);
  console.log("Tasks", tasks);
  const dispatch = useDispatch();
  const taskHandler = () => {
    dispatch(addTask());
  };
  const clearStorage = () => {
    dispatch(clear());
  };
  return (
    <SafeAreaView className={`flex-1 ${Platform.OS === "android" && "pt-5"}`}>
      <View className="flex-1 p-4 gap-y-2">
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <View>
            <Text small>Today</Text>
            <Text weight={"600"}>{converterDate(new Date())}</Text>
          </View>
          <TouchableOpacity
            onPress={clearStorage}
            className="px-2 py-1.5 rounded bg-gray-300"
          >
            <Ionicons name="ios-search" color={"#0f172a"} size={18} />
          </TouchableOpacity>
        </View>
        {/* Horizontal List of Categories */}
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: 10,
            }}
          >
            {categories.length > 0 &&
              categories.map((category, index) => (
                <TouchableOpacity
                  key={index.toString()}
                  className="bg-slate-900 rounded p-2 mr-2"
                  onPress={() =>
                    navigation.navigate("TasksScreen", { path: category })
                  }
                >
                  <Text color={"#fff"}>{category}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
        {tasks.length > 0 && (
          <View className="flex-row items-center justify-between">
            <Text weight={"600"}>My Tasks</Text>
            <Button
              onPress={() => navigation.push("TasksScreen", { path: "All" })}
            >
              <Text>View All</Text>
            </Button>
          </View>
        )}
        {tasks.length === 0 ? (
          <View className="flex-1 flex-row items-center justify-center gap-x-1">
            <Text>Nothing yet.</Text>
            <Button
              paddingVertical={4}
              paddingHorizontal={10}
              radius={4}
              color={"#438e96"}
              onPress={taskHandler}
            >
              <Text color={"#fff"}>Create</Text>
            </Button>
            <Text>a new Task</Text>
          </View>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("TasksScreen")}
              >
                <TaskContainer {...item} />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
export default HomeScreen;
