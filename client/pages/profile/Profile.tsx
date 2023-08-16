import { axiosWithAuth } from 'client/shared/auth'
import { notify } from 'client/shared/ui/top_msg/notify'
import type { TUserEmailRes } from 'server/api/userEmailRouter'

const getEmailFromDb = async (): Promise<void> => {
  try {
    // if we just go in browser to http://localhost:3009/api/user or fetch it with just fetch or axios general instance
    // we get msg "accessJwtToken is not verified, user is not authorized"
    // but with axiosWithAuth we add access token to the header and check it inside the middleware 'verifyToken '
    const res = await axiosWithAuth<TUserEmailRes>('/api/user')
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}

const getUsersFromDb = async (): Promise<void> => {
  try {
    const res = await axiosWithAuth('/api/users')
    console.log(res)
  } catch (error) {
    console.log(error)
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
