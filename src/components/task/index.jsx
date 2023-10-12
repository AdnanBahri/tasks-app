import { View } from "react-native";
import { Button, Text } from "../ui";
import { Ionicons } from "@expo/vector-icons";
import { converterDate } from "../../utils/util";
import { useDispatch } from "react-redux";
import { removetask } from "../../redux/slices/taskSlice";
import { useState } from "react";
import { Dialog, Portal } from "react-native-paper";

const TaskContainer = ({
  category_name,
  title,
  desc,
  priority,
  due_date,
  created_at,
  completed,
}) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const handleClose = () => {
    setVisible(!visible);
  };

  const handleDelete = () => {
    setVisible(false);
    const myTask = {
      category_name,
      title,
      desc,
      priority,
      due_date,
      created_at,
      completed,
    };
    dispatch(removetask(myTask));
  };
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
        <View className="flex-row items-center space-x-2 flex-1">
          <Ionicons name="ios-calendar-outline" color={"#e2e2e2"} size={12} />
          <Text className="text-gray-400 text-xs">
            {converterDate(new Date(due_date))}
          </Text>
        </View>
        <Button
          onPress={() => setVisible(true)}
          paddingHorizontal={4}
          paddingVertical={2}
        >
          <Ionicons
            name="ios-trash-outline"
            size={18}
            className="text-slate-900"
          />
        </Button>
      </View>
      <Portal>
        <Dialog visible={visible} onDismiss={handleClose} className="bg-white">
          <Dialog.Title style={{ fontWeight: "700" }}>
            Confirmation
          </Dialog.Title>
          <Dialog.Content>
            <Text>
              This action cannot be undo later. Are you sure you want to delete
              this Task.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={handleClose}
              paddingVertical={6}
              paddingHorizontal={12}
              radius={8}
              className="border-[1px] border-slate-900"
            >
              <Text weight={"700"} className="text-slate-900">
                Cancel
              </Text>
            </Button>
            <Button
              onPress={handleDelete}
              paddingVertical={6}
              paddingHorizontal={12}
              radius={8}
              className="bg-slate-900"
            >
              <Text weight={"600"} color={"#fff"}>
                Continue
              </Text>
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
export default TaskContainer;
