import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SignUp from "../screens/Auth/SignUp";
import AuthHome from "../screens/Auth/AuthHome";
import Login from "../screens/Auth/Login";
import Confirm from "../screens/Auth/Confirm";

const AuthNavigation = createStackNavigator({
    AuthHome,
    SignUp,
    Login,
    Confirm,
}, {
    headerMode: "none",
});

export  default createAppContainer(AuthNavigation);