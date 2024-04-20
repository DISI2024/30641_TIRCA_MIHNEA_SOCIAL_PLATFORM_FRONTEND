Project structure:
src/
    components/
        Login/
            ...
        Navbar/
            ...

Security:

To log in/logout:
```javascript
const Component = () => {
    const dispatch = useAppDispatch();
    
    // login
    dispatch(authenticate({
        username: "username",
        password: "password"
    }))
    
    // logout
    dispatch(logout())
}
```

To get information about the logged in user inside a component, look in: [selectors.js](src%2Fredux%2Fslices%2Fsecurity%2Fselectors.js)
ex:

```javascript
const Component = () => {
    const username = useUsername()
    const userId = useUserId()
    const role = useAuthorization()
    // etc
}
```

To add a new page, modify [PageRouter.jsx](src%2Frouting%2FPageRouter.jsx)