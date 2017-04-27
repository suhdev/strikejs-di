"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var R = require("react");
function forEach(obj, iterator) {
    for (var key in obj) {
        iterator(obj[key], key);
    }
}
function inj(store, el) {
    return R.Children.map(el, function (c) {
        var deps = {};
        var chld = null;
        if (c && c.props.children) {
            chld = inj(store, c.props.children);
        }
        if (c && c.props && c.props.deps) {
            forEach(c.props.deps, function (dep, key) {
                deps[dep] = store.get(typeof key === "number" ? dep : key);
            });
        }
        return R.createElement(c.type, __assign({}, c.props, deps), chld);
    });
}
function DI(props) {
    var t = inj(props.injector, props.children);
    return t[0];
}
if (window) {
    window.StrikeJs = window.StrikeJs || {};
    window.StrikeJs.DI = DI;
}
module.exports = DI;
