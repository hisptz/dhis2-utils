"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[610],{4864:function(e,t,a){a.d(t,{Z:function(){return s}});var n=a(7294),l=a(9489),r=a(5060);function s(e){var t=e.metadata,a=t.previousPage,s=t.nextPage;return n.createElement("nav",{className:"pagination-nav","aria-label":(0,l.I)({id:"theme.blog.paginator.navAriaLabel",message:"Blog list page navigation",description:"The ARIA label for the blog pagination"})},a&&n.createElement(r.Z,{permalink:a,title:n.createElement(l.Z,{id:"theme.blog.paginator.newerEntries",description:"The label used to navigate to the newer blog posts page (previous page)"},"Newer Entries")}),s&&n.createElement(r.Z,{permalink:s,title:n.createElement(l.Z,{id:"theme.blog.paginator.olderEntries",description:"The label used to navigate to the older blog posts page (next page)"},"Older Entries"),isNext:!0}))}},3120:function(e,t,a){a.r(t),a.d(t,{default:function(){return d}});var n=a(7294),l=a(6277),r=a(9489),s=a(4796),o=a(5203),i=a(737),g=a(3095),c=a(9890),m=a(5662),p=a(4864),u=a(7651);function d(e){var t,a=e.tag,d=e.items,h=e.sidebar,b=e.listMetadata,f=(t=(0,s.c)().selectMessage,function(e){return t(e,(0,r.I)({id:"theme.blog.post.plurals",description:'Pluralized label for "{count} posts". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One post|{count} posts"},{count:e}))}),E=(0,r.I)({id:"theme.blog.tagTitle",description:"The title of the page for a blog tag",message:'{nPosts} tagged with "{tagName}"'},{nPosts:f(a.count),tagName:a.label});return n.createElement(o.FG,{className:(0,l.Z)(i.k.wrapper.blogPages,i.k.page.blogTagPostListPage)},n.createElement(o.d,{title:E}),n.createElement(u.Z,{tag:"blog_tags_posts"}),n.createElement(c.Z,{sidebar:h},n.createElement("header",{className:"margin-bottom--xl"},n.createElement("h1",null,E),n.createElement(g.default,{href:a.allTagsPath},n.createElement(r.Z,{id:"theme.tags.tagsPageLink",description:"The label of the link targeting the tag list page"},"View All Tags"))),d.map((function(e){var t=e.content;return n.createElement(m.Z,{key:t.metadata.permalink,frontMatter:t.frontMatter,assets:t.assets,metadata:t.metadata,truncated:!0},n.createElement(t,null))})),n.createElement(p.Z,{metadata:b})))}}}]);