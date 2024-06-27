import { StyleSheet, Text, View } from 'react-native';
import Button from '../../components/button';
import ImageViewer from '../../components/imageViewer';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import TextRecognition from 'react-native-text-recognition';

export default function TabTwoScreen() {
    const [image, setImage] = useState<string | null>(null);
    const [textRecognition, setTextRecognition] = useState<string[]>([]);
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets[0].uri) {
            try{
                const file = result.assets[0].uri as string
                setImage(file);
                const output = await TextRecognition.recognize(file, {
                    visionIgnoreThreshold: 0.5,
                });
                setTextRecognition(output)
                console.log(output)
                const INFLIGHT_IT = "Inflight IT";
                // If match toast will appear 
                const matchText = textRecognition.findIndex((item: string) => item?.match(INFLIGHT_IT));
                console.log(matchText)
            }
            catch(error){
                console.log(error)
            }
        }
    };
    return (
        <View className='flex-1 items-center justify-center'>
            <Button label="Choose a photo" theme='primary' onPress={pickImage} />
            {image && <ImageViewer selectedImage={image} />}
        </View>
    );
}