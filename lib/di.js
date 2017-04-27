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
    return R.Children.map(el, function (child) {
        var deps = {};
        var children = null;
        if (child && child.props.children) {
            children = inj(store, child.props.children);
        }
        if (child && child.props && child.props.deps) {
            forEach(child.props.deps, function (dep, key) {
                deps[dep] = store.get(typeof key === "number" ? dep : key);
            });
        }
        return R.createElement(child.type, __assign({}, child.props, deps), children);
    });
}
function DI(props) {
    var t = inj(props.injector, props.children);
    return t[0];
}
module.exports = DI;
