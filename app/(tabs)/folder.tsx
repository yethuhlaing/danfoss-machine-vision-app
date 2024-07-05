import { View, Text, TouchableOpacity, Image, ScrollView, ImageSourcePropType } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { analyzeImage, capitalize, extractData, extractLastSerialNumber } from '../../libs/helper';
import Card from 'components/Card';
import { useSQLiteContext } from 'expo-sqlite';
import { FontAwesome } from '@expo/vector-icons';
import { keyIconMap } from 'constants/constant';

export default function folder() {
    const [capturedImage, setCapturedImage] = useState< undefined | ImagePicker.ImagePickerAsset>(undefined)
    const [textRecognition, setTextRecognition] = useState<string | null>(null)
    const [lastSerialNumber, setLasterialNumber] = useState<string[]>([])
    const [generalResult, setGeneralResult] = useState({})
    const [ error , setError ] = useState('')
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
                setGeneralResult({})

                const response = await analyzeImage(result.assets[0].uri)
                if (response.success) {
                    setTextRecognition(response.data)
                    const serialNumberOutput = extractLastSerialNumber(response.data);
                    console.log(serialNumberOutput)
                    if (serialNumberOutput.length == 0) {
                        setError("Serial number not Captured!")
                    } else {
                        setLasterialNumber(serialNumberOutput)
                        setError("")
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }

    };
    const __searchSerialNumber = async () => {
        extractData(db, lastSerialNumber[0], setGeneralResult)
    }
    return (
        <View className='flex-1 bg-[#ffffff] items-center space-y-5 p-4'>
            <View className='flex flex-row justify-center items-center gap-3'>
                <TouchableOpacity onPress={__pickImage} className="flex-1 rounded bg-primary flex-row justify-center items-center h-10">

                    <View className='flex flex-row justify-center items-center space-x-2'>
                        <Text className="text-neutral-50 font-bold text-center">
                            Import
                        </Text>
                        <FontAwesome name='file' size={16} color="white" />
                    </View>
                </TouchableOpacity>
                {
                    !error && lastSerialNumber?.length > 0 && (
                        <TouchableOpacity onPress={__searchSerialNumber} className="flex-1 rounded bg-primary flex-row justify-center items-center h-10">
                            <View className='flex flex-row justify-center items-center space-x-2'>
                                <Text className="text-neutral-50 font-bold text-center">
                                    Search
                                </Text>
                                <FontAwesome name='database' size={16} color="white" />
                            </View>
                        </TouchableOpacity>
                    )
                }
            </View>
            {
                error ? (
                    <Text className="text-center text-primary p-3">
                        {error}
                    </Text>
                ) : (
                    <View>
                        {
                            lastSerialNumber?.length > 0 &&
                            (
                                <Text className="text-center text-[#15803d] p-3">
                                    Last serial Number - {lastSerialNumber}
                                </Text>
                            )
                        }
                        <ScrollView className='w-screen'>
                            {
                                generalResult && Object.keys(generalResult).length > 0 && (
                                    Object.entries(generalResult).map(([key, value]) => (
                                        <View key={key}>
                                            <Card>
                                                <View className='flex-row items-center'>
                                                    <FontAwesome name={keyIconMap[key] as any} size={20} style={{ marginRight: 10 }} color={"#ED1C24"} />
                                                    <Text className='font-bold text-lg'>{capitalize(key.replace(/_/g, ' '))}</Text>
                                                </View>
                                                <Text className='text-sm p-2'>{value?.toString()}</Text>
                                            </Card>
                                        </View>
                                    ))
                                )
                            }
                        </ScrollView>
                    </View>
                )
            }

            
        </View>
    )
}