import { CameraCapturedPicture, CameraPictureOptions, CameraView, FlashMode, useCameraPermissions, CameraType, Camera } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Button, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { analyzeImage, extractData, extractLastSerialNumber } from '../../libs/helper';
import { StatusBar } from 'expo-status-bar';
import Card from 'components/Card';
import Ionicons from '@expo/vector-icons/Ionicons';

import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSQLiteContext } from 'expo-sqlite';

export default function TabOneScreen() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);
    const [capturedImage, setCapturedImage] = useState<CameraCapturedPicture | undefined >(undefined)
    const [textRecognition, setTextRecognition] = useState<string | null>(null)
    const [lastSerialNumber, setLasterialNumber] = useState<string[]>([])

    const [startCamera, setStartCamera] = useState(true)
    const [previewVisible, setPreviewVisible] = useState(false)
    const [flashMode, setFlashMode] = useState<FlashMode | undefined>('off')

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View className='flex-1 justify-center'>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }



    const __startCamera = async () => {
        setCapturedImage(undefined)
        setLasterialNumber([])
        const { status } = await Camera.requestCameraPermissionsAsync()
        if (status === 'granted') {
            setStartCamera(true)
        } else {
            Alert.alert('Access denied')
        }
    }

    const __takePicture = async () => {
        setCapturedImage(undefined)
        setLasterialNumber([])
        if (cameraRef.current) {
            const options: CameraPictureOptions = {
                quality: 0.5,
                base64: false
            }
            try {
                const photo = await cameraRef.current.takePictureAsync(options);
                console.log(photo?.uri);
                setCapturedImage(photo);
                setPreviewVisible(true)

            } catch (error) {
                console.log(error)
            }

        }

    }
    const __choosePicture = async () => { 

        const response = await analyzeImage(capturedImage?.uri)
        if (response.success) {
            setTextRecognition(response.data)
            const OCRresult = extractLastSerialNumber(response.data);
            console.log(response.data)
            if (OCRresult.length == 0) {
                console.log("Try to capture again!")
                setStartCamera(false)
            } else {
                setLasterialNumber(OCRresult)
                console.log('Serial Number:', lastSerialNumber);
                console.log('Last Serial Number:', lastSerialNumber)
                setStartCamera(false)
            }
        }
    }
    const __retakePicture = () => {
        setPreviewVisible(false)
        __startCamera()
    }
    const __handleFlashMode = () => {
        if (flashMode === 'on') {
            setFlashMode('off')
        } else if (flashMode === 'off') {
            setFlashMode('on')
        } else {
            setFlashMode('auto')
        }
    }
    const __switchCamera = () => {
        if (facing === 'back') {
            setFacing('front')
        } else {
            setFacing('back')
        }
    }
    const __exitCamera = () =>{
        setStartCamera(false)
    }
    return (
        <View className="flex-1">
            {startCamera ? (
                <View className="flex-1 w-full">
                    {previewVisible && capturedImage ? (
                        <CameraPreview photo={capturedImage} choosePicture={__choosePicture} retakePicture={__retakePicture} />
                    ) : (
                        <CameraView facing={facing} flash={flashMode} ref={cameraRef} className='flex-1'>
                            <CameraScreen __handleFlashMode={__handleFlashMode} __switchCamera={__switchCamera} __exitCamera={__exitCamera} __takePicture={__takePicture} facing={facing} />
                        </CameraView>
                    )}
                </View>
            ) : 
                (                    
                    lastSerialNumber?.length ?
                    (
                        <ScanFound lastSerialNumber={lastSerialNumber} __startCamera={__startCamera} />
                    ) :
                    (
                        <ScanNotFound capturedImage={capturedImage} __startCamera={__startCamera} />
                    )
                       
                )
            }
        </View>
    );
}


const CameraPreview = ({ photo, retakePicture, choosePicture }: any) => {
    return (
        <View className="bg-transparent flex-1 w-full h-full">
            <ImageBackground source={{ uri: photo && photo.uri }} className="flex-1">
                <View className="flex-1 flex-col p-4 justify-end">
                    <View className="flex-row justify-between">
                        <TouchableOpacity onPress={retakePicture} className="w-32 h-10 items-center rounded">
                            <Text className="text-white text-lg">
                                Re-take
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={choosePicture} className="w-32 h-10 items-center rounded">
                            <Text className="text-white text-lg">
                                Choose
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}
const CameraScreen = ({ __handleFlashMode, __switchCamera, __exitCamera, __takePicture , facing} : any) => {
    return (
        <View className="flex-1 w-full bg-transparent flex-row">
            <View className="absolute left-5 top-10 flex-col justify-between">
                <TouchableOpacity onPress={__handleFlashMode}>
                    <Text className="text-lg">
                        ⚡️
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={__switchCamera}>
                    <Text className="text-lg">
                        {facing === 'front' ? '🤳' : '📷'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={__exitCamera}>
                    <Text className="text-lg">
                        Exit
                    </Text>
                </TouchableOpacity>
            </View>
            <View className="absolute bottom-0 flex-row flex-1 w-full p-5 justify-between">
                <View className="self-center flex-1 items-center">
                    <TouchableOpacity
                        onPress={__takePicture}
                        style={{
                            width: 70,
                            height: 70,
                            bottom: 0,
                            borderRadius: 50,
                            backgroundColor: '#fff'
                        }}
                    />
                </View>
            </View>
        </View>
    )
}

function ScanFound({ lastSerialNumber, __startCamera }: any) {
    
    const [generalResult, setGeneralResult] = useState({})
    const db = useSQLiteContext()

    const __searchSerialNumber = async () => {
        extractData(db, lastSerialNumber, setGeneralResult)
    }
    return (
        <View className="flex-1 bg-white items-center space-y-5">
            <View className='flex flex-row space-x-5'>
                <TouchableOpacity onPress={__startCamera} className="w-32 mt-10 rounded bg-[#14274e] flex-row justify-center items-center h-10">
                    <View className='flex flex-row justify-center items-center space-x-2'>
                        <Text className="text-white font-bold text-center">Back</Text>
                        <AntDesign name="back" size={18} color="white" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={__searchSerialNumber} className="w-32 mt-10 rounded bg-[#14274e] flex-row justify-center items-center h-10">
                    <Text className="text-white font-bold text-center">
                        Search
                    </Text>
                </TouchableOpacity>
            </View>
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
        </View>
    )
}

function ScanNotFound({ capturedImage, __startCamera }: any) {
    return (
        <View className='flex-1 bg-white items-center space-y-5'>
            <View className='flex flex-row space-x-5'>

                <TouchableOpacity onPress={__startCamera} className="w-32 mt-10 rounded bg-[#14274e] flex-row justify-center items-center h-10">
                    <View className='flex flex-row justify-center items-center space-x-2'>
                        <Text className="text-white font-bold text-center">Scan Again</Text>
                        <Ionicons name="scan" size={18} color="white" />
                    </View>
                </TouchableOpacity>
            </View>
            {capturedImage && <Image source={{ uri: capturedImage?.uri }} className="w-screen h-[300px]" />}
            <Text>
                The Serial Number is not captured in the photo. Please Try again!
            </Text>
        </View>
    )
}