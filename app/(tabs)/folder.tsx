import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker';
import { analyzeImage, extractData, extractLastSerialNumber } from '../../libs/helper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from 'components/Card';
import { useSQLiteContext } from 'expo-sqlite';

export default function folder() {
    const [capturedImage, setCapturedImage] = useState< undefined | ImagePicker.ImagePickerAsset>(undefined)
    const [textRecognition, setTextRecognition] = useState<string | null>(null)
    const [lastSerialNumber, setLasterialNumber] = useState<string[]>([])
    const [generalResult, setGeneralResult] = useState({})
    const db = useSQLiteContext()

    const __pickImage = async () => {
        try {
            // No permissions request is necessary for launching the image library
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.canceled) {
                setCapturedImage(result.assets[0]);

                const response = await analyzeImage(result.assets[0].uri)
                if (response.success) {
                    setTextRecognition(response.data)
                    const serialNumberOutput = extractLastSerialNumber(response.data);
                    console.log(serialNumberOutput)
                    if (serialNumberOutput.length == 0) {
                        console.log("Please try again!")
                    } else {
                        setLasterialNumber(serialNumberOutput)
                        console.log('Serial Number:', lastSerialNumber);
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }

    };
    const __searchSerialNumber = async () => {
        extractData(db, lastSerialNumber, setGeneralResult)
    }
    return (
        <SafeAreaView className='flex-1 items-center'>
            <View className='flex flex-row space-x-5'>
                <TouchableOpacity onPress={__pickImage} className="w-32 rounded bg-[#14274e] flex-row justify-center items-center h-10">
                    <Text className="text-white font-bold text-center">
                        Choose picture
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={__searchSerialNumber} className="w-32 rounded bg-[#14274e] flex-row justify-center items-center h-10">
                    <Text className="text-white font-bold text-center">
                        Search
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                {
                    lastSerialNumber?.length > 0 &&
                    (
                        <View>
                            <Text className='text-center'>
                                Last serial Number - {lastSerialNumber}
                            </Text>
                            <SafeAreaView>
                                <ScrollView className='mb-30'>
                                    {Object.entries(generalResult).map(([key, value]) => (
                                        <View key={key}>
                                            <Card>
                                                <Text className='font-bold text-lg'>{key.replace(/_/g, ' ')}:</Text>
                                                <Text className='text-sm'>{value?.toString()}</Text>
                                            </Card>
                                        </View>
                                    ))}
                                </ScrollView>
                            </SafeAreaView>
                        </View>
                    )
                }
            </View>
     
            
        </SafeAreaView>
    )
}