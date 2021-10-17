import rewire from "rewire"
const registerServiceWorker = rewire("./registerServiceWorker")
const register = registerServiceWorker.__get__("register")
const registerValidSW = registerServiceWorker.__get__("registerValidSW")
const checkValidServiceWorker = registerServiceWorker.__get__("checkValidServiceWorker")
// @ponicode
describe("register", () => {
    test("0", () => {
        let callFunction: any = () => {
            register()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("registerValidSW", () => {
    test("0", () => {
        let callFunction: any = () => {
            registerValidSW("https://accounts.google.com/o/oauth2/revoke?token=%s")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            registerValidSW("https://croplands.org/app/a/confirm?t=")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            registerValidSW("https://api.telegram.org/")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            registerValidSW("www.google.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            registerValidSW("http://base.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            registerValidSW("")
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("checkValidServiceWorker", () => {
    test("0", () => {
        let callFunction: any = () => {
            checkValidServiceWorker("https://api.telegram.org/")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            checkValidServiceWorker("https://croplands.org/app/a/confirm?t=")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            checkValidServiceWorker("http://example.com/showcalendar.html?token=CKF50YzIHxCTKMAg")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            checkValidServiceWorker("Www.GooGle.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            checkValidServiceWorker("http://base.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            checkValidServiceWorker("")
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("registerServiceWorker.unregister", () => {
    test("0", () => {
        let callFunction: any = () => {
            registerServiceWorker.unregister()
        }
    
        expect(callFunction).not.toThrow()
    })
})
