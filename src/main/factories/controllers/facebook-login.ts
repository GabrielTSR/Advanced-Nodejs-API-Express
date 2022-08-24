import { makeFacebookAuthenticationUseCase } from '@/main/factories/use-cases'
import { FacebookLoginController } from '@/application/controllers'

export const makeFacebookLoginController = (): FacebookLoginController => {
    const fbAuthService = makeFacebookAuthenticationUseCase()
    return new FacebookLoginController(fbAuthService)
}
