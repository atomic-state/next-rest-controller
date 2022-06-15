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
function Controller(path, paths) {
    if (paths === void 0) { paths = {}; }
    return function (req, res) {
        var handled = false;
        var _a = req.url, url = _a === void 0 ? "" : _a;
        var urlWithourQueryParams = url.split("?")[0];
        var urlParts = urlWithourQueryParams.split("/");
        var handlePathUrl = "/api" + path;
        var _loop_1 = function (path_1) {
            var _b = path_1.split(" "), method = _b[0], handleUrl = _b[1];
            var $handleUrl = handlePathUrl + handleUrl.split("?")[0];
            var handleParts = $handleUrl.split("/");
            var finalHandler = [];
            var finalQuery = {};
            handleParts.forEach(function (handlePart, i) {
                if (handlePart.startsWith("[") && handlePart.endsWith("]")) {
                    var withoutBrackets = handlePart.replace(/\[|\]/g, "");
                    finalQuery[withoutBrackets] = urlParts[i];
                    finalHandler.push(urlParts[i]);
                }
                else {
                    finalHandler.push(handlePart);
                }
            });
            if (finalHandler.join("/") === urlParts.join("/") && !handled) {
                var withQ = __assign(__assign({}, req.query), finalQuery);
                if (req.method === method) {
                    req.query = withQ;
                    paths[path_1](req, res);
                    handled = true;
                }
                else {
                    if (!("".concat(req.method, " ").concat(handleUrl) in paths)) {
                        res.status(405);
                        res.send("cannot ".concat(req.method, " ").concat(finalHandler.join("/")));
                    }
                }
            }
            else {
                res.status(404);
                res.send("Not found");
            }
        };
        for (var path_1 in paths) {
            _loop_1(path_1);
        }
    };
}
exports.Controller = Controller;
