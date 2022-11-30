(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['mapElem'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<path\ndata-neighbor=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"neighbor") || (depth0 != null ? lookupProperty(depth0,"neighbor") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"neighbor","hash":{},"data":data,"loc":{"start":{"line":2,"column":15},"end":{"line":2,"column":27}}}) : helper)))
    + "\"\ndata-troops="
    + alias4(((helper = (helper = lookupProperty(helpers,"troops") || (depth0 != null ? lookupProperty(depth0,"troops") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"troops","hash":{},"data":data,"loc":{"start":{"line":3,"column":12},"end":{"line":3,"column":22}}}) : helper)))
    + "\ndata-owner=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"owner") || (depth0 != null ? lookupProperty(depth0,"owner") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"owner","hash":{},"data":data,"loc":{"start":{"line":4,"column":12},"end":{"line":4,"column":21}}}) : helper)))
    + "\"\ndata-name=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":5,"column":11},"end":{"line":5,"column":19}}}) : helper)))
    + "\"\nfill=\"none\"\nid=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":7,"column":4},"end":{"line":7,"column":10}}}) : helper)))
    + "\"\nstroke=\"#000000\"\nclass=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"class") || (depth0 != null ? lookupProperty(depth0,"class") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"class","hash":{},"data":data,"loc":{"start":{"line":9,"column":7},"end":{"line":9,"column":16}}}) : helper)))
    + "\"\nd=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"path") || (depth0 != null ? lookupProperty(depth0,"path") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"path","hash":{},"data":data,"loc":{"start":{"line":10,"column":3},"end":{"line":10,"column":11}}}) : helper)))
    + "\"\n/>\n";
},"useData":true});
})();