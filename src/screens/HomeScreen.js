import { Button, Text, View } from "react-native";


const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        style={{ fontFamily: "frederickatheGreat_400Regular", fontSize: 40 }}
      >
        FrederickatheGreat
      </Text>
      <Text style={{ fontFamily: "nanumBrushScript_400Regular", fontSize: 40 }}>
        NanumBrushScript
      </Text>
      <Text style={{ fontFamily: "play", fontSize: 40 }}>play</Text>
      <Text style={{ fontFamily: "shareTechMono_400Regular", fontSize: 40 }}>
        ShareTechMono
      </Text>
      <Text style={{ fontFamily: "specialElite_400Regular", fontSize: 40 }}>
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
