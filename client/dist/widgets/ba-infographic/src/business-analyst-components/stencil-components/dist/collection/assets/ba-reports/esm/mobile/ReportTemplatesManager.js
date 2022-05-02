import{ArcGISClient}from"./ArcGISClient";import{GEClient}from"./GEClient";import{WebAppSettings}from"./WebAppSettings";import{SettingsHelper}from"./SettingsHelper";var ReportTemplatesManager=function(){function e(){}return e._condenseResultsArray=function(e){return e.map((function(e){return{id:e.id,title:e.title}}))},e.getReportTemplates=function(t,r){return void 0===r&&(r=!1),new Promise((function(n,o){var i={ge:void 0,shared:void 0,user:void 0,favoriteIds:void 0};ArcGISClient.executeSelf().then((function(a){var s=a.user.username;Promise.allSettled([e._getSharedCustomReportTemplateItems(s),e._getMyCustomReportTemplateItems(s),e._getFavoriteReportsIds(s,t)]).then((function(a){i.ge=a[0].value?a[0].value:[],i.shared=e._createReportTemplateInfos(a[1]&&a[1].value?a[1].value:[],t),i.user=e._createReportTemplateInfos(a[2]&&a[2].value?a[2].value:[],t),i.favoriteIds=a[3]&&a[3].value?a[3].value:[],WebAppSettings.getDisabledReports().then((function(t){var o=i.ge,a=i.shared;null!=o&&(i.ge=o.filter((function(e){return!t[e.reportID]})),null!=a&&(i.shared=a.filter((function(e){return!t[e.reportID.itemid]})))),r||(i.ge=e._condenseResultsArray(i.ge),i.shared=e._condenseResultsArray(i.shared),i.user=e._condenseResultsArray(i.user),i.favoriteIds=e._condenseResultsArray(i.favoriteIds)),n(i)})).catch((function(e){return o(e)}))}))})).catch((function(e){return o(e)}))}))},e._getGEReportTemplates=function(t){return new Promise((function(r,n){var o=e._geReportTemplatesCache[t];o?r(o):GEClient.execute({taskPath:"/GeoEnrichment/Reports/"+t}).then((function(n){var o=n.reports;e._geReportTemplatesCache[t]=o,r(o)})).catch(n)}))},e._getSharedCustomReportTemplateItems=function(t){var r='type:"Report Template" (access:shared OR access:org) typekeywords:(esriWebReport NOT esriWebInfographicReport) NOT owner:'+t;return e._searchItems(r,e._removeInfographicTemplates)},e._getMyCustomReportTemplateItems=function(t){var r='type:"Report Template" typekeywords:(esriWebReport NOT esriWebInfographicReport) owner:'+t;return e._searchItems(r,e._removeInfographicTemplates)},e._removeInfographicTemplates=function(e){return!SettingsHelper.isTrueString(e.properties.isGraphicReport)},e.getInfographicReportTemplateItems=function(t,r){return void 0===r&&(r=!1),new Promise((function(n,o){var i={public:void 0,shared:void 0,user:void 0,favoriteIds:void 0};ArcGISClient.executeSelf().then((function(a){var s=a.user.username,p=a.user.orgId;Promise.allSettled([e._getEsriInfographicReportTemplateItems(),e._getSharedInfographicReportTemplateItems(s,p),e._getUserInfographicReportTemplateItems(s),e._getFavoriteReportsIds(s,t)]).then((function(a){var s=e._byCountry(t);i.public=a[0].value?a[0].value.filter(s):[],i.shared=a[1].value?a[1].value.filter(s):[],i.user=a[2].value?a[2].value.filter(s):[],i.favoriteIds=a[3].value?a[3].value:[];var p=i.user;null!=p&&p.sort((function(e,t){return e.title.localeCompare(t.title)})),WebAppSettings.getDisabledReports().then((function(t){var o=function(e){return!t[e.id]},a=i.public;null!=a&&(i.public=a.filter(o));var s=i.shared;null!=s&&(i.shared=s.filter(o)),r||(i.public=e._condenseResultsArray(i.public),i.shared=e._condenseResultsArray(i.shared),i.user=e._condenseResultsArray(i.user),i.favoriteIds=e._condenseResultsArray(i.favoriteIds)),n(i)})).catch((function(e){return o(e)}))}))})).catch((function(e){return o(e)}))}))},e._byCountry=function(e){return function(t){var r=t&&t.properties&&t.properties.countries.toLowerCase();return r&&r.indexOf(e.toLowerCase())>=0}},e._getEsriInfographicReportTemplateItems=function(){return e._searchItems('type:"Report Template" typekeywords:esriWebStandardInfographicReport owner:esri_reports',e._infographicFilter)},e._getSharedInfographicReportTemplateItems=function(t,r){var n='type:"Report Template" (access:shared OR access:org OR (access:public AND orgid:'+r+"))  typekeywords:esriWebInfographicReport  NOT owner:"+t;return e._searchItems(n,e._infographicFilter)},e._getUserInfographicReportTemplateItems=function(t){return new Promise((function(r,n){var o='type:"Report Template" typekeywords:esriWebInfographicReport  owner:'+t,i=e._searchItems(o,e._infographicFilter),a=e._getUserGalleryInfographicReportTemplateItems();Promise.allSettled([i,a]).then((function(e){var t=e[0].value?e[0].value:[],n=e[1].value?e[1].value:[];r(t.concat(n))}),(function(e){n(e)}))}))},e._getFavoriteReportsIds=function(t,r){return new Promise((function(n,o){var i='type:"Web Mapping Application" typekeywords:"BAUserData.FavoriteReports" owner:'+t;e._searchItems(i,null).then((function(e){var t=e&&e[0];t?ArcGISClient.getItemData(t.id).then((function(e){if(e){var t=e.data&&e.data["favorites"+r];if(t){var o=t.map((function(e){return e.reportID}));n(o)}else n([])}else n([])})).catch((function(e){return o(e)})):n([])})).catch((function(e){return o(e)}))}))},e._getUserGalleryInfographicReportTemplateItems=function(){return new Promise((function(t,r){WebAppSettings.getUserGalleryInfographicReportIds().then((function(n){if(n&&n.length){var o=n.map((function(e){return"id:"+e})).join(" OR ");e._searchItems(o,e._infographicFilter).then((function(e){t(e)})).catch((function(e){return r(e)}))}else t([])})).catch((function(e){return r(e)}))}))},e._searchItems=function(e,t){return new Promise((function(r,n){var o={start:1,num:1e3,sortField:"title",sortOrder:"asc",q:e};ArcGISClient.searchAllItems({},o).then((function(e){var n=t?e.filter(t):e;r(n)})).catch((function(e){return n(e)}))}))},e._createReportTemplateInfos=function(e,t){var r=[];return e.forEach((function(e){var n=e.properties;if(n){var o=n.countries;if(SettingsHelper.isTrueString(n.isComparisonReport))return;if(o&&-1!==o.indexOf(t)){var i={reportID:{itemid:e.id},formats:n.formats&&n.formats.split(","),headers:[],metadata:{author:n.author,categories:[],countries:o,coverage:n.coverage,hierarchy:n.hierarchy,keywords:n.keywords,owner:e.owner,title:e.title,type:n.type}};r.push(i)}}})),r},e._infographicFilter=function(e){var t=e.properties;return SettingsHelper.isTrueString(t.isGraphicReport)&&!SettingsHelper.isTrueString(t.isSingleInfographic)&&!SettingsHelper.isTrueString(t.isHidden)&&!SettingsHelper.isTrueString(t.isBlank)},e._geReportTemplatesCache={},e}();export{ReportTemplatesManager};