import React, {
  FC,
  MutableRefObject,
  ReactElement,
  useEffect,
  useRef,
} from 'react'
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated'
import { Dimensions, Image, ListRenderItem, View } from 'react-native'
import { ListRenderItemInfo } from '@react-native/virtualized-lists/Lists/VirtualizedList'
import { IImageItem, IImageSliderProps } from './ImageSliderTypes'

/**
 * @description - Карусель изображений, поддерживающая бесконечную прокрутку
 * @constructor
 * @return {ReactElement}
 */
const ImageSlider: FC<IImageSliderProps> = ({
  setCurrentIndex,
  images,
}): ReactElement => {
  const flatListRef: MutableRefObject<any> = useRef(null)
  const data = [images[images.length - 1], ...images, images[0]]
  const scrollX = useSharedValue(0)
  const width = Dimensions.get('window').width

  useEffect(() => {
    if (images?.length) {
      setTimeout(() => {
        flatListRef.current.scrollToOffset({ offset: width, animated: false })
      }, 0)
    }
  }, [])

  /**
   * @description - Обработка прокрутки FlatList для получения текущих координат
   * @param {ListRenderItemInfo<string>} flatListItem
   * @return {ReactElement}
   */
  const renderItem: ListRenderItem<IImageItem> = (
    flatListItem: ListRenderItemInfo<IImageItem>,
  ): ReactElement => {
    const { item, index } = flatListItem
    return (
      <View key={index} style={{ width }}>
        <Image
          source={{ uri: item.uri }}
          style={{ width, height: '100%' }}
          resizeMode="cover"
        />
      </View>
    )
  }

  /**
   * @description - Прокручивает незаметно для пользователя массив картинок в конец списка
   */
  const handleScrollToStart = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({
        offset: width * images.length,
        animated: false,
      })
    }
  }

  /**
   * @description - Прокручивает незаметно для пользователя массив картинок в начало списка
   */
  const handleScrollToEnd = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: width, animated: false })
    }
  }

  /**
   * @description - Обработка прокрутки FlatList для получения текущих координат
   */
  const scrollHandler = useAnimatedScrollHandler(
    {
      onScroll: (event) => {
        scrollX.value = event.contentOffset.x
        const contentOffsetX = event.contentOffset.x
        if (Math.floor(contentOffsetX) === 0) {
          runOnJS(handleScrollToStart)()
        }
        if (
          Math.floor(contentOffsetX) === Math.floor(width * (images.length + 1))
        ) {
          runOnJS(handleScrollToEnd)()
        }
      },
    },
    [],
  )

  return (
    <Animated.FlatList
      ref={flatListRef}
      data={data}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={scrollHandler}
      renderItem={renderItem}
      onViewableItemsChanged={({ viewableItems }) => {
        setCurrentIndex(viewableItems?.[0]?.item?.id || images.length)
      }}
      keyExtractor={(item, index) => index.toString()}
    />
  )
}

export default ImageSlider
