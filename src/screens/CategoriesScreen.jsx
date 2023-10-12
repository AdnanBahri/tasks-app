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
  const [isGrid, setIsGrid] = useState(true);
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

  const handleDisplay = () => {
    setIsGrid((prev) => !prev);
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
            <Text h4>Categories</Text>
            <View className="flex-row items-center space-x-4">
              <Button onPress={handleDisplay} padding={4}>
                {isGrid ? (
                  <Ionicons
                    name="ios-grid"
                    size={18}
                    className="text-slate-900"
                  />
                ) : (
                  <Ionicons
                    name="ios-menu"
                    size={18}
                    className="text-slate-900"
                  />
                )}
              </Button>
              <Button onPress={() => setIsOpen(true)}>
                <Ionicons name="ios-add" size={28} className="text-slate-900" />
              </Button>
            </View>
          </View>
          {/* Show a Message When there is No Category yet */}
          {categories.length === 0 && (
            <View className="flex-1 flex-row items-center justify-center gap-x-1">
              <Text p weight={"600"}>
                Nothing yet.
              </Text>
              <Button onPress={() => setIsOpen(true)}>
                <Text p weight={"600"} className="text-sky-500">
                  Create
                </Text>
              </Button>
              <Text p weight={"600"}>
                a new Category.
              </Text>
            </View>
          )}
          {/* Show The saved List of Categories */}
          {categories.length > 0 && isGrid && (
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
          {categories.length > 0 && !isGrid && (
            <FlatList
              contentContainerStyle={{
                flex: 1,
                padding: 10,
              }}
              data={categories}
              keyExtractor={(item, index) => item}
              renderItem={({ item, index }) => (
                <Button
                  onPress={() =>
                    navigation.navigate("TaskScreen", { path: item })
                  }
                >
                  <View className="flex-row items-center justify-between rounded-md bg-slate-900 p-3 mb-4">
                    <Text h4 color={"#fff"}>
                      {item}
                    </Text>
                    <Button onPress={() => deleteCategory(item)}>
                      <Ionicons name="trash" size={16} color="white" />
                    </Button>
                  </View>
                </Button>
              )}
            />
          )}
          {/* Dialog Modal To Create New Category */}
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
};
export default CategoriesScreen;
