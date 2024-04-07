import React, { FC, ReactElement } from 'react'
import { SafeAreaView } from 'react-native'

interface IScreenContainerProps {
  children: React.ReactNode
}

/**
 * @description - Контейнер для всех экранов
 * @constructor
 * @return {ReactElement}
 */
const ScreenContainer: FC<IScreenContainerProps> = ({
  children,
}): ReactElement => {
  return (
    <SafeAreaView style={{ paddingTop: 16, flex: 1 }}>{children}</SafeAreaView>
  )
}

export default ScreenContainer
