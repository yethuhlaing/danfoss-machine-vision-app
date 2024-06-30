import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const WelcomePage = () => {
  return (
    <SafeAreaView>
        <Text>WelcomePage</Text>
        <Link href={"(tabs)/scan"}>
            Go to the HOme Page
        </Link>
    </SafeAreaView>
  )
}

export default WelcomePage