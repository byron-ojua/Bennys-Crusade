(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['userSideBar'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"sidebar\" id= \""
    + alias4(((helper = (helper = lookupProperty(helpers,"idNum") || (depth0 != null ? lookupProperty(depth0,"idNum") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"idNum","hash":{},"data":data,"loc":{"start":{"line":1,"column":26},"end":{"line":1,"column":35}}}) : helper)))
    + "\">\r\n	<div class=\"sidebar-text\">\r\n		<p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":3,"column":5},"end":{"line":3,"column":13}}}) : helper)))
    + "</p>\r\n	</div>\r\n</div>";
},"useData":true});
})();