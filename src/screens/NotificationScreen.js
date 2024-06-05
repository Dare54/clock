import { Button, View } from "react-native";


const NotificatinsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
}

export default NotificationsScreen;