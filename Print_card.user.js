// ==UserScript==
// @name        Print_card
// @namespace   Print_card
// @description Печатает ценник товара по описанию на сайте kipspb
// @include     *kipspb.arc.world/catalog/*
// @include     *kipspb.ru/catalog/*
// @version     1
// @grant       none
// ==/UserScript==

var scriptHeader = document.createElement('script');
scriptHeader.type = 'text/javascript';
scriptHeader.innerHTML =  'function setHeader(aTab, aHeader) {\
/* debug newWin.document.write(aHeader.outerHTML); */ \
var theader=aTab.createTHead(); \
var d = new Date(); \
var year = d.getFullYear(); \
var month = (1 + d.getMonth()).toString(); \
month = month.length > 1 ? month : "0" + month; \
var mmyy=month+"."+year.toString().substring(2); \
/* text of header*/\
var hrow=theader.insertRow(0); \
var hcell=hrow.insertCell(0); \
hcell.innerHTML=aHeader.textContent; \
hcell.style.fontStyle="italic"; \
hcell.style.fontWeight="bold"; \
hcell.style.fontSize="18"; \
hcell.colSpan=2; \
hcell.cssFloat="right"; \
hcell.style.padding = "2px 0px 0px 5px"; \
hcell.style.borderBottom = "thick solid #4C2E00"; \
var imgMMYY=newWin.document.createElement("img"); \
imgMMYY.innerHTML=mmyy; \
imgMMYY.style.cssFloat= "right"; \
imgMMYY.style.fontSize= "7"; \
imgMMYY.style.margin="10px 0px 0px 0px"; \
hcell.appendChild(imgMMYY);\
return;\
}' ;
document.getElementsByTagName("head")[0].appendChild(scriptHeader);

var scriptDescr = document.createElement('script');
scriptDescr.type = 'text/javascript';
var scriptDescr_innerHTML =  'function setDescr(aTr, aDescr) {\
/* debug */ newWin.document.write(aDescr.firstChild.textContent); /**/ \
var cell_descr=aTr.insertCell(0); \
cell_descr.innerHTML=aDescr.firstChild.textContent;\
cell_descr.style.fontSize="12"; \
cell_descr.colSpan=2; \
return;\
}' ;
scriptDescr.innerHTML =  'function setDescr(aCellDescr, aDescr) {\
/* debug */ newWin.document.write(aDescr.firstChild.textContent); /**/ \
aCellDescr.innerHTML=aDescr.firstChild.textContent;\
aCellDescr.style.fontSize="12"; \
aCellDescr.colSpan=2; \
return;\
}' ;

document.getElementsByTagName("head")[0].appendChild(scriptDescr);

var scriptList = document.createElement('script');
scriptList.type = 'text/javascript';
scriptList.innerHTML =  'function setList(aCellList, aList) {\
var li_tags=aList.getElementsByTagName("li"); \
for (var l=0; l<Math.min(5, li_tags.length); l++) { \
  /* debug newWin.document.write("li_tags["+l + "]="+li_tags[l].outerHTML+"\\n"); */ \
  /* debug newWin.document.write("li_tags["+l + "].children.length="+li_tags[l].children.length+"\\n"); */ \
  aCellList.innerHTML+=li_tags[l].outerHTML; \
} \
aCellList.style.padding = "5px 0px 0px 10px"; \
aCellList.rowSpan=2; \
aCellList.style.fontSize="11"; \
aCellList.style.verticalAlign="top"; \
aCellList.style.width="200px"; \
var loc_tags; /* TO REMOVE */\
for (var i=0; i<aList.children.length; i++) { \
  /* debug newWin.document.write("loc_tags loop i="+i +"<br>"); */ \
  /* read gocreester.gif */ var imgs=aList.children[i].getElementsByTagName("img"); /**/\
                            loc_tags+=imgs; /**/\
}\
if (loc_tags === undefined) return; else return loc_tags; \
}';
document.getElementsByTagName("head")[0].appendChild(scriptList);

var scriptPicture = document.createElement('script');
scriptPicture.type = 'text/javascript';
scriptPicture.innerHTML =  'function setPicture(aCellPic, aPicture) {\
aCellPic.style.transform="scale(0.7, 0.7)" ; /**/\
aCellPic.style.width=Math.max(85, Math.round(0.7*aPicture.firstChild.firstChild.clientWidth)) ; \
aCellPic.style.height=Math.round(0.7*aPicture.firstChild.firstChild.clientHeight) ; \
/* debug newWin.document.write("aCellPic.style.width="+aCellPic.style.width +"<br>"); */ \
/* debug newWin.document.write("aCellPic.style.height="+aCellPic.style.height +"<br>"); */ \
aCellPic.style.padding = "0px 30px 5px 0px"; \
aCellPic.style.margin = "0px 0px"; \
aCellPic.style.verticalAlign="top"; \
aCellPic.style.horizontalAlign="left"; \
/* IMPORTANT */ aCellPic.style.cssFloat="left"; \
aCellPic.innerHTML="<img src="+aPicture.firstChild.firstChild.src + ">"; \
return aCellPic.style.width; \
}';
document.getElementsByTagName("head")[0].appendChild(scriptPicture);

var scriptPrice = document.createElement('script');
scriptPrice.type = 'text/javascript';
scriptPrice.innerHTML =  'function setPrice(aCellPrice, aPrice, aPriceWidth) {\
var price_text=aPrice.textContent; \
var pos_dots=price_text.indexOf("…"); \
if (pos_dots > 0) { \
   var price_arr=price_text.split("…"); \
   price_text="от "+price_arr[0] + " р.";\
} \
/* debug newWin.document.write("price_text="+price_text); */ \
aCellPrice.innerHTML=price_text; \
aCellPrice.align="center"; \
aCellPrice.style.fontSize="16"; \
aCellPrice.style.fontWeight="bold"; \
aCellPrice.style.fontStyle="italic"; \
aCellPrice.style.width=aPriceWidth ; \
aCellPrice.style.height="20px" ; \
aCellPrice.style.padding = "10px 0px 0px 0px"; \
/* aCellPrice.colSpan=2; */ \
}';
document.getElementsByTagName("head")[0].appendChild(scriptPrice);

var scriptPrintItem = document.createElement('script');
scriptPrintItem.type = 'text/javascript';
scriptPrintItem.innerHTML =  'function printItem(aWin, aCatalogItem, aHeaderToPrint) {\
/****************** Header */ \
var newTab=aWin.document.createElement("table") ;\
setHeader(newTab, aHeaderToPrint); \
/****************** Description */ \
var shortToPrint=aCatalogItem.getElementsByClassName("catalog-item-text"); \
/* debug newWin.document.write("shortToPrint.length="+shortToPrint.length +"<br>"); */ \
if (shortToPrint.length > 0 ) { \
  var tr1 = aWin.document.createElement("tr"); \
  var cell_descr=tr1.insertCell(0); \
  /* setDescr(cell_descr, shortToPrint[0]); */ \
  /****************** List */ \
  var tr2 = aWin.document.createElement("tr"); \
  var cell_list=tr2.insertCell(0); \
  var tags = setList(cell_list, shortToPrint[0]); \
  /****************** Picture */\
  var pictureToPrint=aCatalogItem.getElementsByClassName("catalog-item-picture"); \
  var cell_pic=tr2.insertCell(1); \
  setPicture(cell_pic,pictureToPrint[0]); \
} \
/****************** Price */\
var PriceToPrint=aCatalogItem.getElementsByClassName("catalog-item-price catalog-item-cloud"); \
var tr3 = aWin.document.createElement("tr"); \
var cell_price=tr3.insertCell(0);\
setPrice(cell_price, PriceToPrint[0], cell_pic.style.width); \
/****************** Add table rows */\
/* newTab.appendChild(tr1); */\
newTab.appendChild(tr2);\
newTab.appendChild(tr3);\
/* debug newWin.document.write("Before tags loop<br>"); */ \
/* \
if (tags !== undefined) { \
  for (var i=0; i<tags.length; i++) { \
    if (tags[i] !== undefined) { \
   }\
  }\
}\
*/ \
     /* debug newWin.document.write("tags[" +i+ "].length=" +tags[i].length+"<br>"); */ \
     /*for (img=0; img<tags[i].length; img++) { aWin.document.write(tags[i][img].outerHTML); } */\
/* IMPORTANT */ newWin.document.write("<span></span>");\
newTab.style.pageBreakInside = "avoid"; \
aWin.document.body.appendChild(newTab); \
}';
document.getElementsByTagName("head")[0].appendChild(scriptPrintItem);

/*********** Element */
var scriptPrintSingle = document.createElement('script');
scriptPrintSingle.type = 'text/javascript';
scriptPrintSingle.innerHTML =  'function printCard() { \
newWin= window.open(""); \
var itemDiv=document.getElementById("content"); \
var headerToPrint=document.getElementById("pageheader"); \
printItem(newWin, itemDiv, headerToPrint); \
/****************** CSS */\
var css = "table {width: 285px; background: #FFB547; border: 1px none;} td {height: 20px; background: #FFB547; border: 1px dashed #FFB547;}"; \
var head = document.head || document.getElementsByTagName("head")[0]; \
var style=newWin.document.createElement("style"); \
style.type = "text/css"; \
if (style.styleSheet){ \
  style.styleSheet.cssText = css; \
} else { \
  style.appendChild(document.createTextNode(css)); \
} \
newWin.document.head.appendChild(style); \
newWin.document.close(); \
}';
document.getElementsByTagName("head")[0].appendChild(scriptPrintSingle);

/*********** List */
var scriptPrintList = document.createElement('script');
scriptPrintList.type = 'text/javascript';
scriptPrintList.innerHTML =  'function printList() { \
newWin= window.open(""); \
var catIterator=document.getElementById("catalog_items_content"); \
for (var j=0; j<catIterator.children.length; j++) { \
  var catItem=catIterator.children[j]; \
  var Price=catItem.getElementsByClassName("catalog-item-price catalog-item-cloud"); \
  if ( catItem.clientHeight === 0) { continue; } \
  /* debug newWin.document.write("Price.length=",Price.length); */\
  if ( Price.length > 0) { \
    var headers=catItem.getElementsByClassName("catalog_item_name_content"); \
    var headerToPrint=headers[0]; \
    printItem(newWin, catItem, headerToPrint); \
  }\
  newWin.document.write("<br>"); \
}\
/****************** CSS */\
var css = "table {width: 285px; background: #FFB547; border: 1px none;} td {height: 20px; background: #FFB547; border: 1px dashed #FFB547;}" ; \
var head = document.head || document.getElementsByTagName("head")[0]; \
var style=newWin.document.createElement("style"); \
style.type = "text/css"; \
if (style.styleSheet){ \
  style.styleSheet.cssText = css; \
} else { \
  style.appendChild(document.createTextNode(css)); \
} \
newWin.document.head.appendChild(style); \
newWin.document.close(); \
}';
document.getElementsByTagName("head")[0].appendChild(scriptPrintList);


window.addButton = function () {
    // Get current URL
   var contentDiv=document.getElementById("content");
   var curURL=document.URL;
   var strTitle='';
   var functionName='';
   if (curURL.indexOf('/element') > 0) {
      var targets = contentDiv.getElementsByClassName('catalog-item-extra');
      var targetDiv = targets[0];
      strTitle='Ценник';
      functionName="printCard();";
   } else {
     var targetDiv = document.getElementById('catalog_filter');
     strTitle='Ценники';
     functionName="printList();";
   };
    // Get the location on the page where you want to create the button
    
   
    // Create a div to surround the button
    var newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'autoCheckOrder');

    // Create the button and set its attributes
    var inputButton = document.createElement('input');
    inputButton.name = 'autoCheckOrderButton';
    inputButton.type = 'button';
    inputButton.value = strTitle;
    inputButton.style.background = '#FFB547';
    inputButton.setAttribute("onclick", functionName); //"printCard();");

    // Append the button to the div
    newDiv.appendChild(inputButton); 
    targetDiv.appendChild(newDiv);
}
addButton();