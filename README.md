# Danfoss Machine Vision Application

Danfoss manufactures electric machines and power electronic converters. Each unit has a unique serial number displayed on a rating plate. During production, all electric machines undergo an End-of-Line (EoL) test, where various electrical parameters are measured and stored in an SQlite database.

## Problem
Currently, there is no automated or user-friendly way to access the EoL test data of a machine based on its serial number. This project aims to solve this problem by developing a human-machine interface (HMI) that allows users to easily access and visualize the test data.

## Solution
The proposed solution is to implement an HMI in the form of a smartphone app using React Native with Expo. The app will utilize the camera to read the rating plate or read an image file to extract the serial number using Google Vision. Once the serial number is obtained, the app will fetch the corresponding data from the database and display it to the user.

![image](https://github.com/yethuhlaing/danfoss-machine-vision-app/assets/112906488/25f355e2-3e33-4da1-b369-700aaffa0520)
![image](https://github.com/yethuhlaing/danfoss-machine-vision-app/assets/112906488/5bce15d7-ed37-476b-8293-8f6669ba7c06)


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

# License
Distributed under the MIT License. See `LICENSE` for more information.

# Acknowledgments
- Danfoss Team for providing the project background and requirements.
- Open-source libraries and tools that facilitated the development of this project.

