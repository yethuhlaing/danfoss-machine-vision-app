import { FontAwesome } from '@expo/vector-icons';
import Card from 'components/Card';
import { keyIconMap } from 'constants/constant';
import { useSQLiteContext } from 'expo-sqlite';
import { capitalize, extractData } from 'libs/helper';
import React, { useState } from 'react'
import { TextInput, TouchableOpacity, View, Text, ScrollView } from 'react-native'


export default function search() {
    const [value, onChangeText] = useState('');
    const [ generalResult , setGeneralResult ] = useState({})
    const db = useSQLiteContext()
    const __searchSerialNumber = async () => {
        setGeneralResult({})
        extractData(db, value, setGeneralResult)
    }
    return (
        <View className='flex-1 bg-[#ffffff] items-center p-4'>
            <View className='flex flex-row justify-center items-center gap-3'>
                <View className='flex-1 border'>
                    <TextInput
                        editable
                        placeholder='Enter the Serial Number'
                        numberOfLines={1}
                        maxLength={13}
                        onChangeText={text => onChangeText(text)}
                        value={value}
                        style={{ padding: 10 }}
                    />
                </View>
                <TouchableOpacity onPress={__searchSerialNumber} className="w-28 rounded bg-[#ED1C24] flex-row justify-center items-center h-10">
                    <Text className="font-bold text-center text-neutral-50">
                        Search
                    </Text>
                </TouchableOpacity>
            </View>
            <ScrollView className='w-screen mt-5'>
                {
                    generalResult && Object.keys(generalResult).length > 0 ? (
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
                    ) : (
                        <Text className='text-center'>No data available</Text>
                    )
                }
            </ScrollView>
        </View>
    )
}