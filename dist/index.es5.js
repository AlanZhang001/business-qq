(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["qq"] = factory();
	else
		root["qq"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * browser module.
 * @author Rick 封装对浏览器环境的判断
 * @module browser
 */
exports.isIE = isIE;
exports.getIEVersion = getIEVersion;
exports.isAndroid = isAndroid;
exports.isBlackBerry = isBlackBerry;
exports.isIOS = isIOS;
exports.isWindows = isWindows;
exports.isMac = isMac;
exports.isWx = isWx;
exports.isWX = isWX;
exports.isSafari = isSafari;
exports.isNN = isNN;
exports.isMobileNN = isMobileNN;
exports.isMacNN = isMacNN;
exports.isPCNN = isPCNN;
exports.isDesktopNN = isDesktopNN;
exports.isNNPlatform = isNNPlatform;
exports.isMobile = isMobile;
exports.isNnPlatform = isNnPlatform;
exports.isMobileUA = isMobileUA;
exports.isMobileQQ = isMobileQQ;

/**
 * 判断是否IE浏览器
 * @function
 * @static
 * @since 1.0.0
 * @returns {Boolean} 是否为IE浏览器
 */

function isIE() {
    var isIE11 = Object.hasOwnProperty.call(window, 'ActiveXObject') && !window.ActiveXObject;
    return (/msie/.test(navigator.userAgent.toLowerCase()) || isIE11
    );
}

/**
 * 获取IE版本，返回值包括7,8,9,10,11
 * @function
 * @static
 * @since 1.0.0
 * @returns {string} IE版本，7,8,9,10,11，非IE时返回0
 */
function getIEVersion() {
    if (isIE()) {
        var rv = null;
        var ua = void 0,
            re = void 0;
        if (navigator.appName === 'Microsoft Internet Explorer') {
            ua = navigator.userAgent;
            re = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})');
            if (re.exec(ua) !== null) {
                rv = parseFloat(RegExp.$1);
            }
        } else if (navigator.appName === 'Netscape') {
            ua = navigator.userAgent;
            re = new RegExp('Trident/.*rv:([0-9]{1,}[\.0-9]{0,})');
            if (re.exec(ua) !== null) {
                rv = parseFloat(RegExp.$1);
            }
        }
        return rv;
    }
    return 0;
}

/**
 * 判断当前系统的是否为Android
 * @function
 * @static
 * @since 1.0.0
 * @returns {Boolean} 当前系统的是否为Android
 */
function isAndroid() {
    return navigator.userAgent.match(/Android/i) ? true : false;
}

/**
* 判断当前系统的是否为BlackBerry
* @function
* @static
* @since 1.0.0
* @returns {Boolean} 当前系统的是否为BlackBerry
*/
function isBlackBerry() {
    return navigator.userAgent.match(/BlackBerry/i) ? true : false;
}

/**
 * 判断当前系统的是否为ios
 * @function
 * @static
 * @since 1.0.0
 * @returns {Boolean} 当前系统的是否为ios
 */
function isIOS() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
}

/**
 * 判断当前系统的是否为ios
 * @function
 * @static
 * @since 1.0.0
 * @returns {Boolean} 当前系统的是否为ios
 */
function isWindows() {
    return navigator.platform.match(/win/i) && !isAndroid() && !isIOS();
}

/**
 * 判断当前系统的是否为mac
 * @function
 * @static
 * @since 1.0.0
 * @returns {Boolean} 当前系统的是否为mac
 */
function isMac() {
    return navigator.platform.match(/mac/i) && !isAndroid() && !isIOS() ? true : false;
}

/**
 * 判断当前是否为微信webview
 * @function
 * @static
 * @since 1.0.0
 * @deprecated 与isWX方法功能相同，建议使用isWX方法，此处仅做兼容处理
 * @returns {Boolean} 是否为微信webview
 */
function isWx() {
    return isWX();
}

/**
 * 判断当前是否为微信webview
 * @function
 * @static
 * @since 1.0.0
 * @returns {Boolean} 是否为微信webview
 */
function isWX() {
    return navigator.userAgent.match(/micromessenger/i) ? true : false;
}

/**
 * 判断当前是否为手Q webview
 * @function
 * @static
 * @since 1.4.0
 * @returns {Boolean} 是否为手Q webview
 */
function isMobileQQ() {
    var ua = navigator.userAgent;
    return (/(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d\.]+)/.test(ua) || /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/.test(ua)
    );
}

/**
 * 判断当前是否Safari浏览器
 * @function
 * @static
 * @since 1.0.0
 * @returns {Boolean} 是否Safari浏览器 webview
 */
function isSafari() {
    return navigator.userAgent.match(/safari/i) ? true : false;
}

/**
 * 判断当前是否移动端牛牛客户端webview
 * @function
 * @static
 * @since 1.0.0
 * @deprecated 与isMobileNN方法功能相同，建议使用更加明确的isMobileNN方法
 * @returns {Boolean} 是否移动端牛牛客户端webview
 */
function isNN() {
    return isMobileNN();
}

/**
 * 判断当前是否移动端牛牛客户端webview
 * @function
 * @static
 * @since 1.1.0
 * @returns {Boolean} 是否移动端牛牛客户端webview
 */
function isMobileNN() {
    return navigator.userAgent.match(/futunn/i) && navigator.userAgent.match(/Android|iPhone|iPad|iPod/i) ? true : false;
}

/**
 * 判断当前是否MAC端牛牛客户端webview
 * @function
 * @static
 * @since 1.3.0
 * @returns {Boolean} 是否MAC端牛牛客户端webview
 */
function isMacNN() {
    return navigator.userAgent.match(/futunn_mac/i) ? true : false;
}

/**
 * 判断当前是否PC端（windows）牛牛客户端webview
 * @function
 * @static
 * @since 1.3.0
 * @returns {Boolean} 是否PC端（windows）牛牛客户端webview
 */
function isPCNN() {
    return navigator.userAgent.match(/futunn_pc/i) ? true : false;
}

/**
 * 判断当前是否桌面端牛牛,即为MAC或者PC端牛牛
 * @function
 * @static
 * @since 1.1.0
 * @returns {Boolean} 是否桌面端牛牛
 */
function isDesktopNN() {
    return navigator.userAgent.match(/futunn/i) && !navigator.userAgent.match(/Android|iPhone|iPad|iPod/i) ? true : false;
}

/**
 * 判断当前是否牛牛客户端webview，包括各个平台
 * @function
 * @static
 * @since 1.1.0
 * @returns {Boolean} 是否牛牛客户端webview，包括各个平台
 */
function isNNPlatform() {
    return navigator.userAgent.match(/futunn/i) ? true : false;
}

/**
 * 判断当前是否牛牛客户端webview，包括各个平台
 * @function
 * @static
 * @since 1.1.0
 * @deprecated 与isNNPlatform方法功能相同，建议使用isNNPlatform方法，此处仅做兼容处理
 * @returns {Boolean} 是否牛牛客户端webview，包括各个平台
 */
function isNnPlatform() {
    return isNNPlatform();
}

/**
 * 判断当前是否为移动客户端浏览器环境
 * @function
 * @static
 * @since 1.5.0
 * @returns {Boolean} 是否为移动客户端浏览器环境
 */
function isMobile() {
    return navigator.userAgent.match(/(blackberry|configuration\/cldc|hp |hp-|htc |htc_|htc-|iemobile|kindle|midp|mmp|motorola|mobile|nokia|opera mini|opera |Googlebot-Mobile|YahooSeeker\/M1A1-R2D2|android|iphone|ipod|mobi|palm|palmos|pocket|portalmmm|ppc;|smartphone|sonyericsson|sqh|spv|symbian|treo|up.browser|up.link|vodafone|windows ce|xda |xda_)/i) ? true : false;
}

/**
 * 判断当前是否为移动客户端浏览器环境
 * @function
 * @static
 * @since 1.5.0
 * @deprecated 与isMobile方法功能相同，建议使用更加明确的isMobile方法,此处仅做兼容处理
 * @returns {Boolean} 是否为移动客户端浏览器环境
 */
function isMobileUA() {
    return isMobile();
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.configShare = exports.hiddenTopRightBtn = undefined;

var _toolBrowser = __webpack_require__(0);

/**
 * 实现从QQ内部发起的对外分享功能
 * @module qq
 * @author alanzhang <alanzhang@futunn.com>
 */
exports.hiddenTopRightBtn = hiddenTopRightBtn;
exports.configShare = configShare;


/**
 * 加载js的工具方法
 * @private
 */
var util = {
    isQQ: (0, _toolBrowser.isMobileQQ)(),

    // qqAPI地址
    qqapi: '//open.mobile.qq.com/sdk/qqapi.js?_bid=152',

    /**
     * 动态加载js
     * @function
     * @param  {string} url  jsapi的地址
     * @param  {function} loaded 成功回调
     * @returns {undefined} undefined
     */
    requireJs: function requireJs(url, loaded) {
        var doc = document;
        var head = doc.head || doc.getElementsByTagName('head')[0] || doc.documentElement;
        var node = doc.createElement('script');
        node.onload = loaded;
        node.onerror = function (e) {
            throw new Error('the qq jsapi load failed,' + e.message);
        };
        node.async = true;
        node.src = url;
        head.appendChild(node);
    }
};

/**
 * QQ相关操作的封装
 * @private
 * {@link https://open.mobile.qq.com/api/mqq/index#api:setShareInfo}
 * {@link https://open.mobile.qq.com/api/common/index#api:setOnShareHandler}
 */
var qqBusiness = {
    /**
     * 分享操作
     * @function
     * @param  {Object} data 分享配置
     * @returns {undefined} undefined
     */
    doQQShare: function doQQShare(data) {
        var info = {
            title: data.title,
            desc: data.desc,
            share_url: data.link,
            image_url: data.imgUrl
        };

        try {
            if (data.success) {
                window.mqq.ui.setOnShareHandler(function (type) {
                    info.share_type = type;
                    info.back = true;
                    window.mqq.ui.shareMessage(info, function (result) {
                        if (result.retCode === 0 && typeof data.success === 'function') {
                            data.success.call(this, result);
                        }
                    });
                });
            } else {
                window.mqq.data.setShareInfo(info);
            }
        } catch (e) {
            throw new Error('business-qq configShare failed,' + e.message);
        }
    },


    /**
     * 隐藏右上角的...菜单
     * @function
     * @returns {undefined} undefined
     */
    hiddenTopRightBtn: function hiddenTopRightBtn() {
        window.mqq.ui.setTitleButtons({
            right: {
                hidden: true
            }
        });
    }
};

/**
 * 配置QQ内发起的分享
 * @function
 * @static
 * @since 1.0.0
 * @param {Object} data 分享配置参数
 * @param {string} data.title 分享的标题，默认值为document.title
 * @param {string} data.desc 分享的描述，默认为空字符串
 * @param {string} data.link 分享页面的url，注意url必须跟页面url同一个域名，否则设置不生效
 * @param {string} data.imgUrl 分享小图片地址，图片最小需要200 * 200，否则分享到Qzone时会被Qzone过滤掉；图片地址应该是一个完整的url地址，需以http://或者https://开始
 * @returns {undefined} undefined
 * @example
 * // 配置QQ的分享
 * qq.configShare({
     *     title:  '测试title-byjs',
     *     desc:   '测试desc-byjs',
     *
     *     // 图片最小需要200 * 200，否则分享到Qzone时会被Qzone过滤掉。
     *     imgUrl: 'https://webopsstaticresource-10000538.file.myqcloud.com/nnuniversity/images/university/top.jpg',
     *
     *     // url必须跟页面url同一个域名，否则设置不生效。
     *     link:   window.location.href
     * });
 */
function configShare(data) {
    if (!util.isQQ) {
        return;
    }

    var configData = {
        title: data.title || document.title,
        imgUrl: data.imgUrl || '',
        link: encodeURI(data.link || window.location.href),
        desc: data.desc || ''
    };

    if (window.mqq) {
        qqBusiness.doQQShare(configData);
    } else {
        util.requireJs(util.qqapi, function () {
            qqBusiness.doQQShare(configData);
        });
    }
}

/**
 * 隐藏右上角的...菜单，避免用户进行分享操作
 * @function
 * @static
 * @since 1.0.1
 * @returns {undefined} undefined
 * @example
 * qq.hiddenTopRightBtn();
 */
function hiddenTopRightBtn() {
    if (!util.isQQ) {
        return;
    }

    if (window.mqq) {
        qqBusiness.hiddenTopRightBtn();
    } else {
        util.requireJs(util.qqapi, function () {
            qqBusiness.hiddenTopRightBtn();
        });
    }
}

/***/ })
/******/ ]);
});