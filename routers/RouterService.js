import { createStackNavigator } from "@react-navigation/stack";
import { useMyContextController } from "../store";

//import { Colors } from "react-native/Libraries/NewAppScreen";
import { IconButton } from "react-native-paper";
import Services from"../screens/Services";
import AddNewService from"../screens/AddNewService"
import ServiceDetail from "../screens/ServiceDetail";
const Stack=createStackNavigator();
export default RouterServices=()=>{
    const[controller,dispatch]=useMyContextController();
    const{userLogin}=controller;

    return(
        <Stack.Navigator initialRouteName="Services"
        screenOptions={{
            title:(userLogin!=null)&&(userLogin.name),
            headerTitleAlign:"center",
            headerShown:false,
            headerStyle:{
                backgroundColor:"pink"
            },
            headerRight:(props)=><IconButton icon={"account"}/>
        }}
        
        >
            <Stack.Screen name="ServiceDetail" component={ServiceDetail}

/>
            <Stack.Screen name="Services" component={Services}

            />
            <Stack.Screen name="AddNewService" component={AddNewService}

            />
       </Stack.Navigator>
    )
}