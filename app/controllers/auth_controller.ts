import { HttpContext } from '@adonisjs/core/http'
import { loginValidator, registerValidator } from '#validators/register'
import User from '#models/user'

export default class AuthController {
  public async register({ request, response }: HttpContext) {
    // Get the request data
    const { fullname, email, password } = request.all()
    // Validate the request
    const payload = await registerValidator.validate({
      fullname,
      email,
      password,
    })

    // Insert Data to database
    const user = await User.create({
      fullName: payload.fullname,
      email: payload.email,
      password: payload.password,
    })

    // Set access token (this token is created using built in function in adonis js)
    const token = await User.accessTokens.create(user)

    return response.json({
      message: 'User registered successfully',
      data: {
        fullname: payload.fullname,
        email: payload.email,
        createdAt: new Date().getDate(),
      },
      token: token,
    })
  }

  public async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    // Validate the request
    const payload = await loginValidator.validate({
      email,
      password,
    })

    // Verify user credentials
    const user = await User.verifyCredentials(payload.email, payload.password)

    // Generate token
    const token = await User.accessTokens.create(user)

    return response.json({
      message: 'User logged in successfully',
      data: {
        fullname: user.fullName,
        email: user.email,
        createdAt: new Date().getDate(),
      },
      token: token,
    })
  }
}
