(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[155],{482:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return m}});var r=n(7896),o=n(1461),a=n(7294),c=n(6277),l=n(9489),s=n(2581),i="anchorWithStickyNavbar_LWe7",u="anchorWithHideOnScrollNavbar_WYt5",d=["as","id"];function m(e){var t=e.as,n=e.id,m=(0,o.Z)(e,d),p=(0,s.L)().navbar.hideOnScroll;return"h1"!==t&&n?a.createElement(t,(0,r.Z)({},m,{className:(0,c.Z)("anchor",p?u:i),id:n}),m.children,a.createElement("a",{className:"hash-link",href:"#"+n,title:(0,l.I)({id:"theme.common.headingLinkTitle",message:"Direct link to heading",description:"Title for link to heading"})},"\u200b")):a.createElement(t,(0,r.Z)({},m,{id:void 0}))}},5155:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return ae}});var r=n(7896),o=n(7294),a=n(1461),c=n(6506),l=["mdxType","originalType"];var s=n(8864),i=n(6277),u=n(7775),d=n(3343),m=n(737),p="codeBlockContainer_Ckt0",f=["as"];function g(e){var t=e.as,n=(0,a.Z)(e,f),c=(0,u.p)(),l=(0,d.QC)(c);return o.createElement(t,(0,r.Z)({},n,{style:l,className:(0,i.Z)(n.className,p,m.k.common.codeBlock)}))}var h={codeBlockContent:"codeBlockContent_biex",codeBlockTitle:"codeBlockTitle_Ktv7",codeBlock:"codeBlock_bY9V",codeBlockStandalone:"codeBlockStandalone_MEMb",codeBlockLines:"codeBlockLines_e6Vv",codeBlockLinesWithNumbering:"codeBlockLinesWithNumbering_o6Pm",buttonGroup:"buttonGroup__atx"};function v(e){var t=e.children,n=e.className;return o.createElement(g,{as:"pre",tabIndex:0,className:(0,i.Z)(h.codeBlockStandalone,"thin-scrollbar",n)},o.createElement("code",{className:h.codeBlockLines},t))}var y=n(2581),b=n(7545),k={plain:{backgroundColor:"#2a2734",color:"#9a86fd"},styles:[{types:["comment","prolog","doctype","cdata","punctuation"],style:{color:"#6c6783"}},{types:["namespace"],style:{opacity:.7}},{types:["tag","operator","number"],style:{color:"#e09142"}},{types:["property","function"],style:{color:"#9a86fd"}},{types:["tag-id","selector","atrule-id"],style:{color:"#eeebff"}},{types:["attr-name"],style:{color:"#c4b9fe"}},{types:["boolean","string","entity","url","attr-value","keyword","control","directive","unit","statement","regex","at-rule","placeholder","variable"],style:{color:"#ffcc99"}},{types:["deleted"],style:{textDecorationLine:"line-through"}},{types:["inserted"],style:{textDecorationLine:"underline"}},{types:["italic"],style:{fontStyle:"italic"}},{types:["important","bold"],style:{fontWeight:"bold"}},{types:["important"],style:{color:"#c4b9fe"}}]},E={Prism:n(7410).Z,theme:k};function N(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function B(){return B=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},B.apply(this,arguments)}var C=/\r\n|\r|\n/,Z=function(e){0===e.length?e.push({types:["plain"],content:"\n",empty:!0}):1===e.length&&""===e[0].content&&(e[0].content="\n",e[0].empty=!0)},L=function(e,t){var n=e.length;return n>0&&e[n-1]===t?e:e.concat(t)},T=function(e,t){var n=e.plain,r=Object.create(null),o=e.styles.reduce((function(e,n){var r=n.languages,o=n.style;return r&&!r.includes(t)||n.types.forEach((function(t){var n=B({},e[t],o);e[t]=n})),e}),r);return o.root=n,o.plain=B({},n,{backgroundColor:null}),o};function j(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&-1===t.indexOf(r)&&(n[r]=e[r]);return n}var w=function(e){function t(){for(var t=this,n=[],r=arguments.length;r--;)n[r]=arguments[r];e.apply(this,n),N(this,"getThemeDict",(function(e){if(void 0!==t.themeDict&&e.theme===t.prevTheme&&e.language===t.prevLanguage)return t.themeDict;t.prevTheme=e.theme,t.prevLanguage=e.language;var n=e.theme?T(e.theme,e.language):void 0;return t.themeDict=n})),N(this,"getLineProps",(function(e){var n=e.key,r=e.className,o=e.style,a=B({},j(e,["key","className","style","line"]),{className:"token-line",style:void 0,key:void 0}),c=t.getThemeDict(t.props);return void 0!==c&&(a.style=c.plain),void 0!==o&&(a.style=void 0!==a.style?B({},a.style,o):o),void 0!==n&&(a.key=n),r&&(a.className+=" "+r),a})),N(this,"getStyleForToken",(function(e){var n=e.types,r=e.empty,o=n.length,a=t.getThemeDict(t.props);if(void 0!==a){if(1===o&&"plain"===n[0])return r?{display:"inline-block"}:void 0;if(1===o&&!r)return a[n[0]];var c=r?{display:"inline-block"}:{},l=n.map((function(e){return a[e]}));return Object.assign.apply(Object,[c].concat(l))}})),N(this,"getTokenProps",(function(e){var n=e.key,r=e.className,o=e.style,a=e.token,c=B({},j(e,["key","className","style","token"]),{className:"token "+a.types.join(" "),children:a.content,style:t.getStyleForToken(a),key:void 0});return void 0!==o&&(c.style=void 0!==c.style?B({},c.style,o):o),void 0!==n&&(c.key=n),r&&(c.className+=" "+r),c})),N(this,"tokenize",(function(e,t,n,r){var o={code:t,grammar:n,language:r,tokens:[]};e.hooks.run("before-tokenize",o);var a=o.tokens=e.tokenize(o.code,o.grammar,o.language);return e.hooks.run("after-tokenize",o),a}))}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.render=function(){var e=this.props,t=e.Prism,n=e.language,r=e.code,o=e.children,a=this.getThemeDict(this.props),c=t.languages[n];return o({tokens:function(e){for(var t=[[]],n=[e],r=[0],o=[e.length],a=0,c=0,l=[],s=[l];c>-1;){for(;(a=r[c]++)<o[c];){var i=void 0,u=t[c],d=n[c][a];if("string"==typeof d?(u=c>0?u:["plain"],i=d):(u=L(u,d.type),d.alias&&(u=L(u,d.alias)),i=d.content),"string"==typeof i){var m=i.split(C),p=m.length;l.push({types:u,content:m[0]});for(var f=1;f<p;f++)Z(l),s.push(l=[]),l.push({types:u,content:m[f]})}else c++,t.push(u),n.push(i),r.push(0),o.push(i.length)}c--,t.pop(),n.pop(),r.pop(),o.pop()}return Z(l),s}(void 0!==c?this.tokenize(t,r,c,n):[r]),className:"prism-code language-"+n,style:void 0!==a?a.root:{},getLineProps:this.getLineProps,getTokenProps:this.getTokenProps})},t}(o.Component),S=w,_="codeLine_lJS_",x="codeLineNumber_Tfdd",O="codeLineContent_feaV";function I(e){var t=e.line,n=e.classNames,a=e.showLineNumbers,c=e.getLineProps,l=e.getTokenProps;1===t.length&&"\n"===t[0].content&&(t[0].content="");var s=c({line:t,className:(0,i.Z)(n,a&&_)}),u=t.map((function(e,t){return o.createElement("span",(0,r.Z)({key:t},l({token:e,key:t})))}));return o.createElement("span",s,a?o.createElement(o.Fragment,null,o.createElement("span",{className:x}),o.createElement("span",{className:O},u)):o.createElement(o.Fragment,null,u,o.createElement("br",null)))}var A=n(9489),P={copyButtonCopied:"copyButtonCopied_obH4",copyButtonIcons:"copyButtonIcons_eSgA",copyButtonIcon:"copyButtonIcon_y97N",copyButtonSuccessIcon:"copyButtonSuccessIcon_LjdS"};function V(e){var t=e.code,n=e.className,r=(0,o.useState)(!1),a=r[0],c=r[1],l=(0,o.useRef)(void 0),s=(0,o.useCallback)((function(){!function(e,t){var n=(void 0===t?{}:t).target,r=void 0===n?document.body:n,o=document.createElement("textarea"),a=document.activeElement;o.value=e,o.setAttribute("readonly",""),o.style.contain="strict",o.style.position="absolute",o.style.left="-9999px",o.style.fontSize="12pt";var c=document.getSelection(),l=!1;c.rangeCount>0&&(l=c.getRangeAt(0)),r.append(o),o.select(),o.selectionStart=0,o.selectionEnd=e.length;var s=!1;try{s=document.execCommand("copy")}catch(i){}o.remove(),l&&(c.removeAllRanges(),c.addRange(l)),a&&a.focus()}(t),c(!0),l.current=window.setTimeout((function(){c(!1)}),1e3)}),[t]);return(0,o.useEffect)((function(){return function(){return window.clearTimeout(l.current)}}),[]),o.createElement("button",{type:"button","aria-label":a?(0,A.I)({id:"theme.CodeBlock.copied",message:"Copied",description:"The copied button label on code blocks"}):(0,A.I)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),title:(0,A.I)({id:"theme.CodeBlock.copy",message:"Copy",description:"The copy button label on code blocks"}),className:(0,i.Z)("clean-btn",n,P.copyButton,a&&P.copyButtonCopied),onClick:s},o.createElement("span",{className:P.copyButtonIcons,"aria-hidden":"true"},o.createElement("svg",{className:P.copyButtonIcon,viewBox:"0 0 24 24"},o.createElement("path",{d:"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"})),o.createElement("svg",{className:P.copyButtonSuccessIcon,viewBox:"0 0 24 24"},o.createElement("path",{d:"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"}))))}var D="wordWrapButtonIcon_Bwma",z="wordWrapButtonEnabled_EoeP";function W(e){var t=e.className,n=e.onClick,r=e.isEnabled,a=(0,A.I)({id:"theme.CodeBlock.wordWrapToggle",message:"Toggle word wrap",description:"The title attribute for toggle word wrapping button of code block lines"});return o.createElement("button",{type:"button",onClick:n,className:(0,i.Z)("clean-btn",t,r&&z),"aria-label":a,title:a},o.createElement("svg",{className:D,viewBox:"0 0 24 24","aria-hidden":"true"},o.createElement("path",{fill:"currentColor",d:"M4 19h6v-2H4v2zM20 5H4v2h16V5zm-3 6H4v2h13.25c1.1 0 2 .9 2 2s-.9 2-2 2H15v-2l-3 3l3 3v-2h2c2.21 0 4-1.79 4-4s-1.79-4-4-4z"})))}function H(e){var t,n=e.children,a=e.className,c=void 0===a?"":a,l=e.metastring,s=e.title,m=e.showLineNumbers,p=e.language,f=(0,y.L)().prism,v=f.defaultLanguage,k=f.magicComments,N=null!=(t=null!=p?p:(0,d.Vo)(c))?t:v,B=(0,u.p)(),C=(0,b.F)(),Z=(0,d.bc)(l)||s,L=(0,d.nZ)(n,{metastring:l,language:N,magicComments:k}),T=L.lineClassNames,j=L.code,w=null!=m?m:(0,d.nt)(l);return o.createElement(g,{as:"div",className:(0,i.Z)(c,N&&!c.includes("language-"+N)&&"language-"+N)},Z&&o.createElement("div",{className:h.codeBlockTitle},Z),o.createElement("div",{className:h.codeBlockContent},o.createElement(S,(0,r.Z)({},E,{theme:B,code:j,language:null!=N?N:"text"}),(function(e){var t=e.className,n=e.tokens,r=e.getLineProps,a=e.getTokenProps;return o.createElement("pre",{tabIndex:0,ref:C.codeBlockRef,className:(0,i.Z)(t,h.codeBlock,"thin-scrollbar")},o.createElement("code",{className:(0,i.Z)(h.codeBlockLines,w&&h.codeBlockLinesWithNumbering)},n.map((function(e,t){return o.createElement(I,{key:t,line:e,getLineProps:r,getTokenProps:a,classNames:T[t],showLineNumbers:w})}))))})),o.createElement("div",{className:h.buttonGroup},(C.isEnabled||C.isCodeScrollable)&&o.createElement(W,{className:h.codeButton,onClick:function(){return C.toggle()},isEnabled:C.isEnabled}),o.createElement(V,{className:h.codeButton,code:j}))))}var M=["children"];function R(e){var t=e.children,n=(0,a.Z)(e,M),c=(0,s.Z)(),l=function(e){return o.Children.toArray(e).some((function(e){return(0,o.isValidElement)(e)}))?e:Array.isArray(e)?e.join(""):e}(t),i="string"==typeof l?H:v;return o.createElement(i,(0,r.Z)({key:String(c)},n),l)}var F=n(3095);var q=n(3151),$="details_lb9f",G="isBrowser_bmU9",Y="collapsibleContent_i85q",Q=["summary","children"];function U(e){return!!e&&("SUMMARY"===e.tagName||U(e.parentElement))}function J(e,t){return!!e&&(e===t||J(e.parentElement,t))}function K(e){var t=e.summary,n=e.children,c=(0,a.Z)(e,Q),l=(0,s.Z)(),u=(0,o.useRef)(null),d=(0,q.u)({initialState:!c.open}),m=d.collapsed,p=d.setCollapsed,f=(0,o.useState)(c.open),g=f[0],h=f[1];return o.createElement("details",(0,r.Z)({},c,{ref:u,open:g,"data-collapsed":m,className:(0,i.Z)($,l&&G,c.className),onMouseDown:function(e){U(e.target)&&e.detail>1&&e.preventDefault()},onClick:function(e){e.stopPropagation();var t=e.target;U(t)&&J(t,u.current)&&(e.preventDefault(),m?(p(!1),h(!0)):p(!0))}}),null!=t?t:o.createElement("summary",null,"Details"),o.createElement(q.z,{lazy:!1,collapsed:m,disableSSRStyle:!0,onCollapseTransitionEnd:function(e){p(e),h(!e)}},o.createElement("div",{className:Y},n)))}var X="details_b_Ee";function ee(e){var t=Object.assign({},e);return o.createElement(K,(0,r.Z)({},t,{className:(0,i.Z)("alert alert--info",X,t.className)}))}var te=n(482);function ne(e){return o.createElement(te.default,e)}var re="containsTaskList_mC6p";var oe="img_ev3q";var ae={head:function(e){var t=o.Children.map(e.children,(function(e){return o.isValidElement(e)?function(e){var t;if(null!=(t=e.props)&&t.mdxType&&e.props.originalType){var n=e.props,r=(n.mdxType,n.originalType,(0,a.Z)(n,l));return o.createElement(e.props.originalType,r)}return e}(e):e}));return o.createElement(c.Z,e,t)},code:function(e){var t=["a","b","big","i","span","em","strong","sup","sub","small"];return o.Children.toArray(e.children).every((function(e){return"string"==typeof e&&!e.includes("\n")||(0,o.isValidElement)(e)&&t.includes(e.props.mdxType)}))?o.createElement("code",e):o.createElement(R,e)},a:function(e){return o.createElement(F.default,e)},pre:function(e){var t;return o.createElement(R,(0,o.isValidElement)(e.children)&&"code"===(null==(t=e.children.props)?void 0:t.originalType)?e.children.props:Object.assign({},e))},details:function(e){var t=o.Children.toArray(e.children),n=t.find((function(e){var t;return o.isValidElement(e)&&"summary"===(null==(t=e.props)?void 0:t.mdxType)})),a=o.createElement(o.Fragment,null,t.filter((function(e){return e!==n})));return o.createElement(ee,(0,r.Z)({},e,{summary:n}),a)},ul:function(e){return o.createElement("ul",(0,r.Z)({},e,{className:(t=e.className,(0,i.Z)(t,(null==t?void 0:t.includes("contains-task-list"))&&re))}));var t},img:function(e){return o.createElement("img",(0,r.Z)({loading:"lazy"},e,{className:(t=e.className,(0,i.Z)(t,oe))}));var t},h1:function(e){return o.createElement(ne,(0,r.Z)({as:"h1"},e))},h2:function(e){return o.createElement(ne,(0,r.Z)({as:"h2"},e))},h3:function(e){return o.createElement(ne,(0,r.Z)({as:"h3"},e))},h4:function(e){return o.createElement(ne,(0,r.Z)({as:"h4"},e))},h5:function(e){return o.createElement(ne,(0,r.Z)({as:"h5"},e))},h6:function(e){return o.createElement(ne,(0,r.Z)({as:"h6"},e))}}},7545:function(e,t,n){"use strict";n.d(t,{F:function(){return o}});var r=n(7294);function o(){var e=(0,r.useState)(!1),t=e[0],n=e[1],o=(0,r.useState)(!1),a=o[0],c=o[1],l=(0,r.useRef)(null),s=(0,r.useCallback)((function(){var e=l.current.querySelector("code");t?e.removeAttribute("style"):e.style.whiteSpace="pre-wrap",n((function(e){return!e}))}),[l,t]),i=(0,r.useCallback)((function(){var e=l.current,t=e.scrollWidth>e.clientWidth||l.current.querySelector("code").hasAttribute("style");c(t)}),[l]);return(0,r.useEffect)((function(){i()}),[t,i]),(0,r.useEffect)((function(){return window.addEventListener("resize",i,{passive:!0}),function(){window.removeEventListener("resize",i)}}),[i]),{codeBlockRef:l,isEnabled:t,isCodeScrollable:a,toggle:s}}},7775:function(e,t,n){"use strict";n.d(t,{p:function(){return a}});var r=n(746),o=n(2581);function a(){var e=(0,o.L)().prism,t=(0,r.I)().colorMode,n=e.theme,a=e.darkTheme||n;return"dark"===t?a:n}},3343:function(e,t,n){"use strict";n.d(t,{QC:function(){return f},Vo:function(){return m},bc:function(){return u},nZ:function(){return p},nt:function(){return d}});var r=n(252),o=n(4501),a=n.n(o),c=(0,r.Z)(/title=(["'])(.*?)\1/,{quote:1,title:2}),l=(0,r.Z)(/\{([\d,-]+)\}/,{range:1}),s={js:{start:"\\/\\/",end:""},jsBlock:{start:"\\/\\*",end:"\\*\\/"},jsx:{start:"\\{\\s*\\/\\*",end:"\\*\\/\\s*\\}"},bash:{start:"#",end:""},html:{start:"\x3c!--",end:"--\x3e"}};function i(e,t){var n=e.map((function(e){var n=s[e],r=n.start,o=n.end;return"(?:"+r+"\\s*("+t.flatMap((function(e){var t,n;return[e.line,null==(t=e.block)?void 0:t.start,null==(n=e.block)?void 0:n.end].filter(Boolean)})).join("|")+")\\s*"+o+")"})).join("|");return new RegExp("^\\s*(?:"+n+")\\s*$")}function u(e){var t,n;return null!=(t=null==e||null==(n=e.match(c))?void 0:n.groups.title)?t:""}function d(e){return Boolean(null==e?void 0:e.includes("showLineNumbers"))}function m(e){var t=e.split(" ").find((function(e){return e.startsWith("language-")}));return null==t?void 0:t.replace(/language-/,"")}function p(e,t){var n=e.replace(/\n$/,""),r=t.language,o=t.magicComments,c=t.metastring;if(c&&l.test(c)){var u=c.match(l).groups.range;if(0===o.length)throw new Error("A highlight range has been given in code block's metastring (``` "+c+"), but no magic comment config is available. Docusaurus applies the first magic comment entry's className for metastring ranges.");var d=o[0].className,m=a()(u).filter((function(e){return e>0})).map((function(e){return[e-1,[d]]}));return{lineClassNames:Object.fromEntries(m),code:n}}if(void 0===r)return{lineClassNames:{},code:n};for(var p=function(e,t){switch(e){case"js":case"javascript":case"ts":case"typescript":return i(["js","jsBlock"],t);case"jsx":case"tsx":return i(["js","jsBlock","jsx"],t);case"html":return i(["js","jsBlock","html"],t);case"python":case"py":case"bash":return i(["bash"],t);case"markdown":case"md":return i(["html","jsx","bash"],t);default:return i(Object.keys(s),t)}}(r,o),f=n.split("\n"),g=Object.fromEntries(o.map((function(e){return[e.className,{start:0,range:""}]}))),h=Object.fromEntries(o.filter((function(e){return e.line})).map((function(e){var t=e.className;return[e.line,t]}))),v=Object.fromEntries(o.filter((function(e){return e.block})).map((function(e){var t=e.className;return[e.block.start,t]}))),y=Object.fromEntries(o.filter((function(e){return e.block})).map((function(e){var t=e.className;return[e.block.end,t]}))),b=0;b<f.length;){var k=f[b].match(p);if(k){var E=k.slice(1).find((function(e){return void 0!==e}));h[E]?g[h[E]].range+=b+",":v[E]?g[v[E]].start=b:y[E]&&(g[y[E]].range+=g[y[E]].start+"-"+(b-1)+","),f.splice(b,1)}else b+=1}n=f.join("\n");var N={};return Object.entries(g).forEach((function(e){var t=e[0],n=e[1].range;a()(n).forEach((function(e){null!=N[e]||(N[e]=[]),N[e].push(t)}))})),{lineClassNames:N,code:n}}function f(e){var t={color:"--prism-color",backgroundColor:"--prism-background-color"},n={};return Object.entries(e.plain).forEach((function(e){var r=e[0],o=e[1],a=t[r];a&&"string"==typeof o&&(n[a]=o)})),n}},4501:function(e,t){function n(e){let t,n=[];for(let r of e.split(",").map((e=>e.trim())))if(/^-?\d+$/.test(r))n.push(parseInt(r,10));else if(t=r.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/)){let[e,r,o,a]=t;if(r&&a){r=parseInt(r),a=parseInt(a);const e=r<a?1:-1;"-"!==o&&".."!==o&&"\u2025"!==o||(a+=e);for(let t=r;t!==a;t+=e)n.push(t)}}return n}t.default=n,e.exports=n}}]);