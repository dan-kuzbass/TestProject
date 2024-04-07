import React, { ReactElement, useState } from 'react'
import { ScreenContainer } from '../../shared/ui-kit'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

/**
 * Есть список объектов карточек, который нужно отобразить пользователю.
 * Как константу нужно использовать список [150, 150, 200, 200, 100, 100].
 * Блоки карточек заполняют пространство между друг-другом, оставляя небольшой отсуп(10 px например).
 * При этом самый большой блок увеличивает остальные блоки в ряду.
 * Тем самым, если карточка с высотой 100px попадает в ряд с карточкой высотой в 200px,
 * то она растягивается на размер 200, тоесть на высоту самой большой карточки в ряду.
 * Кол-во столбиков с картами должно меняться динамически,
 * в зависимости от размера представления-родителя, тоесть использование dimensions экрана не допустимо.
 * При повороте устройства все должно хорошо работать
 * @constructor
 * @return {ReactElement}
 */
const Task1Screen = (): ReactElement => {
  const data = [150, 150, 200, 200, 100, 100]
  const [screenWidth, setScreenWidth] = useState(200)

  /**
   * @param {number} size - размер элемента
   * @return {ReactElement}
   */
  const renderItem = (size: number): ReactElement => {
    return (
      <View
        style={StyleSheet.flatten([
          styles.itemContainer,
          { width: size, minHeight: size },
        ])}
      >
        <Text style={styles.text}>{size}</Text>
      </View>
    )
  }

  return (
    <ScreenContainer>
      <Text>{`Исходный массив: ${data.toString()}`}</Text>
      <View style={styles.row}>
        <Text>Ширина контейнера списка:</Text>
        <TextInput
          keyboardType="numeric"
          value={Math.floor(screenWidth).toString()}
          onChangeText={(newScreenWidth) => {
            setScreenWidth(+newScreenWidth)
          }}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={StyleSheet.flatten([
          styles.listContainer,
          { width: screenWidth },
        ])}
      >
        {data.map(renderItem)}
      </ScrollView>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 80,
    backgroundColor: 'green',
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  text: { fontSize: 25 },
  itemContainer: {
    backgroundColor: 'red',
    marginHorizontal: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Task1Screen
