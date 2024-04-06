import React, { FC } from 'react'
import { SafeAreaView } from 'react-native'

interface IScreenContainerProps {
  children: React.ReactNode
}

const ScreenContainer: FC<IScreenContainerProps> = ({ children }) => {
  return (
    <SafeAreaView style={{ paddingTop: 16, paddingHorizontal: 16 }}>
      {children}
    </SafeAreaView>
  )
}

export default ScreenContainer
