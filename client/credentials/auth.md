
Authorization - checking if password is correct
Authentication - checking if the user is the same as authorized initially

(A) The client is authorized by comparing email and
    password against database.

(B) On successful authorization the server issues an 'access'
    and a 'refresh' tokens for future authentication to avoid
    asking for credentials on every http request.

(C) Client stores 'access' token locally (preferably memory) and
    attaches it inside request headers for private api requests.
    Token is attached by 'request' interceptor in 'axiosWithAuth'.
    If we do a request to a private endpoint we just use axiosWithAuth
    instance to avoid attaching token manually for every such request.

(D) For protected api 'verifyToken' server side middleware verifies an 'access' token.
    If a token is ok, the request goes forward. If a token is bad
    (compromised or outdated) a response of status 401 is returned.

(E) 'Access' token is short and expires for ex. in 15 min.
    'Response' interceptor in 'axiosWithAuth' checks for 401 status and
    if it is the 401, it makes additional request to update 'access' token by 
    presenting a 'refresh' token, which has for ex. 30d expiry time.

(F) 'Refresh' token is stored in secured cookies on the login
    and also kept in database. If the 'refresh' token is valid and
    available in database, then refreshed 'access' and 
    refreshed 'refresh' tokens are issued.

(G) 'axiosWithAuth' remembers the request with all parameters when it
    got 401 and after getting successful refreshed tokens it repeats 
    initial http request.

(H) If 'refresh' token is invalid or old, then 'access' token is not
    issued, client is considered as unauthorized and new login action
    is required.

(I) If a user is deleted from the database, he is still authorized 
    for short time until 'access' token is expired (15 min). 
    We should consider the duration of access token depending on 
    sensitivity of our data.

(J) Tokens are also checked and refreshed at the initial app
    load in useEffect() on Main component mount. That's how we determine
    if a known client returned back and avoid prompting for credentials
    on a page refresh.

(K) For tokens we use JWT tokens, which contain encrypted (not hashed)
    payload (usually object with user email, role, etc...), validation time 
    and a hash based on a secret keys, which are kept on a server. 
    Server can validate the token only if it knows the secrete keys.
    Secrete keys are kept in environment variables.
