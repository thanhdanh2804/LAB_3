import { View } from "react-native";
import { useEffect } from "react";
import { Button } from "react-native-paper";
import { useMyContextController,logout } from "../store";

export default Setting=({navigation})=>{
    const[controller,dispatch]=useMyContextController();
    const{userLogin}=controller;
    const handleLogout=()=>{
        logout(dispatch)
    }
    useEffect(()=>{
        if(userLogin==null)
            navigation.navigate("Login")
    },[userLogin])
    // const onSubmit=()=>{
    //     logout(dispatch)
    // }
    return(
        <View style={{flex:1,justifyContent:"center"}}>
            <Button mode="contained" onPress={handleLogout}>
                Dang Xuat
            </Button>
        </View>
    )
}