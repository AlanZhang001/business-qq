/* global chai describe it qq mqq*/
let expect = chai.expect;

/**
 * mock qq的jsapi
 * @function
 * @returns undefined
 */
function mockJSApi() {
    window.mqq = {
        // 有回调函数时设置分享调用的方法，目前组件不支持回调
        ui: {
            // 右上角事件监听
            setOnShareHandler: function (clickShareHandel) {
                clickShareHandel(0);
            },
            // 分享信息
            shareMessage: function (info,setSuccess) {
                setSuccess && setSuccess({
                    retCode: 0
                });
            },
            // 隐藏右上角的菜单
            setTitleButtons: function () {
                window.setTitleButtonsCalled = true;
            }
        },
        // 没有回调时设置分享会调用的方法
        data:{
            setShareInfo: function (info) {
                window.setShareInfoisCalled = true;
                window.setShareInfo_args = info;
            }
        }
    };
}
describe('qq 配置分享测试', function() {

    // 设置最大执行时间
    this.timeout(5000);

    it('自动加载了js api',function (done) {
        // 配置QQ的分享
        qq.configShare({
            title: '测试title',
            desc : '测试desc',
            // 图片最小需要200 * 200，否则分享到Qzone时会被Qzone过滤掉。
            imgUrl: 'https://webopsstaticresource-10000538.file.myqcloud.com/nnuniversity/images/university/top.jpg',
            // url必须跟页面url同一个域名，否则设置不生效。
            link: window.location.href
        });
        setTimeout(function () {
            console.log(window.mqq);
            expect(window.mqq).to.be.an('object');
            done();
        },1500);
    });

    it('调用了jsapi:setShareInfo进行分享设置', function (done) {
        mockJSApi();
        // 配置QQ的分享
        qq.configShare({
            title: '测试title',
            desc : '测试desc',
            // 图片最小需要200 * 200，否则分享到Qzone时会被Qzone过滤掉。
            imgUrl: 'https://webopsstaticresource-10000538.file.myqcloud.com/nnuniversity/images/university/top.jpg',
            // url必须跟页面url同一个域名，否则设置不生效。
            link: window.location.href
        });

        // setShareInfo 方法被调用
        expect(window.setShareInfoisCalled).to.be.true;
        // setShareInfo 方法参数正确
        expect(window.setShareInfo_args).to.be.an('object');
        // 传递了正确参数
        expect(window.setShareInfo_args).to.include.keys('title');
        expect(window.setShareInfo_args).to.include.keys('share_url');
        expect(window.setShareInfo_args).to.include.keys('image_url');
        expect(window.setShareInfo_args).to.include.keys('desc');
        done();
    });

    it('调用了jsapi:setTitleButtons隐藏右上角菜单',function () {
        qq.hiddenTopRightBtn();
        // setShareInfo 方法被调用
        expect(window.setTitleButtonsCalled).to.be.true;
    });

});
