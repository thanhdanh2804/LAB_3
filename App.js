import React,{useEffect} from "react";
import firestore from"@react-native-firebase/firestore";
import { Provider as PaperProvider } from 'react-native-paper';

//import { NativeModules, StyleSheet } from "react-native";
import { MyContextControllerProvider } from "./store/index";
//import { BottomNavigation } from "react-native-paper";
import{NavigationContainer} from"@react-navigation/native";
import auth from"@react-native-firebase/auth";
import Router from "./routers/Router";
import Login from "./screens/Login";
import Admin from "./screens/Admin";
const App=()=>{
    return(
        <PaperProvider>
        <MyContextControllerProvider>
            <NavigationContainer>
                <Router/>
            </NavigationContainer>
        </MyContextControllerProvider>
        </PaperProvider>
    )
}

export default App;