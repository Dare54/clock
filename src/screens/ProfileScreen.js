import { Button, View } from "react-native";


const ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Notifications')}
      />
    </View>
  );
}

export default ProfileScreen;