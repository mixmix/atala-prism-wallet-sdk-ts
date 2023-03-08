import { StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import * as prismWalletSdk from "@input-output-hk/atala-prism-wallet-sdk";
import { QrCodeScanner } from "../../components/QrCodeScanner";
import crypto from 'crypto';
import { randomBytes } from "@noble/hashes/utils";

console.log('asdasdads', crypto);
console.log("RANDOM", randomBytes(32));
//
// const apollo = new prismWalletSdk.Apollo();
// const castor = new prismWalletSdk.Castor(apollo);
// console.log("Apollo test:", apollo.createRandomSeed(), castor);
console.log("RANDOM", randomBytes(32));
export default function TabOneScreen() {
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
