import { useState } from "react";
import { Alert, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
const Register = ({ navigation }) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hiddenPassword, setHiddenPassword] = useState(true);
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [hiddenPasswordConfirm, setHiddenPasswordConfirm] = useState(false);
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const hasErrorEmail = () => !email.includes("@");
    const hasErrorPassword = () => password.length < 6;
    const hasErrorFullName = () => fullName === "";
    const hasErrorPasswordConfirm = () => passwordConfirm !== password;
    const USERS = firestore().collection("USERS");

    const handleCreateAccount = () => {
        if (!fullName || !email || !password || !phone || !address) {
            Alert.alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                USERS.doc(email)
                    .set({
                        fullName,
                        email,
                        password,
                        phone,
                        address,
                        role: "customers"
                    })
                    .then(() => {
                        Alert.alert("Đăng ký tài khoản thành công!");
                        navigation.navigate("Login");
                    })
                    .catch((error) => {
                        console.error("Error updating user document: ", error);
                        Alert.alert("Đã xảy ra lỗi khi đăng ký tài khoản.");
                    });
            })
            .catch((error) => {
                console.error("Error creating user: ", error);
                Alert.alert("Tài khoản đã tồn tại hoặc đã xảy ra lỗi.");
            });
    };

    return (
        <View style={{ flex: 1, padding: 10, justifyContent: "center" }}>
            <Text style={{
                fontSize: 40,
                fontWeight: "bold",
                alignSelf: "center",
                color: "pink",
                marginTop: 50,
                marginBottm: 10
            }}>DANG KY TAI KHOAN MOI</Text>

            <TextInput
                label={"Full Name"}
                value={fullName}
                onChangeText={setFullName}
            />
            <HelperText type="error" visible={hasErrorFullName()}>
                Ten khong duoc de trong
            </HelperText>

            <TextInput
                label={"Email"}
                value={email}
                onChangeText={setEmail}
            />
            <HelperText type="error" visible={hasErrorEmail()}>
                Dia chi email khong dung
            </HelperText>

            <TextInput
                label={"Password"}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={hiddenPassword}
                right={(props) => (
                    <TextInput.Icon {...props} icon="eye" onPress={() => setHiddenPassword(!hiddenPassword)} />
                )}
            />
            <HelperText type="error" visible={hasErrorPassword()}>
                Password it nhat 6 ki tu
            </HelperText>

            <TextInput
                label={"Confirm Password"}
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
                secureTextEntry={hiddenPasswordConfirm}
                right={(props) => (
                    <TextInput.Icon {...props} icon="eye" onPress={() => setHiddenPasswordConfirm(!hiddenPasswordConfirm)} />
                )}
            />
            <HelperText type="error" visible={hasErrorPasswordConfirm()}>
                Nhap lai Password phai khop voi password ban dau
            </HelperText>

            <TextInput
                label={"Address"}
                value={address}
                onChangeText={setAddress}
                style={{ marginBottom: 20 }}
            />

            <TextInput
                label={"Phone"}
                value={phone}
                onChangeText={setPhone}
                style={{ marginBottom: 20 }}
            />

            <Button mode="contained" fyConte buttonColor="blue"
                onPress={handleCreateAccount}
            >
                Tao tai khoan moi
            </Button>

            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Text>Ban chua co tai khoan ?</Text>
                <Button onPress={() => navigation.navigate("Login")}>
                    Dang Nhap
                </Button>
            </View>
        </View>
    )

}
export default Register;
