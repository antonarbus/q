import { notify } from '@components/Notifier/notify'
// eslint-disable-next-line camelcase
import { axiosWithAuth } from '@src/axios'

async function getEmailFromDb() {
  try {
    // if we just go in browser to http://localhost:3009/api/user or fetch it with just fetch or axios general instance
    // we get msg "accessJwtToken is not verified, user is not authorized"
    // but with axiosWithAuth we add access token to the header and check it in the middleware 'verifyToken '
    const res = await axiosWithAuth('/api/user')
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}

async function getUsersFromDb() {
  try {
    const res = await axiosWithAuth('/api/users')
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}

export const Test = () => (
  <>
    <h3>Test</h3>
    <button onClick={() => notify({ msg: 'hi' })}>say hi in bottom popup</button>
    <button onClick={getEmailFromDb}>get user's email from db</button>
    <button onClick={getUsersFromDb}>get users from db</button>
  </>
)
