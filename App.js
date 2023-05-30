import { Alert, Button, Image, PermissionsAndroid, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ImageCropPicker from 'react-native-image-crop-picker';
import axios from 'axios';

export default function App() {
  const [selectedImg, setSelectedImg] = useState(null)

  const onChooseImage = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        }
      );

      if (granted) {
        ImageCropPicker.openCamera({
          width: 300,
          height: 400,
          cropping: true
        }).then(image => {
          console.log(image, "image.....")
          setSelectedImg({
            mime: image?.mime,
            path: image?.path,
            id: image?.modificationDate,
          })
        }).catch((error) => {
          console.log(error, "error.....")
        })
      }
      else {
        console.warn("Camera permission required.")
      }

    } catch (error) {
      console.warn(error)
    }
  }


  const onUploadImage = () => {

    if (!selectedImg) {
      alert("Please select image")
      return
    }

    let apiBaseUrl = "http://13.232.158.203:8080/resources/api/v1/user/myprofile/photo/upload?picType=profile&mobileNumber=9602511851&gender=Male"
    let headers = {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5NjAyNTExODUxIiwiaWF0IjoxNjg1NDcwMTQ3LCJleHAiOjE2ODU0NzE1ODcsImdlbmRlciI6Ik1hbGUifQ.rxnVupbo8d7_SS8Kh-Hxxjy4yEuI8BQelzZIAw602QQ",
      "Content- Type": "multipart/form-data"
    }

    let formData = new FormData()
    formData.append('uploadFiles', {
      name: `${selectedImg?.id}_img`,
      type: selectedImg?.mime,
      uri: selectedImg.path,
    });

    axios["post"](apiBaseUrl, formData, headers).then((res) => {
      console.log(res, "Image upload success response")
    }).catch((err) => {
      console.log(err, "error upload")
    })

  }

  return (
    <View style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    }}>
      {!!selectedImg &&

        <Image source={{ uri: selectedImg?.path }} style={{
          height: 100,
          width: 100
        }} />



      }

      <View style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20
      }}>
        <Button title='Choose Image' onPress={onChooseImage} />
        <View style={{
          width: 50
        }} />
        <Button title='Upload Image' color={"green"} onPress={onUploadImage} />
      </View>

      {
        !!selectedImg && <Button title='Remove Image' color={"grey"} onPress={() => setSelectedImg(null)} />
      }
    </View>
  )
}

const styles = StyleSheet.create({})