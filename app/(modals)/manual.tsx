import { ScrollView, Text, StyleSheet, View } from 'react-native';

export default function UserManual(){
    return (
        <ScrollView className="flex-1 p-4 bg-[#ffffff]">
            <Text className="text-2xl font-bold mb-4 text-[#d04b46]">User Manual</Text>

            <View className="mb-6">
                <Text className="text-xl font-bold mb-2">Home</Text>
                <Text className="text-base leading-6 text-gray-800">
                    The first tab provides general information about the app. As the app scales, more features and details will be added to this page.
                </Text>
            </View>

            <View className="mb-6">
                <Text className="text-xl font-bold mb-2">Search</Text>
                <Text className="text-base leading-6 text-gray-800">
                    In this tab, you can type the serial number into the search box and click the "Search" button. The corresponding data will be displayed on the screen.
                </Text>
            </View>

            <View className="mb-6">
                <Text className="text-xl font-bold mb-2">Scan</Text>
                <Text className="text-base leading-6 text-gray-800">
                    In the third tab, you can scan using your device's camera. You have the option to turn on the flash with a flash button, switch between the front and rear cameras, and capture an image.
                    After capturing the image, a preview screen will be displayed where you can either retake the image or extract the serial number. If a serial number is found, the data will be displayed;
                    otherwise, a "Serial number not found" message will be shown.
                </Text>
            </View>

            <View className="mb-6">
                <Text className="text-xl font-bold mb-2">Folder</Text>
                <Text className="text-base leading-6 text-gray-800">
                    In the folder tab, you can upload an image file, crop it if needed, and extract the serial number from the image. The extracted data will then be displayed on the screen.
                </Text>
            </View>
        </ScrollView>
    );
};
