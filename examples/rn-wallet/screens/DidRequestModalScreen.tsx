import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Platform, StyleSheet, ToastAndroid } from "react-native";
import axios from "axios";
import uuid from "react-native-uuid";

import { Text, View, TextInput } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import Colors from "../constants/Colors";
import { useContacts } from "../hooks/useContacts";
import * as didService from "../services/dids";

export default function DidRequestModalScreen({
  route,
  navigation,
}: RootStackScreenProps<"DidRequestModal">) {
  const { from, onboardEndpoint } = route.params;
  const [onboardAccepted, setOnboardAccepted] = React.useState(false);
  const [contactName, setContactName] = React.useState(from || "New contact");
  const { addContact, removeContact } = useContacts();

  function goHome() {
    navigation.navigate("Root");
  }

  async function rejectOnboardRequest() {
    try {
      await axios.post(onboardEndpoint, {
        did: null,
      });
    } catch {
      console.log("Reject request failed");
    }
    goHome();
  }

  function acceptOnboardRequest() {
    setOnboardAccepted(true);
  }

  async function createContactAndRespondToOnboardRequest() {
    console.log('111');
    try {
      const { peerDID } = await didService.createPeerDid();
      // const { peerDID } = {peerDID: 'did:peer:0z6MksHh7qV7SbVgQZ7Rrg'}
      const newDid = peerDID.toString();
      const contactId = uuid.v4() as string;

      addContact({
        did: newDid,
        label: contactName,
        id: contactId,
      });

      try {
        await axios.post(onboardEndpoint, {
          did: newDid,
        });
      } catch {
        console.log('2222');

        // didService.removeDid(newDid);
        removeContact(contactId);
        ToastAndroid.show(
          "Failed to respond to onboard endpoint!",
          ToastAndroid.SHORT
        );
      }
    } catch (e) {
      console.log('3333');

      ToastAndroid.show("Failed to create new contact!", ToastAndroid.SHORT);
    }

    goHome();
  }

  if (onboardAccepted) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>New contact will be created!</Text>
        <Text style={styles.subtitle}>Please choose name you want to use.</Text>

        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />

        <TextInput
          value={contactName}
          onChangeText={setContactName}
          style={{ width: "80%" }}
          autoFocus={true}
        />
        <Button
          color={Colors.primary}
          title={"Create Contact"}
          onPress={createContactAndRespondToOnboardRequest}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accept DID request?</Text>
      {from ? <Text style={styles.subtitle}>from "{from}"</Text> : null}
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <View style={styles.buttonsWrapper}>
        <Button
          color={Colors.primary}
          title={"Accept"}
          onPress={acceptOnboardRequest}
        />
        <Button
          color={Colors.error}
          title={"Reject"}
          onPress={rejectOnboardRequest}
        />
      </View>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
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
  buttonsWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 100,
  },
});
