/**
 * 实现从QQ内部发起的对外分享功能
 * @module qq
 * @author alanzhang <alanzhang@futunn.com>
 */
export {
    hiddenTopRightBtn as hiddenTopRightBtn,
    configShare as configShare,
    isAppInstalled as isAppInstalled,
    launchApp as launchApp
};


/**
 * 加载js的工具方法
 * @private
 */
let util = {
    isQQ: /(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d\.]+)/.test(navigator.userAgent) || /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/.test(navigator.userAgent),

    // qqAPI地址
    qqapi: '//open.mobile.qq.com/sdk/qqapi.js?_bid=152',

    /**
     * 动态加载js
     * @function
     * @param  {string} url  jsapi的地址
     * @param  {function} loaded 成功回调
     * @returns {undefined} undefined
     */
    requireJs(url, loaded) {
        let doc = document;
        let head = doc.head || (doc.getElementsByTagName('head')[0] || doc.documentElement);
        let node = doc.createElement('script');
        node.onload = loaded;
        node.onerror = function(e) {
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
let qqBusiness = {
    /**
     * 分享操作
     * @function
     * @param  {Object} data 分享配置
     * @returns {undefined} undefined
     */
    doQQShare(data) {
        let info = {
            title: data.title,
            desc: data.desc,
            share_url: data.link,
            image_url: data.imgUrl
        };

        try {
            if (data.success) {
                window.mqq.ui.setOnShareHandler(function(type) {
                    info.share_type = type;
                    info.back = true;
                    window.mqq.ui.shareMessage(info, function(result) {
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
    hiddenTopRightBtn: function () {
        window.mqq.ui.setTitleButtons({
            right : {
                hidden:true
            }
        });
    },

    /**
     * [doCheck 判断外部App是否安装]
     * @param  {String}   pkgName  [应用名]
     * @param  {Function} callback [获取成功之后的回调，用于接受结果]
     * @return {undefined}
     */
    doCheck: function(pkgName,callback){
        window.mqq.invoke('app', 'isAppInstalled', { "name" : pkgName }, function(result){
            callback && callback(result);
        });
    },

    /**
     * [launchApp 唤起外部app是否打开]
     * @param  {String}   pkgName  [应用名]
     * @return {undefined}
     */
    launchApp: function(pkgName) {
        window.mqq.invoke('app', 'launchApp', {
            name: pkgName
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

    let configData = {
        title: data.title || document.title,
        imgUrl: data.imgUrl || '',
        link: encodeURI(data.link || window.location.href),
        desc: data.desc || '',
    };

    if (window.mqq) {
        qqBusiness.doQQShare(configData);
    } else {
        util.requireJs(util.qqapi, () => {
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
function hiddenTopRightBtn(){
    if (!util.isQQ) {
        return;
    }

    if (window.mqq) {
        qqBusiness.hiddenTopRightBtn();
    } else {
        util.requireJs(util.qqapi, ()=>{
            qqBusiness.hiddenTopRightBtn();
        });
    }
}

/**
 * 判断外部app是否安装
 * @function
 * @static
 * @param  {String}   pkgName  [应用名]
 * @param  {Function} callback [获取成功之后的回调，用于接受结果]
 * @since 1.0.1
 * @returns {undefined} undefined
 * @example
 * qq.isAppInstalled();
 */
function isAppInstalled(pkgName,callback){
    if (!util.isQQ) {
        return;
    }

    if (window.mqq) {
        qqBusiness.doCheck(pkgName,callback);
    } else {
        util.requireJs(util.qqapi, ()=>{
            qqBusiness.doCheck(pkgName,callback);
        });
    }
}

/**
 * 唤起外部App
 * @function
 * @param {object} config [唤起app时的配置]
 * @param {String} config.pkgName [应用的包名]
 * @param {Function} [config.uninstall] [没有安装app的回调]
 * @static
 * @since 1.0.1
 * @returns {undefined} undefined
 * @example
 * qq.launchApp();
 */
function launchApp(config){
    if (!util.isQQ) {
        return;
    }

    isAppInstalled(config.pkgName, function(result) {
        if (result !== true) {
            config.uninstall && config.uninstall();
            return;
        }

        qqBusiness.launchApp(config.pkgName);

    });
}



