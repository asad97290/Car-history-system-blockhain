module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);\n\nvar _jsxFileName = \"/home/asadullah/BasicNetwork-2.0/client/pages/index.js\";\n\n\n\nconst app = () => {\n  const url = \"http://localhost:4000/channels/mychannel/chaincodes/fabcar?fcn=queryAllCars\";\n  let pk = null;\n  const token = \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDQyNTE5MTAsInVzZXJuYW1lIjoic2hhIiwib3JnTmFtZSI6Ik9yZzEiLCJpYXQiOjE2MDQyMTU5MTB9.M7mM-L1f_1aHtm2AUxCOE22MYcVlr1tR0sRSXI7ISn0\";\n  let conf = {\n    headers: {\n      Authorization: `Bearer ${token}`,\n      \"Content-Type\": \"application/json\"\n    }\n  }; // const createPostData = async (pk, data) => {\n  // \treturn {\n  // \t\tfcn: \"CreateSampleData\",\n  // \t\tpeers: [\"peer0.org1.example.com\", \"peer0.org2.example.com\"],\n  // \t\tchaincodeName: \"test_cc\",\n  // \t\tchannelName: \"mychannel\",\n  // \t\targs: [JSON.stringify(data), pk]\n  // \t}\n  // }\n  // const postFarmerData = async (pk) => {\n  // \tconsole.log(pk)\n  // \tlet data = {\n  // \t\tcreated_at: (new Date).getTime(),\n  // \t\tname: 'Ramlal Oberoi',\n  // \t\tweight: 1000\n  // \t}\n  // \tlet postData = await createPostData(pk.toString(), data)\n  // \t// console.log(\"before AXIOS call\", postData)\n  // \treturn axios.post(url, postData, conf\n  // \t).then(function (response) { console.log(`${pk.toString()} => `, response.data); }\n  // \t).catch(function (error) { console.log(error); });\n  // };\n\n  const fetch = async () => {\n    try {\n      const output = await axios__WEBPACK_IMPORTED_MODULE_2___default.a.get(url, conf);\n      console.log(output.data.result[4].Record.owner);\n    } catch (err) {\n      throw err;\n    }\n  };\n\n  Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useEffect\"])(() => {\n    fetch();\n  }, []);\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {}, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 54,\n    columnNumber: 8\n  }, undefined);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (app);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9pbmRleC5qcz80NGQ4Il0sIm5hbWVzIjpbImFwcCIsInVybCIsInBrIiwidG9rZW4iLCJjb25mIiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJmZXRjaCIsIm91dHB1dCIsImF4aW9zIiwiZ2V0IiwiY29uc29sZSIsImxvZyIsImRhdGEiLCJyZXN1bHQiLCJSZWNvcmQiLCJvd25lciIsImVyciIsInVzZUVmZmVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTs7QUFFQSxNQUFNQSxHQUFHLEdBQUcsTUFBSTtBQUVoQixRQUFNQyxHQUFHLEdBQUcsNkVBQVo7QUFDQSxNQUFJQyxFQUFFLEdBQUcsSUFBVDtBQUNBLFFBQU1DLEtBQUssR0FBRywrS0FBZDtBQUNBLE1BQUlDLElBQUksR0FBRztBQUNWQyxXQUFPLEVBQUU7QUFDUkMsbUJBQWEsRUFBRyxVQUFTSCxLQUFNLEVBRHZCO0FBRVIsc0JBQWdCO0FBRlI7QUFEQyxHQUFYLENBTGdCLENBYWhCO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBOztBQUVBLFFBQU1JLEtBQUssR0FBRyxZQUFXO0FBQ3JCLFFBQUc7QUFDSCxZQUFNQyxNQUFNLEdBQUcsTUFBTUMsNENBQUssQ0FBQ0MsR0FBTixDQUFVVCxHQUFWLEVBQWNHLElBQWQsQ0FBckI7QUFDQU8sYUFBTyxDQUFDQyxHQUFSLENBQVlKLE1BQU0sQ0FBQ0ssSUFBUCxDQUFZQyxNQUFaLENBQW1CLENBQW5CLEVBQXNCQyxNQUF0QixDQUE2QkMsS0FBekM7QUFDQyxLQUhELENBR0MsT0FBTUMsR0FBTixFQUFVO0FBQ1AsWUFBTUEsR0FBTjtBQUNIO0FBQ0osR0FQRDs7QUFRQUMseURBQVMsQ0FBQyxNQUFNO0FBQ1pYLFNBQUs7QUFDTixHQUZNLEVBRUosRUFGSSxDQUFUO0FBR0Esc0JBQU87QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFQO0FBQ0MsQ0FuREQ7O0FBcURlUCxrRUFBZiIsImZpbGUiOiIuL3BhZ2VzL2luZGV4LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHt1c2VFZmZlY3R9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnXG5cbmNvbnN0IGFwcCA9ICgpPT57XG5cbmNvbnN0IHVybCA9IFwiaHR0cDovL2xvY2FsaG9zdDo0MDAwL2NoYW5uZWxzL215Y2hhbm5lbC9jaGFpbmNvZGVzL2ZhYmNhcj9mY249cXVlcnlBbGxDYXJzXCI7XG5sZXQgcGsgPSBudWxsO1xuY29uc3QgdG9rZW4gPSBcImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpsZUhBaU9qRTJNRFF5TlRFNU1UQXNJblZ6WlhKdVlXMWxJam9pYzJoaElpd2liM0puVG1GdFpTSTZJazl5WnpFaUxDSnBZWFFpT2pFMk1EUXlNVFU1TVRCOS5NN21NLUwxZl8xYUh0bTJBVXhDT0UyMk1ZY1ZscjF0UjBzUlNYSTdJU24wXCJcbmxldCBjb25mID0ge1xuXHRoZWFkZXJzOiB7XG5cdFx0QXV0aG9yaXphdGlvbjogYEJlYXJlciAke3Rva2VufWAsXG5cdFx0XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcblx0fVxufTtcblxuXG4vLyBjb25zdCBjcmVhdGVQb3N0RGF0YSA9IGFzeW5jIChwaywgZGF0YSkgPT4ge1xuXHRcbi8vIFx0cmV0dXJuIHtcbi8vIFx0XHRmY246IFwiQ3JlYXRlU2FtcGxlRGF0YVwiLFxuLy8gXHRcdHBlZXJzOiBbXCJwZWVyMC5vcmcxLmV4YW1wbGUuY29tXCIsIFwicGVlcjAub3JnMi5leGFtcGxlLmNvbVwiXSxcbi8vIFx0XHRjaGFpbmNvZGVOYW1lOiBcInRlc3RfY2NcIixcbi8vIFx0XHRjaGFubmVsTmFtZTogXCJteWNoYW5uZWxcIixcbi8vIFx0XHRhcmdzOiBbSlNPTi5zdHJpbmdpZnkoZGF0YSksIHBrXVxuLy8gXHR9XG4vLyB9XG4vLyBjb25zdCBwb3N0RmFybWVyRGF0YSA9IGFzeW5jIChwaykgPT4ge1xuLy8gXHRjb25zb2xlLmxvZyhwaylcbi8vIFx0bGV0IGRhdGEgPSB7XG4vLyBcdFx0Y3JlYXRlZF9hdDogKG5ldyBEYXRlKS5nZXRUaW1lKCksXG4vLyBcdFx0bmFtZTogJ1JhbWxhbCBPYmVyb2knLFxuLy8gXHRcdHdlaWdodDogMTAwMFxuLy8gXHR9XG4vLyBcdGxldCBwb3N0RGF0YSA9IGF3YWl0IGNyZWF0ZVBvc3REYXRhKHBrLnRvU3RyaW5nKCksIGRhdGEpXG4vLyBcdC8vIGNvbnNvbGUubG9nKFwiYmVmb3JlIEFYSU9TIGNhbGxcIiwgcG9zdERhdGEpXG5cbi8vIFx0cmV0dXJuIGF4aW9zLnBvc3QodXJsLCBwb3N0RGF0YSwgY29uZlxuLy8gXHQpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IGNvbnNvbGUubG9nKGAke3BrLnRvU3RyaW5nKCl9ID0+IGAsIHJlc3BvbnNlLmRhdGEpOyB9XG4vLyBcdCkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7IGNvbnNvbGUubG9nKGVycm9yKTsgfSk7XG5cbi8vIH07XG5cbmNvbnN0IGZldGNoID0gYXN5bmMgKCkgPT57XG4gICAgdHJ5e1xuICAgIGNvbnN0IG91dHB1dCA9IGF3YWl0IGF4aW9zLmdldCh1cmwsY29uZilcbiAgICBjb25zb2xlLmxvZyhvdXRwdXQuZGF0YS5yZXN1bHRbNF0uUmVjb3JkLm93bmVyKVxuICAgIH1jYXRjaChlcnIpe1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxufVxudXNlRWZmZWN0KCgpID0+IHtcbiAgICBmZXRjaCgpXG4gIH0sIFtdKTtcbnJldHVybiA8ZGl2PjwvZGl2PlxufVxuXG5leHBvcnQgZGVmYXVsdCBhcHBcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/index.js\n");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJheGlvc1wiPzcwYzYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiYXhpb3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///axios\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiPzU4OGUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react\n");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react/jsx-dev-runtime\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIj9jZDkwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6InJlYWN0L2pzeC1kZXYtcnVudGltZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react/jsx-dev-runtime\n");

/***/ })

/******/ });