import vine from '@vinejs/vine'

/**
 * Creating a new validator for registering user
 *
 *
 */
export const registerValidator = vine.compile(
  vine.object({
    fullname: vine.string().minLength(3).maxLength(100),
    email: vine.string().email(),
    password: vine.string().minLength(8).maxLength(20),
  })
)

/**
 * Creating a new validator for Login user
 * 
 */
export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(8).maxLength(20),

  })
)
