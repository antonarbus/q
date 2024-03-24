Authorization - checking if password is correct
Authentication - checking if a user is the same as authorized initially

(A) The client is authorized by comparing email and
password's hash with secrete sault against database.

(B) On successful authorization the server issues an 'access'
and a 'refresh' tokens for future user authentication to avoid
asking for credentials on every http request.

(C) Client stores 'access' token locally in memory and
attaches it inside request headers for private api requests.
Token is attached by 'request' interceptor in 'axiosWithAuth'.
If we do a request to a protected endpoint we just use axiosWithAuth
instance to avoid attaching token manually.

(D) For protected apis the 'verifyToken' express middleware verifies an 'access' token.
If the token is ok, the request goes forward. If the token is bad
(compromised or outdated) a response of status 401 is returned.

(E) 'Access' token expires in 15 min.
'Response' interceptor in 'axiosWithAuth' checks for 401 status and
if it is the 401, it makes additional request to update 'access' token by
presenting a 'refresh' token in cookies, which has 30d expiry time.

(F) 'Refresh' token is saved on server in secured cookies on the login 
and on tokens refresh. Token is also kept in database. 
If the 'refresh' token is valid and available in database, then 
updated 'access' and updated 'refresh' tokens are issued.

(G) 'axiosWithAuth' remembers initial request with all parameters when it
got 401 error and after getting successful refreshed tokens it repeats
initial http request.

(H) If 'refresh' token is invalid or old, then 'access' token is not
issued, client is considered as unauthorized and new login action
is required.

(I) If a user is deleted from the database, he is still authorized
for short time until 'access' token is expired (15 min).
We should consider the duration of access token depending on
sensitivity of our data.

(J) Tokens are also checked and refreshed at the initial app
load in useEffect() on <Main /> component mount. That's how we determine
if a known client returned back and avoid prompting for credentials
on a page refresh.

(K) For tokens we use JWT tokens, which contain encrypted (not hashed)
payload (usually object with user email, role, etc...), validation time
and a hash based on a secret keys, which are kept on a server.
Server can validate the token only if it knows the secrete keys.
Secrete keys are kept in environment variables.
