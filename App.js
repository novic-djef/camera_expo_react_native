// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { ScrollView, Text, View, StyleSheet, TextInput, Image, FlatList, Button } from 'react-native';

// import {  ArrowLeftIcon, EllipsisHorizontalIcon, MapPinIcon, MapIcon} from '@heroicons/react/24/outline';
// import { NativeWindStyleSheet } from "nativewind";

// NativeWindStyleSheet.setOutput({
//   default: "native",
// });

// export default function App() {


//   return (
//     <>
//      <ScrollView className="m-2 px-2 bg-white border-gray-200 dark:border-gray-700">
//     <View  className="m-4 container flex-wrap justify-between ">
//     < ArrowLeftIcon style={styles.icon} />
//       <Text style={{marginTop: -22,}} className=" m-2 flex justify-center items-center text-xl font-semibold whitespace-nowrap dark:text-black">Nouvelle Adresse</Text>
      
//       </View>
//       <View>


    
    




//       {/* <CameraIcon style={{  marginTop: -25,  width: 28, height: 28, color: 'gray'}}/> */}
//       <View className=" flex items-start space-x-1 ">
        
//     <Image className=" w-16 h-16 rounded-full flex-shrink-4 border-solid border-2 border-sky-500/100"
//      source={{
//       uri: 'https://th.bing.com/th/id/OIP.ThWrZxkrSLyJZOSpHU8atwHaF7?w=231&h=185&c=7&r=0&o=5&pid=1.7',
//     }} 
//      />
  
//     <Text style={{ position: 'relative', top: -2, marginTop:-62, right: -75, }} className=" hover:bg-slate-100 ...">
//     <Text  className="flex p-4 px-1 py-0.5 text-black-700/100 text-sm font-bold">
//    Choisir une photo
//     </Text>
//     <Text  className="flex p-4 px-1 py-0.5 text-gray-500 text-sm  ">
//     Choisir un photo de Profile ou emoji
//     </Text>
//     </Text>
     
//   </View>

//   </View>
//         <View className="w-14 h-14 p-3 flex relative inset-y-14 left-0 text-gray-600 items-center pl-3 pointer-events-none">
//          <MapPinIcon style={{ }}/> 
//          </View>
//       <TextInput type="search" id="default-search" className="block p-4 pl-10 w-full text-md  bg-gray-100 rounded-xl   dark:placeholder-gray-900 dark:text-gray " placeholder="   Entrer le titre de votre Adresse....." required  />
    
//       <StatusBar style="auto" />
      



//       <View className="  m-1 max-w-xxl rounded-xl overflow-hidden shadow-xl ">
//         <Text className="flex p-4 px-1 py-0.5 text-black-700/100 text-sm font-bold">Choisir une Localisation</Text>
//         <EllipsisHorizontalIcon style={{ position: 'relative', right: -310, top: -22, height: 27, width: 27, color: 'black'}} />
//               <Image
//               className=" w-80 h-80 bg-gray-300 flex items-center justify-center border rounded-xl border-transparent "
//               source={{
//                 uri: 'https://th.bing.com/th/id/R.ffc627077e90286c6b4696f66d11cdd7?rik=Nxpoc454j53ijQ&pid=ImgRaw&r=0',
//               }} 
//             />
//       </View>


//           <View className=" m-4 flex items-start space-x-1 ">
            
//             <Image className=" w-16 h-16 rounded-full flex-shrink-4 border-solid border-2 border-sky-500/100"
//             source={{
//               uri: 'https://th.bing.com/th/id/OIP.cC02XI5bn9EzAKKOfzWySgHaHa?w=204&h=204&c=7&r=0&o=5&pid=1.7',
//             }} 
//             />
          
//             <Text style={{ position: 'relative', top: -2, marginTop:-62, right: -75, }} className=" hover:bg-slate-100 ...">
//             <Text  className="flex p-4 px-1 py-0.5 text-black-700/100 text-sm font-bold">
//           Utliser Ma Position Actuel
//             </Text>
//             <Text  className="flex p-4 px-1 py-0.5 text-gray-500 text-sm  ">
//             D1-5,Cotonou hopital General place
//             </Text>
//             </Text>
            
//           </View>
//       <View className=" w-14 h-14 p-2 flex relative inset-y-14 left-0 text-gray-600 items-center pl-3 pointer-events-none">
//          <MapIcon style={{ }}/> 
//          </View>
//       <TextInput type="search" id="default-search" className="block p-4 pl-10 w-full text-md  bg-gray-100 rounded-xl   dark:placeholder-gray-900 dark:text-gray " placeholder="    Entrer votre Ville/Region....." required  />
    
// <View className="m-2 p-2 rounded-xl">
// <Button
      
//         title="Enregistrer"
//         onPress={() => console.log('Simple Button pressed')}
//       />
// </View>
      
 
//     </ScrollView>
//     </>
   
//   );
// }

// const styles = StyleSheet.create({
//   icon: {
//     width: 22,
//     height: 22,
//     justifyContent: 'flex-start',
//     alignItems: 'flex-start',
//     marginLeft: -4,
    
    
//   },
// });


import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { MaterialIcons } from '@expo/vector-icons';
import Button from './src/components/Button';


export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const savePicture = async () => {
    if (image) {
      try {
        const asset = await MediaLibrary.createAssetAsync(image);
        alert('Image enregistré! 🎉');
        setImage(null);
        console.log('enregistrer avec secces');
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text>Désolé vous ne pouvez pas acceder a la camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          ref={cameraRef}
          flashMode={flash}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 30,
            }}
          >
            <Button
              title=""
              icon="retweet"
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            />
            <Button
              onPress={() =>
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                )
              }
              icon="flash"
              color={flash === Camera.Constants.FlashMode.off ? 'gray' : '#fff'}
            />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}

      <View style={styles.controls}>
        {image ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 50,
            }}
          >
            <Button
              title="Reprendre "
              onPress={() => setImage(null)}
              icon="retweet"
            />
            <Button title="Enregistrer" onPress={savePicture} icon="check" />
          </View>
        ) : (
          <Button title="Prendre Photo" onPress={takePicture} icon="camera" />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#000',
    padding: 8,
  },
  controls: {
    flex: 0.5,
  },
  button: {
    height: 40,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#E9730F',
    marginLeft: 10,
  },
  camera: {
    flex: 5,
    borderRadius: 20,
  },
  topControls: {
    flex: 1,
  },
});
