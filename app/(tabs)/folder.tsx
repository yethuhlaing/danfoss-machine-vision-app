import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker';
import { analyzeImage, extractLastSerialNumber } from '../../libs/helper';

export default function folder() {
    const [capturedImage, setCapturedImage] = useState< undefined | ImagePicker.ImagePickerAsset>(undefined)
    const [textRecognition, setTextRecognition] = useState<string | null>(null)
    const [lastSerialNumber, setLasterialNumber] = useState<string[]>([])

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
                    console.log(textRecognition)
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
    return (
        <Text className='flex-1 bg-transparent'>
            <TouchableOpacity onPress={__pickImage} className="w-32 rounded bg-[#14274e] flex-row justify-center items-center h-10">
                <Text className="text-white font-bold text-center">
                    Choose picture
                </Text>
            </TouchableOpacity>
            {
                lastSerialNumber?.length > 0 &&
                    (
                        <Text className='my-8'>
                            Last serial Number - {lastSerialNumber}
                        </Text>
                    )
            }
        </Text>
    )
}