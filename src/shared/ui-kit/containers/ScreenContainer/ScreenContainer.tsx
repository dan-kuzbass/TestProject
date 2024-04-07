import React, { FC, ReactElement } from 'react'
import { SafeAreaView, StyleProp, StyleSheet, ViewStyle } from "react-native";

interface IScreenContainerProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}

/**
 * @description - Контейнер для всех экранов
 * @constructor
 * @return {ReactElement}
 */
const ScreenContainer: FC<IScreenContainerProps> = ({
  children,
  style,
}): ReactElement => {
  return (
    <SafeAreaView style={StyleSheet.flatten([{ paddingTop: 16, flex: 1 }, style])}>{children}</SafeAreaView>
  )
}

export default ScreenContainer
