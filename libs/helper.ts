import axios from 'axios'
import * as FileSystem from 'expo-file-system';
import Environment from "../config/environment";

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
        const api_key = Environment['GOOGLE_VISION_API_KEY']
        const GOOGLE_VISION_API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${api_key}`
        console.log(GOOGLE_VISION_API_URL)
        if (!api_key) {
            console.log("H")
            return {
                success: false,
                error: "API Key Not Found!"
            }
        }
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
            console.log("SOmething")
            return {
                success: false,
                error: "No response from Google Vision API"
            }
        }
    } catch (error: any) {
        console.log(error.message)
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