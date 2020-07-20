import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import ApolloClient from "apollo-boost";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import { ApolloProvider } from "react-apollo-hooks";
import apolloClientOptions from "./apollo";

export default function App() {
    const [loaded, setLoaded] = useState(false);
    const [client, setClient] = useState(null);

    const preload = async () => {
        try {
            await Font.loadAsync({
            ...Ionicons.font,
        });
            await Asset.loadAsync(require("./assets/logo.png"));
            const cache = new InMemoryCache();
            await persistCache({
                cache,
                storage: AsyncStorage,
            });
            const client = new ApolloClient({
                cache,
                ...apolloClientOptions,
            });
            setLoaded(true);
            setClient(client);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        preload();
    }, []);

    return (loaded && client ?
        <ApolloProvider client={client}>
            <View>
                <Text>Open up App.js to start working on your app!</Text>
            </View>
        </ApolloProvider>
        : <AppLoading/>
    );
}