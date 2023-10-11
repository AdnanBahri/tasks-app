import {
  View,
  ActivityIndicator,
  FlatList,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  addTask,
  clearStore,
  removeAll,
  removeCategory,
  removetask,
} from "../redux/slices/taskSlice";
import { clear } from "../redux/store";
import DialogModal from "../components/modal";
import { useState } from "react";
import { PaperProvider } from "react-native-paper";
import { Button, Text } from "../components/ui";
import { Ionicons } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("screen").width;
const CARD_WIDTH = (SCREEN_WIDTH - 62) * 0.5;

const CategoriesScreen = ({ route: { params }, navigation }) => {
  const { categories } = useSelector((state) => state.tasks);
  console.log("Categories", categories);
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();

  const addTaskHandler = () => {
    dispatch(addTask("Task " + (tasks.length + 1)));
  };

  const closeModal = () => {
    setIsOpen(false);
    setCategory("");
  };

  const addCategoryHandler = () => {
    if (category.trim !== "") {
      setIsOpen(false);
      setCategory("");
      dispatch(addCategory(category));
    }
  };
  const clearStorage = () => {
    clear();
  };

  const deleteCategory = (category) => {
    dispatch(removeCategory(category));
  };

  return (
    <PaperProvider>
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
            <Text h4>Create Task</Text>
            <TouchableOpacity onPress={() => setIsOpen(true)}>
              <Ionicons name="ios-add" size={28} className="text-slate-900" />
            </TouchableOpacity>
          </View>
          {/* Show a Message When there is No Category yet */}
          {categories.length === 0 && (
            <View className="flex-1 flex-row items-center justify-center gap-x-1">
              <Text>Nothing yet.</Text>
              <Button
                paddingVertical={4}
                paddingHorizontal={10}
                radius={4}
                color={"#438e96"}
                onPress={() => setIsOpen(true)}
              >
                <Text color={"#fff"}>Create</Text>
              </Button>
              <Text>a new Category</Text>
            </View>
          )}
          {/* Show The saved List of Categories */}
          {categories.length > 0 && (
            <ScrollView>
              <View
                style={{
                  flex: 1,
                  padding: 10,
                }}
              >
                <View className="flex-1 flex-row flex-wrap">
                  {categories.map((item, index) => (
                    <TouchableOpacity
                      key={item}
                      onPress={() =>
                        navigation.navigate("TaskScreen", { path: item })
                      }
                      className="relative"
                    >
                      <View
                        className="rounded-md bg-slate-900 items-center justify-center"
                        style={{
                          width: CARD_WIDTH,
                          height: CARD_WIDTH,
                          marginRight: index % 2 === 0 ? 10 : 0,
                          marginBottom: 10,
                        }}
                      >
                        <Text h4 color={"#fff"}>
                          {item}
                        </Text>
                        <TouchableOpacity
                          className="absolute top-2 right-2"
                          onPress={() => deleteCategory(item)}
                        >
                          <Ionicons name="trash" size={16} color="white" />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>
          )}
          <DialogModal visible={isOpen} hide={() => setIsOpen(false)}>
            <View
              style={{
                alignItems: "center",
                width: SCREEN_WIDTH * 0.8,
                height: 200,
                backgroundColor: "white",
                borderRadius: 4,
                paddingVertical: 8,
              }}
            >
              <Text h4 color={"#0f172a"}>
                Create New Category
              </Text>
              <TextInput
                className={`text-base text-slate-900 font-medium border-[1px] rounded p-2 w-full max-w-[90%] my-10 bg-gray-300 focus:bg-white`}
                value={category}
                placeholder="Shopping List"
                onChangeText={(text) => setCategory(text)}
                selectionColor={"#0f172a"}
              />
              <View className="flex-row items-center space-x-2 justify-end w-full max-w-[90%]">
                <Button
                  radius={4}
                  paddingVertical={3}
                  paddingHorizontal={12}
                  onPress={closeModal}
                  style={{
                    borderColor: "#0f172a",
                    borderWidth: 1,
                  }}
                >
                  <Text color={"#0f172a"} small weight={"600"}>
                    Cancel
                  </Text>
                </Button>
                <Button
                  radius={4}
                  color={"#0f172a"}
                  paddingVertical={4}
                  paddingHorizontal={12}
                  onPress={addCategoryHandler}
                >
                  <Text color={"#fff"} small weight={"600"}>
                    Submit
                  </Text>
                </Button>
              </View>
            </View>
          </DialogModal>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
  // const { action, task } = params;
  // console.log(action);
  // const [isOpen, setIsOpen] = useState(false);
  // const [title, setTitle] = useState(action !== "create" ? task.title : "");
  // const [desc, setDesc] = useState(action !== "create" ? task.desc : "");
  // const [dueDate, setDueDate] = useState(null);
  // const [priority, setPriority] = useState();
  // const [isCompleted, setIsCompleted] = useState(false);

  // const showDatePicker = () => {
  //   setIsOpen(true);
  // };

  // const hideDatePicker = () => {
  //   setIsOpen(false);
  // };

  // const handleDateChange = (event, selectedDate) => {
  //   hideDatePicker();
  //   if (selectedDate) {
  //     setDueDate(selectedDate);
  //     console.log(selectedDate.getDate());
  //   }
  // };

  // const toggleSwitch = () => {
  //   setIsCompleted((prev) => !prev);
  // };

  // return (
  //   <View className="flex-1 p-4 space-y-2">
  //     <Text className="text-lg font-medium text-slate-700">
  //       {action === "create" ? "Create New Task" : `Update ${task.title}`}
  //     </Text>
  //     <Text className="text-lg font-medium">Title</Text>
  //     <TextInput
  //       className="text-base font-medium bg-gray-300 rounded p-2"
  //       value={title}
  //       placeholder="Task Header"
  //       onChangeText={(text) => setTitle(text)}
  //     />
  //     <Text className="text-lg font-medium">Description</Text>
  //     <TextInput
  //       className="text-base font-medium rounded bg-gray-300 text-slate-700 p-2"
  //       placeholder="Write Something..."
  //       value={desc}
  //       multiline={true}
  //       numberOfLines={5}
  //       onChangeText={(text) => setDesc(text)}
  //       style={{ textAlignVertical: "top" }}
  //     />
  //     <View className="flex-row space-x-2">
  //       <View className="flex-1">
  //         <Text className="text-lg font-medium">Due Date</Text>
  //         <TouchableOpacity
  //           className="rounded bg-gray-400 px-2 py-[15px]"
  //           onPress={showDatePicker}
  //         >
  //           <Text className="text-base">
  //             {!dueDate
  //               ? "dd-mm-yyyy"
  //               : `${dueDate.getDate() < 10 && "0"}${dueDate.getDate()} - ${
  //                   dueDate.getMonth() < 9 && "0"
  //                 }${dueDate.getMonth() + 1} - ${dueDate.getFullYear()}`}
  //           </Text>
  //         </TouchableOpacity>
  //       </View>
  //       <View className="flex-1">
  //         <Text className="text-lg font-medium">Priority</Text>
  //         <View className="rounded bg-gray-400">
  //           <Picker
  //             selectedValue={priority}
  //             onValueChange={(itemValue, itemIndex) => setPriority(itemValue)}
  //           >
  //             <Picker.Item label="High" value="2" />
  //             <Picker.Item label="Medium" value="1" />
  //             <Picker.Item label="Low" value="0" />
  //           </Picker>
  //         </View>

  //         {/* <TouchableOpacity className="rounded bg-gray-400 px-2 py-3">
  //             <Text className="text-base">dd-mm-yyyy</Text>
  //           </TouchableOpacity> */}
  //       </View>
  //     </View>
  //     <View className="flex-row space-x-2">
  //       <View className="flex-1">
  //         <Text className="text-lg font-medium">Completed</Text>
  //         <View className="px-2 py-[15px]">
  //           <ToggleSwitch open={isCompleted} swicth={toggleSwitch} />
  //         </View>
  //       </View>
  //       <View className="flex-1">
  //         <Text className="text-lg font-medium">Create Date</Text>
  //         <View className="rounded bg-gray-400 px-2 py-[15px]">
  //           <Text className="text-base">dd-mm-yyyy</Text>
  //         </View>
  //       </View>
  //     </View>
  //     {isOpen && (
  //       <DateTimePicker
  //         testID="dateTimePicker"
  //         value={dueDate || new Date()}
  //         mode="date" // You can also use "time" or "datetime"
  //         is24Hour={true}
  //         display="spinner"
  //         onChange={handleDateChange}
  //       />
  //     )}
  //   </View>
  // );
};
export default CategoriesScreen;
