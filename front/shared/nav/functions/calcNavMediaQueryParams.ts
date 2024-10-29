import { isOverflown } from '../../utils/isOverflown'

// todo: refactor this mess

const shrinkElementIncrementally = (el: HTMLElement): void => {
  el.style.width = `${String(el.offsetWidth - 10)}px`
}

export type NavItemsMediaQueryWidths = {
  icon: number
  name: number
  burger: number
}

export const calcNavMediaQueryParams = (
  nav: HTMLElement,
  logo: HTMLElement,
): NavItemsMediaQueryWidths => {
  type Props = {
    elsToHideClass?: string
    elsToShowClass?: string
  }

  const calcNavWidthWhenLogoIsOverlay = ({
    elsToHideClass,
    elsToShowClass,
  }: Props = {}): number => {
    if (elsToHideClass) {
      const elsToHideArr = Array.from(nav.querySelectorAll(elsToHideClass))

      elsToHideArr.forEach((el) => {
        if (!(el instanceof HTMLElement)) return
        el.style.display = 'none'
      })

      const elsToShowArr = Array.from(
        nav.querySelectorAll(
          elsToShowClass ?? 'non-existing-class-where-nothing-will-be-found',
        ),
      )

      elsToShowArr.forEach((el) => {
        if (!(el instanceof HTMLElement)) return
        el.style.display = ''
      })
    }

    let i = 0

    while (!isOverflown({ element: logo })) {
      shrinkElementIncrementally(nav)
      i++

      if (i > 1000) {
        console.error(
          'Problem! Over 1000 iterations in calcNavWidthWhenLogoIsOverlay() function',
        )
        break
      }
    }
    return nav.offsetWidth + 50
  }

  // calc init min nav width to accumulate all elements
  const navItemsQty = nav.querySelectorAll('.nav-item').length

  const navItem = nav.querySelector<HTMLElement>('.nav-item')
  const navItemWidth = navItem ? navItem.offsetWidth : 0
  const logoContainer = nav.querySelector<HTMLElement>('.logo-container')
  const logoContainerWidth = logoContainer ? logoContainer.offsetWidth : 0

  const minNavWidthToIncludeAllItems =
    navItemWidth * navItemsQty + logoContainerWidth + 350

  nav.style.width = `${minNavWidthToIncludeAllItems}px`

  // todo: there is not such element with class .uotation anymore
  const icon = calcNavWidthWhenLogoIsOverlay({ elsToHideClass: '.uotation' })
  const name = calcNavWidthWhenLogoIsOverlay({
    elsToHideClass: '.icon-round-wrapper',
  })
  const burger = calcNavWidthWhenLogoIsOverlay({
    elsToHideClass: '.nav-item-name',
    elsToShowClass: '.icon-round-wrapper',
  })
  nav.querySelectorAll('.icon-round-wrapper, .nav-item-name').forEach((el) => {
    el.setAttribute('style', '')
  })
  nav.setAttribute('style', '')

  return { icon, name, burger }
}
