!function(){var a=Handlebars.template,e=Handlebars.templates=Handlebars.templates||{};e.articlesList=a({compiler:[7,">= 4.0.0"],main:function(a,e,l,n,t){var s,i=null!=e?e:{},r=l.helperMissing,c="function",o=a.escapeExpression;return"<article id="+o((s=null!=(s=l.articleid||(null!=e?e.articleid:e))?s:r,typeof s===c?s.call(i,{name:"articleid",hash:{},data:t}):s))+' class="article">\n    <section class="featuredImage">\n        <img src="'+o((s=null!=(s=l.featuredImage||(null!=e?e.featuredImage:e))?s:r,typeof s===c?s.call(i,{name:"featuredImage",hash:{},data:t}):s))+'" alt="" />\n    </section>\n    <section class="articleContent">\n        <a href="#"><h3>'+o((s=null!=(s=l.title||(null!=e?e.title:e))?s:r,typeof s===c?s.call(i,{name:"title",hash:{},data:t}):s))+"</h3></a>\n        <h6>"+o((s=null!=(s=l.category||(null!=e?e.category:e))?s:r,typeof s===c?s.call(i,{name:"category",hash:{},data:t}):s))+'</h6>\n    </section>\n    <section class="impressions">\n        '+o((s=null!=(s=l.impressions||(null!=e?e.impressions:e))?s:r,typeof s===c?s.call(i,{name:"impressions",hash:{},data:t}):s))+'\n    </section>\n    <div class="clearfix"></div>\n</article>\n'},useData:!0}),e.preview=a({compiler:[7,">= 4.0.0"],main:function(a,e,l,n,t){var s,i=null!=e?e:{},r=l.helperMissing,c="function",o=a.escapeExpression;return"<div id="+o((s=null!=(s=l.previewid||(null!=e?e.previewid:e))?s:r,typeof s===c?s.call(i,{name:"previewid",hash:{},data:t}):s))+' class="container">\n    <h1>'+o((s=null!=(s=l.title||(null!=e?e.title:e))?s:r,typeof s===c?s.call(i,{name:"title",hash:{},data:t}):s))+"</h1>\n    <p>"+o((s=null!=(s=l.ptext||(null!=e?e.ptext:e))?s:r,typeof s===c?s.call(i,{name:"ptext",hash:{},data:t}):s))+'</p>\n    <a href="'+o((s=null!=(s=l.url||(null!=e?e.url:e))?s:r,typeof s===c?s.call(i,{name:"url",hash:{},data:t}):s))+'" class="popUpAction" target="_blank">Read more from '+o((s=null!=(s=l.source||(null!=e?e.source:e))?s:r,typeof s===c?s.call(i,{name:"source",hash:{},data:t}):s))+"</a>\n</div>\n"},useData:!0})}();
