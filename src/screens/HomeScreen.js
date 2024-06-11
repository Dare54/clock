import { Button, Text, View } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        style={{ fontFamily: "FrederickatheGreat_400Regular", fontSize: 40 }}
      >
        FrederickatheGreat
      </Text>
      <Text style={{ fontFamily: "NanumBrushScript_400Regular", fontSize: 40 }}>
        NanumBrushScript
      </Text>
      <Text style={{ fontFamily: "Play", fontSize: 40 }}>play</Text>
      <Text style={{ fontFamily: "ShareTechMono_400Regular", fontSize: 40 }}>
        ShareTechMono
      </Text>
      <Text style={{ fontFamily: "SpecialElite_400Regular", fontSize: 40 }}>
        SpecialElite
      </Text>

      <View style={{ margin: 16 }} />

      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate("Profile")}
      />
    </View>
  );
};

export default HomeScreen;
