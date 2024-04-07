import { Dispatch, SetStateAction } from 'react'

export interface IImageItem {
  id: number
  uri: string
}

export interface IImageSliderProps {
  setCurrentIndex: Dispatch<SetStateAction<number>>
  images: Array<IImageItem>
}
