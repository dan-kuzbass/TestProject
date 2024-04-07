import React, { FC, useEffect, useState } from 'react'
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import useFormField from '../../../shared/hooks/useFormField.ts'
import { Constants } from '../../../shared/config/Constants.ts'
import { launchImageLibrary } from 'react-native-image-picker'

interface IImageFormProps {
  sendDataToServer: (formData: FormData) => Promise<unknown>
}

const ImageForm: FC<IImageFormProps> = ({ sendDataToServer }) => {
  const {
    value: name,
    setValue: setName,
    error: nameError,
    setError: setNameError,
  } = useFormField()
  const {
    value: description,
    setValue: setDescription,
    error: descriptionError,
    setError: setDescriptionError,
  } = useFormField()

  const nameRegExp = /^[А-Яа-яЁё]+$/
  const isValidName = nameRegExp.test(name)
  const isValidDescription =
    description?.length >= Constants.VALID_IMAGE_DESCRIPTION_LENGTH

  const [imageUri, setImageUri] = useState('')
  const [base64Image, setBase64Image] = useState('')

  useEffect(() => {
    if (nameError) {
      setNameError('')
    }
    if (name && !isValidName) {
      setNameError('Имя должно быть только из букв кириллицы и без пробелов')
    }
  }, [name])

  useEffect(() => {
    if (descriptionError) {
      setDescriptionError('')
    }
    if (description && !isValidDescription) {
      setDescriptionError('описание минимум 10 символов')
    }
  }, [description])

  const isDisabled = !imageUri || !isValidDescription || !isValidName

  const handlePressButton = () => {
    launchImageLibrary({ mediaType: 'photo', includeBase64: true }).then((res) => {
      if (res?.assets?.[0]?.uri) {
        setImageUri(res?.assets?.[0]?.uri)
        setBase64Image(res?.assets?.[0]?.uri)
      }
    })
  }

  const handleChangeName = (newName: string) => {
    setName(newName)
  }

  const handleChangeDescription = (newDescription: string) => {
    setDescription(newDescription)
  }

  const handlePressConfirm = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('image', base64Image)
    sendDataToServer(formData).then((res) => Alert.alert(res?.toString() ?? ''))
  }

  return (
    <View style={styles.container}>
      <Text>Название картинки</Text>
      <TextInput
        value={name}
        style={styles.input}
        onChangeText={handleChangeName}
      />
      <Text style={styles.errorText}>{nameError}</Text>
      <Text>Описание картинки</Text>
      <TextInput
        value={description}
        style={styles.input}
        onChangeText={handleChangeDescription}
      />
      <Text style={styles.errorText}>{descriptionError}</Text>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <Text style={styles.imagePlaceholder}>
          Загрузите картинку по кнопке ниже...
        </Text>
      )}
      <View style={styles.buttonsContainer}>
        <Button title={'Выбрать фото'} onPress={handlePressButton} />
        <Button
          title={'Отправить фото на сервер'}
          onPress={handlePressConfirm}
          disabled={isDisabled}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {paddingHorizontal: 16},
  input: { borderWidth: 1, marginVertical: 8 },
  buttonsContainer: { rowGap: 16 },
  errorText: { color: 'red' },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
    alignSelf: 'center',
  },
  imagePlaceholder: { textAlign: 'center', marginBottom: 16, color: 'red' },
})

export default ImageForm
