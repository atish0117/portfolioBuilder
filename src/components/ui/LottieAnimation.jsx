import React from 'react'
import Lottie from 'lottie-react'

const LottieAnimation = ({
  animationData,
  className = '',
  loop = true,
  autoplay = true,
}) => {
  return (
    <div className={className}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoPlay={autoplay}
      />
    </div>
  )
}

export default LottieAnimation
