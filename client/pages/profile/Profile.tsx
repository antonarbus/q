import type { UserEmailRes } from 'server/api/userEmailRouter'
import { apiUrl } from 'server/apiUrls'
import { axiosWithAuth } from '@entities/user'
import { notify } from '@shared/ui/top_msg/notify'

const getEmailFromDb = async (): Promise<void> => {
  try {
    // if we just go in browser to http://localhost:3009/api/user or fetch it with just fetch or axios general instance
    // we get msg "accessJwtToken is not verified, user is not authorized"
    // but with axiosWithAuth we add access token to the header and check it inside the middleware 'verifyToken '
    const res = await axiosWithAuth<UserEmailRes>(apiUrl.user)
    console.info(res)
  } catch (error) {
    console.error(error)
  }
}

const getUsersFromDb = async (): Promise<void> => {
  try {
    const res = await axiosWithAuth(apiUrl.users)
    console.info(res)
  } catch (error) {
    console.error(error)
  }
}

export const Profile = (): JSX.Element => (
  <>
    <h3>Profile</h3>
    <button onClick={(): void => {
      notify({ msg: 'hi' })
    }}>
      say hi in bottom popup
    </button>
    <button onClick={getEmailFromDb}>get user's email from db</button>
    <button onClick={getUsersFromDb}>get users from db</button>
  </>
)
