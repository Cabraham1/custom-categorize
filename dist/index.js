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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorize = void 0;
var categorize = function (users, selectedFilters, groupName, filterFn) {
    // Default filter function if none is provided
    var defaultFilterFn = function (card, category, groupName) {
        var _a, _b;
        switch (groupName) {
            case "status":
                return ((_a = card === null || card === void 0 ? void 0 : card.userStatus) === null || _a === void 0 ? void 0 : _a.status) === category;
            case "country":
                return (card === null || card === void 0 ? void 0 : card.country) === category;
            case "language":
                return (card === null || card === void 0 ? void 0 : card.language) === category;
            case "businessunit":
                return ((_b = card === null || card === void 0 ? void 0 : card.businessUnit) === null || _b === void 0 ? void 0 : _b.name) === category;
            default:
                return false;
        }
    };
    var fn = filterFn || defaultFilterFn;
    return selectedFilters.reduce(function (acc, category) {
        var filteredUsers = users
            .map(function (item) { return (__assign(__assign({}, item), { data: item.data.filter(function (card) { return fn(card, category, groupName); }) })); })
            .filter(function (item) { return item.data.length > 0; });
        var total = filteredUsers.reduce(function (sum, item) { return sum + (item.total || 0); }, 0);
        var count = filteredUsers.reduce(function (sum, item) { return sum + (item.count || 0); }, 0);
        var page = 1;
        var pageCount = Math.max.apply(Math, __spreadArray(__spreadArray([], filteredUsers.map(function (item) { return item.pageCount || 1; }), false), [1], false));
        var data = filteredUsers.map(function (item) { return item.data; }).flat();
        acc[category] = {
            data: data,
            total: total,
            count: count,
            page: page,
            pageCount: pageCount,
        };
        return acc;
    }, {});
};
exports.categorize = categorize;
