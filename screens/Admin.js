import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
//import Router from "../routers/Router";
//import { TransitionPresets } from "@react-navigation/stack";
import RouterService from "../routers/RouterService";
import Transaction from "./Transaction";
import Customer from "./Customer";
import Setting from "./Setting";
const Tab=createMaterialBottomTabNavigator()
const Admin=()=>{
    return(
        <Tab.Navigator>
        <Tab.Screen name="RouterService" component={RouterService}
        options={{
            title:"Home",
            tabBarIcon:"home"

        }}
        />
        <Tab.Screen name="Transaction" component={Transaction}
        options={{
            tabBarIcon:"cash"
        }}
        />
        <Tab.Screen name="Customer" component={Customer}
        options={{
            tabBarIcon:"account"
        }}
        />
        <Tab.Screen name="Setting" component={Setting}
        options={{
            tabBarIcon:"cog"
        }}
        />
        </Tab.Navigator>
    )
}
export default Admin;