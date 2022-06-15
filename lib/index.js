"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
function Controller(path, paths) {
    var _this = this;
    if (paths === void 0) { paths = {}; }
    return function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var handled, _a, url, urlWithourQueryParams, urlParts, handlePathUrl, hasHandlers, _loop_1, path_1, state_1;
        return __generator(this, function (_b) {
            handled = false;
            _a = req.url, url = _a === void 0 ? "" : _a;
            urlWithourQueryParams = url.split("?")[0];
            urlParts = urlWithourQueryParams.split("/");
            handlePathUrl = "/api" + path;
            hasHandlers = false;
            try {
                _loop_1 = function (path_1) {
                    var _c = path_1.split(" "), method = _c[0], handleUrl = _c[1];
                    var $handleUrl = handlePathUrl + handleUrl.split("?")[0];
                    var handleParts = $handleUrl.split("/");
                    var finalHandler = [];
                    var finalQuery = {};
                    handleParts.forEach(function (handlePart, i) {
                        if ((handlePart.startsWith("[") && handlePart.endsWith("]")) ||
                            handlePart.startsWith(":")) {
                            hasHandlers = true;
                            var withoutBrackets = handlePart.replace(/\[|\]|\:/g, "");
                            finalQuery[withoutBrackets] = urlParts[i];
                            finalHandler.push(urlParts[i]);
                        }
                        else {
                            finalHandler.push(handlePart);
                        }
                    });
                    if (finalHandler.join("/") === urlParts.join("/") && !handled) {
                        hasHandlers = true;
                        if (req.method === method) {
                            var withQ = __assign(__assign({}, req.query), finalQuery);
                            req.query = withQ;
                            paths[path_1](req, res);
                            handled = true;
                            return "break";
                        }
                    }
                };
                for (path_1 in paths) {
                    state_1 = _loop_1(path_1);
                    if (state_1 === "break")
                        break;
                }
            }
            catch (err) {
            }
            finally {
                if (!handled) {
                    if (hasHandlers) {
                        res.status(405);
                        res.send("cannot ".concat(req.method, " ").concat(req.url));
                    }
                    else {
                        res.status(404);
                        res.send("not found");
                    }
                }
            }
            return [2 /*return*/];
        });
    }); };
}
exports.Controller = Controller;
