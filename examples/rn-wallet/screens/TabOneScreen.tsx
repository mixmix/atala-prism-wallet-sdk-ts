import * as React from "react";
import { Button, StyleSheet, ToastAndroid } from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { QrCodeScanner } from "../components/QrCodeScanner";
import "crypto";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [didRequestReceived, setDidRequestReceived] = React.useState(null);
  const [authChallengeReceived, setAuthChallengeReceived] =
    React.useState(null);

  function handleQrCodeScan({ data, type }: { data: string; type: string }) {
    try {
      let parsedMessage = JSON.parse(data);

      if (parsedMessage.type === "https://atalaprism.io/did-request") {
        setDidRequestReceived(parsedMessage);
        navigation.navigate("DidRequestModal", {
          itemId: "123"
        })
        return;
      }

      if (
        parsedMessage.type === "https://atalaprism.io/authentication-challenge"
      ) {
        setAuthChallengeReceived(parsedMessage);
        return;
      }

      ToastAndroid.show("Unknown message received!", ToastAndroid.SHORT);
    } catch {
      ToastAndroid.show("Failed to parse given QR code!", ToastAndroid.SHORT);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test Mobile Wallet</Text>
      <Text style={styles.subtitle}>
        Powered by Atala Wallet TypeScript SDK
      </Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.3)"
      />
      <QrCodeScanner buttonLabel="Scan QR Code" onScan={handleQrCodeScan} />
      <Button
        title={"Open Modal"}
        onPress={() =>
          navigation.navigate("DidRequestModal", {
            from: "TabOneScreen",
            onboardEndpoint: "https://onboard.atalaprism.io",
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
