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
import TaskContainer from "../components/task";
import { clear } from "../redux/store";
import TaskDetailsContainer from "../components/task-details";
import { useState } from "react";
import DialogModal from "../components/modal";
import { PaperProvider } from "react-native-paper";

const HomeScreen = ({ navigation }) => {
  const { categories, tasks } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const clearStorage = () => {
    dispatch(clear());
  };
  const closetaskModal = () => {
    setIsTaskOpen(false);
    setSelectedTask(null);
  };
  const handleUpdate = () => {
    navigation.push("TaskDetailsScreen", {
      task: JSON.stringify(selectedTask),
    });
    closetaskModal();
  };
  return (
    <PaperProvider>
      <SafeAreaView className={`flex-1 ${Platform.OS === "android" && "pt-5"}`}>
        <View className="flex-1 p-4 gap-y-2">
          {/* Header */}
          <View className="flex-row items-center justify-between">
            <View>
              <Text small>Today</Text>
              <Text weight={"600"}>{converterDate(new Date())}</Text>
            </View>
            <Button className="px-2 py-1.5 rounded bg-gray-300">
              <Ionicons name="ios-search" color={"#0f172a"} size={18} />
            </Button>
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
              <Text p weight={"600"}>
                Nothing yet.
              </Text>
              <Button onPress={() => navigation.navigate("CreateTask")}>
                <Text p weight={"600"} className="text-sky-500">
                  Create
                </Text>
              </Button>
              <Text p weight={"600"}>
                a new Task
              </Text>
            </View>
          ) : (
            <FlatList
              data={tasks}
              keyExtractor={(_, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
              renderItem={({ item, index }) => (
                <Button
                  onPress={() => {
                    setSelectedTask(item);
                    setIsTaskOpen(true);
                  }}
                >
                  <TaskContainer {...item} />
                </Button>
              )}
            />
          )}
        </View>

        {/* Dialog Modal To View Task Details */}
        <DialogModal visible={isTaskOpen} hide={closetaskModal}>
          <TaskDetailsContainer
            {...selectedTask}
            close={closetaskModal}
            handleUpdate={handleUpdate}
          />
        </DialogModal>
      </SafeAreaView>
    </PaperProvider>
  );
};
export default HomeScreen;
