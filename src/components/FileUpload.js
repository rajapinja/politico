import React, { useState, useEffect } from 'react';
import { View, Button, Text, PermissionsAndroid,TouchableOpacity, StyleSheet, SafeAreaView, ScrollView,Image} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const FileUpload = () => {
    const [singleFile, setSingleFile] = useState('');
    const [multipleFile, setMultipleFile] = useState([]);

    useEffect(() => {
        requestStoragePermission();
      }, []);
    
      const requestStoragePermission = async () => {
        try {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          ]);
          if (
            granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
            granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
          ) {
            console.log('Storage permission granted');
          } else {
            console.log('Storage permission denied');
            Alert.alert(
              'Permission Denied',
              'Please grant storage access to use this feature.',
              [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
            );
          }
        } catch (err) {
          console.warn(err);
        }
      };
  
    const selectOneFile = async () => {
      //Opening Document Picker for selection of one file
      try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],
          //There can me more options as well
          // DocumentPicker.types.allFiles
          // DocumentPicker.types.images
          // DocumentPicker.types.plainText
          // DocumentPicker.types.audio
          // DocumentPicker.types.pdf
        });
        //Printing the log realted to the file
        console.log('res : ' + JSON.stringify(res));
        console.log('URI : ' + res.uri);
        console.log('Type : ' + res.type);
        console.log('File Name : ' + res.name);
        console.log('File Size : ' + res.size);
        //Setting the state to show single file attributes
        setSingleFile(res);
      } catch (err) {
        //Handling any exception (If any)
        if (DocumentPicker.isCancel(err)) {
          //If user canceled the document selection
          alert('Canceled from single doc picker');
        } else {
          //For Unknown Error
          alert('Unknown Error: ' + JSON.stringify(err));
          throw err;
        }
      }
    };
  
    const selectMultipleFile = async () => {
      //Opening Document Picker for selection of multiple file
      try {
        const results = await DocumentPicker.pickMultiple({
          type: [DocumentPicker.types.images],
          //There can me more options as well find above
        });
        for (const res of results) {
          //Printing the log realted to the file
          console.log('res : ' + JSON.stringify(res));
          console.log('URI : ' + res.uri);
          console.log('Type : ' + res.type);
          console.log('File Name : ' + res.name);
          console.log('File Size : ' + res.size);
        }
        //Setting the state to show multiple file attributes
        setMultipleFile(results);
      } catch (err) {
        //Handling any exception (If any)
        if (DocumentPicker.isCancel(err)) {
          //If user canceled the document selection
          alert('Canceled from multiple doc picker');
        } else {
          //For Unknown Error
          alert('Unknown Error: ' + JSON.stringify(err));
          throw err;
        }
      }
    };
  
    return (
      <SafeAreaView style={{flex: 1}}>
       
        <Text style={styles.titleText}>
          Example of File Picker in React Native
        </Text>
        <View style={styles.container}>
          {/*To show single file attribute*/}
          <Button title="Request Storage Permission" onPress={requestStoragePermission} />
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={selectOneFile}>
            {/*Single file selection button*/}
            <Text style={{marginRight: 10, fontSize: 19}}>
              Click here to pick one file
            </Text>
            <Image
              source={{
                uri: 'https://img.icons8.com/offices/40/000000/attach.png',
              }}
              style={styles.imageIconStyle}
            />
          </TouchableOpacity>
          {/*Showing the data of selected Single file*/}
          <Text style={styles.textStyle}>
            File Name: {singleFile.name ? singleFile.name : ''}
            {'\n'}
            Type: {singleFile.type ? singleFile.type : ''}
            {'\n'}
            File Size: {singleFile.size ? singleFile.size : ''}
            {'\n'}
            URI: {singleFile.uri ? singleFile.uri : ''}
            {'\n'}
          </Text>
          <View
            style={{
              backgroundColor: 'grey',
              height: 2,
              margin: 10
            }} />
          {/*To multiple single file attribute*/}
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={selectMultipleFile}>
            {/*Multiple files selection button*/}
            <Text style={{marginRight: 10, fontSize: 19}}>
              Click here to pick multiple files
            </Text>
            <Image
              source={{
                uri: 'https://img.icons8.com/offices/40/000000/attach.png',
              }}
              style={styles.imageIconStyle}
            />
          </TouchableOpacity>
          <ScrollView>
            {/*Showing the data of selected Multiple files*/}
            {multipleFile.map((item, key) => (
              <View key={key}>
                <Text style={styles.textStyle}>
                  File Name: {item.name ? item.name : ''}
                  {'\n'}
                  Type: {item.type ? item.type : ''}
                  {'\n'}
                  File Size: {item.size ? item.size : ''}
                  {'\n'}
                  URI: {item.uri ? item.uri : ''}
                  {'\n'}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  };
  
 
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 16,
    },
    titleText: {
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingVertical: 20,
    },
    textStyle: {
      backgroundColor: '#fff',
      fontSize: 15,
      marginTop: 16,
      color: 'black',
    },
    buttonStyle: {
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: '#DDDDDD',
      padding: 5,
    },
    imageIconStyle: {
      height: 20,
      width: 20,
      resizeMode: 'stretch',
    },

  });

export default FileUpload;
