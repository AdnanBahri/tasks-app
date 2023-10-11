import { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import ToggleSwitch from "../components/ui/toggle";
import { Ionicons } from "@expo/vector-icons";
import { Button, Text } from "../components/ui";
import { converterDate } from "../utils/util";
import SelectDropdown from "../components/dropdown";
import { PaperProvider, SegmentedButtons } from "react-native-paper";
import DialogModal from "../components/modal";
import { useDispatch } from "react-redux";
import { addCategory, addTask } from "../redux/slices/taskSlice";

const SCREEN_WIDTH = Dimensions.get("window").width;

const CreateTaskScreen = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pickerIsOpen, setPickerIsOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [desc, setdesc] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("High");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const dispatch = useDispatch();

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

  const hideDatePicker = () => {
    setPickerIsOpen(false);
  };

  const handleDateChange = (event, date) => {
    hideDatePicker();
    if (date) {
      setSelectedDate(date);
      console.log(date.getDate());
    }
  };

  const toggleSwitch = () => {
    setIsCompleted((prev) => !prev);
  };

  const createTask = () => {
    const newTask = {
      category_name: selectedCategory,
      title: name,
      desc,
      priority: selectedPriority,
      due_date: selectedDate,
      created_at: new Date(),
      completed: isCompleted,
    };
    dispatch(addTask(newTask));
    clearUI();
  };

  const clearUI = () => {
    setIsOpen(false);
    setPickerIsOpen(false);
    setCategory("");
    setName("");
    setdesc("");
    setSelectedPriority("High");
    setSelectedCategory("");
    setIsCompleted(false);
    setSelectedDate("");
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
            <TouchableOpacity disabled className="opacity-0">
              <Ionicons
                name="ellipsis-vertical"
                size={25}
                className="text-slate-900"
              />
            </TouchableOpacity>
          </View>
          <View className="flex-1 pt-2">
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text p weight={"600"}>
                Task Name
              </Text>
              <TextInput
                className={`text-base text-slate-900 font-medium border-[1px] border-slate-900 rounded p-2 w-full bg-white mt-2`}
                value={name}
                placeholder="Enter Task Name"
                onChangeText={(text) => setName(text)}
                selectionColor={"#0f172a"}
              />
              <Text p weight={"600"} className="mt-4">
                Task Description
              </Text>
              <TextInput
                className={`text-base text-slate-900 font-medium border-[1px] border-slate-900 rounded p-2 w-full bg-white mt-2`}
                value={desc}
                placeholder="Enter Task Name"
                numberOfLines={5}
                multiline
                max
                onChangeText={(text) => setdesc(text)}
                selectionColor={"#0f172a"}
                style={{ textAlignVertical: "top", maxHeight: 100 }}
              />
              <Text p weight={"600"} className="mt-4">
                Select Category
              </Text>
              <View className="flex-row items-center space-x-2">
                <SelectDropdown
                  className="flex-1"
                  value={selectedCategory}
                  changeValue={setSelectedCategory}
                />
                <Button
                  color={"#0f172a"}
                  radius={8}
                  padding={8}
                  className={"items-center justify-center"}
                  onPress={() => setIsOpen(true)}
                >
                  <Ionicons name="ios-add" size={32} color={"#fff"} />
                </Button>
              </View>
              <Text p weight={"600"} className="mt-4">
                Select Priority
              </Text>
              <SegmentedButtons
                className="mt-2"
                showSelectedCheck={true}
                density="medium"
                value={selectedPriority}
                onValueChange={setSelectedPriority}
                buttons={[
                  {
                    value: "High",
                    label: "High",
                  },
                  {
                    value: "Medium",
                    label: "Medium",
                  },
                  { value: "Low", label: "Low" },
                ]}
              />
              <Text p weight={"600"} className="mt-4">
                Select Due Date
              </Text>
              <Button
                onPress={() => setPickerIsOpen(true)}
                className={`flex-row items-center justify-between text-base text-slate-900 font-medium border-[1px] border-slate-900 rounded p-2 w-full bg-white mt-2`}
              >
                <Text weight={"600"} className="text-gray-400">
                  {selectedDate ? converterDate(selectedDate) : "Select Date"}
                </Text>
                <Ionicons name="ios-calendar-outline" size={22} />
              </Button>
              <View className="flex-row items-center justify-between space-x-2 mt-4">
                <Text p weight={"600"}>
                  Completed:
                </Text>
                <View className="px-2 py-[15px]">
                  <ToggleSwitch open={isCompleted} swicth={toggleSwitch} />
                </View>
              </View>
              <Button
                color={"#0f172a"}
                radius={8}
                paddingVertical={12}
                className="items-center justify-center"
                onPress={createTask}
              >
                <Text p weight={"600"} className="text-white">
                  Create
                </Text>
              </Button>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
      {/* Modal To Create New Category */}
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
      {/* Date Time Picker Modal */}
      {pickerIsOpen && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode="date" // You can also use "time" or "datetime"
          is24Hour={true}
          display="spinner"
          onChange={handleDateChange}
        />
      )}
    </PaperProvider>
  );
};
export default CreateTaskScreen;
