import { Button, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { decrease, increase } from "./counterSlice";

export function Counter() {
  const count = useSelector((state) => state.counter.value);
  

  const dispatch = useDispatch();
  

  console.log("COUNT: ", count)

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
      <Button onPress={() => dispatch(increase())} title="Increase" />
      <Text style={{ fontSize: 16 }}>{count}</Text>
      <Button onPress={() => dispatch(decrease())} title="Decrease" />
    </View>
  );
}