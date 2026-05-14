import { useWelcomeGuide } from '@front/shared/welcome-guide/WelcomeGuideProvider'
import { Box, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'motion/react'
import { welcomeSlides } from '@front/shared/welcome-guide/welcomeSlides'

export const WelcomeGuideSlide = (): React.JSX.Element => {
  const welcomeGuide = useWelcomeGuide()
  const slide = welcomeSlides?.[welcomeGuide.currentSlide]
  const directionAsNumber = welcomeGuide.direction === 'next' ? 1 : -1

  return (
    <Box
      sx={{
        flex: 1,
        overflow: 'hidden',
        minHeight: 0,
      }}
    >
      <AnimatePresence initial={false} mode='wait'>
        <motion.div
          key={welcomeGuide.currentSlide}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -directionAsNumber * 40, opacity: 0 }}
          initial={{ x: directionAsNumber * 40, opacity: 0 }}
          style={{ height: '100%' }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Box
              sx={{
                flex: 1,
                borderRadius: '8px',
                border: slide?.image === undefined ? '1px dashed #d0d0d0' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                overflow: 'hidden',
                background: slide?.image === undefined ? 'white' : 'transparent',
              }}
            >
              {slide?.image === undefined ? (
                <Typography
                  sx={{
                    color: '#bbb',
                    fontStyle: 'italic',
                    fontSize: '13px',
                  }}
                >
                  {slide?.mockLabel ?? ''}
                </Typography>
              ) : (
                <Box
                  alt={slide.title}
                  component='img'
                  src={slide.image}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              )}
            </Box>
            <Typography
              color='primary'
              sx={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '6px',
              }}
            >
              {slide?.step ?? ''}
            </Typography>
            <Typography
              variant='h6'
              sx={{
                fontWeight: 600,
                marginBottom: '8px',
              }}
            >
              {slide?.title ?? ''}
            </Typography>
            <Typography color='text.secondary' variant='body1'>
              {slide?.description ?? ''}
            </Typography>
          </Box>
        </motion.div>
      </AnimatePresence>
    </Box>
  )
}
