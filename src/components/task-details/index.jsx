import { View, Dimensions, TextInput } from "react-native";
import { Button, Text, ToggleSwitch } from "../ui";
import { Ionicons } from "@expo/vector-icons";
import { converterDate, shortDate } from "../../utils/util";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const TaskDetailsContainer = ({
  title,
  category_name,
  desc,
  created_at,
  due_date,
  priority,
  completed,
  close,
  handleUpdate,
}) => {
  return (
    <View
      style={{
        width: SCREEN_WIDTH * 0.8,
        maxHeight: SCREEN_HEIGHT * 0.9,
        borderRadius: 4,
        paddingVertical: 12,
        paddingHorizontal: 20,
      }}
      className={`${
        priority === "High"
          ? "bg-red-200"
          : priority === "Medium"
          ? "bg-sky-200"
          : "bg-orange-200"
      }`}
    >
      {/* Header */}
      <View className="flex-row items-center justify-between">
        <Button onPress={handleUpdate}>
          <Ionicons
            name="create-outline"
            size={25}
            className="text-slate-900"
          />
        </Button>
        <Text h4>{title}</Text>
        <Button onPress={close}>
          <Ionicons name="ios-close" size={25} className="text-slate-900" />
        </Button>
      </View>
      {/* Content */}
      <Text weight={"600"} className="mt-8">
        Task Description
      </Text>
      <Text
        className={`text-base text-slate-900 font-medium rounded p-2 w-full ${
          priority === "High"
            ? "bg-red-400"
            : priority === "Medium"
            ? "bg-sky-400"
            : "bg-orange-400"
        } mt-2`}
      >
        {desc}
      </Text>
      <View className="flex-row items-center space-x-4 mt-8">
        <Text weight={"600"} className="">
          Category:
        </Text>
        <Text
          className={`text-base text-slate-900 font-medium rounded p-2 flex-1 ${
            priority === "High"
              ? "bg-red-400"
              : priority === "Medium"
              ? "bg-sky-400"
              : "bg-orange-400"
          }`}
        >
          {category_name}
        </Text>
      </View>
      <View className="flex-row items-center space-x-4 mt-8">
        <View className="flex-1">
          <Text weight={"600"} className="">
            Due Date
          </Text>
          <Text
            className={`text-base text-slate-900 font-medium rounded p-2 ${
              priority === "High"
                ? "bg-red-400"
                : priority === "Medium"
                ? "bg-sky-400"
                : "bg-orange-400"
            }`}
          >
            {shortDate(new Date(due_date))}
          </Text>
        </View>
        <View className="flex-1">
          <Text weight={"600"} className="">
            Created Date
          </Text>
          <Text
            className={`text-base text-slate-900 font-medium rounded p-2 ${
              priority === "High"
                ? "bg-red-400"
                : priority === "Medium"
                ? "bg-sky-400"
                : "bg-orange-400"
            }`}
          >
            {shortDate(new Date(created_at))}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center justify-between space-x-4 mt-4">
        <Text weight={"600"} className="">
          Completed:
        </Text>
        <View className="">
          <ToggleSwitch open={completed} swicth={() => {}} />
        </View>
      </View>
    </View>
  );
};
export default TaskDetailsContainer;
