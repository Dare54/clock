/**
 * @param {object} params
 * @param {boolean} params.open
 * @param {() => void} params.onClose
 * @param {React.ReactNode} children
 */

import { Modal, Pressable, StyleSheet, View } from "react-native";
import { Children } from "react";

import { BORDER_RADIUS, GAP, PALETTE } from "../constants";

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    flex: 1,
    justifyContent: "center"
  },
  contents: {
    backgroundColor: PALETTE.white,
    borderRadius: BORDER_RADIUS,
    paddingVertical: 0.5 * GAP
  },
  item: {
    borderBottomColor: PALETTE.black,
    borderBottomWidth: 1
  }
});

const ModalMenu = ({ open, onClose, children }) => {
  const childItems = Children.toArray(children);

  return (
    <Modal visible={open} animationType="fade" transparent statusBarTranslucent>
      <Pressable style={styles.root} onPress={onClose}>
        <View style={styles.contents}>
          {childItems.map((child, i) => (
            <View
              key={i}
              style={{
                ...styles.item,
                borderBottomWidth: i < childItems.length - 1 ? 1 : 0
              }}
            >
              {child}
            </View>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
};

export default ModalMenu;