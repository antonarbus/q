import styled, { keyframes } from 'styled-components'

interface Props {
  size?: string
  margin?: string
  background?: string
  duration?: string
  dots?: any
}

const defaultProps: Props = {
  dots: 3
}

export const LoadingDots = ({ size, margin, background, duration, dots }: Props) => {
  const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `

  const bounceLoading = keyframes`
  to {
    opacity: 0.3;
    transform: translate3d(0, -1.5rem, 0);
  }
  `

  const Dot = styled.div`
    width: ${size || '1.5rem'};
    height: ${size || '1.5rem'};
    margin: 0 ${margin || '1rem'};
    background: ${background || 'rgb(202, 57, 57)'};
    border-radius: 50%;
    animation: ${duration || '0.8s'} ${bounceLoading} infinite
      alternate;
    &:nth-child(2n + 0) {
      animation-delay: 0.3s;
    }
    &:nth-child(3n + 0) {
      animation-delay: 0.6s;
    }
  `

  const dotList = []
  for (let i = 0; i < dots; i++) {
    dotList.push(i)
  }

  const dotRender = dotList.map(dot => <Dot key={dot}></Dot>)

  return <Wrapper>{dotRender}</Wrapper>
}

LoadingDots.defaultProps = defaultProps
