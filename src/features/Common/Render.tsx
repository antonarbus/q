import { ReactElement } from 'react'

type Props = {
  when: boolean
  children: ReactElement
}

/**
 * HOC for conditional rendering, can be used instead of combination of logical statements
 * @param props props
 * @param props.when condition for a component render
 * @param props.children component to render
 */
export const Render = ({ when, children }: Props) => when ? children : null
