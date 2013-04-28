
    // author: (c) 2011 by Lorenz Lo Sauer; lsauer.com
    // 
    // Permission is hereby granted, free of charge, to any person obtaining a copy
    // of this software and associated documentation files (the "Software"), to deal
    // in the Software without restriction, including without limitation the rights
    // to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    // copies of the Software, and to permit persons to whom the Software is
    // furnished to do so, subject to the following conditions:
    // 
    // The above copyright notice and this permission notice shall be included in
    // all copies or substantial portions of the Software.
    // 
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    // AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    // LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    // OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    // THE SOFTWARE.
    //
    // Design & Source-Code  10/2011 by Lo Sauer, MIT-LICENSE or BSD-LICENSE
		/**
		* islib: see here for more; any unused functions are stripped
		*/
var gist = (function(){
				var _log = []
				,_self = this
				,_selfname = 'is'

  return {
   fnSort : {'numasc' : function(a,b){return a-b}, 'numdesc': function(a,b){return b-a},'numascInt' : function(a,b){return parseInt(a)-parseInt(b)},'numdescInt' : function(a,b){return parseInt(b)-parseInt(a)}},
    libload :     function(scope, lib){lib=lib||_selfname;scope=scope||_self; var _me= this; if( scope && scope[lib] && scope[lib].constructor.toString().match(/Object|Function/) ){var _ref = scope[lib], _pref=null;for(var i =0;i<10; i++){ if( !_ref['__proto__'] ){_pref['__proto__'] = _me; delete _me; delete _ref; delete _pref; break;}else{_pref = _ref; _ref = _ref['__proto__']; }}}else{	scope[lib] = _me; delete _me} return this;},
    xhrStatus : {},    //holds the status of the most recent XHR call
    Debug : false,    //<boolean> e.g. allow failing by throwing errors, logging...
    XMLHTTP :         [ 'Msxml2.XMLHTTP.4.0', 'Msxml2.XMLHTTP', 'Microsoft.XMLHTTP' ], 
    get XHRActiveX()  { return this.IE && window.location.protocol === 'file:'; }, //check in IE 7, to overcome some bugs
    get QuirksMode()  { return document.compatMode === 'BackCompat'},
    set XHRStatus(o)  { this.xhrStatus = o;}, //204:OK, 304 cache, 1223 IE bug ( 204 translated to 1223?)
    get XHRStatus()   { return this.XHRStatusOK(this.xhrStatus); },
    XHRStatusOK :     function(o){ if(undefined == o) var o = this.xhrStatus; return (o.status >= 200 && o.status < 300) || o.status == 304 || o.status == 1223 || false; },
    get newXhrObj()   { if( typeof XMLHttpRequest !== 'undefined') return new XMLHttpRequest; else if(window.ActiveXObject) for(var i=3; i--;){ try{ var xhttp = new ActiveXObject( this.XMLHTTP[i] ); return  xhttp; }catch(e){ is.Warn(e); } } return false; },
    set Exit(e)       { throw e; }, //quits the script
    Basename :        function(s)   { if(undefined===s) s = window.location.href; return s.replace(/([/]{2,})/g,'\/').substr(0, s.lastIndexOf('\/')+1)},
    getFile :       function(url,m,fn,fnm) {m=m||"GET";if(m&&m.constructor !== String){fn=m; m="GET";}; var x = this.newXhrObj; if(!x) return new Error('no XMLHttpRequest-Object');if (!(/^http/).test(url)) { /* no transfer protocol specified -> relative url?*/var l=window.location; url =l.origin+l.pathname+url;} x.open(m||"GET", url, !!fn);if(fn)x.onreadystatechange=fnm?fn:function(){if (x.readyState==4 && x.status==200){fn.apply(this, [x.responseText].concat(arguments));}}; x.send(null); return x.responseText; },
    XMLString :       function(s)   { var dom = false; if ( s && s.constructor === String ){ if( this.IE ){ dom = new ActiveXObject("MSXML2.DOMDocument"); dom.async = false;  dom = dom.loadXML(s); } else{ dom = new DOMParser(); dom = dom.parseFromString(s, "text/xml"); } }  return dom; },
    //passthrough Error function e.g. scenario in a function ....return is.Error(e, false); -> processes the error and returns false
    Error :           function(e,ret){ if( this.Debug){ throw e; } else{ if(this.Object(e)){ for(i in e) console.error(e[i]);} else console.error ? console.error(e) : console.log('Error: '+e); } return typeof ret !== 'undefined' ? ret : e;},
    Warn :            function(e,ret){ if( this.Debug){ console.warn(e); } return typeof ret !== 'undefined' ? ret : e;},
    get log()       { for(var i=0; i<_log.length;i++){console.log(i,_log[i]);} return _log; }, //e.g. true === is.log.indexOf('myentry')
    set log()       {  _log.push(arguments[0]); console.log( arguments );  }, //e.g. is.log = 'log this fu bar'; is.log = 'another log entry'
    logger : function(o){ _log.push(arguments[0]); console.log( arguments ); },
    DomInsertAfter :  function(ne,nn){var sbl = ne.nextSibling; ne.parentNode.insertBefore(nn, sbl); return sbl;},
    DOMwrap :     function(s,el, attr) { var nel = document.createElement(s); for(var i in attr){nel.setAttribute(i,attr[i]);} this.DomInsertAfter(el, nel); nel.insertBefore(el); return nel;},

    DOMcloneTo : function (el, nel, m) { var nne = el.cloneNode(false===m?false:true); return nel.appendChild(nne);},
    DOMsetParent : function (el, nel) {return nel.appendChild(el);},
    Keys:             function(o)   { var k=[]; for(var prop in o) {k.push(prop);} return k;},
    Values:           function(o)   { var v = []; for (var prop in o) { v.push(o[prop]) } return v; },    //e.g. can  convert Array-like objects (arguments,..) to Array
    //sorts a dictionary of number values and keys; e.g. is.sortDict(wrdhist,null,null,'numdescInt')
    sortDict:         function(o,i,s,sfn,sp,bro) { var a=[],r=i||0,s=s||';', v=this.Values(o),k=this.Keys(o); if(r){var tmp = k; k=v; v=tmp;} for(var j=0;j<k.length;j++){a.push(this.strpad(v[j],sp)+s+k[j]);} var ret = a.sort(this.fnSort[sfn||'numascInt']); return bro?(ret.map(function(e,i,a){var splt=e.split(/;/), o ={}; o[splt[0]] = splt[1]; return o;})) : (ret);},  //i = reverses keys/values, s...separator symbol, ab....sortfn, sp...padding string, bro ...return object (boolean)
    strpad :          function(s,p,r) { p =p||'00000000'; var st=p.substr(s.length); return r?s+st:st+s;}, //r... pad right (boolean), p = padstring; e.g. strpad(100,null,true)
	// `arrayInitialize`: initializes a 1D array or 2D array, with the option of generating diagonal matrices
//	@param size Int|{Array [[n],[m]]} size of the array to be initialized as an Integer or 2d array containing n, m Integers
//	@param val {Object} value to initialize the elements with. Usually a number
//	@param diag {Array} optional value to initialize the diagonal elements with. Usually a number
//	@param half {Int} optional value of 0, -1 or +1, determines which half is filled. +1: upper/right. -1: lower/left, 0: diagonal line
//	@return {Array [[,..],[,...],...]} 2D array containing a passed value
//	@example: arrayInitialize([2,3],1)

arrayInitialize : function(size, val, diag, half) {
	var _array = [];
	
	if (typeof size === "number") {
		for (var i = 0; i < size; i++) {
			_array[i] = val;
		}
	} else if (typeof size === "object" && size.length === 2) {
		for (i = 0; i < size[0]; i++) {
			_array[i] = new Array();
			for (j = 0; j < size[1]; j++) {
				//'diag' allows to set set diagonal array
				_array[i][j] = (i == j && typeof diag !== 'undefined') 
				|| (typeof half !== 'undefined' && 0 > half && i >= j) 
				|| (typeof half !== 'undefined' && 0 < half && i <= j) 
				? diag : val;
			//console.log( "[%s][%s]:%s",i,j,val ); //add "\n" when % size[0]
			}
		}
	} else {
		throw new TypeError("Size argument must be an integer(1-D) or array(2-D)");
	}
	//prettyprint array function
	_array.prettyprint = 
	_array.prt2 = function() {
		var _size = size;
		var s = this.toString().split(/,/).map(function(e, i, a) {
			return (i + 1) % (_size[1] || _size[0]) ? e : e + " |\n|";
		}).join(" ");
		return '|' + s.substr(0, s.length - 1)
	};
	return _array;
},
    dummyTest : function(){ console.log("foo is a dummy."); },    //holds the status of the most recent XHR call
  };
})()
