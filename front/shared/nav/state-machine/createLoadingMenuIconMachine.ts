/* eslint-disable @typescript-eslint/no-unsafe-type-assertion */
import { dispatch } from '@shared/lib/redux'
import { setup } from 'xstate'
import type { NavItemId } from '@shared/const/navItemId'
import { navSlice } from '@shared/nav'

type Props = {
  navItemId: NavItemId
  navItemNameWhileLoading?: string
}

/** @xstate-layout N4IgpgJg5mDOIC5QBsD2BDCBLAdlABALZg4Cu+WAxqjgHQDu6WALrlAMSwAWq9+amNhWo4A2gAYAuolAAHVLBZYaMkAA9EAVgCMATloAWXQYAcu7QGYAbAHYLlkwBoQAT0R7ttHRYBMmi3YWmib+PgC+Yc4C2HhEJORUNLTRbJw8fGAATpmomcI0EtJIIPKKrCrFGggW4uK0NiEG4po2mrVtBs5uCDZWtNZGNjbierpm5hFRGDEExGT5dCl4abz4sKSUlHCwC4WqpUoVoFV2dUM22j4+2i0+BkZdiL39VoPDo+PakyBLs-ELtCyOUy7DUsGY6GYYFo6AAZlDMgAKHy1cQASnYvzi80SdCBuT2xQO5RwqiqFl8XgMVnsJm04isJgMPicrkQLP0jN04gsBk0mnu4hs4UiP2mQjmCREtHWm22oPBkOhcIRyNRGKxkoBsq2sFghLkCkOpMqTys+juF3sPkCml0jwQHNoXJ5fIFTWFEVFOFQEDgqk1-1x+yNJLJ7PuzqsVhuAoGOlsDoAtNp6c7zCYTH5M9ZhlZvoGcdLGEo8CGysoTcctHbaGZNDamtTtNTOmzqpZ+jUfLyaqmmQYC+LYlrcclh1By8bwwg2voDNpbDYDMLhY3kz2XmZbBSTBcF68h4IR0HpfjMlOw6bHbofFGY-yDPHtDYHTcDPVGXzjAKe3SjzM2JSkkOrbJelYznmtC6BcJgjCMQQrhYb4Cp+TJ2nyzIWP+XpAA */
export const createLoadingMenuIconMachine = ({
  navItemId,
  navItemNameWhileLoading,
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
}: Props) =>
  setup({
    types: {
      events: {} as
        | { type: 'show loading icon' }
        | { type: 'show error icon' }
        | { type: 'show success icon' },
    },
    actions: {
      'show spinner': () => {
        dispatch(
          navSlice.actions.startLoadingIcon({
            navItemId,
            navItemNameWhileLoading,
          }),
        )
      },
      'hide spinner': () => {
        dispatch(
          navSlice.actions.stopLoadingIcon({
            navItemId,
            navItemNameWhileLoading,
          }),
        )
      },
      'show error icon': () => {
        dispatch(navSlice.actions.showErrorIcon({ navItemId }))
      },
      'hide error icon': () => {
        dispatch(navSlice.actions.hideErrorIcon({ navItemId }))
      },
      'show success icon': () => {
        dispatch(navSlice.actions.showSuccessIcon({ navItemId }))
      },
      'hide success icon': () => {
        dispatch(navSlice.actions.hideSuccessIcon({ navItemId }))
      },
    },
  }).createMachine({
    id: 'loading menu icon',
    initial: 'waiting',
    states: {
      waiting: {
        on: {
          'show loading icon': {
            target: 'loading',
          },
        },
      },
      loading: {
        on: {
          'show error icon': {
            target: 'error',
          },
          'show success icon': {
            target: 'success',
          },
        },
        entry: 'show spinner',
        exit: 'hide spinner',
      },
      error: {
        after: {
          2000: {
            target: 'waiting',
          },
        },
        entry: [
          {
            type: 'show error icon',
          },
        ],
        exit: [
          {
            type: 'hide error icon',
          },
        ],
      },
      success: {
        after: {
          2000: {
            target: 'waiting',
          },
        },
        entry: [
          {
            type: 'show success icon',
          },
        ],
        exit: [
          {
            type: 'hide success icon',
          },
        ],
      },
    },
  })
