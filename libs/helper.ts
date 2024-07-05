import TextRecognition from 'react-native-text-recognition';
import axios from 'axios'
import * as FileSystem from 'expo-file-system';
import { useSQLiteContext } from 'expo-sqlite';


type ResponseType =
    | { success: false; error: string | undefined }
    | { success: true; data: string };

export async function analyzeImage(imageUri: string | undefined): Promise<ResponseType> {
    try {
        if (!imageUri) {
            return {
                success: false,
                error: "Please Select an image First"
            };
        }
        const GOOGLE_VISION_API_KEY = 'AIzaSyCZgfWY5zCMAKyVbJF9O8cX29LT5qkEWLo';
        const GOOGLE_VISION_API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_API_KEY}`;
        const base64imageData = await FileSystem.readAsStringAsync(imageUri as string, {
            encoding: FileSystem.EncodingType.Base64
        });

        if (!base64imageData) {
            throw new Error('Failed to convert image to base64');
        }

        const requestData = {
            requests: [
                {
                    image: {
                        content: base64imageData
                    },
                    features: [
                        {
                            type: "TEXT_DETECTION",
                            maxResults: 10
                        }
                    ]
                }
            ]
        };

        const apiResponse = await axios.post(GOOGLE_VISION_API_URL, requestData);

        if (apiResponse.data && apiResponse.data.responses && apiResponse.data.responses.length > 0) {
            return {
                success: true,
                data: apiResponse.data.responses[0].fullTextAnnotation.text
            }
        } else {
            return {
                success: false,
                error: "No response from Google Vision API"
            }
        }
    } catch (error: any) {
        return {
            success: false,
            error: error?.message
        }
    }
}

export const extractLastSerialNumber = (text: string | null): string[] => {
    const regex = /Serial No\. \d+[- ](\w+)/g;
    const matches = [];
    let match;
    while ((match = regex.exec(text as string)) !== null) {
        matches.push(match[1]);
    }
    console.log("Matchs", matches)
    return matches;
};

export const extractData = (db: any, lastSerialNumber: any, setValue: any)=> {
    db.withTransactionAsync(async () => {
        await getData()
    }) 

    const getData = async () => {
        try {
            const result = await db.getFirstAsync(`SELECT * FROM test_results WHERE serial_number = (?)`, lastSerialNumber);
            if (result) {
                setValue(result)
                console.log(result)
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const capitalize = (word: string) =>{
    return word[0].toUpperCase() + word.slice(1)

}