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
        var LandingPageAuthSignUp = browser.page.LandingPageAuthSignUp();
        LandingPageAuthSignUp.navigate(LandingPageAuthSignUp['url']);
    },
    'it should render overlay': function (browser) {
        var LandingPageAuthSignUp = browser.page.LandingPageAuthSignUp();
        LandingPageAuthSignUp.waitForElementVisible('@overlay');
        LandingPageAuthSignUp.waitForElementVisible('@emailInput');
        LandingPageAuthSignUp.waitForElementVisible('@passwordInput');
        LandingPageAuthSignUp.waitForElementVisible('@signUpBtn');
        LandingPageAuthSignUp.waitForElementVisible('@signInBtn');
    },
    'it should not show md-errors in sign-up form before filling out form': function (browser) {
        var LandingPageAuthSignUp = browser.page.LandingPageAuthSignUp();
        LandingPageAuthSignUp.expect.element('@emailRequired').not.to.be.visible;
        LandingPageAuthSignUp.expect.element('@emailInvalid').not.to.be.present;
        LandingPageAuthSignUp.expect.element('@passwordRequired').not.to.be.visible;
        LandingPageAuthSignUp.expect.element('@passwordRepeatNotMatch').not.to.be.visible;
    },
    'it should prevent sign up because of constraints and show .md-errors': function (browser) {
        var LandingPageAuthSignUp = browser.page.LandingPageAuthSignUp();
        LandingPageAuthSignUp.click('@signUpBtn');
        LandingPageAuthSignUp.waitForElementVisible('@emailRequired');
        LandingPageAuthSignUp.waitForElementVisible('@passwordRequired');
        LandingPageAuthSignUp.waitForElementVisible('@emailRequired');
        LandingPageAuthSignUp.expect.element('@emailRequired').text.to.equal("E-Mail is required");
        LandingPageAuthSignUp.sendKeys('@emailInput', 'test');
        LandingPageAuthSignUp.waitForElementVisible('@emailInvalid');
        LandingPageAuthSignUp.expect.element('@emailInvalid').text.to.equal("Please enter a valid email!");
        LandingPageAuthSignUp.clearValue('@emailInput');
        LandingPageAuthSignUp.sendKeys('@emailInput', constants_1.CONSTANTS.NEWEMAILUSER);
        LandingPageAuthSignUp.expect.element('@emailInvalid').not.to.be.present;
        LandingPageAuthSignUp.sendKeys('@passwordInput', constants_1.CONSTANTS.NEWPASSWORDUSER);
        LandingPageAuthSignUp.waitForElementVisible('@passwordRepeatNotMatch');
        LandingPageAuthSignUp.expect.element('@passwordRepeatNotMatch').text.to.equal("Passwords do not match!");
        LandingPageAuthSignUp.sendKeys('@passwordRepeatInput', constants_1.CONSTANTS.NEWPASSWORDUSER);
        LandingPageAuthSignUp.expect.element('@passwordRepeatNotMatch').not.to.be.visible;
        LandingPageAuthSignUp.sendKeys('@passwordInput', 'notTheSamePassword');
        LandingPageAuthSignUp.waitForElementVisible('@passwordRepeatNotMatch');
    },
    'it should fail sign-up because email is already registered': function (browser) { return __awaiter(void 0, void 0, void 0, function () {
        var LandingPageAuthSignUp;
        return __generator(this, function (_a) {
            LandingPageAuthSignUp = browser.page.LandingPageAuthSignUp();
            LandingPageAuthSignUp.sendKeys('@emailInput', constants_1.CONSTANTS.VALIDEMAIL);
            LandingPageAuthSignUp.sendKeys('@passwordInput', constants_1.CONSTANTS.VALIDPASSWORD);
            LandingPageAuthSignUp.sendKeys('@passwordRepeatInput', constants_1.CONSTANTS.VALIDPASSWORD);
            LandingPageAuthSignUp.click('@signUpBtn');
            LandingPageAuthSignUp.waitForElementVisible('@errorMsg');
            LandingPageAuthSignUp.expect.element('@errorMsg').text.to.equal("Email is already registered!");
            browser.end();
            return [2 /*return*/];
        });
    }); },
    'it should successfully create a new user': function (browser) { return __awaiter(void 0, void 0, void 0, function () {
        var LandingPageAuthSignUp, App;
        return __generator(this, function (_a) {
            LandingPageAuthSignUp = browser.page.LandingPageAuthSignUp();
            LandingPageAuthSignUp.sendKeys('@emailInput', constants_1.CONSTANTS.NEWEMAILUSER);
            LandingPageAuthSignUp.sendKeys('@passwordInput', constants_1.CONSTANTS.NEWPASSWORDUSER);
            LandingPageAuthSignUp.sendKeys('@passwordRepeatInput', constants_1.CONSTANTS.NEWPASSWORDUSER);
            LandingPageAuthSignUp.click('@signUpBtn');
            App = browser.page.App();
            App.waitForElementVisible('@container');
            browser.end();
            return [2 /*return*/];
        });
    }); },
    'it should navigate to sign-in': function (browser) { return __awaiter(void 0, void 0, void 0, function () {
        var LandingPageAuthSignUp, LandingPageAuthSignIn;
        return __generator(this, function (_a) {
            LandingPageAuthSignUp = browser.page.LandingPageAuthSignUp();
            LandingPageAuthSignUp.click('@signInBtn');
            LandingPageAuthSignIn = browser.page.LandingPageAuthSignIn();
            LandingPageAuthSignIn.waitForElementVisible('@container');
            browser.end();
            return [2 /*return*/];
        });
    }); }
};
