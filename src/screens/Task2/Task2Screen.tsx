import React, { ReactElement, useState } from 'react'
import { Text } from 'react-native'

import { ScreenContainer } from '../../shared/ui-kit'
import ImageSlider from '../../shared/ui-kit/sliders/ImageSlider'
import { IImageItem } from '../../shared/ui-kit/sliders/ImageSlider/ImageSliderTypes'

const images: Array<IImageItem> = [
  { id: 1, uri: 'https://ltdfoto.ru/images/2024/04/07/IMG_0832.jpg' },
  { id: 2, uri: 'https://ltdfoto.ru/images/2024/04/07/IMG_0833.jpg' },
  { id: 3, uri: 'https://ltdfoto.ru/images/2024/04/07/IMG_0834.jpg' },
]

/**
 * Сделать бесконечную прокрути массива картинок используя reanimated.
 * Снизу выводить индикатор того, на каком по счету элементу, в исходном списке, находится бесконечная прокрутка
 * @constructor
 * @return {ReactElement}
 */
const Task2Screen = (): ReactElement => {
  const [currentIndex, setCurrentIndex] = useState(1)

  return (
    <ScreenContainer>
      <ImageSlider setCurrentIndex={setCurrentIndex} images={images} />
      <Text style={{ fontSize: 100, textAlign: 'center' }}>{currentIndex}</Text>
    </ScreenContainer>
  )
}

export default Task2Screen
