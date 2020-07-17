# business-qq
对移动端 QQ及QQzone js-sdk使用的相关封装。主要包括：
- QQ及QQ空间内发起的分享
- QQ对右上角菜单的处理(隐藏)

## 兼容性说明
移动端手机QQ webview。

## 安装

```sh
npm install business-qq --save
```

## 使用
1.通过js配置
```javascript

let qq = require('business-qq');

// 配置QQ的分享
qq.configShare({
    title:  '测试title',
    desc:   '测试desc',

    // 图片尺寸需要为200 * 200，否则分享到Qzone时会被Qzone过滤掉。
    // 图片地址需要待http（s）协议
    imgUrl: 'https://webopsstaticresource-10000538.file.myqcloud.com/nnuniversity/images/university/top.jpg',

    // url必须跟页面url同一个域名，否则设置不生效。
    link:   window.location.href
});

// 隐藏qq的右上角...
qq.hiddenTopRightBtn();
```

2.meta标签控制。

对于QQ发起的分享功能，可直接通过在`head`直接加入如下meta标签配置即可。
```html
<!--title-->
<meta itemprop="name" content="这是分享的标题"/>
<!--imgUrl-->
<meta itemprop="image" content="https://webopsstaticresource-10000538.file.myqcloud.com/nnuniversity/images/university/top.jpg" />
<!--desc-->
<meta name="description" itemprop="description" content="这是要分享的描述" />
```


## 版本记录

### v2.0.1 2020/07/17 
- 修复bug

### v1.0.0 2018-10-02
- 完成代码及文档。