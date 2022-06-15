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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
function Controller(paths) {
    if (paths === void 0) { paths = {}; }
    return function (req, res) {
        var _a = req.url, url = _a === void 0 ? "" : _a;
        var urlWithourQueryParams = url.split("?")[0];
        var urlParts = urlWithourQueryParams.split("/");
        var handlePathUrl = "/api/" + __dirname.split("/api/").at(-1);
        var _loop_1 = function (path) {
            var _b = path.split(" "), method = _b[0], handleUrl = _b[1];
            var $handleUrl = handlePathUrl + handleUrl.split("?")[0];
            var handleParts = $handleUrl.split("/");
            if (handleParts.length === urlParts.length) {
                var finalHandler_1 = [];
                var finalQuery_1 = {};
                handleParts.forEach(function (handlePart, i) {
                    if (handlePart.startsWith("[") && handlePart.endsWith("]")) {
                        var withoutBrackets = handlePart.replace(/\[|\]/g, "");
                        finalQuery_1[withoutBrackets] = urlParts[i];
                        finalHandler_1.push(urlParts[i]);
                    }
                    else {
                        finalHandler_1.push(handlePart);
                    }
                });
                if (finalHandler_1.join("/") === urlParts.join("/")) {
                    var withQ = __assign(__assign({}, req.query), finalQuery_1);
                    if (req.method === method) {
                        req.query = withQ;
                        paths[path](req, res);
                    }
                    else {
                        res.status(405);
                        res.send("Cannot ".concat(req.method, " ").concat(url));
                    }
                }
                return "break";
            }
            else {
                res.status(404);
                res.send("Not found");
                return "break";
            }
        };
        for (var path in paths) {
            var state_1 = _loop_1(path);
            if (state_1 === "break")
                break;
        }
    };
}
exports.Controller = Controller;
