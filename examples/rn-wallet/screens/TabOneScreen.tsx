import * as React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { QrCodeScanner } from "../components/QrCodeScanner";
import "crypto";
import { randomBytes } from "@noble/hashes/utils";
console.log("crypto", randomBytes(32));
//
// console.log("nodeCryptonodeCrypto", nodeCrypto, randomBytes(32));

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
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
      <QrCodeScanner
        buttonLabel="Scan QR Code"
        onScan={({ data, type }) => {
          console.log("SCANNED", type, data);
        }}
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
