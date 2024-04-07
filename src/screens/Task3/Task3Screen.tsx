import React, { ReactElement, useEffect, useState } from "react";
import { ScreenContainer } from '../../shared/ui-kit'
import {
  Alert,
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import { Constants } from '../../shared/config/Constants'
import useFormField from '../../shared/hooks/useFormField'
import ImageForm from '../../widgets/task3/ImageForm'

/**
 * Продемонстрировать умение создавать формы,
 * сделать простую форму с вводом картинки(и ее подготовки для отправки на сервер по end point'у),
 * имени, описания. Валидация следующая: картинка обязательна, имя только из букв кириллицы и без пробелов,
 * описание минимум 10 символов. Поля ввода стилизуются по желанию.
 * @constructor
 * @return {ReactElement}
 */
const Task3Screen = (): ReactElement => {
  const sendDataToServer = (formData: FormData) => {
    return new Promise(async (resolve) => {
      if (formData) {
        resolve('success')
      }
    })
  }
  return (
    <ScreenContainer>
      <ImageForm sendDataToServer={sendDataToServer} />
    </ScreenContainer>
  )
}

export default Task3Screen
