import React, { useState } from "react";
import { StyleSheet, Button, Modal } from "react-native";
import { Text, useTextThemeColor, View } from "../components/Themed";

import { BarCodeScanner } from "expo-barcode-scanner";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export function QrCodeScanner({
  buttonLabel = "Tap to Scan",
  onScan,
}: {
  buttonLabel?: string;
  onScan: ({ type, data }: { type: string; data: string }) => void;
}) {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [isOpen, setIsOpen] = useState(false);
  const color = useTextThemeColor();

  async function openScanner() {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
    setIsOpen(true);
  }

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    onScan({ type, data });
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <View style={styles.button}>
        <FontAwesome size={60} name="qrcode" color={color} />
        <Button color={"#916eff"} title={buttonLabel} onPress={openScanner} />
      </View>
    );
  }

  if (hasPermission === null) {
    return <Text style={styles.text}>Requesting for camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={false}
        visible={isOpen}
        onRequestClose={() => {
          setIsOpen(false);
        }}
        style={{ backgroundColor: "black" }}
      >
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        <Button
          color={"#916eff"}
          title={"Close"}
          onPress={() => setIsOpen(false)}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {},
  container: {
    position: "absolute",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
