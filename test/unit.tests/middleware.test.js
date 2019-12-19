const auth = require("../../middlewares/auth");

const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.gerror = jest.fn().mockReturnValue(res);
    return res;
}
const next = jest.fn();

describe("Authentication Middleware", function() {
    beforeEach(()=> {
        jest.clearAllMocks();
    })
    test("Login middleware with session and passport object", async function() {
        let request = {session: {passport: {user: 6}}};
        await auth.loggedin(request, mockRes(), next);
        
        expect(next).toBeCalledTimes(1);
    });
    test("Login middleware with no wrong passport object in session object", async function() {
        let request = {session: {notpassport: 3}};

        await auth.loggedin(request, mockRes(), next);

        expect(next).toBeCalledTimes(0);
    });
});