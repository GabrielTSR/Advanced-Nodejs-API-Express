import { makeFacebookAuthenticationService } from '@/main/factories/services'
import { FacebookLoginController } from '@/application/controllers'

export const makeFacebookLoginController = (): FacebookLoginController => {
    const fbAuthService = makeFacebookAuthenticationService()
    return new FacebookLoginController(fbAuthService)
}
