# Danfoss Machine Vision Application

Danfoss manufactures electric machines and power electronic converters. Each unit has a unique serial number displayed on a rating plate. During production, all electric machines undergo an End-of-Line (EoL) test, where various electrical parameters are measured and stored in an SQlite database.

## Problem
Currently, there is no automated or user-friendly way to access the EoL test data of a machine based on its serial number. This project aims to solve this problem by developing a human-machine interface (HMI) that allows users to easily access and visualize the test data.

## Solution
The React Native app using Expo that serves as a Human-Machine Interface (HMI) for extracting and displaying product information based on serial numbers. The app will utilize the device's camera or allow image uploads to capture rating plates, and then employ Google Vision's OCR technology to extract the serial number. Once the serial number is obtained, the app will query a backend database to retrieve and display the relevant data to the user, providing a seamless and intuitive way to access detailed product information.

![2](https://github.com/user-attachments/assets/1447c048-da19-4ef7-82d4-40ff7349b958)
![3](https://github.com/user-attachments/assets/2b454570-3a65-41f9-87bb-c8841eed2c70)


## Project Limitations and Properties
1. **Database Access**: The app will operate within a local network environment since access to the database is not available on the public network. The database can be accessed through network drives, SharePoint, Teams, OneDrive, etc.
2. **Platform Compatibility**: The app should be portable and compatible with both Android and iOS platforms, as both ecosystems are in use at Danfoss.
3. **Data Display**: The app is required to display the data only. Future developments may include functionalities like logging entries (e.g., bearing changed, PM flux loss detected).

## Project Structure

### 1. Database
- **SQlite Database**: Stores the EoL test data for each electric machine, identified by its serial number.

### 2. Machine Vision
- **Google Vision**: Uses the Google Vision API to read and extract the serial number from the rating plate.

### 3. Mobile Application
- **Frontend**: Built with React Native and Expo, providing a user-friendly interface for Android and iOS devices.
- **Backend**: Connects to the SQlite database, queries data based on the extracted serial number, and processes the data for display.

# Prerequisites
- **Development Environment**: Expo CLI, Android Studio for Android, Xcode for iOS.
- **Database**: A copy of the SQlite database accessible within the local network.
- **Google Vision API Key**: Obtain an API key from the Google Cloud Console.


# Usage
- Launch the app on your smartphone.
- Use the camera to scan the rating plate or upload an image file containing the rating plate.
- The app will extract the serial number, query the database, and display the relevant EoL test data.


# Configuration
- Create this config/environment.js folder route in the app folder.
- In environment.js file, use the following setup and replace your Google Vision API key.
```
import Constants from 'expo-constants';

var environments = {
    staging: {
        GOOGLE_VISION_API_KEY: 'Replace your Google Vision API key'
    },
    production: {
        // Warning: This file still gets included in your native binary and is not a secure way to store secrets if you build for the app stores. Details: https://github.com/expo/expo/issues/83
    }
};
function getReleaseChannel() {
    const releaseChannel = Constants?.releaseChannel;
    if (releaseChannel === undefined) {
        return "staging";
    } else if (releaseChannel === "staging") {
        return "staging";
    } else {
        return "staging";
    }
}
function getEnvironment(env) {
    console.log("Release Channel: ", getReleaseChannel());
    return environments[env];
}
var Environment = getEnvironment(getReleaseChannel());
export default Environment;
```
- Import your database in the assets/database/ folder.
- Change your Database name in the constants/constant.ts file.
```
export const DEFAULTDATABASE = 'xxxxxxxx.db'
```
# Development
- To run the application
```
npm run start
```
# Acknowledgments
- Danfoss Team for providing the project background and requirements.
- Open-source libraries and tools that facilitated the development of this project.

