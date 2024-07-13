const emailRegExp =
  // eslint-disable-next-line prefer-named-capture-group
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/u

export const isEmailPatternOk = (email: string): boolean =>
  emailRegExp.test(email)
