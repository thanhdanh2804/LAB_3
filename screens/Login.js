import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { login, useMyContextController } from "../store";

const Login = ({ navigation }) => {
    const [controller, dispatch] = useMyContextController();
    const { userLogin } = controller;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState("");

    const hasErrorEmail = () => !email.includes("@");
    const hasErrorPassword = () => password.length < 6;

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert("Lỗi", "Tên đăng nhập và mật khẩu không được để trống");
        } else {
            login(dispatch, email, password);
        }
    };

    useEffect(() => {
        console.log(userLogin);
        if (userLogin !== null) {
            if (userLogin.role === "customers" || userLogin.role === "admin") {
                navigation.navigate("Services");
                Alert.alert("Thành công", "Đăng nhập thành công!");
            }
        }
    }, [userLogin, navigation]);

    return (
        <View style={{ flex: 1, padding: 10, justifyContent: "center" }}>
            <Text style={{
                fontSize: 50,
                fontWeight: "bold",
                alignSelf: "center",
                color: "purple",
                marginTop: 50,
                marginBottom: 10,
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: { width: -1, height: 1 },
                textShadowRadius: 10
            }}>
                Login
            </Text>
            <TextInput
                label={"Email"}
                value={email}
                onChangeText={setEmail}
                style={{ marginBottom: 10, backgroundColor: 'white', borderRadius: 10 }}
                mode="outlined"
            />
            <TextInput
                label={"Password"}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={{ marginBottom: 10, backgroundColor: 'white', borderRadius: 10 }}
                mode="outlined"
            />
            <Button mode="contained" color="pink" onPress={handleLogin}>
                Login
            </Button>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                <Text>Bạn chưa có tài khoản?</Text>
                <Button onPress={() => navigation.navigate("Register")}>
                    Tạo tài khoản mới
                </Button>
            </View>
        </View>
    );
};

export default Login;