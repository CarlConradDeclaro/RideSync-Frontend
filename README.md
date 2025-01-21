 # RideSync

RideSync highlights **Carpooling** and **Ridesharing** options. RideSync revolutionize the way vehicle owners and drivers connect and coordinate for their journeys. With real-time location sharing, direct messaging, and smart trip management, RideSync ensures seamless trip coordination, reduces wait times, enhances operational efficiency, and fosters safer, more efficient travel experiences. 



This project was developed as part of our  **third year, first semester final project** for the **Human-Computer Interaction (HCI)** subject.


## Features

- **Location Sharing**: Share and view precise locations to facilitate smooth pickups and drop-offs, ensuring accurate coordination in real time.
- **Direct Messaging**: Communicate directly within the app for efficient coordination, enabling users to send quick messages without leaving the platform.
- **Smart Trip Management**: Easily track, plan, and manage your trips with real-time updates.
- **Push Notifications**: Stay up to date with the latest trip details and any relevant updates, including changes to pickup times and vehicle statuses.
- **Vehicle and Driver Matching**: The app uses smart algorithms to match drivers and vehicle owners based on proximity, preferences, and availability.
- **Ride History**: Keep track of past trips, view ratings and reviews, and make informed decisions about future travel plans.

## Usage

1. **Sign Up**: Create a new account by registering with your email address or via your social media accounts for easy onboarding.
2. **Profile Setup**: Complete your profile by adding necessary details, such as your name, contact information, vehicle details (if applicable), and preferences.
3. **Connect**: Pair your device with your vehicle to enable seamless communication. This step ensures that your trip data is synced and ready for the journey.
4. **Start a Trip**: Once connected, plan and coordinate your journeys efficiently. The app allows users to set trip details, including start and end locations, pickup times, and preferred routes.

## Technology Stack

- **Frontend**: React, Javascript, TailwindCSS (for UI styling) and material UI
- **Backend**: Node.js, Express.js, Socket.io (for real-time communication)
- **Database**: Mysql (for storing user and trip data)
- **Authentication**: JWT, OAuth2 (for secure user authentication)
- **Geolocation**: Reactleaflet, Leaflet.js (for real-time location tracking and mapping)

## Requirements

To run this project locally, make sure you have the following installed:

- Node.js (v14 or above)
- npm or yarn
- Mysql

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/CarlConradDeclaro/RideSync-Frontend.git
    ```
2. Navigate to the project folder:
    ```bash
    cd ridesync
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
    or if you're using Yarn:
    ```bash
    yarn install
    ```
 
4. Run the project:
    - For the backend:
        ```bash
        npm run dev
        ```
5. Make sure to clone the [backend](https://github.com/CarlConradDeclaro/ridesync-backend)
    - to run backend:
        ```bash
        node index.js
        ```
    - or by simply typing
        ```
        nodemon
        ```


# Preview 

### Rideshare
*(passenger)*
![Image](https://github.com/user-attachments/assets/d488f554-9347-4c44-b193-b2a0419e1d30)

*(driver)*
![Image](https://github.com/user-attachments/assets/3d0bc1ef-d6d0-4d6c-8f47-27867cbf3e4e)


### Carpooling
![Image](https://github.com/user-attachments/assets/07ac1bf1-e9a1-440a-a09c-e05445f53042)

## Team Members

- [cygnn](https://github.com/cygnn) (frontend)
- [Xephyranthes](https://github.com/vforvier) (frontend)
- [jhonlyodsy](https://github.com/jhonlyodsy) (backend)
- [augustus122](https://github.com/augustus122) (backend)
- [clintoy18](https://github.com/clintoy18) (frontend)
- [Shanley Tuburan](https://github.com/shanleymae) (backend)
- [dashanicole](https://github.com/dashanicole)(backend)
 


---


*Note: This `README.md` is based on the available information and may require updates as the project evolves.*



[Visit RideSync Website](https://ridesync.netlify.app/)

s