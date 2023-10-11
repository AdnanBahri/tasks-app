import {
  Platform,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
  FlatList,
} from "react-native";
import { Button, Text } from "../components/ui";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { Chip } from "react-native-paper";
import TaskContainer from "../components/task";
import { sortByDate } from "../utils/util";

const TasksScreen = ({ route: { params }, navigation }) => {
  const { tasks } = useSelector((state) => state.tasks);
  const { path } = params;
  console.log(path, tasks);
  const [search, setSearch] = useState("");
  const [subList, setSubList] = useState(
    path === "All"
      ? [...tasks]
      : [...tasks.filter((task) => task.category_name === path)]
  );
  const [filtredList, setFiltredList] = useState([]);
  /**
   * Filters State
   */
  // When completed and inProgress both true we display all tasks
  const [completed, setCompleted] = useState(true);
  const [inProgress, setInProgress] = useState(true);
  const [newest, setNewest] = useState(true);
  const [oldest, setOldest] = useState(false);
  const [sonner, setSonner] = useState(false);

  const handleCompleted = () => {
    setCompleted((prev) => !prev);
  };
  const handleInProgress = () => {
    setInProgress((prev) => !prev);
  };
  const handleNewest = () => {
    setNewest((prev) => {
      setOldest(prev);
      setSonner(prev);
      return !prev;
    });
  };
  const handleOldest = () => {
    setOldest((prev) => {
      setNewest(prev);
      setSonner(prev);
      return !prev;
    });
  };
  const handleSooner = () => {
    setSonner((prev) => {
      setNewest(prev);
      setOldest(prev);
      return !prev;
    });
  };

  useEffect(() => {
    let list = [];
    if (completed && inProgress) list = [...subList];
    else if (completed) {
      list = subList.filter((task) => task.completed);
    } else if (inProgress) {
      list = subList.filter((task) => !task.completed);
    }
    setFiltredList(list);
  }, [completed, inProgress, newest, oldest]);

  return (
    <SafeAreaView className={`flex-1 ${Platform.OS === "android" && "pt-5"}`}>
      <View className="flex-1 p-4 gap-y-2">
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="ios-chevron-back-outline"
              size={25}
              className="text-slate-900"
            />
          </TouchableOpacity>
          <Text h4>{path === "All" ? "My Tasks" : path}</Text>
          <TouchableOpacity disabled className="opacity-0">
            <Ionicons
              name="ellipsis-vertical"
              size={25}
              className="text-slate-900"
            />
          </TouchableOpacity>
        </View>
        {/* Search Input */}
        <TextInput
          className={`text-base text-slate-900 font-medium border-[1px] border-slate-900 rounded p-2 w-full bg-gray-300 focus:bg-white`}
          value={search}
          placeholder="Search..."
          onChangeText={(text) => setSearch(text)}
          selectionColor={"#0f172a"}
        />
        {/* Filters */}
        <View>
          <Text p className="mt-4">
            Filters:
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: 4,
            }}
          >
            <Chip
              selected={completed}
              className="mr-2"
              onPress={handleCompleted}
            >
              Completed
            </Chip>
            <Chip
              selected={inProgress}
              className="mr-2"
              onPress={handleInProgress}
            >
              In Progress
            </Chip>
            <Chip selected={sonner} className="mr-2" onPress={handleSooner}>
              Sonner
            </Chip>
            <Chip selected={newest} className="mr-2" onPress={handleNewest}>
              Newest
            </Chip>
            <Chip selected={oldest} onPress={handleOldest}>
              Oldest
            </Chip>
          </ScrollView>
        </View>
        {/* Tasks */}
        {filtredList.length === 0 && (
          <View className="flex-1 flex-row items-center justify-center gap-x-1">
            <Text>Nothing yet.</Text>
            <Button
              paddingVertical={4}
              paddingHorizontal={10}
              radius={4}
              color={"#438e96"}
              onPress={() => navigation.navigate("CreateTask")}
            >
              <Text color={"#fff"}>Create</Text>
            </Button>
            <Text>a new Task</Text>
          </View>
        )}
        {/* Show The saved List of Categories */}
        {filtredList.length > 0 && (
          <FlatList
            data={sortByDate(filtredList, newest, sonner, search)}
            contentContainerStyle={{ marginTop: 10 }}
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
export default TasksScreen;
