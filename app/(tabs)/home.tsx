import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Home = () => {
    return (
      <View className='bg-[#ffffff] flex-1 h-screen flex p-6'>
        <Text className='text-3xl font-bold'>We engineer tomorrow to build a better future</Text>
        <Text className='text-md mt-3 text-neutral-500'>With leading application know-how, and sustainable innovation, we set out to become our customers’ preferred decarbonization partner, with a focus on long-term value creation for our customers and employees.</Text>
        <TouchableOpacity className="w-auto mt-4 rounded bg-[#ED1C24] flex-row justify-center items-center h-10" onPress={() => {
          Linking.openURL("https://www.danfoss.com/en/about-danfoss/company/engineering-tomorrow/")
        } }>
          <Text className="font-bold text-center text-neutral-50">
            Read how we are Engineering Tomorrow
          </Text>
        </TouchableOpacity>
        <Image source={require('../../assets/images/danfoss1.jpg')} className='w-full h-36' />
      </View>
    )
}

export default Home
