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
    + "\">\r\n	<div class=\"sidebar-text\" id=\"sideBar"
    + alias4(((helper = (helper = lookupProperty(helpers,"idNum") || (depth0 != null ? lookupProperty(depth0,"idNum") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"idNum","hash":{},"data":data,"loc":{"start":{"line":2,"column":38},"end":{"line":2,"column":47}}}) : helper)))
    + "\">\r\n		"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":3,"column":2},"end":{"line":3,"column":10}}}) : helper)))
    + "\r\n		<div class=\"reserveOrTroopCount\" id=\"player"
    + alias4(((helper = (helper = lookupProperty(helpers,"idNum") || (depth0 != null ? lookupProperty(depth0,"idNum") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"idNum","hash":{},"data":data,"loc":{"start":{"line":4,"column":45},"end":{"line":4,"column":54}}}) : helper)))
    + "\">0</div>\r\n	</div>\r\n	\r\n</div>";
},"useData":true});
})();