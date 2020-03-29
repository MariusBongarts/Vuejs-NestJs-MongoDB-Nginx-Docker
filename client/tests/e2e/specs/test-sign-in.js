"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var constants_1 = require("./constants/constants");
module.exports = {
    beforeEach: function (browser) {
        browser.init();
        var LandingPageAuthSignIn = browser.page.LandingPageAuthSignIn();
        LandingPageAuthSignIn.navigate(LandingPageAuthSignIn['url']);
    },
    'it should render overlay': function (browser) {
        var LandingPageAuthSignIn = browser.page.LandingPageAuthSignIn();
        LandingPageAuthSignIn.waitForElementVisible('@overlay');
    },
    'it should sign in successfully': function (browser) { return __awaiter(void 0, void 0, void 0, function () {
        var App;
        return __generator(this, function (_a) {
            browser.page.LandingPageAuthSignIn().signIn(constants_1.CONSTANTS.VALIDEMAIL, constants_1.CONSTANTS.VALIDPASSWORD);
            App = browser.page.App();
            App.waitForElementVisible('@container');
            browser.end();
            return [2 /*return*/];
        });
    }); },
    'it should fail sign in because of invalid password': function (browser) { return __awaiter(void 0, void 0, void 0, function () {
        var LandingPageAuthSignIn;
        return __generator(this, function (_a) {
            LandingPageAuthSignIn = browser.page.LandingPageAuthSignIn();
            browser.page.LandingPageAuthSignIn().signIn(constants_1.CONSTANTS.VALIDEMAIL, constants_1.CONSTANTS.INVALIDPASSWORD);
            LandingPageAuthSignIn.waitForElementVisible('@errorMsg');
            LandingPageAuthSignIn.expect.element('@errorMsg').text.to.equal("Invalid email or password!");
            browser.end();
            return [2 /*return*/];
        });
    }); },
    'it should fail sign in because of invalid email': function (browser) { return __awaiter(void 0, void 0, void 0, function () {
        var LandingPageAuthSignIn;
        return __generator(this, function (_a) {
            LandingPageAuthSignIn = browser.page.LandingPageAuthSignIn();
            browser.page.LandingPageAuthSignIn().signIn(constants_1.CONSTANTS.INVALIDEMAIL, constants_1.CONSTANTS.INVALIDPASSWORD);
            LandingPageAuthSignIn.waitForElementVisible('@errorMsg');
            LandingPageAuthSignIn.expect.element('@errorMsg').text.to.equal("Invalid email or password!");
            browser.end();
            return [2 /*return*/];
        });
    }); },
    'it should not show md-errors in sign in form before filling out form': function (browser) {
        var LandingPageAuthSignIn = browser.page.LandingPageAuthSignIn();
        LandingPageAuthSignIn.expect.element('@emailRequired').not.to.be.visible;
        LandingPageAuthSignIn.expect.element('@emailInvalid').not.to.be.present;
        LandingPageAuthSignIn.expect.element('@passwordRequired').not.to.be.visible;
    },
    'it should supress sign in because of constraints and show .md-errors': function (browser) { return __awaiter(void 0, void 0, void 0, function () {
        var LandingPageAuthSignIn;
        return __generator(this, function (_a) {
            LandingPageAuthSignIn = browser.page.LandingPageAuthSignIn();
            browser.page.LandingPageAuthSignIn().signIn('', '');
            LandingPageAuthSignIn.waitForElementVisible('@emailRequired');
            LandingPageAuthSignIn.waitForElementVisible('@passwordRequired');
            LandingPageAuthSignIn.expect.element('@emailRequired').text.to.equal("E-Mail is required");
            LandingPageAuthSignIn.expect.element('@passwordRequired').text.to.equal("Password is required");
            LandingPageAuthSignIn.sendKeys('@emailInput', 'invalidEmail@web.d');
            LandingPageAuthSignIn.expect.element('@emailInvalid').text.to.equal("Please enter a valid email!");
            LandingPageAuthSignIn.clearValue('@emailInput');
            LandingPageAuthSignIn.sendKeys('@emailInput', constants_1.CONSTANTS.VALIDEMAIL);
            LandingPageAuthSignIn.sendKeys('@passwordInput', constants_1.CONSTANTS.VALIDPASSWORD);
            LandingPageAuthSignIn.expect.element('@emailRequired').not.to.be.present;
            LandingPageAuthSignIn.expect.element('@emailInvalid').not.to.be.present;
            LandingPageAuthSignIn.expect.element('@passwordRequired').not.to.be.present;
            browser.end();
            return [2 /*return*/];
        });
    }); },
    'it should navigate to sign-up': function (browser) { return __awaiter(void 0, void 0, void 0, function () {
        var LandingPageAuthSignIn, LandingPageAuthSignUp;
        return __generator(this, function (_a) {
            LandingPageAuthSignIn = browser.page.LandingPageAuthSignIn();
            LandingPageAuthSignIn.click('@signUpBtn');
            LandingPageAuthSignUp = browser.page.LandingPageAuthSignUp();
            LandingPageAuthSignUp.waitForElementVisible('@container');
            browser.end();
            return [2 /*return*/];
        });
    }); }
};
