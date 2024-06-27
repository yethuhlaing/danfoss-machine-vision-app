import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Button from '../../components/button';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import ImageViewer from '../../components/imageViewer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchCamera, launchImageLibrary, CameraOptions, ImagePickerResponse } from "react-native-image-picker";
import TextRecognition from 'react-native-text-recognition';

type StateProps = {
    loading: boolean;
    image: string | null;
    toast: {
        message: string;
        isVisible: boolean;
    };
    textRecognition?: string[] | null; 
}


export default function TabOneScreen() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [state, setState] = useState<StateProps>({
        loading: false,
        image: null,
        textRecognition: null,
        toast: {
            message: "",
            isVisible: false,
        },
    });
    function onPress(type: "capture" | "library") {
        setState({ ...state, loading: true });
        const options: CameraOptions = {
            mediaType: 'photo', // Correctly typed mediaType
        };
        type === "capture"
            ? launchCamera(options, onImageSelect)
            : launchImageLibrary(options, onImageSelect);
    } 
    async function onImageSelect(response: ImagePickerResponse) {
        if (response.didCancel) {
            console.log('User cancelled image picker');
            setState({ ...state, loading: false });
            return;
        } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorMessage);
            setState({ ...state, loading: false });
            return;
        } else if (response.assets && response.assets.length > 0) {
            const file = response.assets[0].uri;
            console.log(file)
            if (file) {
                const textRecognition = await TextRecognition.recognize(file, {
                    visionIgnoreThreshold: 0.5,
                });
                const INFLIGHT_IT = "Inflight IT";
                // If match toast will appear 
                const matchText = textRecognition.findIndex((item: string) => item?.match(INFLIGHT_IT));
                console.log(matchText)
                console.log(textRecognition)
                setState({
                    ...state,
                    textRecognition,
                    image: file,
                    toast: {
                        message: matchText > -1 ? "Ohhh I love this company!!" : "",
                        isVisible: matchText > -1,
                    },
                    loading: false,
                });
            } else {
                setState({ ...state, loading: false });
            }
        } else {
            setState({ ...state, loading: false });
        }
    }
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        } else {
            alert('You did not select any image.');
        }
    };
    return (
        // <View className='flex-1/3 items-center p-4'>
        //     <Button label="Choose a photo" theme='primary' onPress={pickImageAsync} />
        //     <ImageViewer
        //         selectedImage={selectedImage}
        //     />
        // </View>
        <SafeAreaView>
            <View>
                <Text>RN OCR SAMPLE</Text>
                <View>
                    {/* <TouchableOpacity
                        onPress={() => onPress("capture")}>
                        <Text>Take Photo</Text>
                    </TouchableOpacity> */}
                    <View>
                        <TouchableOpacity                           
                            onPress={() => onPress("library")}
                        >
                            <Text>Pick a Photo</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        {/* <WrapLoading loading={state.loading}>
                        </WrapLoading> */}

                        <View className='items-center'>
                            {state.image && (
                                <Image source={{ uri: state.image }} />
                            )}                        
                        </View>
                        {!!state.textRecognition &&
                            state.textRecognition.map(
                                (item: string, i: number) => (
                                    <Text key={i}>
                                        {item}
                                    </Text>
                                ))}
                    </View>
                </View>
                {/* {state.toast.isVisible &&
                    ToastAndroid.showWithGravityAndOffset(
                        state.toast.message,
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    )} */}
            </View>
        </SafeAreaView>
    );
}