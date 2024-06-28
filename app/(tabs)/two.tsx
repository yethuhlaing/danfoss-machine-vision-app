import { Image, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { analyzeImage, extractLastSerialNumber } from '../../libs/helper';
import Button from '../../components/button';



export default function TabTwoScreen() {
    const [image, setImage] = useState<string | null>(null);
    const [ textRecognition, setTextRecognition] = useState<string | null>(null)
    const [ serialNumber, setSerialNumber ] = useState<string[]>([])
    const pickImage = async () => {
        try {
            // No permissions request is necessary for launching the image library
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.canceled) {
                setImage(result.assets[0].uri);

                const response = await analyzeImage(result.assets[0].uri)
                if (response.success) {
                    setTextRecognition(response.data)
                    const serialNumberOutput = extractLastSerialNumber(response.data);
                    console.log(serialNumberOutput)
                    console.log(textRecognition)
                    if (serialNumberOutput.length == 0) {
                        console.log("Please try again!")
                    } else {
                        setSerialNumber(serialNumberOutput)
                        console.log('Serial Number:', serialNumber);
                    }                
                }
            }
        }catch (error) {
            console.log(error)
        }
  
    };


    return (
        <View className='flex-1 items-center justify-center'>
            <Button label="Choose a photo" theme='primary' onPress={pickImage} />
            {image && <Image source={{ uri: image }} className="w-[300px] h-[300px]" />}
            { 
                serialNumber?.length > 0 &&
                (
                    <Text className='my-8'>
                        Serial Number - {serialNumber}
                    </Text>
                )
            }
        </View>
    );
}