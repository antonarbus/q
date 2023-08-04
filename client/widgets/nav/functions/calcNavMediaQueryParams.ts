import { isOverflown } from 'utils/isOverflown'

const shrinkElementSlightly = (el: HTMLElement): void => {
  el.style.width = el.offsetWidth - 10 + 'px'
}

export interface TMediaQueryParams {
  logoExtension: number
  logoPart: number
  icon: number
  name: number
  burger: number
}

export function calcNavMediaQueryParams(nav: HTMLElement, logo: HTMLElement): TMediaQueryParams {
  interface Props {
    elsToHideClass?: string
    elsToShowClass?: string
  }

  function calcNavWidthWhenLogoIsOverlay({
    elsToHideClass,
    elsToShowClass,
  }: Props = {}) {
    if (elsToHideClass) {
      const elsToHideArr = Array.from(nav.querySelectorAll(elsToHideClass))
      elsToHideArr.forEach((el) => {
        ; (el as HTMLElement).style.display = 'none'
      })
      const elsToShowArr = Array.from(
        nav.querySelectorAll(
          elsToShowClass || 'non-existing-class-where-nothing-will-be-found',
        ),
      )
      elsToShowArr.forEach((el) => {
        ; (el as HTMLElement).style.display = ''
      })
    }
    let i = 0
    while (!isOverflown(logo)) {
      shrinkElementSlightly(nav)
      i++
      if (i > 1000) {
        console.log(
          'Problem! Over 1000 iterations in calcNavWidthWhenLogoIsOverlay() function',
        )
        break
      }
    }
    return nav.offsetWidth + 50
  }

  // calc init min nav width to accumulate all elements
  const navItemsQty = nav.querySelectorAll('.nav-item').length
  const navItemWidth = (nav.querySelector('.nav-item')!)
    .offsetWidth
  const logoWidth = (nav.querySelector('.logo-container')!)
    .offsetWidth
  const minNavWidthToIncludeAllItems = navItemWidth * navItemsQty + logoWidth
  nav.style.width = minNavWidthToIncludeAllItems + 200 + 'px'

  const logoExtension = calcNavWidthWhenLogoIsOverlay()
  const logoPart = calcNavWidthWhenLogoIsOverlay({
    elsToHideClass: '.app-ext',
  })
  const icon = calcNavWidthWhenLogoIsOverlay({ elsToHideClass: '.uotation' })
  const name = calcNavWidthWhenLogoIsOverlay({
    elsToHideClass: '.icon-round-wrapper',
  })
  const burger = calcNavWidthWhenLogoIsOverlay({
    elsToHideClass: '.nav-item-name',
    elsToShowClass: '.icon-round-wrapper',
  })
  nav
    .querySelectorAll(
      '.app-ext, .uotation, .icon-round-wrapper, .nav-item-name',
    )
    .forEach((el) => { el.setAttribute('style', ''); })
  nav.setAttribute('style', '')

  return { logoExtension, logoPart, icon, name, burger }
}
