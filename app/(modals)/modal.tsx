import { StatusBar } from 'expo-status-bar';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';

export default function ModalScreen() {

    return (
        <View className="flex-1 bg-white p-5 bg-[#ffffff]">
            <Text className='text-md text-neutral-500 mb-3 px-4'>APP</Text>
            <View className='bg-neutral-100 rounded-xl'>
                <Link href={'/(modals)/manual'} asChild>
                    <TouchableOpacity>
                        <Text className='text-[#d04b46] p-4 border-b '>Manual</Text>
                    </TouchableOpacity>
                </Link>
                <View className='border-[0.3px] border-neutral-300 mx-2'></View>
                <TouchableOpacity className='p-4 ' onPress={() => {
                    Linking.openURL("https://www.danfoss.com/en/terms/")
                }}>
                    <Text className='text-[#d04b46] '>Terms of Use</Text>      
                </TouchableOpacity>
                <View className='border-[0.3px] border-neutral-300 mx-2'></View>
                <TouchableOpacity className='p-4' onPress={() => {
                    Linking.openURL("https://www.danfoss.com/en/terms/privacy/")
                }}>
                    <Text className='text-[#d04b46]'>Privacy Policy</Text>
                </TouchableOpacity>
                <View className='border-[0.4px] border-neutral-300 mx-2'></View>
                <TouchableOpacity>
                    <Text className='text-[#d04b46] p-4 border-b '>Licences</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

