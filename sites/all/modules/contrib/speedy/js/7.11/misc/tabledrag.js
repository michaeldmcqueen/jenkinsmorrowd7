(function(a){Drupal.behaviors.tableDrag={attach:function(b,c){for(var d in c.tableDrag)a("#"+d,b).once("tabledrag",function(){Drupal.tableDrag[d]=new Drupal.tableDrag(this,c.tableDrag[d])})}},Drupal.tableDrag=function(b,c){var d=this;this.table=b,this.tableSettings=c,this.dragObject=null,this.rowObject=null,this.oldRowElement=null,this.oldY=0,this.changed=!1,this.maxDepth=0,this.rtl=a(this.table).css("direction")=="rtl"?-1:1,this.scrollSettings={amount:4,interval:50,trigger:70},this.scrollInterval=null,this.scrollY=0,this.windowHeight=0,this.indentEnabled=!1;for(var e in c)for(var f in c[e])c[e][f].relationship=="parent"&&(this.indentEnabled=!0),c[e][f].limit>0&&(this.maxDepth=c[e][f].limit);if(this.indentEnabled){this.indentCount=1;var g=Drupal.theme("tableDragIndentation"),h=a("<tr/>").addClass("draggable").appendTo(b),i=a("<td/>").appendTo(h).prepend(g).prepend(g);this.indentAmount=a(".indentation",i).get(1).offsetLeft-a(".indentation",i).get(0).offsetLeft,h.remove()}a("> tr.draggable, > tbody > tr.draggable",b).each(function(){d.makeDraggable(this)}),a(b).before(a('<a href="#" class="tabledrag-toggle-weight"></a>').attr("title",Drupal.t("Re-order rows by numerical weight instead of dragging.")).click(function(){return a.cookie("Drupal.tableDrag.showWeight")==1?d.hideColumns():d.showColumns(),!1}).wrap('<div class="tabledrag-toggle-weight-wrapper"></div>').parent()),d.initColumns(),a(document).bind("mousemove",function(a){return d.dragRow(a,d)}),a(document).bind("mouseup",function(a){return d.dropRow(a,d)})},Drupal.tableDrag.prototype.initColumns=function(){for(var b in this.tableSettings){for(var c in this.tableSettings[b]){var d=a("."+this.tableSettings[b][c].target+":first",this.table);if(d.size()&&this.tableSettings[b][c].hidden){var e=this.tableSettings[b][c].hidden,f=d.parents("td:first");break}}if(e&&f[0]){var g=a("> td",f.parent()).index(f.get(0))+1;a("> thead > tr, > tbody > tr, > tr",this.table).each(function(){var b=g,c=a(this).children();c.each(function(a){a<b&&this.colSpan&&this.colSpan>1&&(b-=this.colSpan-1)}),b>0&&(f=c.filter(":nth-child("+b+")"),f[0].colSpan&&f[0].colSpan>1?f.addClass("tabledrag-has-colspan"):f.addClass("tabledrag-hide"))})}}a.cookie("Drupal.tableDrag.showWeight")===null?(a.cookie("Drupal.tableDrag.showWeight",0,{path:Drupal.settings.basePath,expires:365}),this.hideColumns()):a.cookie("Drupal.tableDrag.showWeight")==1?this.showColumns():this.hideColumns()},Drupal.tableDrag.prototype.hideColumns=function(){a(".tabledrag-hide","table.tabledrag-processed").css("display","none"),a(".tabledrag-handle","table.tabledrag-processed").css("display",""),a(".tabledrag-has-colspan","table.tabledrag-processed").each(function(){this.colSpan=this.colSpan-1}),a(".tabledrag-toggle-weight").text(Drupal.t("Show row weights")),a.cookie("Drupal.tableDrag.showWeight",0,{path:Drupal.settings.basePath,expires:365})},Drupal.tableDrag.prototype.showColumns=function(){a(".tabledrag-hide","table.tabledrag-processed").css("display",""),a(".tabledrag-handle","table.tabledrag-processed").css("display","none"),a(".tabledrag-has-colspan","table.tabledrag-processed").each(function(){this.colSpan=this.colSpan+1}),a(".tabledrag-toggle-weight").text(Drupal.t("Hide row weights")),a.cookie("Drupal.tableDrag.showWeight",1,{path:Drupal.settings.basePath,expires:365})},Drupal.tableDrag.prototype.rowSettings=function(b,c){var d=a("."+b,c);for(var e in this.tableSettings[b]){var f=this.tableSettings[b][e].target;if(d.is("."+f)){var g={};for(var h in this.tableSettings[b][e])g[h]=this.tableSettings[b][e][h];return g}}},Drupal.tableDrag.prototype.makeDraggable=function(b){var c=this,d=a('<a href="#" class="tabledrag-handle"><div class="handle">&nbsp;</div></a>').attr("title",Drupal.t("Drag to re-order"));a("td:first .indentation:last",b).length?(a("td:first .indentation:last",b).after(d),c.indentCount=Math.max(a(".indentation",b).size(),c.indentCount)):a("td:first",b).prepend(d),d.hover(function(){c.dragObject==null?a(this).addClass("tabledrag-handle-hover"):null},function(){c.dragObject==null?a(this).removeClass("tabledrag-handle-hover"):null}),d.mousedown(function(d){return c.dragObject={},c.dragObject.initMouseOffset=c.getMouseOffset(b,d),c.dragObject.initMouseCoords=c.mouseCoords(d),c.indentEnabled&&(c.dragObject.indentMousePos=c.dragObject.initMouseCoords),c.rowObject&&a("a.tabledrag-handle",c.rowObject.element).blur(),c.rowObject=new c.row(b,"mouse",c.indentEnabled,c.maxDepth,!0),c.table.topY=a(c.table).offset().top,c.table.bottomY=c.table.topY+c.table.offsetHeight,a(this).addClass("tabledrag-handle-hover"),a(b).addClass("drag"),a("body").addClass("drag"),c.oldRowElement&&a(c.oldRowElement).removeClass("drag-previous"),navigator.userAgent.indexOf("MSIE 6.")!=-1&&a("select",this.table).css("display","none"),c.safeBlur=!1,c.onDrag(),!1}),d.click(function(){return!1}),d.focus(function(){a(this).addClass("tabledrag-handle-hover"),c.safeBlur=!0}),d.blur(function(b){a(this).removeClass("tabledrag-handle-hover"),c.rowObject&&c.safeBlur&&c.dropRow(b,c)}),d.keydown(function(e){e.keyCode!=9&&!c.rowObject&&(c.rowObject=new c.row(b,"keyboard",c.indentEnabled,c.maxDepth,!0));var f=!1;switch(e.keyCode){case 37:case 63234:f=!0,c.rowObject.indent(-1*c.rtl);break;case 38:case 63232:var g=a(c.rowObject.element).prev("tr").get(0);while(g&&a(g).is(":hidden"))g=a(g).prev("tr").get(0);if(g){c.safeBlur=!1,c.rowObject.direction="up",f=!0;if(a(b).is(".tabledrag-root")){var h=0;while(g&&a(".indentation",g).size())g=a(g).prev("tr").get(0),h+=a(g).is(":hidden")?0:g.offsetHeight;g&&(c.rowObject.swap("before",g),window.scrollBy(0,-h))}else if(c.table.tBodies[0].rows[0]!=g||a(g).is(".draggable"))c.rowObject.swap("before",g),c.rowObject.interval=null,c.rowObject.indent(0),window.scrollBy(0,-parseInt(b.offsetHeight,10));d.get(0).focus()}break;case 39:case 63235:f=!0,c.rowObject.indent(1*c.rtl);break;case 40:case 63233:var i=a(c.rowObject.group).filter(":last").next("tr").get(0);while(i&&a(i).is(":hidden"))i=a(i).next("tr").get(0);if(i){c.safeBlur=!1,c.rowObject.direction="down",f=!0;if(a(b).is(".tabledrag-root")){var h=0;nextGroup=new c.row(i,"keyboard",c.indentEnabled,c.maxDepth,!1),nextGroup&&(a(nextGroup.group).each(function(){h+=a(this).is(":hidden")?0:this.offsetHeight}),nextGroupRow=a(nextGroup.group).filter(":last").get(0),c.rowObject.swap("after",nextGroupRow),window.scrollBy(0,parseInt(h,10)))}else c.rowObject.swap("after",i),c.rowObject.interval=null,c.rowObject.indent(0),window.scrollBy(0,parseInt(b.offsetHeight,10));d.get(0).focus()}}c.rowObject&&c.rowObject.changed==1&&(a(b).addClass("drag"),c.oldRowElement&&a(c.oldRowElement).removeClass("drag-previous"),c.oldRowElement=b,c.restripeTable(),c.onDrag());if(f)return!1}),d.keypress(function(a){switch(a.keyCode){case 37:case 38:case 39:case 40:return!1}})},Drupal.tableDrag.prototype.dragRow=function(a,b){if(b.dragObject){b.currentMouseCoords=b.mouseCoords(a);var c=b.currentMouseCoords.y-b.dragObject.initMouseOffset.y,d=b.currentMouseCoords.x-b.dragObject.initMouseOffset.x;if(c!=b.oldY){b.rowObject.direction=c>b.oldY?"down":"up",b.oldY=c;var e=b.checkScroll(b.currentMouseCoords.y);clearInterval(b.scrollInterval),(e>0&&b.rowObject.direction=="down"||e<0&&b.rowObject.direction=="up")&&b.setScroll(e);var f=b.findDropTargetRow(d,c);f&&(b.rowObject.direction=="down"?b.rowObject.swap("after",f,b):b.rowObject.swap("before",f,b),b.restripeTable())}if(b.indentEnabled){var g=b.currentMouseCoords.x-b.dragObject.indentMousePos.x,h=Math.round(g/b.indentAmount*b.rtl),i=b.rowObject.indent(h);b.dragObject.indentMousePos.x+=b.indentAmount*i*b.rtl,b.indentCount=Math.max(b.indentCount,b.rowObject.indents)}return!1}},Drupal.tableDrag.prototype.dropRow=function(b,c){if(c.rowObject!=null){var d=c.rowObject.element;if(c.rowObject.changed==1){c.updateFields(d);for(var e in c.tableSettings){var f=c.rowSettings(e,d);if(f.relationship=="group")for(var g in c.rowObject.children)c.updateField(c.rowObject.children[g],e)}c.rowObject.markChanged(),c.changed==0&&(a(Drupal.theme("tableDragChangedWarning")).insertBefore(c.table).hide().fadeIn("slow"),c.changed=!0)}c.indentEnabled&&c.rowObject.removeIndentClasses(),c.oldRowElement&&a(c.oldRowElement).removeClass("drag-previous"),a(d).removeClass("drag").addClass("drag-previous"),c.oldRowElement=d,c.onDrop(),c.rowObject=null}c.dragObject!=null&&(a(".tabledrag-handle",d).removeClass("tabledrag-handle-hover"),c.dragObject=null,a("body").removeClass("drag"),clearInterval(c.scrollInterval),navigator.userAgent.indexOf("MSIE 6.")!=-1&&a("select",this.table).css("display","block"))},Drupal.tableDrag.prototype.mouseCoords=function(a){return a.pageX||a.pageY?{x:a.pageX,y:a.pageY}:{x:a.clientX+document.body.scrollLeft-document.body.clientLeft,y:a.clientY+document.body.scrollTop-document.body.clientTop}},Drupal.tableDrag.prototype.getMouseOffset=function(b,c){var d=a(b).offset(),e=this.mouseCoords(c);return{x:e.x-d.left,y:e.y-d.top}},Drupal.tableDrag.prototype.findDropTargetRow=function(b,c){var d=a(this.table.tBodies[0].rows).not(":hidden");for(var e=0;e<d.length;e++){var f=d[e],g=0,h=a(f).offset().top;if(f.offsetHeight==0)var i=parseInt(f.firstChild.offsetHeight,10)/2;else var i=parseInt(f.offsetHeight,10)/2;if(c>h-i&&c<h+i){if(this.indentEnabled){for(var e in this.rowObject.group)if(this.rowObject.group[e]==f)return null}else if(f==this.rowObject.element)return null;if(!this.rowObject.isValidSwap(f))return null;while(a(f).is(":hidden")&&a(f).prev("tr").is(":hidden"))f=a(f).prev("tr").get(0);return f}}return null},Drupal.tableDrag.prototype.updateFields=function(a){for(var b in this.tableSettings)this.updateField(a,b)},Drupal.tableDrag.prototype.updateField=function(b,c){var d=this.rowSettings(c,b);if(d.relationship=="self"||d.relationship=="group")var e=b;else if(d.relationship=="sibling"){var f=a(b).prev("tr").get(0),g=a(b).next("tr").get(0),e=b;a(f).is(".draggable")&&a("."+c,f).length?this.indentEnabled?a(".indentations",f).size()==a(".indentations",b)&&(e=f):e=f:a(g).is(".draggable")&&a("."+c,g).length&&(this.indentEnabled?a(".indentations",g).size()==a(".indentations",b)&&(e=g):e=g)}else if(d.relationship=="parent"){var f=a(b).prev("tr");while(f.length&&a(".indentation",f).length>=this.rowObject.indents)f=f.prev("tr");if(f.length)e=f[0];else{e=a(this.table).find("tr.draggable:first").get(0),e==this.rowObject.element&&(e=a(this.rowObject.group[this.rowObject.group.length-1]).next("tr.draggable").get(0));var h=!0}}this.copyDragClasses(e,b,c),d=this.rowSettings(c,b),h&&(d.relationship="sibling",d.source=d.target);var i="."+d.target,j=a(i,b).get(0);if(j){var k="."+d.source,l=a(k,e).get(0);switch(d.action){case"depth":j.value=a(".indentation",a(l).parents("tr:first")).size();break;case"match":j.value=l.value;break;case"order":var m=this.rowObject.findSiblings(d);if(a(j).is("select")){var n=[];a("option",j).each(function(){n.push(this.value)});var o=n[n.length-1];a(i,m).each(function(){n.length>0?this.value=n.shift():this.value=o})}else{var p=parseInt(a(i,m[0]).val(),10)||0;a(i,m).each(function(){this.value=p,p++})}}}},Drupal.tableDrag.prototype.copyDragClasses=function(b,c,d){var e=a("."+d,b),f=a("."+d,c);e.length&&f.length&&(f[0].className=e[0].className)},Drupal.tableDrag.prototype.checkScroll=function(a){var b=document.documentElement,c=document.body,d=this.windowHeight=window.innerHeight||(b.clientHeight&&b.clientWidth!=0?b.clientHeight:c.offsetHeight),e=this.scrollY=document.all?b.scrollTop?b.scrollTop:c.scrollTop:window.pageYOffset?window.pageYOffset:window.scrollY,f=this.scrollSettings.trigger,g=0;if(a-e>d-f)return g=f/(d+e-a),g=g>0&&g<f?g:f,g*this.scrollSettings.amount;if(a-e<f)return g=f/(a-e),g=g>0&&g<f?g:f,-g*this.scrollSettings.amount},Drupal.tableDrag.prototype.setScroll=function(a){var b=this;this.scrollInterval=setInterval(function(){b.checkScroll(b.currentMouseCoords.y);var c=b.scrollY>b.table.topY,d=b.scrollY+b.windowHeight<b.table.bottomY;(a>0&&d||a<0&&c)&&window.scrollBy(0,a)},this.scrollSettings.interval)},Drupal.tableDrag.prototype.restripeTable=function(){a("> tbody > tr.draggable:visible, > tr.draggable:visible",this.table).removeClass("odd even").filter(":odd").addClass("even").end().filter(":even").addClass("odd")},Drupal.tableDrag.prototype.onDrag=function(){return null},Drupal.tableDrag.prototype.onDrop=function(){return null},Drupal.tableDrag.prototype.row=function(b,c,d,e,f){this.element=b,this.method=c,this.group=[b],this.groupDepth=a(".indentation",b).size(),this.changed=!1,this.table=a(b).parents("table:first").get(0),this.indentEnabled=d,this.maxDepth=e,this.direction="";if(this.indentEnabled){this.indents=a(".indentation",b).size(),this.children=this.findChildren(f),this.group=a.merge(this.group,this.children);for(var g=0;g<this.group.length;g++)this.groupDepth=Math.max(a(".indentation",this.group[g]).size(),this.groupDepth)}},Drupal.tableDrag.prototype.row.prototype.findChildren=function(b){var c=this.indents,d=a(this.element,this.table).next("tr.draggable"),e=[],f=0;while(d.length){var g=a(".indentation",d).length;if(g>c)f++,e.push(d[0]),b&&a(".indentation",d).each(function(b){f==1&&b==c&&a(this).addClass("tree-child-first"),b==c?a(this).addClass("tree-child"):b>c&&a(this).addClass("tree-child-horizontal")});else break;d=d.next("tr.draggable")}return b&&e.length&&a(".indentation:nth-child("+(c+1)+")",e[e.length-1]).addClass("tree-child-last"),e},Drupal.tableDrag.prototype.row.prototype.isValidSwap=function(b){if(this.indentEnabled){var c,d;this.direction=="down"?(c=b,d=a(b).next("tr").get(0)):(c=a(b).prev("tr").get(0),d=b),this.interval=this.validIndentInterval(c,d);if(this.interval.min>this.interval.max)return!1}return this.table.tBodies[0].rows[0]==b&&a(b).is(":not(.draggable)")?!1:!0},Drupal.tableDrag.prototype.row.prototype.swap=function(b,c){Drupal.detachBehaviors(this.group,Drupal.settings,"move"),a(c)[b](this.group),Drupal.attachBehaviors(this.group,Drupal.settings),this.changed=!0,this.onSwap(c)},Drupal.tableDrag.prototype.row.prototype.validIndentInterval=function(b,c){var d,e;return d=c?a(".indentation",c).size():0,!b||a(b).is(":not(.draggable)")||a(this.element).is(".tabledrag-root")?e=0:(e=a(".indentation",b).size()+(a(b).is(".tabledrag-leaf")?0:1),this.maxDepth&&(e=Math.min(e,this.maxDepth-(this.groupDepth-this.indents)))),{min:d,max:e}},Drupal.tableDrag.prototype.row.prototype.indent=function(b){this.interval||(prevRow=a(this.element).prev("tr").get(0),nextRow=a(this.group).filter(":last").next("tr").get(0),this.interval=this.validIndentInterval(prevRow,nextRow));var c=this.indents+b;c=Math.max(c,this.interval.min),c=Math.min(c,this.interval.max),b=c-this.indents;for(var d=1;d<=Math.abs(b);d++)b<0?(a(".indentation:first",this.group).remove(),this.indents--):(a("td:first",this.group).prepend(Drupal.theme("tableDragIndentation")),this.indents++);return b&&(this.changed=!0,this.groupDepth+=b,this.onIndent()),b},Drupal.tableDrag.prototype.row.prototype.findSiblings=function(b){var c=[],d=["prev","next"],e=this.indents;for(var f=0;f<d.length;f++){var g=a(this.element)[d[f]]();while(g.length){if(!a("."+b.target,g))break;if(this.indentEnabled)var h=a(".indentation",g).length;if(!this.indentEnabled||h==e)c.push(g[0]);else if(h<e)break;g=a(g)[d[f]]()}d[f]=="prev"&&(c.reverse(),c.push(this.element))}return c},Drupal.tableDrag.prototype.row.prototype.removeIndentClasses=function(){for(var b in this.children)a(".indentation",this.children[b]).removeClass("tree-child").removeClass("tree-child-first").removeClass("tree-child-last").removeClass("tree-child-horizontal")},Drupal.tableDrag.prototype.row.prototype.markChanged=function(){var b=Drupal.theme("tableDragChangedMarker"),c=a("td:first",this.element);a("span.tabledrag-changed",c).length==0&&c.append(b)},Drupal.tableDrag.prototype.row.prototype.onIndent=function(){return null},Drupal.tableDrag.prototype.row.prototype.onSwap=function(a){return null},Drupal.theme.prototype.tableDragChangedMarker=function(){return'<span class="warning tabledrag-changed">*</span>'},Drupal.theme.prototype.tableDragIndentation=function(){return'<div class="indentation">&nbsp;</div>'},Drupal.theme.prototype.tableDragChangedWarning=function(){return'<div class="tabledrag-changed-warning messages warning">'+Drupal.theme("tableDragChangedMarker")+" "+Drupal.t("Changes made in this table will not be saved until the form is submitted.")+"</div>"}})(jQuery);