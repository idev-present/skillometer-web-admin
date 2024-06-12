import SDK from 'casdoor-js-sdk'

const config = {
    serverUrl: import.meta.env.VITE_IAM_HOSTNAME,
    clientId: import.meta.env.VITE_IAM_CLIENT_ID,
    organizationName: import.meta.env.VITE_IAM_ORGANIZATION_ID,
    appName: import.meta.env.VITE_IAM_APPLICATION_ID,
    redirectPath: import.meta.env.VITE_IAM_REDIRECT_URI,
    signinPath: import.meta.env.VITE_IAM_SIGNIN_URI,
}

class IamFacade {
    constructor() {
        this.config = config;
        this.sdk = new SDK(this.config)
        console.log(this.config)
    }
}

const iamService = new IamFacade()

export default iamService;
