import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';


// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    
    return (
        <Tabs>

            <Tabs.Screen
                name="home"
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="home" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="scan"
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="camera" color={color} />
                    ),
                    headerRight: () => (
                        <Link href="/modal" asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="bars"
                                        size={25}
                                        style={{
                                            marginRight: 15,
                                            opacity: pressed ? 0.5 : 1,
                                        }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    ),

                }}
            />
            <Tabs.Screen
                name="folder"
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="folder" color={color} />
                    ),
                }}
            />    
            <Tabs.Screen
                name="setting"
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="gear" color={color} />
                    ),
                }}
            />            
        </Tabs>
    );
}
