(function(){var g="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(c.get||c.set)throw new TypeError("ES3 does not support getters and setters.");a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)},k="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this;function l(){l=function(){};k.Symbol||(k.Symbol=m)}var n=0;function m(a){return"jscomp_symbol_"+(a||"")+n++}
function p(){l();var a=k.Symbol.iterator;a||(a=k.Symbol.iterator=k.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&g(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return q(this)}});p=function(){}}function q(a){var b=0;return r(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})}function r(a){p();a={next:a};a[k.Symbol.iterator]=function(){return this};return a}function t(a){p();var b=a[Symbol.iterator];return b?b.call(a):q(a)}
function u(a){for(var b,c=[];!(b=a.next()).done;)c.push(b.value);return c}function v(a,b,c,d){if("function"==typeof d){var e=c.get("buildHitTask");return{buildHitTask:function(c){c.set(a,null,!0);c.set(b,null,!0);d(c,void 0,void 0);e(c)}}}return w({},a,b)}function x(a,b){var c;return function(d){for(var e=[],f=0;f<arguments.length;++f)e[f-0]=arguments[f];clearTimeout(c);c=setTimeout(function(){return a.apply(null,[].concat(e instanceof Array?e:u(t(e))))},b)}}
var w=Object.assign||function(a,b){for(var c=[],d=1;d<arguments.length;++d)c[d-1]=arguments[d];for(var d=0,e=c.length;d<e;d++){var f=Object(c[d]),h;for(h in f)Object.prototype.hasOwnProperty.call(f,h)&&(a[h]=f[h])}return a},y={i:1,j:2,l:3,f:4,o:5,s:6,u:7,v:8,w:9,m:10},z=Object.keys(y).length,A={};
function B(a,b){var c=y.f;a.set("\x26_av","2.4.1");var d=a.get("\x26_au"),d=parseInt(d||"0",16).toString(2);if(d.length<z)for(var e=z-d.length;e;)d="0"+d,e--;c=z-c;d=d.substr(0,c)+1+d.substr(c+1);a.set("\x26_au",parseInt(d||"0",2).toString(16));window.matchMedia&&(this.a=w({changeTemplate:this.changeTemplate,changeTimeout:1E3,fieldsObj:{}},b),b=this.a.definitions,"object"==typeof b&&null!==b&&(b=this.a.definitions,this.a.definitions=Array.isArray(b)?b:[b],this.b=a,this.c=[],C(this)))}
function C(a){a.a.definitions.forEach(function(b){if(b.name&&b.dimensionIndex){var c=D(b);a.b.set("dimension"+b.dimensionIndex,c);E(a,b)}})}function D(a){var b;a.items.forEach(function(a){F(a.media).matches&&(b=a)});return b?b.name:"(not set)"}
function E(a,b){b.items.forEach(function(c){c=F(c.media);var d=x(function(){var c=D(b),d=a.b.get("dimension"+b.dimensionIndex);c!==d&&(a.b.set("dimension"+b.dimensionIndex,c),c={transport:"beacon",eventCategory:b.name,eventAction:"change",eventLabel:a.a.changeTemplate(d,c),nonInteraction:!0},a.b.send("event",v(c,a.a.fieldsObj,a.b,a.a.hitFilter)))},a.a.changeTimeout);c.addListener(d);a.c.push({h:c,g:d})})}B.prototype.remove=function(){for(var a=0,b;b=this.c[a];a++)b.h.removeListener(b.g)};
B.prototype.changeTemplate=function(a,b){return a+" \x3d\x3e "+b};(function(a,b){var c=window.GoogleAnalyticsObject||"ga";window[c]=window[c]||function(a){for(var b=[],d=0;d<arguments.length;++d)b[d-0]=arguments[d];(window[c].q=window[c].q||[]).push(b)};window.gaDevIds=window.gaDevIds||[];0>window.gaDevIds.indexOf("i5iSjo")&&window.gaDevIds.push("i5iSjo");window[c]("provide",a,b);window.gaplugins=window.gaplugins||{};window.gaplugins[a.charAt(0).toUpperCase()+a.slice(1)]=b})("mediaQueryTracker",B);
function F(a){return A[a]||(A[a]=window.matchMedia(a))};})();
//# sourceMappingURL=autotrack.js.map