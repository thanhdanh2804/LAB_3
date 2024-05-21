
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Admin from "../screens/Admin";
import Customers from "../screens/Customer";
import Register from "../screens/Register";
import Services from "../screens/Services";
import AddNewService from "../screens/AddNewService";
import ServiceDetailScreen from "../screens/ServiceDetail";
const Stack=createStackNavigator();
const Router=()=>{

    return(
        <Stack.Navigator initialRouteName='Login'
        screenOptions={{
            headerShown:false
        }}
        >
            <Stack.Screen name="Register" component={Register}/>
            <Stack.Screen name="Admin" component={Admin}/>
            <Stack.Screen name="Customers" component={Customers}/>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Services" component={Services}/>
            <Stack.Screen name="AddNewService" component={AddNewService}/>
            <Stack.Screen name="ServiceDetailScreen" component={ServiceDetailScreen}/>
        </Stack.Navigator>
    )
}
export default Router