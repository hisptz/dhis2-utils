"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[298],{7515:function(e,n,r){r.d(n,{D:function(){return a},f:function(){return c}});var t=r(7294),u=r(8832),o=Symbol("EmptyContext"),i=t.createContext(o);function a(e){var n=e.children,r=(0,t.useState)(null),u=r[0],o=r[1],a=(0,t.useMemo)((function(){return{expandedItem:u,setExpandedItem:o}}),[u]);return t.createElement(i.Provider,{value:a},n)}function c(){var e=(0,t.useContext)(i);if(e===o)throw new u.i6("DocSidebarItemsExpandedStateProvider");return e}},3618:function(e,n,r){r.d(n,{a:function(){return i}});var t=r(7294),u=r(1347),o=r(8279);function i(e){var n=e.threshold,r=(0,t.useState)(!1),i=r[0],a=r[1],c=(0,t.useRef)(!1),l=(0,u.Ct)(),s=l.startScroll,f=l.cancelScroll;return(0,u.RF)((function(e,r){var t=e.scrollY,u=null==r?void 0:r.scrollY;u&&(c.current?c.current=!1:t>=u?(f(),a(!1)):t<n?a(!1):t+window.innerHeight<document.documentElement.scrollHeight&&a(!0))})),(0,o.S)((function(e){e.location.hash&&(c.current=!0,a(!1))})),{shown:i,scrollToTop:function(){return s(0)}}}},360:function(e,n,r){r.d(n,{S:function(){return c}});var t=r(7294),u=r(2581);function o(e){var n=e.getBoundingClientRect();return n.top===n.bottom?o(e.parentNode):n}function i(e,n){var r,t,u=n.anchorTopOffset,i=e.find((function(e){return o(e).top>=u}));return i?function(e){return e.top>0&&e.bottom<window.innerHeight/2}(o(i))?i:null!=(t=e[e.indexOf(i)-1])?t:null:null!=(r=e[e.length-1])?r:null}function a(){var e=(0,t.useRef)(0),n=(0,u.L)().navbar.hideOnScroll;return(0,t.useEffect)((function(){e.current=n?0:document.querySelector(".navbar").clientHeight}),[n]),e}function c(e){var n=(0,t.useRef)(void 0),r=a();(0,t.useEffect)((function(){if(!e)return function(){};var t=e.linkClassName,u=e.linkActiveClassName,o=e.minHeadingLevel,a=e.maxHeadingLevel;function c(){var e=function(e){return Array.from(document.getElementsByClassName(e))}(t),c=function(e){for(var n=e.minHeadingLevel,r=e.maxHeadingLevel,t=[],u=n;u<=r;u+=1)t.push("h"+u+".anchor");return Array.from(document.querySelectorAll(t.join()))}({minHeadingLevel:o,maxHeadingLevel:a}),l=i(c,{anchorTopOffset:r.current}),s=e.find((function(e){return l&&l.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)}));e.forEach((function(e){!function(e,r){r?(n.current&&n.current!==e&&n.current.classList.remove(u),e.classList.add(u),n.current=e):e.classList.remove(u)}(e,e===s)}))}return document.addEventListener("scroll",c),document.addEventListener("resize",c),c(),function(){document.removeEventListener("scroll",c),document.removeEventListener("resize",c)}}),[e,r])}},637:function(e,n,r){r.r(n),r.d(n,{AnnouncementBarProvider:function(){return C.pl},Collapsible:function(){return h.z},ColorModeProvider:function(){return I.S},DEFAULT_SEARCH_TAG:function(){return s.HX},DocSidebarItemsExpandedStateProvider:function(){return u.D},DocsPreferredVersionContextProvider:function(){return g.L5},DocsSidebarProvider:function(){return i.b},DocsVersionProvider:function(){return o.q},HtmlClassNameProvider:function(){return D.FG},NavbarProvider:function(){return k.V},NavbarSecondaryMenuFiller:function(){return O.Zo},PageMetadata:function(){return D.d},PluginHtmlClassNameProvider:function(){return D.VC},ReactContextError:function(){return F.i6},ScrollControllerProvider:function(){return x.OC},TabGroupChoiceProvider:function(){return w.z},ThemeClassNames:function(){return b.k},containsLineNumbers:function(){return l.nt},createStorageSlot:function(){return a.W},docVersionSearchTag:function(){return s.os},duplicates:function(){return p.l},findFirstCategoryLink:function(){return f.Wl},findSidebarCategory:function(){return f.em},getPrismCssVariables:function(){return l.QC},isActiveSidebarItem:function(){return f._F},isDocsPluginEnabled:function(){return f.cE},isMultiColumnFooterLinks:function(){return T.a},isRegexpStringMatch:function(){return H.F},isSamePath:function(){return M.Mg},keyboardFocusedClassName:function(){return B.h},listStorageKeys:function(){return a._},listTagsByLetters:function(){return P.P},parseCodeBlockTitle:function(){return l.bc},parseLanguage:function(){return l.Vo},parseLines:function(){return l.nZ},splitNavbarItems:function(){return k.A},translateTagsPageTitle:function(){return P.M},uniq:function(){return p.j},useAlternatePageUtils:function(){return c.l},useAnnouncementBar:function(){return C.nT},useBackToTopButton:function(){return V.a},useCodeWordWrap:function(){return Q.F},useCollapsible:function(){return h.u},useColorMode:function(){return I.I},useContextualSearchFilters:function(){return s._q},useCurrentSidebarCategory:function(){return f.jA},useDocById:function(){return f.xz},useDocRouteMetadata:function(){return f.hI},useDocSidebarItemsExpandedState:function(){return u.f},useDocsPreferredVersion:function(){return g.J},useDocsPreferredVersionByPluginId:function(){return g.Oh},useDocsSidebar:function(){return i.V},useDocsVersion:function(){return o.E},useDocsVersionCandidates:function(){return f.lO},useDynamicCallback:function(){return F.ed},useFilteredAndTreeifiedTOC:function(){return y.b},useHideableNavbar:function(){return A.c},useHistoryPopHandler:function(){return L.R},useHomePageRoute:function(){return M.Ns},useIsomorphicLayoutEffect:function(){return F.LI},useKeyboardNavigation:function(){return B.t},useLayoutDoc:function(){return f.vY},useLayoutDocsSidebar:function(){return f.oz},useLocalPathname:function(){return S.b},useLocationChange:function(){return v.S},useLockBodyScroll:function(){return j.N},useNavbarMobileSidebar:function(){return N.e},useNavbarSecondaryMenu:function(){return R.Y},usePluralForm:function(){return m.c},usePrevious:function(){return F.D9},usePrismTheme:function(){return _.p},useScrollController:function(){return x.sG},useScrollPosition:function(){return x.RF},useScrollPositionBlocker:function(){return x.o5},useSearchPage:function(){return Y},useSidebarBreadcrumbs:function(){return f.s1},useSkipToContent:function(){return Z.a},useSmoothScrollTo:function(){return x.Ct},useTOCHighlight:function(){return E.S},useTabGroupChoice:function(){return w.U},useThemeConfig:function(){return t.L},useTitleFormatter:function(){return d.p},useTreeifiedTOC:function(){return y.a},useWindowSize:function(){return U.i}});var t=r(2581),u=r(7515),o=r(8173),i=r(1127),a=r(1647),c=r(5477),l=r(3343),s=r(5411),f=r(4140),d=r(1598),m=r(4796),v=r(8279),h=r(3151),g=r(6109),p=r(3171),b=r(737),C=r(4650),S=r(9259),P=r(6444),L=r(1026),E=r(360),y=r(1981),T=r(4405),x=r(1347),F=r(8832),H=r(1622),M=r(5775),D=r(5203),I=r(746),k=r(4629),w=r(9e3),N=r(5760),O=r(431),R=r(1393),V=r(3618),A=r(5119),B=r(2228),_=r(7775),j=r(693),U=r(3293),z=r(7294),q=r(6775),G=r(1106),W="q";function Y(){var e=(0,q.k6)(),n=(0,G.default)().siteConfig.baseUrl,r=(0,z.useState)(""),t=r[0],u=r[1];return(0,z.useEffect)((function(){var e,n=null!=(e=new URLSearchParams(window.location.search).get(W))?e:"";u(n)}),[]),{searchQuery:t,setSearchQuery:(0,z.useCallback)((function(n){var r=new URLSearchParams(window.location.search);n?r.set(W,n):r.delete(W),e.replace({search:r.toString()}),u(n)}),[e]),generateSearchPageLink:(0,z.useCallback)((function(e){return n+"search?"+"q="+encodeURIComponent(e)}),[n])}}var Q=r(7545),Z=r(4799)},6444:function(e,n,r){r.d(n,{M:function(){return u},P:function(){return o}});var t=r(9489),u=function(){return(0,t.I)({id:"theme.tags.tagsPageTitle",message:"Tags",description:"The title of the tag list page"})};function o(e){var n={};return Object.values(e).forEach((function(e){var r=function(e){return e[0].toUpperCase()}(e.label);null!=n[r]||(n[r]=[]),n[r].push(e)})),Object.entries(n).sort((function(e,n){var r=e[0],t=n[0];return r.localeCompare(t)})).map((function(e){return{letter:e[0],tags:e[1].sort((function(e,n){return e.label.localeCompare(n.label)}))}}))}},1981:function(e,n,r){r.d(n,{a:function(){return a},b:function(){return l}});var t=r(1461),u=r(7294),o=["parentIndex"];function i(e){var n=e.map((function(e){return Object.assign({},e,{parentIndex:-1,children:[]})})),r=Array(7).fill(-1);n.forEach((function(e,n){var t=r.slice(2,e.level);e.parentIndex=Math.max.apply(Math,t),r[e.level]=n}));var u=[];return n.forEach((function(e){var r=e.parentIndex,i=(0,t.Z)(e,o);r>=0?n[r].children.push(i):u.push(i)})),u}function a(e){return(0,u.useMemo)((function(){return i(e)}),[e])}function c(e){var n=e.toc,r=e.minHeadingLevel,t=e.maxHeadingLevel;return n.flatMap((function(e){var n=c({toc:e.children,minHeadingLevel:r,maxHeadingLevel:t});return function(e){return e.level>=r&&e.level<=t}(e)?[Object.assign({},e,{children:n})]:n}))}function l(e){var n=e.toc,r=e.minHeadingLevel,t=e.maxHeadingLevel;return(0,u.useMemo)((function(){return c({toc:i(n),minHeadingLevel:r,maxHeadingLevel:t})}),[n,r,t])}},4796:function(e,n,r){r.d(n,{c:function(){return l}});var t=r(7294),u=r(1106),o=["zero","one","two","few","many","other"];function i(e){return o.filter((function(n){return e.includes(n)}))}var a={locale:"en",pluralForms:i(["one","other"]),select:function(e){return 1===e?"one":"other"}};function c(){var e=(0,u.default)().i18n.currentLocale;return(0,t.useMemo)((function(){try{return n=e,r=new Intl.PluralRules(n),{locale:n,pluralForms:i(r.resolvedOptions().pluralCategories),select:function(e){return r.select(e)}}}catch(t){return console.error('Failed to use Intl.PluralRules for locale "'+e+'".\nDocusaurus will fallback to the default (English) implementation.\nError: '+t.message+"\n"),a}var n,r}),[e])}function l(){var e=c();return{selectMessage:function(n,r){return function(e,n,r){var t=e.split("|");if(1===t.length)return t[0];t.length>r.pluralForms.length&&console.error("For locale="+r.locale+", a maximum of "+r.pluralForms.length+" plural forms are expected ("+r.pluralForms.join(",")+"), but the message contains "+t.length+": "+e);var u=r.select(n),o=r.pluralForms.indexOf(u);return t[Math.min(o,t.length-1)]}(r,n,e)}}}},4112:function(e,n,r){Object.defineProperty(n,"__esModule",{value:!0});var t=function(e){return e&&e.__esModule?e:{default:e}}(r(7294));n.Footer=function(){return t.default.createElement("footer",{className:"tsd-footer"},"Powered by"," ",t.default.createElement("a",{href:"https://github.com/milesj/docusaurus-plugin-typedoc-api"},"docusaurus-plugin-typedoc-api")," ","and ",t.default.createElement("a",{href:"https://typedoc.org/"},"TypeDoc"))}},319:function(e,n,r){Object.defineProperty(n,"__esModule",{value:!0});var t=r(7294),u=r(3095),o=r(9551),i=r(637),a=function(e){return e&&e.__esModule?e:{default:e}},c=a(t),l=a(u);n.VersionBanner=function(e){var n=e.versionMetadata,r=n.banner,u=n.pluginId,a=n.version,s=o.useDocVersionSuggestions(u).latestVersionSuggestion,f=i.useDocsPreferredVersion(u).savePreferredVersionName,d=t.useCallback((function(){f(s.name)}),[s.name,f]);if(!r||!s)return null;var m=n.docs[s.label];return c.default.createElement("div",{className:i.ThemeClassNames.docs.docVersionBanner+" alert alert--warning margin-bottom--md",role:"alert"},c.default.createElement("div",null,"unreleased"===r&&c.default.createElement(c.default.Fragment,null,"This is documentation for an unreleased version."),"unmaintained"===r&&c.default.createElement(c.default.Fragment,null,"This is documentation for version ",c.default.createElement("b",null,a),".")," ","For the latest API, see version"," ",c.default.createElement("b",null,c.default.createElement(l.default,{to:m.id,onClick:d},m.title)),"."))}}}]);