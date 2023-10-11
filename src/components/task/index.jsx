import { View } from "react-native";
import { Text } from "../ui";
import { Ionicons } from "@expo/vector-icons";
import { converterDate } from "../../utils/util";

const TaskContainer = ({
  category_name,
  title,
  desc,
  priority,
  due_date,
  created_at,
  completed,
}) => {
  return (
    <View className="bg-white rounded-md p-4 shadow space-y-2">
      <View className="flex-row items-center justify-between">
        <Text p weight={"600"}>
          {title}
        </Text>
        <View
          className={`px-2 py-1 rounded ${
            priority === "High"
              ? "bg-red-200"
              : priority === "Medium"
              ? "bg-sky-200"
              : "bg-orange-200"
          }`}
        >
          <Text
            small
            color={
              priority === "High"
                ? "#ef4444"
                : priority === "Medium"
                ? "#0ea5e9"
                : "#f97316"
            }
            weight={"600"}
          >
            {priority}
          </Text>
        </View>
      </View>
      <Text ellipsizeMode="tail" lines={3} className="text-gray-500">
        {desc}
      </Text>
      <View className="pt-2 border-t-[1px] border-gray-400 flex-row items-center justify-start">
        <View className="flex-row items-center space-x-2">
          <Ionicons name="ios-calendar-outline" color={"#e2e2e2"} size={12} />
          <Text className="text-gray-400 text-xs">
            {converterDate(new Date(due_date))}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default TaskContainer;
