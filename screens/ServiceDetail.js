import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, Alert } from "react-native";
import { Appbar, Button, IconButton, TextInput, Dialog, Portal, Paragraph } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import ImagePicker from "react-native-image-crop-picker";
import { MenuProvider } from 'react-native-popup-menu';

const ServiceDetailScreen = ({ navigation, route }) => {
    const { id } = route.params.item;
    const [serviceDetails, setServiceDetails] = useState({});
    const [dialogVisible, setDialogVisible] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [previousImageUri, setPreviousImageUri] = useState('');

    const servicesCollection = firestore().collection("services");

    useEffect(() => {
        const unsubscribe = servicesCollection.doc(id).onSnapshot(response => {
            const data = response.data();
            if (data && data.imageUri) {
                setServiceDetails(data);
                setPreviousImageUri(data.imageUri);
            }
        });
        return () => unsubscribe();
    }, [id]);

    useEffect(() => {
        if (updateSuccess) {
            Alert.alert("Update Successful", "The service has been updated successfully.", [
                { text: "OK", onPress: () => navigation.navigate("Services") }
            ]);
            setUpdateSuccess(false);
        }
    }, [updateSuccess]);

    const pickImage = () => {
        ImagePicker.openPicker({
            mediaType: "photo",
            width: 400,
            height: 300,
        }).then(image => setServiceDetails({ ...serviceDetails, imageUri: image.path }));
    };

    const modifyService = () => {
        if (serviceDetails.imageUri === '' && previousImageUri !== '') {
            servicesCollection.doc(id)
                .update({ ...serviceDetails, imageUri: previousImageUri })
                .then(() => setUpdateSuccess(true))
                .catch(e => console.log(e.message));
        } else {
            const imageRef = storage().ref("/Services/" + id + ".png");
            imageRef.putFile(serviceDetails.imageUri)
                .then(() => {
                    imageRef.getDownloadURL()
                        .then(link =>
                            servicesCollection.doc(id)
                                .update({ ...serviceDetails, imageUri: link })
                                .then(() => setUpdateSuccess(true))
                                .catch(e => console.log(e.message))
                        );
                })
                .catch(e => console.log(e.message));
        }
    };

    const removeService = () => {
        servicesCollection.doc(id)
            .delete()
            .then(() => {
                setDialogVisible(false);
                navigation.navigate("Services");
            });
    };

    const showDeleteDialog = () => setDialogVisible(true);
    const hideDeleteDialog = () => setDialogVisible(false);

    return (
        <MenuProvider>
            <View style={{ flex: 1, padding: 10 }}>
                <Appbar style={{ backgroundColor: "pink" }}>
                    <IconButton icon="arrow-left" color="white" onPress={() => navigation.navigate("Services")} />
                    <Appbar.Content title={<Text style={{ color: 'white', textAlign: "center", fontSize: 20 }}>Service Detail</Text>} />
                    <IconButton icon="delete" color="white" onPress={showDeleteDialog} />
                </Appbar>
                <ScrollView>
                    <Button onPress={pickImage} style={{ backgroundColor: 'blue', marginTop: 10, padding: 10, borderRadius: 5 }}>
                        <Text style={{ color: 'white', textAlign: 'center' }}>Upload Image</Text>
                    </Button>
                    {serviceDetails.imageUri &&
                        <Image source={{ uri: serviceDetails.imageUri }}
                            style={{ width: 300, height: 400 }}
                            resizeMode={"contain"} />
                    }
                    <TextInput
                        label={"Service Name"}
                        value={serviceDetails.name}
                        onChangeText={(text) => setServiceDetails({ ...serviceDetails, name: text })}
                    />
                    <TextInput
                        keyboardType="numeric"
                        label={"Price"}
                        value={serviceDetails.cost ? serviceDetails.cost.toString() : ''}
                        onChangeText={(text) => setServiceDetails({ ...serviceDetails, cost: parseInt(text) })}
                    />
                    <Button onPress={modifyService} style={{ backgroundColor: 'green', marginTop: 10, padding: 10, borderRadius: 5 }}>
                        <Text style={{ color: 'white', textAlign: 'center' }}>Update Service</Text>
                    </Button>
                </ScrollView>
                <Portal>
                    <Dialog visible={dialogVisible} onDismiss={hideDeleteDialog}>
                        <Dialog.Title>Confirm</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>Do you want to delete this service?</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDeleteDialog}>Cancel</Button>
                            <Button onPress={removeService}>Delete</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </MenuProvider>
    );
};

export default ServiceDetailScreen;
