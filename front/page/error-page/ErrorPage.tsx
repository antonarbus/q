import { useRouteError } from 'react-router-dom'

export const ErrorPage = (): React.JSX.Element => {
  const error = useRouteError()
  console.error(error)

  return (
    <div
      style={{
        height: '100vh',
        paddingTop: '100px',
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        color: 'grey',
      }}
    >
      <h1>Oops!</h1>
      <p style={{ marginTop: '20px' }}>
        Sorry, an unexpected error has occurred.
      </p>

      {/* <p style={{ marginTop: '20px' }}>
        Name
      </p>
      <p >
        <i>{error.name}</i>
      </p>
      <p style={{ marginTop: '20px' }}>
        Message
      </p>
      <p>
        <i>{error.message}</i>
      </p> */}
      {/* <p style={{ marginTop: '20px' }}>
        Stack
      </p>
      <p>
        <i>{error.stack}</i>
      </p> */}
    </div>
  )
}
