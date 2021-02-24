/*
国际盲盒
活动入口：京东APP首页-京东国际-国际盲盒
活动时间：2021-02-23 - 2021-03-01
因为活动助力方式，找不出比较好的方法解决助力问题，所以默认不助力直接开奖。

后续发布脚本均有加密
因为我介意别人把我脚本里的助力改了。
如果不愿意助力，可以直接下载脚本到本地，通过修改helpAhtor这个参数来关闭助力请求。
请不要修改我的助力。
脚本内置了一个给作者任务助力的网络请求，默认开启，如介意请自行关闭。
助力活动链接： https://h5.m.jd.com/babelDiy/Zeus/4ZK4ZpvoSreRB92RRo8bpJAQNoTq/index.html
参数 helpAuthor = false

更新地址：https://raw.githubusercontent.com/i-chenzhe/qx/main/jd_gjmh.js
已支持IOS双京东账号, Node.js支持N个京东账号
脚本兼容: QuantumultX, Surge, Loon, 小火箭，JSBox, Node.js
============Quantumultx===============
[task_local]
#国际盲盒
10 13 23-28,1 2-3 * https://raw.githubusercontent.com/i-chenzhe/qx/main/jd_gjmh.js, tag=国际盲盒, enabled=true
================Loon==============
[Script]
cron "10 13 23-28,1 2-3 *" script-path=https://raw.githubusercontent.com/i-chenzhe/qx/main/jd_gjmh.js, tag=国际盲盒
===============Surge=================
国际盲盒 = type=cron,cronexp="10 13 23-28,1 2-3 *",wake-system=1,timeout=3600,script-path=https://raw.githubusercontent.com/i-chenzhe/qx/main/jd_gjmh.js
============小火箭=========
国际盲盒 = type=cron,script-path=https://raw.githubusercontent.com/i-chenzhe/qx/main/jd_gjmh.js, cronexpr="10 13 23-28,1 2-3 *", timeout=3600, enable=true
 */
const $ = new Env('国际盲盒');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
let cookiesArr = [], cookie = '', message;
let helpAuthor = true;
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
    let cookiesData = $.getdata('CookiesJD') || "[]";
    cookiesData = JSON.parse(cookiesData);
    cookiesArr = cookiesData.map(item => item.cookie);
    cookiesArr.reverse();
    cookiesArr.push(...[$.getdata('CookieJD2'), $.getdata('CookieJD')]);
    cookiesArr.reverse();
    cookiesArr = cookiesArr.filter(item => item !== "" && item !== null && item !== undefined);
}
!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
        return;
    }
    for (let i = 0; i < cookiesArr.length; i++) {
        if (cookiesArr[i]) {
            cookie = cookiesArr[i];
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1])
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';
            message = '';
            console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
            if (!$.isLogin) {
                $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
                if ($.isNode()) {
                    await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
                }
                continue
            }
            await international_mh();
        }
    }
})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })
/*
 * 加密工具已经升级了一个版本，目前为 jsjiami.com.v6 ，更新了加密算法，缩减了体积;
 * 另外 jsjiami.com.v6 已经强制加入校验，注释可以去掉，但是 jsjiami.com.v6 不能去掉，其他都没有任何绑定。
 * 誓死不会加入任何后门，JsJiami.com 加密的使命就是为了保护你们的Javascript 。
 */
var _0xodm='jsjiami.com.v6',_0x175a=[_0xodm,'LlvCm8KDw6g=','w54Iw7PCuMOo','BmoTWg==','OxDCsFVnfA==','O8OaEMK2aw==','An82ZRs=','wooFwotlwrQ=','wp7DtsKIacOc','w6nCqEA9w5/CtsKMwpzCkMOXwr/DmQk/SkAlwqRXwqTDh8KpTFhAw5hBI8KCwqFOwqwHw7VAwqAmPwXCoMODPsO5','wo4lXizDvMOLw5w=','w73DuEU7w5nCkcKV','OA/Csn5Ha8Kzwq/Cmw==','acO1w5I=','ZD9ydsOD','C2oAwrDCk8KH','CsOfw7bDisKtwq0Rb8OWKlU=','MhbDs1ppD8OzKBE/Zw==','wqsjwqJqwpU=','w5Z6IMKW','acO1w5J0wqkd','w7DClMOwATItw6sf','wo3Di0jCqMOO','UMKjwpUqPU1aw7LCrErDoW7DlA==','woLDjlrCmE/DrsKlw7RxVQ==','wqg0woZHwpUK','fyPDisKbQcKXw4EUK8OATkPCmcK4woE=','XcKqUy/Dk07CisO1wrnDtcKE','wpdiw6jDpcK7NmzDnWbDgx3CrcOiNsKfw7QRw7vDssOvb8KTw6LDocK+ekFjw48uSsOW','wrzDpVzDrMOoV3fCskHDjSXCvw==','Dm4awrE=','woPDqXPCpcOf','HWfDvsKDdnREHmgvwrE=','IDBgw686FsKc','wqNfGTsM','dMKqwpszAg==','GHrDqcKdS3ZOF38=','w5bDrsOFw7FP','DXTCuw==','OD50w4EaEQ==','w6/CicOlTw==','OgbCg3FmZQ==','MsO+wqLDpmABw5glw44zwqLDsSFjHWsrA8K2esOOcGMwdQ/DunZ1BAIS','UsK+woQ=','w6/CjMK5','W8KiRCvDpQ==','KnIAVxo=','wolkw5rDscOxd8ONwqk=','F2AESgDDiA==','K8OuNcKG','wonDix55TA==','6LWy5omm6aOd5oyj772k5paD57+q5ZS444OI','w5c26LWn5oiV6aO/5o+677275pSq57yb5ZW944Gm','TsO5wpE5OFVWw7XCmVfDpWTDiQs6w41rwoYnwrJQw4rCisOEOcOqCBE5w6ZwwovCqsOyLsKbAMOgHMKQLQYXwoopRUo7wrXChMOVwpDDkMK5XWvCgsK5wrJ4w4ARw5rChcO8AMODwpwhwoHCmA==','dMO5w4c=','w43CuMOJGjQ=','DW7CvxkDWzdEw5lyw5LClcOGHsOCXw==','w6ESccKBw5zDm2FFwr0=','wq/CscKAwrIpw7rCu8K/wrUcfQ==','w4gww6XDr8K7','w7HChsKtXD3Dow==','YcO7w4FQ','FHY/wrDCnMKYCcKSw5tF','NDl5CTPCs0XDvWY=','S8OzXsKm','esOvw6HDoFkXwqwxQgg=','J8OLw7k0','w7PCn8OwDDI=','wpdyEwo=','w7F1wq8=','w6g1w4fCqcO+','w7NcwobCgsK2','EsOTw6vDmMKlwrY=','TMO9TsKi','CnXCjQ==','D2oHSzw=','O8K5wrDDsHgc','w6nCkMOwGR8jw70=','w4/CiV7CumY=','w7DDpVkXw4XCucKV','PcOqMsKSQMKc','w7FvwqvCk8KDw5IiQkDDgcKleQ==','YcO5w4TDqFgYwrsjQDbCs8KvWg==','w4klw7rDs8KjKw==','wppQPm8xw7lcJTLCowRbw5U=','w57CjUHCn08=','w7PCvsOJATY=','wqskwoJawqxVw5Qww7HDmsOUw4cOw6jDqQ7Ci0ApWgbCgmrCpSdbwo3CnBfDu8O8wr7DvsKUw5YqwpDDocOXwqInwpZlwrFsw7LDiR/CmAUKPsOsw78GNcK3w4LDvMOmwpzCu8Kvwpo4woQqwqbDr8KmbypONMKHwovCnWkeJ8KhDg/DmsOSAALDicK3woZJL8KtXcKCwo/DhcOowrDCnTHClsKLAcKqw4nDqkzCqMKtw4/Cmj7DlF5mw4MOHsKVw5M+NcKLXcOzNQEkWsKnw5TCocOZHsORw6fCl8KeAnDCox/CnsKAwot5PwR3wqjDjVBtwpAhKcOZIMOXaMKZYsKuw7PCqMOaGEtAL8KmwptiVsOfwoHCrMKLw4MBwqoBNMOQwrTDocKowr0ew6QxB8KDw6/DhsOSw7bDo1I1XnzCsMKTPsOjO2rCk8OiEkNxYsOAw599dMKNw5ZpCsKnJ1zCiyTCgsOlw63CoV/Dp8OUwrjDplnDphlZwrjDpV7CkcKaUsO6M8OlN8O8WxXDhsKGR8OvLgvDm8KdUBrCnAofPEIFHMOeccOxwpU+w63DssKSwrbDmMO5ZxDCvzh7PcOXw5VXVT/Dq10wJg==','M8K0w67Dpno=','O3XDiMKCV8Oawr1eL8OCQVXCnsK0w5HCh2ULTsKnw7bCvMKrwpbDknkow55Sw6ZUwo3CncKnwqLClg==','woswTxXCvsKNw5cywqgTw6xOw6DCvMKGU8O/','w7VuwrzCiMKJwqpiFW3DmMK/I3bDlMOpDy4TwrfCiDTCsCjDi8KXXsKRw5RnwrnDhBXDvgVkw400BsKCworDiMOPWMKjw4Qq','w5F3MVJYOUrCrW90BkbCgjghw74cwr0FwpgubVfDrQ==','dcOHXsKCwqU=','AcOGw7HCg8Kkw6wORcKNJElJ','MAvDqU1+WsKpSQM/dQ7CgEVXwrFywqTCgUc=','w5tmGWTCjMOTw6/CuDzDs8KoOsKyAiPCrRtSQ0N5GMOdISvCucOlwrs/wqI9DBV/QcKUwpPCkQ==','MnHDjMKeTcKDw7MFIcOATgjCksK3w4zClDxFR8KlwqvDrsOnwpPDkFwpwo0Dwr4Cw57DiQ==','w5pvIMKHc0VaDsOHHxnCtcK/wrgqFw/DqEo=','w7QqwpgoYFEtaMKBwrvCqxHCnlZEwoJJ','VMKrwoAlIVpew6LCkUzDoiTDjTExwoF9woRhw6AawojClcKFYcK9Q1M3wqc5w5DDqQ==','wp1yIFJBZh7Cmmt0CkLDlV5iwqtAw7kYw4t1Jx3DqzTCthfDu21WNS48w7MCw6HChMKCRcOtw4knbMOOwp/DjMO9QmPDmT0zEsOXTQrDnHPDt8O9VzNWw7MuXsOYw5wlw7HCosOew78jXQ8Bwp5TFnLClMOXI8OoTCZVFgMcwpoQwoRkwp/DrMOJMcK5w7Q8XkYTwq/DnBnDuB3CkMKSaCBQw43Dnk0uwpbCqwkWEcOkPsKaw5HDp8Ksw4Q7w4bCnlvCmBF2JB9nfkDDh8Ojwp4JVBTCr8Kgbz3CmloKIg3DocKqbcKwwqfDs8KqecOKw5TCqMKFJsKxwqFLB8OARn/Dp07DvlQaw6I9FSjDucODYMK0JWXCssKOwrvCnsOawrTCkcOvByJ5a8Kjw5Bnw77DlsOww74Ew7UYwrRPwowEw78fR8ORFsKyWQHDghnDl8K7KDjDnMKXw5zCmsOuF8OGCMO/E33DiVLDqsOMwpV+w4ICdFUYwoQFacKjVsKYOnVnw6nDl8KlHMOIKsKkNSPCq0AAw6wLdMKIGX/CiW9rw6cUJmzCpw==','w5czw7LChBs=','Bn7CqA==','IEjDrcKNMA==','w4lWDGDCng==','Q8O9TQ==','wrHDksKZfsOtw5ppw7gzwqHDijPCmMK9QcOpbsKrwoorwrF6wq/DvMKsBsOgw4dVw5PDkwTDqMOm','EMOHw5DDnMKv','Plk/wpHCnA==','w5fCnMOIwq98','TXnDusKNGCEBHWgsw79sPMO2w4vCkgATw5LCs8O+wowJRmx7woYowroZ','woDDhkB3Zg==','w7zCuMOcwq1sw6/Dp8Ktw4wEdMO1AsK+EzMfwotEY8K7LMOcHMKEWhXCm3bCpjvCtz0PK8OBw5csw5wCw7svDxLCvQ4=','SSLCucKBVnRVP2cmwqdoasK1wp3CgwQGw5TCu8Kvw4ULe1t1woRvw6EVYCLCtsOtbTwfUsKVw5s=','w7vCh8OiWg==','e8Oow4fDuVlGw5ZtRgrCs8OyXMOZVGlowrg3wo53YcK/wpNib8KlFsO/w4/DhTNLw54wwpE2','wr40woFlwrFKwpoKw6o=','P8OgMsKT','wqMMSSrDmw==','w57CvsOAwppp','wrLDgE7Ds8Od','AnvCnsKN','w4LCiV3Ci17Dqw==','LSXCmXht','woDDqgxgaQ==','woAvSALDpsOF','EcOSw6nDosKs','w6Agwp0xOA==','N2AE','wrsQwqxbwrU=','w53CmFLCmF/DsA==','HF7Ci8KYw6I=','UcK6woQo','w6LCgMKqYBU=','wodBw4jDrsOc','w7cxwoU5','MDpcw4Ut','w4ByJ8Kc','bMK6wr4xGA==','w7/CncO8RAc=','wqHDq1DCi8ObT8Omwp4f','wqAGwrBFwpM=','wq7Dtk7DoMORS2nCo3w=','w6ZPIcKeTA==','w78/wpY=','w7w4w6zCgBs=','w7B7wrA=','w5TCicOcwoRd','w7J8IQ==','woZUJGs=','w4klw6rDo8KmKX/DoHPDiTXCkMOjJMOcwrxXw5XDpsOr','wojDixp1esK3GsOgw5jDmMKow4M4','L8Knw6ZTwrQ=','CXrCryATfjBIw5tjw57ClQ==','w7HDi1k1w7g=','wqgzwqxawrkA','AW3Dq8KTaA==','EG/CvMKew4k=','w4g2w5PDsMKG','b8K3wpYFLQ==','w6hywpA7OBg/ZMKTwq7CiQrCnx9Gw5oZw5dte1nDmMOKwr7CtcK3GFg9wrbCncOhUMKyBMOtQQ==','E8OCw6rDhMKnwqUNR8Oa','w4shw7vDtcKq','wqUhwpdL','X8Kywp4uLFZKw5jCjU7Dvw==','wo9gw5rDr8ORag==','w4rCjUfCjQ==','w6nCisKwTjXDuHfClsK2wqca','w78/wpYdPgM=','OkXDiMKUUQ==','5LiN5pW86LSc5Lqc5bWE6L6U5LqC6Zq6','w7XDr1U=','Pgd0w5Q6','wrvDk8KUTMOxwpg=','YMOow4HDoEQbwpAkXg==','w6LDq1Mtw44=','wpRCw6HDlMOT','wrXDvELCmcOaXg==','w4PCiUDCn0vDpMKJ','w7zDkHsQw6c=','wr8lwoB5wrNZ','IcKDw61LwoYVw6c=','aMO7w40=','w4XCosOEHSQ=','JRrCpGV5eg==','XXjUxUrsAjUiGamihGAA.com.v6=='];(function(_0x5c5558,_0x4c7f6a,_0x58e79b){var _0x50ab68=function(_0x296372,_0x176a71,_0xa9477d,_0x4f2128,_0x2f3455){_0x176a71=_0x176a71>>0x8,_0x2f3455='po';var _0x47b67a='shift',_0x6ae43d='push';if(_0x176a71<_0x296372){while(--_0x296372){_0x4f2128=_0x5c5558[_0x47b67a]();if(_0x176a71===_0x296372){_0x176a71=_0x4f2128;_0xa9477d=_0x5c5558[_0x2f3455+'p']();}else if(_0x176a71&&_0xa9477d['replace'](/[XXUxUrAUGhGAA=]/g,'')===_0x176a71){_0x5c5558[_0x6ae43d](_0x4f2128);}}_0x5c5558[_0x6ae43d](_0x5c5558[_0x47b67a]());}return 0x74422;};return _0x50ab68(++_0x4c7f6a,_0x58e79b)>>_0x4c7f6a^_0x58e79b;}(_0x175a,0x118,0x11800));var _0x5849=function(_0x43c55c,_0x25803c){_0x43c55c=~~'0x'['concat'](_0x43c55c);var _0xdeefc4=_0x175a[_0x43c55c];if(_0x5849['mDCLWU']===undefined){(function(){var _0x400955=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x32674e='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x400955['atob']||(_0x400955['atob']=function(_0x2f8cd2){var _0x1e2134=String(_0x2f8cd2)['replace'](/=+$/,'');for(var _0x344b40=0x0,_0x533dbb,_0xf51aa9,_0x4e7d5c=0x0,_0x3d6905='';_0xf51aa9=_0x1e2134['charAt'](_0x4e7d5c++);~_0xf51aa9&&(_0x533dbb=_0x344b40%0x4?_0x533dbb*0x40+_0xf51aa9:_0xf51aa9,_0x344b40++%0x4)?_0x3d6905+=String['fromCharCode'](0xff&_0x533dbb>>(-0x2*_0x344b40&0x6)):0x0){_0xf51aa9=_0x32674e['indexOf'](_0xf51aa9);}return _0x3d6905;});}());var _0x2bbe82=function(_0x24fac2,_0x25803c){var _0x3aea14=[],_0x442d37=0x0,_0x394cbe,_0x13fc55='',_0x16be5f='';_0x24fac2=atob(_0x24fac2);for(var _0x56343d=0x0,_0x31b1d7=_0x24fac2['length'];_0x56343d<_0x31b1d7;_0x56343d++){_0x16be5f+='%'+('00'+_0x24fac2['charCodeAt'](_0x56343d)['toString'](0x10))['slice'](-0x2);}_0x24fac2=decodeURIComponent(_0x16be5f);for(var _0xb674d3=0x0;_0xb674d3<0x100;_0xb674d3++){_0x3aea14[_0xb674d3]=_0xb674d3;}for(_0xb674d3=0x0;_0xb674d3<0x100;_0xb674d3++){_0x442d37=(_0x442d37+_0x3aea14[_0xb674d3]+_0x25803c['charCodeAt'](_0xb674d3%_0x25803c['length']))%0x100;_0x394cbe=_0x3aea14[_0xb674d3];_0x3aea14[_0xb674d3]=_0x3aea14[_0x442d37];_0x3aea14[_0x442d37]=_0x394cbe;}_0xb674d3=0x0;_0x442d37=0x0;for(var _0x4496af=0x0;_0x4496af<_0x24fac2['length'];_0x4496af++){_0xb674d3=(_0xb674d3+0x1)%0x100;_0x442d37=(_0x442d37+_0x3aea14[_0xb674d3])%0x100;_0x394cbe=_0x3aea14[_0xb674d3];_0x3aea14[_0xb674d3]=_0x3aea14[_0x442d37];_0x3aea14[_0x442d37]=_0x394cbe;_0x13fc55+=String['fromCharCode'](_0x24fac2['charCodeAt'](_0x4496af)^_0x3aea14[(_0x3aea14[_0xb674d3]+_0x3aea14[_0x442d37])%0x100]);}return _0x13fc55;};_0x5849['PbKHps']=_0x2bbe82;_0x5849['aGHMEy']={};_0x5849['mDCLWU']=!![];}var _0x54685a=_0x5849['aGHMEy'][_0x43c55c];if(_0x54685a===undefined){if(_0x5849['TerQXY']===undefined){_0x5849['TerQXY']=!![];}_0xdeefc4=_0x5849['PbKHps'](_0xdeefc4,_0x25803c);_0x5849['aGHMEy'][_0x43c55c]=_0xdeefc4;}else{_0xdeefc4=_0x54685a;}return _0xdeefc4;};async function international_mh(){var _0x502550={'eOpNE':_0x5849('0','&cz0'),'pqHqf':'api.m.jd.com','GVLTc':_0x5849('1','FB)o'),'MQzad':_0x5849('2','(W1N'),'qenTA':_0x5849('3','B^qw'),'vHHhd':'keep-alive','pPwSu':_0x5849('4','q[Lc'),'gATjH':_0x5849('5','!4I2'),'OFoOI':function(_0x25d02d){return _0x25d02d();},'DsrTq':function(_0x5c1aa9,_0x362c11){return _0x5c1aa9!==_0x362c11;},'zZNhx':function(_0x1b0fc3,_0x59fe45){return _0x1b0fc3<_0x59fe45;},'qdqOe':'1|2|3|4|0','zPOqi':function(_0x304b8c,_0x4ab12a){return _0x304b8c===_0x4ab12a;},'xznTT':function(_0x39780e,_0x227fff,_0x162abe){return _0x39780e(_0x227fff,_0x162abe);},'dkOAE':function(_0x4d5977){return _0x4d5977();},'NDnJE':function(_0x27f42f){return _0x27f42f();},'YaNxP':function(_0x4304b1,_0x43d63e){return _0x4304b1>_0x43d63e;},'tumjZ':function(_0x306bca,_0x9adc60){return _0x306bca/_0x9adc60;},'aFSoO':function(_0x496f74,_0xbe2539){return _0x496f74/_0xbe2539;},'TTuiL':function(_0x3fb842,_0x648ba5){return _0x3fb842<_0x648ba5;}};if(helpAuthor){function _0x2d6853(){var _0x1ff853={'APKSA':function(_0x339856){return _0x339856();},'CaYhA':_0x502550[_0x5849('6','Z%64')]};return new Promise(_0x44931c=>{$[_0x5849('7','7*Su')]({'url':_0x1ff853[_0x5849('8','8wrM')]},(_0x39518a,_0x1a9e5f,_0x111fd7)=>{try{if(_0x111fd7){$[_0x5849('9','&cz0')]=JSON['parse'](_0x111fd7);};}catch(_0x397ed7){console[_0x5849('a','rAaI')](_0x397ed7);}finally{_0x1ff853['APKSA'](_0x44931c);};});});}function _0x3167c0(_0x4802a7,_0x55fea5){let _0x5a6984={'url':_0x5849('b','Phge'),'headers':{'Host':_0x502550[_0x5849('c','iAl2')],'Content-Type':_0x502550[_0x5849('d','%K9t')],'Origin':_0x502550[_0x5849('e','&!KX')],'Accept-Encoding':_0x502550['qenTA'],'Cookie':cookie,'Connection':_0x502550['vHHhd'],'Accept':_0x502550['pPwSu'],'User-Agent':_0x502550['gATjH'],'Referer':'https://h5.m.jd.com/babelDiy/Zeus/4ZK4ZpvoSreRB92RRo8bpJAQNoTq/index.html?serveId=wxe30973feca923229&actId='+_0x4802a7+_0x5849('f','wTjc'),'Accept-Language':_0x5849('10',']uc@')},'body':_0x5849('11','&!KX')+_0x4802a7+_0x5849('12','wTjc')+_0x55fea5+',\x22userPic\x22:\x22\x22}&client=wh5&clientVersion=1.0.0'};return new Promise(_0x43d323=>{$[_0x5849('13','Qgx]')](_0x5a6984,(_0x3864cf,_0x23abf7,_0x394b29)=>{if(_0x394b29){$['zRes']=JSON['parse'](_0x394b29);_0x43d323();};});});}function _0x24962(_0x532439,_0x16fa68){let _0x100b00={'url':_0x5849('14','K4Kt'),'headers':{'Content-Type':'application/json'},'body':JSON[_0x5849('15','FdAy')]({'actID':_0x532439,'actsID':_0x16fa68,'done':0x1})};return new Promise(_0x441701=>{$[_0x5849('16','@Uu&')](_0x100b00,(_0x477b25,_0x2b6757,_0x1699bb)=>{_0x441701();});});}await _0x502550[_0x5849('17','Aet0')](_0x2d6853);if(_0x502550[_0x5849('18','&!KX')]($[_0x5849('19','KWN5')][_0x5849('1a','vFQX')][_0x5849('1b','eEly')],0x0)){for(let _0x24f8cf=0x0;_0x502550[_0x5849('1c','06ff')](_0x24f8cf,$[_0x5849('1d',']uc@')]['data'][_0x5849('1e','Aet0')]);_0x24f8cf++){var _0x532a54=_0x502550[_0x5849('1f','iAl2')][_0x5849('20','B^qw')]('|'),_0x4c93c1=0x0;while(!![]){switch(_0x532a54[_0x4c93c1++]){case'0':if($[_0x5849('21','ON1v')]&&_0x502550[_0x5849('22','67b@')]($['Res'][_0x5849('23','eEly')],0x4)){await _0x24962(actID,actsID);}continue;case'1':actID=$[_0x5849('24','vFQX')][_0x5849('25','q[Lc')][_0x24f8cf][_0x5849('26','xilP')];continue;case'2':actsID=$[_0x5849('27','(Pu6')][_0x5849('28','B^qw')][_0x24f8cf]['actsID'];continue;case'3':await _0x502550['xznTT'](_0x3167c0,actID,actsID);continue;case'4':await $['wait'](0x5dc);continue;}break;}};};};$['risk']=![];$['jingdouNums']=0x0;await _0x502550[_0x5849('29','7mHk')](getHome);if(!$[_0x5849('2a','(W1N')]){await getTaskList();await _0x502550['NDnJE'](doTask);await _0x502550['xznTT'](getHome,!![],!![]);if(_0x502550[_0x5849('2b','q[Lc')](parseInt(_0x502550[_0x5849('2c','Qgx]')]($[_0x5849('2d','xP54')],0x5)),0x3)){t=0x3;}else{t=parseInt(_0x502550[_0x5849('2e','67b@')]($[_0x5849('2f','KWN5')],0x5));}if(_0x502550[_0x5849('30','(W1N')](t,0x1)){console[_0x5849('31','B^qw')]('抽奖次数不足。');}else{for(let _0x390255=0x0;_0x390255<t;_0x390255++){await _0x502550[_0x5849('32','Z%64')](box);if($[_0x5849('33','^#ew')]){break;}await $['wait'](0x3e8);await _0x502550[_0x5849('34','&!KX')](openBox);}await getReward();$[_0x5849('35','44#5')]($[_0x5849('36','8v&)')],'本次运行共获得'+$['jingdouNums']+'京豆');}}else{return;}}function getReward(){var _0x2070f5={'jcpgM':function(_0x4ec56a,_0x322317){return _0x4ec56a(_0x322317);},'vuVrJ':function(_0x1eb875){return _0x1eb875();},'svZvI':function(_0x49278e,_0x8d9db0,_0x19eb73){return _0x49278e(_0x8d9db0,_0x19eb73);},'ZlfLe':_0x5849('37','aoEO'),'cAxkS':function(_0x20f9eb,_0x2f2e22){return _0x20f9eb===_0x2f2e22;}};for(let _0x17fd6f of $[_0x5849('38',']uc@')]){if(_0x2070f5[_0x5849('39',']btB')](_0x17fd6f[_0x5849('3a','7*Su')],0x1)&&_0x2070f5[_0x5849('3b','4#S#')](_0x17fd6f[_0x5849('3c','67b@')],0x0)){return new Promise(_0x58aabe=>{var _0x2e6a87={'ZrOvF':function(_0x52f79d,_0x33c792){return _0x2070f5[_0x5849('3d','wTjc')](_0x52f79d,_0x33c792);},'iDtfu':function(_0x4a8648){return _0x2070f5[_0x5849('3e','vFQX')](_0x4a8648);}};$['get'](_0x2070f5[_0x5849('3f','aoEO')](taskUrl_2,_0x2070f5[_0x5849('40','q[Lc')],_0x5849('41','B^qw')+_0x17fd6f['id']+'}'),(_0x24d1ae,_0x32904e,_0x50bfad)=>{try{if(_0x24d1ae){console['log'](''+JSON[_0x5849('42','iAl2')](_0x24d1ae));}else{if(_0x50bfad){_0x50bfad=JSON[_0x5849('43','aoEO')](_0x50bfad);if(_0x50bfad['result'][_0x5849('44','67b@')][_0x5849('45','q[Lc')]!==''){$['jingdouNums']+=_0x2e6a87['ZrOvF'](parseInt,_0x50bfad[_0x5849('46','(Pu6')][_0x5849('47','eEly')][_0x5849('48','xilP')]);}}}}catch(_0x5790e0){$[_0x5849('49','B^qw')](_0x5790e0);}finally{_0x2e6a87[_0x5849('4a','FB)o')](_0x58aabe);}});});}}}function box(){var _0x10241c={'iGHNn':function(_0x114fb9,_0x3d509e){return _0x114fb9===_0x3d509e;},'nZZNL':_0x5849('4b','xP54'),'AWGwZ':function(_0x5d2917,_0x3b7a8c){return _0x5d2917===_0x3b7a8c;},'HAqok':'您当前已有未打开的盲盒!','RFttr':function(_0x93da77){return _0x93da77();},'tUQQG':function(_0x292033){return _0x292033();},'jVgPR':function(_0x36c35f,_0x10aa86,_0x2eccda){return _0x36c35f(_0x10aa86,_0x2eccda);}};return new Promise(_0x24ec72=>{$[_0x5849('4c','4#S#')](_0x10241c[_0x5849('4d','7mHk')](taskUrl_2,_0x5849('4e','Phge'),'{\x22buyType\x22:20,\x22activityCode\x22:\x22lucky-box-001\x22,\x22boxId\x22:9}'),async(_0x4324a4,_0x2365a8,_0x2e81a2)=>{try{if(_0x4324a4){console[_0x5849('a','rAaI')](''+JSON[_0x5849('4f','K4Kt')](_0x4324a4));}else{if(_0x2e81a2){_0x2e81a2=JSON[_0x5849('50','4#S#')](_0x2e81a2);if(_0x10241c[_0x5849('51','(Pu6')](_0x2e81a2[_0x5849('52','xP54')][_0x5849('53','eEly')],_0x10241c[_0x5849('54','4#S#')])){console['log'](_0x2e81a2[_0x5849('55','FdAy')][_0x5849('56',']btB')]);$[_0x5849('57','WEKQ')]=!![];return;}if(_0x10241c[_0x5849('58','TaT8')](_0x2e81a2[_0x5849('59','06ff')]['message'],_0x10241c[_0x5849('5a','vFQX')])){await _0x10241c['RFttr'](openBox);}if(_0x10241c[_0x5849('5b','uE93')](_0x2e81a2['result'][_0x5849('5c','ON1v')],'0')){await getHome(![],!![]);}}}}catch(_0x27aeee){$[_0x5849('5d','06ff')](_0x27aeee);}finally{_0x10241c[_0x5849('5e','@Uu&')](_0x24ec72);}});});}function openBox(){var _0x455bfa={'gzAZw':function(_0x3183af,_0x4597ef){return _0x3183af!==_0x4597ef;},'KEhOh':function(_0x3eca3e,_0x5625b2,_0x473ba1){return _0x3eca3e(_0x5625b2,_0x473ba1);},'GPegB':'openLuckyBox'};return new Promise(_0x2ecf42=>{var _0x383672={'SdZXq':function(_0x4b0d9f,_0x17db88){return _0x455bfa[_0x5849('5f','ON1v')](_0x4b0d9f,_0x17db88);},'fcQfJ':function(_0xe1f6fa,_0x1536c6){return _0xe1f6fa(_0x1536c6);}};$['get'](_0x455bfa[_0x5849('60','67b@')](taskUrl_2,_0x455bfa[_0x5849('61','Phge')],_0x5849('62','4#S#')+$[_0x5849('63','Aet0')][_0x5849('64','4#S#')]+'\x22,\x22openRecId\x22:'+$['boxInfo'][_0x5849('65','06ff')]+'}'),(_0x2021f2,_0x2b90e1,_0x1d7c08)=>{try{if(_0x2021f2){console[_0x5849('66','WEKQ')](''+JSON['stringify'](_0x2021f2));}else{if(_0x1d7c08){_0x1d7c08=JSON[_0x5849('67','F^KM')](_0x1d7c08);if(_0x383672['SdZXq'](_0x1d7c08[_0x5849('68','%K9t')]['data'][_0x5849('69','iAl2')],'')){$[_0x5849('6a','^%[D')]+=_0x383672[_0x5849('6b','FdAy')](parseInt,_0x1d7c08['result'][_0x5849('6c','(W1N')]['jingdouNums']);}}}}catch(_0xd2f746){$[_0x5849('6d','WEKQ')](_0xd2f746);}finally{_0x2ecf42();}});});}async function doTask(){var _0x116d85={'JRyDx':function(_0x54211b,_0x3a4013){return _0x54211b-_0x3a4013;},'zanbU':function(_0x692536,_0x4f5c9b){return _0x692536<_0x4f5c9b;},'DpBIi':function(_0x3a4743,_0x53bd18){return _0x3a4743*_0x53bd18;}};let _0xa8b2f3=$[_0x5849('6e','TaT8')]['commonTask'];for(let _0xdb2045 of _0xa8b2f3){let _0x5ad746=_0x116d85[_0x5849('6f','xP54')](_0xdb2045['totalTimes'],_0xdb2045[_0x5849('70','q[Lc')]);if(_0x5ad746!==0x0){for(let _0x1e679b=0x0;_0x116d85['zanbU'](_0x1e679b,_0x5ad746);_0x1e679b++){let _0x3f7122='{\x22taskId\x22:'+_0xdb2045['taskId']+_0x5849('71','eEly')+_0xdb2045[_0x5849('72','67b@')]+_0x5849('73','FB)o')+_0xdb2045[_0x5849('74','da8n')]+_0x5849('75','aoEO');console['log'](_0xdb2045[_0x5849('76','KWN5')]+'\x20-\x20'+_0xdb2045['taskName']);await $[_0x5849('77','%K9t')](_0x116d85[_0x5849('78','xP54')](_0xdb2045[_0x5849('79','wTjc')],0x1f4));await taskRun(_0x3f7122);await $['wait'](0x3e8);}}}}function taskRun(_0x8b3c55){var _0x3933e={'FDyZX':function(_0xe209f0,_0x1b941d,_0x5e7735){return _0xe209f0(_0x1b941d,_0x5e7735);},'AqkzJ':_0x5849('7a','7mHk')};return new Promise(_0x28e284=>{$['get'](_0x3933e[_0x5849('7b',']01z')](taskUrl_2,_0x3933e[_0x5849('7c','q[Lc')],_0x8b3c55),(_0x429a06,_0x49e897,_0x29187a)=>{try{if(_0x429a06){console[_0x5849('31','B^qw')](''+JSON[_0x5849('7d','wTjc')](_0x429a06));}else{if(_0x29187a){_0x29187a=JSON[_0x5849('7e','zdiS')](_0x29187a);console[_0x5849('7f','7*Su')](_0x29187a['result']['message']);}}}catch(_0x49e7ed){$[_0x5849('80','7mHk')](_0x49e7ed);}finally{_0x28e284();}});});}function getTaskList(){var _0x349859={'aYUis':_0x5849('81','Qgx]'),'BhNgf':function(_0x290df9,_0x2607a3,_0x4fd422){return _0x290df9(_0x2607a3,_0x4fd422);},'WwmEh':_0x5849('82','06ff')};let _0x339d26=_0x5849('83','Fc]w');return new Promise(_0x492b9e=>{var _0x1e233e={'Owwhv':_0x349859['aYUis'],'sesmD':function(_0x3ff5c8){return _0x3ff5c8();}};$[_0x5849('84','q[Lc')](_0x349859['BhNgf'](taskUrl_2,_0x349859['WwmEh'],_0x339d26),(_0x259b3a,_0x5bba7d,_0x120b20)=>{try{if(_0x259b3a){console[_0x5849('85','xilP')](''+JSON[_0x5849('4f','K4Kt')](_0x259b3a));}else{if(_0x120b20){_0x120b20=JSON[_0x5849('86','da8n')](_0x120b20);if(_0x120b20['result']['hasOwnProperty'](_0x1e233e[_0x5849('87','ON1v')])){$[_0x5849('88','(Pu6')]=_0x120b20[_0x5849('89','ON1v')][_0x5849('8a','@Uu&')];}}}}catch(_0x7051e2){$['logErr'](_0x7051e2);}finally{_0x1e233e[_0x5849('8b',']uc@')](_0x492b9e);}});});}function getHome(_0xc4006f=![],_0x469964=![]){var _0x121b6f={'wjsfL':_0x5849('8c','7mHk'),'nFNzL':function(_0x404e55,_0x42e92b){return _0x404e55===_0x42e92b;},'joptP':function(_0x35cd6b,_0x5f1690){return _0x35cd6b+_0x5f1690;},'aemVL':_0x5849('8d','!4I2'),'wKJkH':function(_0x5a36fb){return _0x5a36fb();},'IMJpJ':function(_0x1a14f6,_0x5d4982,_0x45dbe8){return _0x1a14f6(_0x5d4982,_0x45dbe8);}};let _0x3c9695=_0x5849('8e','q[Lc');return new Promise(_0x40823b=>{$[_0x5849('8f','K4Kt')](_0x121b6f[_0x5849('90','TaT8')](taskUrl_2,_0x5849('91','7*Su'),_0x3c9695),(_0x4aa196,_0x3243d6,_0x2b881e)=>{try{if(_0x4aa196){console['log'](''+JSON[_0x5849('92','iQFn')](_0x4aa196));}else{if(_0x2b881e){var _0x10650d=_0x5849('93','&!KX')[_0x5849('94','aoEO')]('|'),_0x1f2794=0x0;while(!![]){switch(_0x10650d[_0x1f2794++]){case'0':if(_0xc4006f){$['fragments']=_0x2b881e[_0x5849('95','xilP')][_0x5849('96','WEKQ')][_0x5849('97','%K9t')][_0x5849('98','Em8Q')];}continue;case'1':if(_0x2b881e['result'][_0x5849('99','rAaI')][_0x5849('9a','K4Kt')]===0x1){$[_0x5849('9b','Rd*j')]=!![];console[_0x5849('7f','7*Su')](_0x121b6f[_0x5849('9c','TaT8')]);return;}continue;case'2':if(_0x2b881e['code']==='3'){$[_0x5849('9d',']01z')]=!![];console[_0x5849('9e','^#ew')](_0x121b6f[_0x5849('9f','uE93')]);return;}continue;case'3':if(_0x121b6f[_0x5849('a0','^#ew')](_0x2b881e[_0x5849('a1','iAl2')][_0x5849('a2','rAaI')],'2')){$['risk']=!![];console[_0x5849('a3','vFQX')](_0x121b6f[_0x5849('a4','ON1v')](_0x2b881e[_0x5849('a5','Fc]w')][_0x5849('a6','TaT8')],_0x121b6f[_0x5849('a7','eEly')]));return;}continue;case'4':if(_0x469964){$[_0x5849('a8','4#S#')]=_0x2b881e[_0x5849('a9','@Uu&')]['data'][_0x5849('aa','^#ew')][0x0];$[_0x5849('ab','K4Kt')]=_0x2b881e[_0x5849('ac','aoEO')][_0x5849('25','q[Lc')][_0x5849('ad','8v&)')];}continue;case'5':_0x2b881e=JSON[_0x5849('ae','eEly')](_0x2b881e);continue;}break;}}}}catch(_0x259f4f){$['logErr'](_0x259f4f);}finally{_0x121b6f[_0x5849('af','TaT8')](_0x40823b);}});});}function taskUrl_2(_0xc12a5f,_0x23ef17){var _0x5d6482={'ZUtEB':function(_0x268b13,_0x30d781){return _0x268b13(_0x30d781);},'hhAZV':'keep-alive','otbRP':'application/json,\x20text/plain,\x20*/*','lKrYa':_0x5849('b0','67b@'),'tmGJr':_0x5849('b1','Fc]w'),'zNyoR':_0x5849('b2','FB)o'),'zYndl':_0x5849('b3','Aet0')};return{'url':_0x5849('b4','^#ew')+_0xc12a5f+_0x5849('b5','!4I2')+_0x5d6482[_0x5849('b6','rAaI')](encodeURIComponent,_0x23ef17),'headers':{'Host':_0x5849('b7','iAl2'),'Origin':_0x5849('b8','^%[D'),'Connection':_0x5d6482['hhAZV'],'Accept':_0x5d6482['otbRP'],'User-Agent':_0x5d6482['lKrYa'],'Accept-Language':_0x5d6482['tmGJr'],'Referer':_0x5d6482['zNyoR'],'Accept-Encoding':_0x5d6482['zYndl'],'Cookie':cookie}};};_0xodm='jsjiami.com.v6';

function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
