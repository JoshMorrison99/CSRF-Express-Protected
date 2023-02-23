# CSRF-Express-Protected
To implement CSRF Protection in express, the common practise is to use the following npm package:
```
https://www.npmjs.com/package/csurf
```

To implement `csurf` on the express app we add the following code:
```js
var csrf = require('csurf')

var csrfProtection = csrf({ cookie: true })
app.use(csrfProtection);

app.get('/api/csrf-token', (req, res) => {
    res.json({ CSRFToken: req.csrfToken() });
});
```

The code above is all we need to implement CSRF protection on the backend.

To implement the CSRF protection on the frontend using React, we need to make an API call to `/api/csrf-token` as described above.
```jsx
const [csrfToken, setCsrfToken] = useState("")

const getCSRFToken = () => {
	fetch('http://localhost:5000/api/csrf-token')
		.then(response => response.json())
		.then(data => {
			setCsrfToken(data['CSRFToken'])
		})
}

useEffect(() => {
	getCSRFToken()
}, [])
```

When the application loads the `csrfToken` value is set by making a call to the backend API at `/api/csrf-token`. Any request that needs to be protected by a CSRF Token will need to have the `CSRF-Token: csrfToken` header like so:
```jsx
const handleSubmit = () => {
	fetch('http://localhost:5000/api/support', {
		method: 'POST', credentials: "include", headers: {
			'Content-Type': 'application/json',
			'CSRF-Token': csrfToken
		}, body: JSON.stringify({
			url: urlChange
		})
	})
		.then(response => response.json())
		.then(data => {
			console.log(data)
		})
};
```

If the CSRF-Token header is not provided, then we get the following error on the backend:
```
ForbiddenError: invalid csrf token
```

---

**Summary**
Protecting your application from CSRF using React on the frontend and Express on the backend is not that difficult. Areas where developers could make mistakes is by not setting the CSRF-Token in the header when making a POST request. This could however be avoid by setting a default header for all POST requests like so:
```jsx
const getCSRFToken = async () => {
    const response = await axios.get('http://localhost:5000/api/csrf-token');
    axios.defaults.headers.post['X-CSRF-Token'] = response.data.CSRFToken;
 };
```

Other areas where developers could make mistakes is not setting CSRF protection on state changing function. In the example above we used `app.use(csrfProtection);` to implement CSRF protection on everything, but it is more common to only implement CSRF protection on functions that need it.
```js
app.post('/api/reset-password', csrfProtection, function (req, res) {
  res.json({ CSRFToken: req.csrfToken() });
})
```
