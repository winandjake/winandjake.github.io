// https://github.com/MatthewRayfield/tumblr-infinite-scrolling
// tried to reverse engineer these mf variable names, holy fuck

var tumblrAutoPager = {
    url: "http://proto.jp/",
    ver: "0.1.7",
    rF: true,
    posts: {},
    parentNode: null,
    parentNodeId: "",
    location: location.hostname,
    init: function() {
        if ($("autopagerize_icon")) return;
        var self = tumblrAutoPager;
        
        var page = 1;
        
        var locationHref = location.href;
        
        var locationHrefLastIdxPage = locationHref.lastIndexOf("/page/");
        var locationHrefLastIdxTagged = locationHref.lastIndexOf("/tagged/");
        
        if (locationHrefLastIdxPage != -1) {
            page = parseInt(locationHref.slice(locationHrefLastIdxPage + 6));
            self.location = locationHref.slice(7, locationHrefLastIdxPage);
        } else if (locationHrefLastIdxTagged != -1) {
            self.location = locationHref.slice(7);
            if (self.location.slice(self.location.length - 1) == "/") {
                self.location = self.location.slice(0, self.location.length - 1);
            }
        } else if (location.protocol + "//" + self.location + "/" != locationHref) {
            return;
        };
        
        var getPostFunctions = [];
        
        getPostFunctions[0] = function(allElements) {
            var ret = [];
            for (var i = 0, l = allElements.length; i < l; i++) {
                if (allElements[i].className == "autopagerize_page_element") {
                    ret = getChildElements(allElements[i]);
                    break;
                }
            }
            return ret;
        };
        
        getPostFunctions[1] = function(allElements) {
            var ret = [];
            for (var i = 0, l = allElements.length; i < l; i++) {
		        allElements[i].classList.forEach(item => {
                    if (item == "post") {
                        ret.push(allElements[i]);
                    }
		        });
            }
            return ret;
        };
        
        getPostFunctions[2] = function(allElements) {
            var ret = [];
            var tmpId = self.parentNodeId ? [self.parentNodeId] : ["posts", "main", "container", "content", "apDiv2", "wrapper", "projects"];
            for (var i = 0, l = allElements.length; i < l; i++) {
                for (var j = 0; j < tmpId.length; j++) {
                    if (allElements[i].id == tmpId[j]) {
                        ret = getChildElements(allElements[i]);
                        self.parentNodeId = allElements[i].id;
                        break;
                    }
                }
            }
            return ret;
        };
        
        for (var i = 0; i < getPostFunctions.length; i++) {
            var getElems = getPostFunctions[i](document.body.getElementsByTagName('*'));
            if (getElems.length) {
                self.posts = getPostFunctions[i];
                self.parentNode = getElems[0].parentNode;
                break;
            }
        }

        function getChildElements(pElem) {
            var ret = [];
            for (var i = 0, l = pElem.childNodes.length; i < l; i++) {
                ret.push(pElem.childNodes.item(i))
            }
            return ret;
        }
        
        if (!self.parentNode) {
            return;
        }

        sendRequest.README = {
            license: 'Public Domain',
            url: 'http://jsgt.org/lib/ajax/ref.htm',
            version: 0.516,
            author: 'Toshiro Takahashi'
        };

        function chkAjaBrowser() {
            var A, B = navigator.userAgent;
            this.bw = {
                safari: ((A = B.split('AppleWebKit/')[1]) ? A.split('(')[0].split('.')[0] : 0) >= 124,
                konqueror: ((A = B.split('Konqueror/')[1]) ? A.split(';')[0] : 0) >= 3.3,
                mozes: ((A = B.split('Gecko/')[1]) ? A.split(' ')[0] : 0) >= 20011128,
                opera: (!!window.opera) && ((typeof XMLHttpRequest) == 'function'),
                msie: (!!window.ActiveXObject) ? (!!createHttpRequest()) : false
            };
            return (this.bw.safari || this.bw.konqueror || this.bw.mozes || this.bw.opera || this.bw.msie)
        }

        function createHttpRequest() {
            if (window.XMLHttpRequest) {
                return new XMLHttpRequest()
            } else {
                if (window.ActiveXObject) {
                    try {
                        return new ActiveXObject('Msxml2.XMLHTTP')
                    } catch (B) {
                        try {
                            return new ActiveXObject('Microsoft.XMLHTTP')
                        } catch (A) {
                            return null
                        }
                    }
                } else {
                    return null
                }
            }
        };

        function sendRequest(callback, body, method, url, async, addTime, user, password) {
            var isGet = method.toUpperCase() == 'GET';
            
            var req = createHttpRequest();
            if (req == null) {
                return null;
            }

            if ((addTime) ? addTime : false) {
                url += ((url.indexOf('?') == -1) ? '?' : '&') + 't=' + (new Date()).getTime()
            }
            
            var userAgentChk = new chkAjaBrowser();
            var isOpera = userAgentChk.bw.opera;
            var isSafari = userAgentChk.bw.safari;
            var isKonqueror = userAgentChk.bw.konqueror;
            var isMozes = userAgentChk.bw.mozes;
            
            if (typeof callback == 'object') {
                var onLoad = callback.onload;
                var onBeforeSetHeader = callback.onbeforsetheader
            } else {
                var onLoad = callback;
                var onBeforeSetHeader = null
            }

            if (isOpera || isSafari || isMozes) {
                req.onload = function() {
                    onLoad(req);
                    req.abort()
                }
            } else {
                req.onreadystatechange = function() {
                    if (req.readyState == 4) {
                        onLoad(req);
                        req.abort()
                    }
                }
            }
            
            body = processBody(body, url);
            
            if (isGet) {
                url += ((url.indexOf('?') == -1) ? '?' : (body == '') ? '' : '&') + body;
            }
            
            req.open(method, url, async, user, password);
            
            if (!!onBeforeSetHeader) {
                onBeforeSetHeader(req)
            }
            
            setReqHeaders(req);
            
            req.send(body);

            function setReqHeaders(T) {
                if (!isOpera || typeof T.setRequestHeader == 'function') {
                    T.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
                }
                return T
            }

            function processBody(body, url) {
                var queryParams = [];
                if (typeof body == 'object') {
                    for (var key in body) {
                        addQueryParam(key, body[key])
                    }
                } else {
                    if (typeof body == 'string') {
                        if (body == '') {
                            return ''
                        }
                        if (body.charAt(0) == '&') {
                            body = body.substring(1, body.length)
                        }
                        var split = body.split('&');
                        for (var key = 0; key < split.length; key++) {
                            var innerSplit = split[key].split('=');
                            addQueryParam(innerSplit[0], innerSplit[1])
                        }
                    }
                }

                function addQueryParam(key, value) {
                    queryParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(value))
                }
            
                return queryParams.join('&')
            }
            
            return req
        }

        function addNextPage(oj) {
            if (oj.status == 404) {
                self.remainFlg = false;
                return;
            }
            
            var div = document.createElement("div");
            div.innerHTML = oj.responseText;

            var posts = self.posts(div.getElementsByTagName("*"));
            if (posts.length < 2) {
                self.rF = false;
                return;
            }
            
            div = document.createElement("div");
            div.className = "tumblrAutoPager_page_info";
            
            self.parentNode.appendChild(div);
            
            for (var i = 0; i < posts.length; i++) {
                self.parentNode.appendChild(posts[i]);
            }
            
            var footer = $("footer");
            footer ? footer.parentNode.appendChild(footer) : null;
            
            self.rF = true;
        }

        watch_scroll();

        function watch_scroll() {
            var target = document.compatMode == "BackCompat" ? document.body : document.documentElement;
            
            var dist = target.scrollHeight - target.clientHeight - (target.scrollTop || document.body.scrollTop);
            if (dist < target.clientHeight * 2 && self.rF) {
                self.rF = false;
                page++;
                sendRequest(addNextPage, "", "GET", location.protocol + "//" + self.location + "/page/" + page, true);
            }
            
            setTimeout(arguments.callee, 200);
        };

        function $(id) {
            return document.getElementById(id)
        };
    },
    switchAutoPage: function() {
        this.rF = !this.rF;
        var allElements = document.getElementsByTagName('*');
        for (var i = 0, l = allElements.length; i < l; i++) {
            if (allElements[i].className == "tAP_switch") {
                allElements[i].firstChild.nodeValue = this.rF ? "AutoPage[OFF]" : "AutoPage[ON]";
            }
        }
    }
};

if (window.addEventListener) {
    window.addEventListener('load', tumblrAutoPager.init, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", tumblrAutoPager.init);
} else {
    window.onload = tumblrAutoPager.init;
}