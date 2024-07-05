import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
interface ButtonProps {
    label: string;
    theme: string, 
    onPress: () => void
}


export default function Button({ label, theme, onPress }: ButtonProps) {
    return (
        <View className="mx-5">
            {theme === 'primary' ? (
                <View className="border-4 border-yellow-400 rounded-lg">
                    <Pressable
                        className="flex-row items-center justify-center bg-white rounded-lg p-2"
                        onPress={onPress}
                    >
                        <FontAwesome name="picture-o" size={18} color="#25292e" className="mr-2" />
                        <Text className="text-gray-900">{label}</Text>
                    </Pressable>
                </View>
            ) : (
                <View>
                    <Pressable
                        className="bg-blue-500 rounded-lg items-center justify-center p-3"
                            onPress={onPress}
                    >
                        <Text className="text-neutral-50">{label}</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}