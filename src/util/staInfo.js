import $store from '@/vuex'
import $ from 'jquery'

function staInfo() {

  var source = {
    IP: '',
    system: {
      systemType: '',
      sysName: '',
      sysEn: ''
    },
    se: {
      seType: '',
      seName: '',
      seUrl: '',
      seKeyword: ''
    },
    browser: {
      browserType: '',
      browserNum: ''
    },
    finalyUrl: '',
    resolution: '',
    conpanyId: ''
  }

  //获取公网IP
  function getIp() {
    $.ajax({
      url: 'http://ip-api.com/json',
      type: 'get',
      success: function(data) {
        source.IP = data.query
        console.log(data)
      }
    });
  }
  getIp()

  //搜索引擎关键词
  function getDomainQuery(url) {
    var d = [];
    var st = url.indexOf('//', 1);
    var _domain = url.substring(st + 1, url.length);
    var et = _domain.indexOf('/', 1);
    d.push(_domain.substring(1, et));
    d.push(_domain.substring(et + 1, url.length));
    return d
  }

  function route() {
    var eg = [];
    eg.push(['baidu', 'wd']);
    eg.push(['google', 'q']);
    eg.push(['soso', 'w']);
    eg.push(['yodao', 'q']);
    eg.push(['bing', 'q']);
    eg.push(['yahoo', 'q']);
    eg.push(['sogou', 'query']);
    eg.push(['gougou', 'search']);
    eg.push(['360', 'q']);

    var url = 'https://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=1&rsv_idx=1&tn=baidu&wd=新睿云&oq=%25E6%2596%25B0%25E7%259D%25BF%25E4%25BA%2591&rsv_pq=9852bbbc0001c18d&rsv_t=d79cfHdOIInWXo%2BOSFKSKzXggYGO6aFeypVp97XxiLhIg4NKPXoVK64hdhM&rqlang=cn&rsv_enter=0&rsv_dl=ts_0&prefixsug=%25E6%2596%25B0%25E7%259D%25BF%25E4%25BA%2591&rsp=0&rsv_sug=1';
    var dq = getDomainQuery(url);

    var keyword = null;
    var grep = null;
    var str = null;

    for (var el in eg) {
      var s = eg[el];
      var DandQ = String(s).split(","); //字符分割
      if (dq[0].indexOf(DandQ[0]) > 0) {
        eval("grep=/" + DandQ[1] + "\=.*\&/i;");
        str = dq[1].match(grep);
        keyword = str.toString().split("=")[1].split("&")[0];
        //关键词
        keyword = decodeURIComponent(keyword);
        source.se.seKeyword = keyword;
        return false;
      }
    }
  }
  route();

  //搜索引擎
  function getSE() {
    var prev = 'https://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=1&rsv_idx=1&tn=baidu&wd=新睿云&oq=%25E6%2596%25B0%25E7%259D%25BF%25E4%25BA%2591&rsv_pq=9852bbbc0001c18d&rsv_t=d79cfHdOIInWXo%2BOSFKSKzXggYGO6aFeypVp97XxiLhIg4NKPXoVK64hdhM&rqlang=cn&rsv_enter=0&rsv_dl=ts_0&prefixsug=%25E6%2596%25B0%25E7%259D%25BF%25E4%25BA%2591&rsp=0&rsv_sug=1';
    //var prev = document.referrer;
    if (prev == '') {
      source.se.seName = '其他'
      source.se.seUrl = document.URL
    } else {
      var regexp = new RegExp("\.(baidu|sogou|so|google|bing)(\.(com|cn))", "ig")
      var seInfo = regexp.exec(prev)
      if (seInfo != null) {
        source.se.seType = 'www' + seInfo[0];
        source.se.seName = seInfo[1];
        source.se.seUrl = seInfo.input
      }
    }
  }
  getSE()

  //获取访问设备
  function getSystem() {
    var uA = navigator.userAgent.toLowerCase();
    var ipad = uA.match(/ipad/i) == "ipad";
    var iphone = uA.match(/iphone os/i) == "iphone os";
    var midp = uA.match(/midp/i) == "midp";
    var uc7 = uA.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var uc = uA.match(/ucweb/i) == "ucweb";
    var android = uA.match(/android/i) == "android";
    var windowsce = uA.match(/windows ce/i) == "windows ce";
    var windowsmd = uA.match(/windows mobile/i) == "windows mobile";
    if (!(ipad || iphone || midp || uc7 || uc || android || windowsce || windowsmd)) {
      // PC 端
      source.system.sysName = '桌面';
      source.system.systemType = 'PC端';
    } else {
      // 移动端
      source.system.systemType = '移动端';
      if (android) {
        // 安卓
        source.system.sysName = '安卓'
        source.system.sysEn = 'android'
      } else if (iphone) {
        //苹果
        source.system.sysName = '苹果'
        source.system.sysEn = 'ios'
      } else if (ipad) {
        //ipad
        source.system.sysName = '平板'
        source.system.sysEn = 'ipad'
      }
    }
  }

  //浏览器内核和版本号
  function getBrowser(n) {
    var ua = navigator.userAgent.toLowerCase(),
      s,
      name = '',
      ver = 0;
    //探测浏览器
    (s = ua.match(/msie ([\d.]+)/)) ? _set("ie", _toFixedVersion(s[1])):
      (s = ua.match(/firefox\/([\d.]+)/)) ? _set("firefox", _toFixedVersion(s[1])) :
      (s = ua.match(/chrome\/([\d.]+)/)) ? _set("chrome", _toFixedVersion(s[1])) :
      (s = ua.match(/opera.([\d.]+)/)) ? _set("opera", _toFixedVersion(s[1])) :
      (s = ua.match(/version\/([\d.]+).*safari/)) ? _set("safari", _toFixedVersion(s[1])) : 0;

    function _toFixedVersion(ver, floatLength) {
      ver = ('' + ver).replace(/_/g, '.');
      floatLength = floatLength || 1;
      ver = String(ver).split('.');
      ver = ver[0] + '.' + (ver[1] || '0');
      ver = Number(ver).toFixed(floatLength);
      return ver;
    }

    function _set(bname, bver) {
      name = bname;
      ver = bver;
    }
    return (n == 'n' ? name : (n == 'v' ? ver : name + ver));
  };

  //用户企业id
  source.conpanyId = $store.state.userInfo != null ? $store.state.userInfo.companyid : ''

  //设备信息
  getSystem()

  //浏览器内核及版本号
  source.browser.browserType = getBrowser("n"); // 所获得的就是浏览器所用内核。
  source.browser.browserNum = getBrowser("v"); // 所获得的就是浏览器的版本号。
  var browser = getBrowser(); // 所获得的就是浏览器内核加版本号。

  //设备分辨率
  source.resolution = window.screen.height + 'x' + window.screen.width

  //最后访问路径
  source.finalyUrl = document.URL

  //console.log(source)
  return source;
}
staInfo()
//console.log(staInfo())
