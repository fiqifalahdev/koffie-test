/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

// import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
//
const AuthController = () => import('#controllers/auth_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

/*
|--------------------------------------------------------------------------
| Authentication Route
|--------------------------------------------------------------------------
|
| in this line below is defining the route for authentication
| 
| POST /login
| POST /register
| POST /logout
|
*/
router.post('/register', [AuthController, 'register'])
router.post('/login', [AuthController, 'login'])

router
  .get('/dashboard', ({ auth }) => {
    console.log(`auth.user : ${auth.user}`)

    return {
      user: auth.user,
      message: 'You are in the dashboard',
    }
  })
  .use(middleware.auth())
