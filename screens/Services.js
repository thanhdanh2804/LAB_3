import firestore from '@react-native-firebase/firestore';
import React, { useState, useEffect } from "react";
import { FlatList, Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { Appbar, IconButton, Text } from "react-native-paper";
import { useMyContextController } from '../store';

const ServiceList = ({ navigation }) => {
  const [stateController] = useMyContextController();
  const { userLogin } = stateController;

  const [services, setServices] = useState([]);
  const firestoreRef = firestore().collection('services');

  useEffect(() => {
    const unsubscribe = firestoreRef.onSnapshot(snapshot => {
      const servicesArray = [];
      snapshot.forEach(doc => servicesArray.push({ id: doc.id, ...doc.data() }));
      setServices(servicesArray);
    });
    return () => unsubscribe();
  }, []);

  const addService = (newService) => {
    setServices(prevServices => [...prevServices, newService]);
  };

  const renderServiceItem = ({ item }) => {
    const { Name, price } = item;
    return (
      <TouchableOpacity 
        style={styles.serviceItem}
        onPress={() => navigation.navigate("ServiceDetailScreen", { item })}
      >
        <Text style={styles.serviceName}>{Name}</Text>
        <Text>{price} VND</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Appbar style={styles.appbar}>
        <Appbar.Content 
          title={<Text style={styles.appbarTitle}>{userLogin ? userLogin.fullName : ""}</Text>} 
        />
        <IconButton icon="account-circle" color="white" />
      </Appbar>
      <Image 
        source={require("../img/logo.png")}
        style={styles.logo}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Danh sách dịch vụ</Text>
        <IconButton 
          icon="plus-circle" 
          color="red" 
          size={40} 
          onPress={() => navigation.navigate("AddNewService", { addService })}
        />
      </View>
      <FlatList
        style={styles.list}
        data={services}
        keyExtractor={(item) => item.id.toString()} 
        renderItem={renderServiceItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appbar: {
    backgroundColor: 'blue',
  },
  appbarTitle: {
    color: 'white',
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  serviceItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ServiceList;
