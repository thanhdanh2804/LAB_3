import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Appbar, Button, TextInput } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';
import { useMyContextController } from "../store";

const AddNewService = ({ navigation, route }) => {
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const collectionRef = firestore().collection('services');
  const [contextController] = useMyContextController();
  const { userLogin } = contextController;

  const { addService } = route.params;

  const handleAddService = async () => {
    if (!serviceName || !servicePrice) {
      return;
    }

    try {
      const newService = {
        Name: serviceName,
        price: servicePrice,
        createBy: userLogin.role,
      };
      const docRef = await collectionRef.add(newService);
      
      // Add ID to the new service
      const newServiceWithId = { ...newService, id: docRef.id };

      // Call the addService callback
      addService(newServiceWithId);

      navigation.navigate("Services");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar style={{ backgroundColor: "pink" }}>
        <Appbar.BackAction onPress={() => navigation.navigate("Services")} />
        <Appbar.Content title={<Text style={{ color: 'white', fontSize: 20 }}>Service</Text>} />
      </Appbar>
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps='handled'>
        <View style={styles.inputContainer}>
          <Text>Service name *</Text>
          <TextInput
            style={styles.input}
            placeholder={`Input a service name`}
            value={serviceName}
            onChangeText={(text) => setServiceName(text)}
          />
          <Text></Text>
          <Text>Price *</Text>
          <TextInput
            style={styles.input}
            placeholder={`0`}
            value={servicePrice}
            onChangeText={(text) => setServicePrice(text)}
          />
          <Text></Text>
          <Button onPress={handleAddService} style={styles.addButton}>Add</Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
  },
  addButton: {
    marginTop: 10,
    backgroundColor: 'blue',
    color: 'white',
  },
});

export default AddNewService;
