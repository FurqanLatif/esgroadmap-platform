"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@t3-oss";
exports.ids = ["vendor-chunks/@t3-oss"];
exports.modules = {

/***/ "(ssr)/./node_modules/@t3-oss/env-core/dist/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/@t3-oss/env-core/dist/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createEnv: () => (/* binding */ createEnv)\n/* harmony export */ });\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zod */ \"(ssr)/./node_modules/zod/lib/index.mjs\");\n\n\nfunction createEnv(opts) {\n    const runtimeEnv = opts.runtimeEnvStrict ?? opts.runtimeEnv ?? process.env;\n    const emptyStringAsUndefined = opts.emptyStringAsUndefined ?? false;\n    if (emptyStringAsUndefined) {\n        for (const [key, value] of Object.entries(runtimeEnv)){\n            if (value === \"\") {\n                delete runtimeEnv[key];\n            }\n        }\n    }\n    const skip = !!opts.skipValidation;\n    // biome-ignore lint/suspicious/noExplicitAny: <explanation>\n    if (skip) return runtimeEnv;\n    const _client = typeof opts.client === \"object\" ? opts.client : {};\n    const _server = typeof opts.server === \"object\" ? opts.server : {};\n    const _shared = typeof opts.shared === \"object\" ? opts.shared : {};\n    const client = (0,zod__WEBPACK_IMPORTED_MODULE_0__.object)(_client);\n    const server = (0,zod__WEBPACK_IMPORTED_MODULE_0__.object)(_server);\n    const shared = (0,zod__WEBPACK_IMPORTED_MODULE_0__.object)(_shared);\n    const isServer = opts.isServer ?? (typeof window === \"undefined\" || \"Deno\" in window);\n    const allClient = client.merge(shared);\n    const allServer = server.merge(shared).merge(client);\n    const parsed = isServer ? allServer.safeParse(runtimeEnv) // on server we can validate all env vars\n     : allClient.safeParse(runtimeEnv); // on client we can only validate the ones that are exposed\n    const onValidationError = opts.onValidationError ?? ((error)=>{\n        console.error(\"❌ Invalid environment variables:\", error.flatten().fieldErrors);\n        throw new Error(\"Invalid environment variables\");\n    });\n    const onInvalidAccess = opts.onInvalidAccess ?? ((_variable)=>{\n        throw new Error(\"❌ Attempted to access a server-side environment variable on the client\");\n    });\n    if (parsed.success === false) {\n        return onValidationError(parsed.error);\n    }\n    const isServerAccess = (prop)=>{\n        if (!opts.clientPrefix) return true;\n        return !prop.startsWith(opts.clientPrefix) && !(prop in shared.shape);\n    };\n    const isValidServerAccess = (prop)=>{\n        return isServer || !isServerAccess(prop);\n    };\n    const ignoreProp = (prop)=>{\n        return prop === \"__esModule\" || prop === \"$$typeof\";\n    };\n    const extendedObj = (opts.extends ?? []).reduce((acc, curr)=>{\n        return Object.assign(acc, curr);\n    }, {});\n    const fullObj = Object.assign(parsed.data, extendedObj);\n    const env = new Proxy(fullObj, {\n        get (target, prop) {\n            if (typeof prop !== \"string\") return undefined;\n            if (ignoreProp(prop)) return undefined;\n            if (!isValidServerAccess(prop)) return onInvalidAccess(prop);\n            return Reflect.get(target, prop);\n        }\n    });\n    // biome-ignore lint/suspicious/noExplicitAny: <explanation>\n    return env;\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvQHQzLW9zcy9lbnYtY29yZS9kaXN0L2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQTZCOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwyQ0FBTTtBQUN6QixtQkFBbUIsMkNBQU07QUFDekIsbUJBQW1CLDJDQUFNO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssSUFBSTtBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVxQiIsInNvdXJjZXMiOlsid2VicGFjazovL2VzZ3JvYWRtYXAtYWRtaW4vLi9ub2RlX21vZHVsZXMvQHQzLW9zcy9lbnYtY29yZS9kaXN0L2luZGV4LmpzPzQ1MTgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgb2JqZWN0IH0gZnJvbSAnem9kJztcblxuZnVuY3Rpb24gY3JlYXRlRW52KG9wdHMpIHtcbiAgICBjb25zdCBydW50aW1lRW52ID0gb3B0cy5ydW50aW1lRW52U3RyaWN0ID8/IG9wdHMucnVudGltZUVudiA/PyBwcm9jZXNzLmVudjtcbiAgICBjb25zdCBlbXB0eVN0cmluZ0FzVW5kZWZpbmVkID0gb3B0cy5lbXB0eVN0cmluZ0FzVW5kZWZpbmVkID8/IGZhbHNlO1xuICAgIGlmIChlbXB0eVN0cmluZ0FzVW5kZWZpbmVkKSB7XG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHJ1bnRpbWVFbnYpKXtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBydW50aW1lRW52W2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgc2tpcCA9ICEhb3B0cy5za2lwVmFsaWRhdGlvbjtcbiAgICAvLyBiaW9tZS1pZ25vcmUgbGludC9zdXNwaWNpb3VzL25vRXhwbGljaXRBbnk6IDxleHBsYW5hdGlvbj5cbiAgICBpZiAoc2tpcCkgcmV0dXJuIHJ1bnRpbWVFbnY7XG4gICAgY29uc3QgX2NsaWVudCA9IHR5cGVvZiBvcHRzLmNsaWVudCA9PT0gXCJvYmplY3RcIiA/IG9wdHMuY2xpZW50IDoge307XG4gICAgY29uc3QgX3NlcnZlciA9IHR5cGVvZiBvcHRzLnNlcnZlciA9PT0gXCJvYmplY3RcIiA/IG9wdHMuc2VydmVyIDoge307XG4gICAgY29uc3QgX3NoYXJlZCA9IHR5cGVvZiBvcHRzLnNoYXJlZCA9PT0gXCJvYmplY3RcIiA/IG9wdHMuc2hhcmVkIDoge307XG4gICAgY29uc3QgY2xpZW50ID0gb2JqZWN0KF9jbGllbnQpO1xuICAgIGNvbnN0IHNlcnZlciA9IG9iamVjdChfc2VydmVyKTtcbiAgICBjb25zdCBzaGFyZWQgPSBvYmplY3QoX3NoYXJlZCk7XG4gICAgY29uc3QgaXNTZXJ2ZXIgPSBvcHRzLmlzU2VydmVyID8/ICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiIHx8IFwiRGVub1wiIGluIHdpbmRvdyk7XG4gICAgY29uc3QgYWxsQ2xpZW50ID0gY2xpZW50Lm1lcmdlKHNoYXJlZCk7XG4gICAgY29uc3QgYWxsU2VydmVyID0gc2VydmVyLm1lcmdlKHNoYXJlZCkubWVyZ2UoY2xpZW50KTtcbiAgICBjb25zdCBwYXJzZWQgPSBpc1NlcnZlciA/IGFsbFNlcnZlci5zYWZlUGFyc2UocnVudGltZUVudikgLy8gb24gc2VydmVyIHdlIGNhbiB2YWxpZGF0ZSBhbGwgZW52IHZhcnNcbiAgICAgOiBhbGxDbGllbnQuc2FmZVBhcnNlKHJ1bnRpbWVFbnYpOyAvLyBvbiBjbGllbnQgd2UgY2FuIG9ubHkgdmFsaWRhdGUgdGhlIG9uZXMgdGhhdCBhcmUgZXhwb3NlZFxuICAgIGNvbnN0IG9uVmFsaWRhdGlvbkVycm9yID0gb3B0cy5vblZhbGlkYXRpb25FcnJvciA/PyAoKGVycm9yKT0+e1xuICAgICAgICBjb25zb2xlLmVycm9yKFwi4p2MIEludmFsaWQgZW52aXJvbm1lbnQgdmFyaWFibGVzOlwiLCBlcnJvci5mbGF0dGVuKCkuZmllbGRFcnJvcnMpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGVudmlyb25tZW50IHZhcmlhYmxlc1wiKTtcbiAgICB9KTtcbiAgICBjb25zdCBvbkludmFsaWRBY2Nlc3MgPSBvcHRzLm9uSW52YWxpZEFjY2VzcyA/PyAoKF92YXJpYWJsZSk9PntcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwi4p2MIEF0dGVtcHRlZCB0byBhY2Nlc3MgYSBzZXJ2ZXItc2lkZSBlbnZpcm9ubWVudCB2YXJpYWJsZSBvbiB0aGUgY2xpZW50XCIpO1xuICAgIH0pO1xuICAgIGlmIChwYXJzZWQuc3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIG9uVmFsaWRhdGlvbkVycm9yKHBhcnNlZC5lcnJvcik7XG4gICAgfVxuICAgIGNvbnN0IGlzU2VydmVyQWNjZXNzID0gKHByb3ApPT57XG4gICAgICAgIGlmICghb3B0cy5jbGllbnRQcmVmaXgpIHJldHVybiB0cnVlO1xuICAgICAgICByZXR1cm4gIXByb3Auc3RhcnRzV2l0aChvcHRzLmNsaWVudFByZWZpeCkgJiYgIShwcm9wIGluIHNoYXJlZC5zaGFwZSk7XG4gICAgfTtcbiAgICBjb25zdCBpc1ZhbGlkU2VydmVyQWNjZXNzID0gKHByb3ApPT57XG4gICAgICAgIHJldHVybiBpc1NlcnZlciB8fCAhaXNTZXJ2ZXJBY2Nlc3MocHJvcCk7XG4gICAgfTtcbiAgICBjb25zdCBpZ25vcmVQcm9wID0gKHByb3ApPT57XG4gICAgICAgIHJldHVybiBwcm9wID09PSBcIl9fZXNNb2R1bGVcIiB8fCBwcm9wID09PSBcIiQkdHlwZW9mXCI7XG4gICAgfTtcbiAgICBjb25zdCBleHRlbmRlZE9iaiA9IChvcHRzLmV4dGVuZHMgPz8gW10pLnJlZHVjZSgoYWNjLCBjdXJyKT0+e1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihhY2MsIGN1cnIpO1xuICAgIH0sIHt9KTtcbiAgICBjb25zdCBmdWxsT2JqID0gT2JqZWN0LmFzc2lnbihwYXJzZWQuZGF0YSwgZXh0ZW5kZWRPYmopO1xuICAgIGNvbnN0IGVudiA9IG5ldyBQcm94eShmdWxsT2JqLCB7XG4gICAgICAgIGdldCAodGFyZ2V0LCBwcm9wKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHByb3AgIT09IFwic3RyaW5nXCIpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAoaWdub3JlUHJvcChwcm9wKSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmICghaXNWYWxpZFNlcnZlckFjY2Vzcyhwcm9wKSkgcmV0dXJuIG9uSW52YWxpZEFjY2Vzcyhwcm9wKTtcbiAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmdldCh0YXJnZXQsIHByb3ApO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gYmlvbWUtaWdub3JlIGxpbnQvc3VzcGljaW91cy9ub0V4cGxpY2l0QW55OiA8ZXhwbGFuYXRpb24+XG4gICAgcmV0dXJuIGVudjtcbn1cblxuZXhwb3J0IHsgY3JlYXRlRW52IH07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/@t3-oss/env-core/dist/index.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/@t3-oss/env-nextjs/dist/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/@t3-oss/env-nextjs/dist/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createEnv: () => (/* binding */ createEnv)\n/* harmony export */ });\n/* harmony import */ var _t3_oss_env_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @t3-oss/env-core */ \"(ssr)/./node_modules/@t3-oss/env-core/dist/index.js\");\n\n\nconst CLIENT_PREFIX = \"NEXT_PUBLIC_\";\nfunction createEnv(opts) {\n    const client = typeof opts.client === \"object\" ? opts.client : {};\n    const server = typeof opts.server === \"object\" ? opts.server : {};\n    const shared = opts.shared;\n    const runtimeEnv = opts.runtimeEnv ? opts.runtimeEnv : {\n        ...process.env,\n        ...opts.experimental__runtimeEnv\n    };\n    return (0,_t3_oss_env_core__WEBPACK_IMPORTED_MODULE_0__.createEnv)({\n        ...opts,\n        shared,\n        client,\n        server,\n        clientPrefix: CLIENT_PREFIX,\n        runtimeEnv\n    });\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvQHQzLW9zcy9lbnYtbmV4dGpzL2Rpc3QvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBNEQ7O0FBRTVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsMkRBQVc7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVxQiIsInNvdXJjZXMiOlsid2VicGFjazovL2VzZ3JvYWRtYXAtYWRtaW4vLi9ub2RlX21vZHVsZXMvQHQzLW9zcy9lbnYtbmV4dGpzL2Rpc3QvaW5kZXguanM/Mzc0NiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVFbnYgYXMgY3JlYXRlRW52JDEgfSBmcm9tICdAdDMtb3NzL2Vudi1jb3JlJztcblxuY29uc3QgQ0xJRU5UX1BSRUZJWCA9IFwiTkVYVF9QVUJMSUNfXCI7XG5mdW5jdGlvbiBjcmVhdGVFbnYob3B0cykge1xuICAgIGNvbnN0IGNsaWVudCA9IHR5cGVvZiBvcHRzLmNsaWVudCA9PT0gXCJvYmplY3RcIiA/IG9wdHMuY2xpZW50IDoge307XG4gICAgY29uc3Qgc2VydmVyID0gdHlwZW9mIG9wdHMuc2VydmVyID09PSBcIm9iamVjdFwiID8gb3B0cy5zZXJ2ZXIgOiB7fTtcbiAgICBjb25zdCBzaGFyZWQgPSBvcHRzLnNoYXJlZDtcbiAgICBjb25zdCBydW50aW1lRW52ID0gb3B0cy5ydW50aW1lRW52ID8gb3B0cy5ydW50aW1lRW52IDoge1xuICAgICAgICAuLi5wcm9jZXNzLmVudixcbiAgICAgICAgLi4ub3B0cy5leHBlcmltZW50YWxfX3J1bnRpbWVFbnZcbiAgICB9O1xuICAgIHJldHVybiBjcmVhdGVFbnYkMSh7XG4gICAgICAgIC4uLm9wdHMsXG4gICAgICAgIHNoYXJlZCxcbiAgICAgICAgY2xpZW50LFxuICAgICAgICBzZXJ2ZXIsXG4gICAgICAgIGNsaWVudFByZWZpeDogQ0xJRU5UX1BSRUZJWCxcbiAgICAgICAgcnVudGltZUVudlxuICAgIH0pO1xufVxuXG5leHBvcnQgeyBjcmVhdGVFbnYgfTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/@t3-oss/env-nextjs/dist/index.js\n");

/***/ })

};
;