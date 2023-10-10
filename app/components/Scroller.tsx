import React from 'react'
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel-react'
import { IosPickerItem } from './EmblaCarouselIosPickerItem'

type PropType = {
  loop?: EmblaOptionsType['loop']
  

}

const EmblaScroller: React.FC<PropType> = (props) => {
  const { loop } = props
    
  return (
    <div className="embla">
      <IosPickerItem
        slideCount={24}
        perspective="left"
        loop={loop}
        label=""

        
      />
      <IosPickerItem
        slideCount={60}
        perspective="right"
        loop={loop}
        label=""
      />
    </div>
  )
}

export default EmblaScroller