'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * 实现从QQ内部发起的对外分享功能
 * @module qq
 * @author alanzhang <alanzhang001@qq.com>
 */
exports.hiddenTopRightBtn = hiddenTopRightBtn;
exports.configShare = configShare;

/**
 * 加载js的工具方法
 * @private
 */

var util = {
    isQQ: /(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d\.]+)/.test(window.navigator.userAgent) || /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/.test(window.navigator.userAgent),

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