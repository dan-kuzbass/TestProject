import React, { FC, ReactElement } from 'react'
import { FlatList, Pressable, StyleSheet, Text } from 'react-native'
import { ScreenContainer } from '../../shared/ui-kit'
import { NavigationProp, ParamListBase } from '@react-navigation/native'

interface IHomeScreenProps {
  navigation: NavigationProp<ParamListBase>
}

/**
 * @description - Главный экран со списком заданий
 * @return {ReactElement}
 */
const HomeScreen: FC<IHomeScreenProps> = ({ navigation }): ReactElement => {
  const taskList = [
    {
      name: 'Task 1 (открыть)',
      description:
        'Есть список объектов карточек, который нужно отобразить пользователю. Как константу нужно использовать список [150, 150, 200, 200, 100, 100]. Блоки карточек заполняют пространство между друг-другом, оставляя небольшой отсуп(10 px например). При этом самый большой блок увеличивает остальные блоки в ряду. Тем самым, если карточка с высотой 100px попадает в ряд с карточкой высотой в 200px, то она растягивается на размер 200, тоесть на высоту самой большой карточки в ряду. Кол-во столбиков с картами должно меняться динамически, в зависимости от размера представления-родителя, тоесть использование dimensions экрана не допустимо. При повороте устройства все должно хорошо работать',
      onPress: () => {
        navigation.navigate('Task1')
      },
    },
    {
      name: 'Task 2 (открыть)',
      description:
        'Сделать бесконечную прокрути массива картинок используя reanimated. Снизу выводить индикатор того, на каком по счету элементу, в исходном списке, находиться бесконечная прокрутка',
      onPress: () => {
        navigation.navigate('Task2')
      },
    },
    {
      name: 'Task 3 (открыть)',
      description:
        'Продемонстрировать умение создавать формы, сделать простую форму с вводом картинки(и ее подготовки для отправки на сервер по end point\'у), имени, описания. Валидация следующая: картинка обязательна, имя только из букв кириллицы и без пробелов, описание минимум 10 символов. Поля ввода стилизуются по желанию.',
      onPress: () => {
        navigation.navigate('Task3')
      },
    },
  ]

  const renderTaskItem = ({ item }: { item: any }) => (
    <Pressable
      onPress={item.onPress}
      style={({ pressed }) =>
        StyleSheet.flatten([
          { paddingVertical: 8, paddingHorizontal: 8 },
          pressed && { opacity: 0.4 },
        ])
      }
    >
      <Text style={{color: 'black', fontSize: 30}}>{item.name}</Text>
      <Text>{item.description}</Text>
    </Pressable>
  )

  return (
    <ScreenContainer>
      <FlatList data={taskList} renderItem={renderTaskItem} />
    </ScreenContainer>
  )
}

export default HomeScreen
