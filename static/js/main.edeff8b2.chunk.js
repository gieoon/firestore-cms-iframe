(this["webpackJsonpfirestore-cms-iframe-example"]=this["webpackJsonpfirestore-cms-iframe-example"]||[]).push([[0],{16:function(e,t,n){"use strict";n.r(t);n(4);var i=n(0),a=n.n(i),r=n(2),o=n.n(r),l=n(1),c=n.n(l);c.a.prototype.getHTML=function(e){return e.querySelector(".ql-editor").innerHTML},c.a.prototype.setHTML=function(e,t){e.querySelector(".ql-editor").innerHTML=t};var d={};var p=function(e){var t=e.allowedOrigins,n=e.templates,a=Object(i.useState)(!0),r=a[0],o=a[1],l=Object(i.useState)(),p=(l[0],l[1]),s=Object(i.useState)()[1];Object(i.useEffect)((function(){window.addEventListener("message",b,!1),window.onclick=function(e){Boolean(e.target.closest(".cp-editable.editing"))&&(e.preventDefault(),e.stopPropagation())}}),[]);var b=function(e){t.some((function(t){return e.origin.includes(t)}))&&("initEditing"===e.data.actionType?setInterval((function(){u()}),1e3):"startEdit"===e.data.actionType?(q(),p(e.data.websiteContent)):"updateElement"===e.data.actionType?document.getElementById(e.data.identifier).src=e.data.file.url:"updateArray"===e.data.actionType&&(p(e.data.newWebsiteContent),window.location.reload()))};Object(i.useEffect)((function(){var e=document.head,t=document.createElement("link");return t.type="text/css",t.rel="stylesheet",t.href="https://cdn.quilljs.com/1.3.6/quill.snow.css",e.appendChild(t),function(){e.removeChild(t)}}),[]);var u=function(){for(var e=0,t=Array.from(document.querySelectorAll(".cp-editable"));e<t.length;e++){if(!(h=t[e]).querySelector(".cp-editable-btn")){var n=document.createElement("div");n.classList.add("cp-editable-btn-wrapper");var i=document.createElement("div"),a=document.createElement("div");i.textContent="Edit",i.classList.add("cp-editable-btn"),a.classList.add("editor-wrapper");var r=document.createElement("div");r.textContent="Save",r.classList.add("cp-editable-save-btn");var o=document.createElement("div");o.textContent="Cancel",o.classList.add("cp-editable-cancel-btn"),r.onclick=function(e){y(e)},o.onclick=function(e){g(e)},i.onclick=function(e){w(e)};var l=document.createElement("div");l.classList.add("editables-wrapper"),l.onclick=function(e){e.preventDefault(),e.stopPropagation()},n.appendChild(i),n.appendChild(r),n.appendChild(o),l.appendChild(a),l.appendChild(n),h.appendChild(l)}}for(var c=0,d=Array.from(document.querySelectorAll(".cp-editable-img"));c<d.length;c++){if(!(h=d[c]).parentElement.querySelector(".cp-editable-img-btn")){h.parentElement.style.position="relative";var p=document.createElement("div");p.classList.add("cp-editable-img-wrapper");var s=document.createElement("div");s.textContent="Change Image",s.classList.add("cp-editable-img-btn"),s.onclick=function(e){e.preventDefault(),e.stopPropagation(),v(e)},p.appendChild(s),h.parentElement.insertBefore(p,h.nextSibling)}}for(var b=0,u=Array.from(document.querySelectorAll(".cp-editable-array"));b<u.length;b++){var h;if(!(h=u[b]).querySelector(".cp-editable-array-minus-wrapper")){for(var x=Array.from(h.querySelectorAll(":scope > *:not(.cp-editable-array-plus-wrapper)")),q=0;q<x.length;q++){var k=document.createElement("div");k.classList.add("cp-editable-array-minus-wrapper");var E=document.createElement("div");E.textContent="X",E.classList.add("cp-editable-array-minus"),E.id=q,k.style.position="relative",k.appendChild(E),x[q].appendChild(k),E.onclick=function(e){var t=e.target.closest(".cp-editable-array");window.parent.postMessage({actionType:"removeFromArray",sections:f(t.id),identifier:t.id,index:e.target.id},"*")}}h.style.position="relative"}if(!h.querySelector(".cp-editable-array-plus")){var S=document.createElement("div");S.classList.add("cp-editable-array-plus-wrapper");var L=document.createElement("div");L.textContent="+",L.classList.add("cp-editable-array-plus"),S.appendChild(L),h.appendChild(S),L.onclick=function(e){var t=e.target.parentElement,n=m(t);window.parent.postMessage({actionType:"addToArray",sections:f(t.closest(".cp-editable-array").id),identifier:t.closest(".cp-editable-array").id,obj:n},"*")}}}},m=function(e){console.log("USING TEMPLATE] ",e.closest(".cp-editable-array").id);var t=e.closest(".cp-editable-array").id.match(/[a-zA-Z0-9_]+$/);return n[t[0]]},g=function(e){e.preventDefault(),e.stopPropagation(),Array.from(document.querySelectorAll(".cp-editable-btn")).forEach((function(e){e.style.display="block"}));var t=e.target.closest(".cp-editable");t.classList.toggle("editing"),t.querySelector(".ql-toolbar")&&(t.querySelector(".ql-toolbar").style.display="none"),t.querySelector(".ql-container")&&(t.querySelector(".ql-container").style.display="none"),u()},y=function(e){try{e.preventDefault(),e.stopPropagation(),Array.from(document.querySelectorAll(".cp-editable-btn")).forEach((function(e){e.style.display="block"}));var t,n=e.target.closest(".cp-editable"),i=n.dataset.singleQuillId;n.classList.toggle("editing"),n.querySelector(".ql-toolbar").style.display="none",n.querySelector(".ql-container").style.display="none",t=i?d[i].getHTML(n):d[n.id].getHTML(n);var a=n.id.split(/-|~/g);h(n);return console.log("newText: ",t),window.parent.postMessage({actionType:"finishedEdit",sections:a,val:t},"*"),u(),Promise.resolve()}catch(e){return Promise.reject(e)}},f=function(e){return e.split(/-|~/g)},v=function(e){var t=e.target,n=t.parentElement.previousElementSibling;console.log("variables: ",t,n,n.id),n.classList.toggle("editing"),s(n.id),window.parent.postMessage({actionType:"editFile",sections:f(n.id),identifier:n.id},"*")},h=function(e){return e.innerHTML},x=[[{header:[2,!1]}],["bold","italic","underline","strike"],["blockquote","link"],[{list:"ordered"},{list:"bullet"}],[{align:[]}]],w=function(e){var t=e.target;e.preventDefault(),e.stopPropagation();var n=t.closest(".cp-editable");n.classList.toggle("editing"),Array.from(document.querySelectorAll(".cp-editable-btn")).forEach((function(e){e.style.display="none"}));var i=n.innerHTML.indexOf('<div class="editables-wrapper"'),a=n.innerHTML.substring(0,i),r=void 0;if(n.dataset.content&&(a=n.dataset.content),console.log("original_HTML: ",a),n.dataset.singleQuillId&&(r=n.dataset.singleQuillId),n.querySelector(".ql-toolbar"))n.querySelector(".ql-toolbar").style.display="block",n.querySelector(".ql-container").style.display="block",r?d[r].setHTML(n,a):(console.log(n.id),d[n.id].setHTML(n,a));else{var o=new c.a(n.querySelector(".editor-wrapper"),{modules:{toolbar:x},theme:"snow",formats:["bold","header","italic","blockquote","indent","link","strike","script","underline","list","direction","align","image","video"]});o.setHTML(n,a),r?d[r]=o:d[n.id]=o}n.querySelector(".cp-editable-cancel-btn").onclick=function(e){g(e)},n.querySelector(".cp-editable-save-btn").onclick=function(e){y(e)}},q=function(){r||o(!0),u(),document.head.insertAdjacentHTML("beforeend",'\n            <style>\n                .cp-editable {\n                    border: 2px solid black;\n                    position: relative;;\n                }\n                .cp-editable.editing {\n                    pointer-events: all!important;\n                    visibility: hidden;\n                }\n                .cp-editable.editing > div {\n                    pointer-events: all!important;\n                    visibility: visible;\n                }\n                .cp-editable::after {\n                    content: "";\n                    background-color: rgba(0,0,0,0.1);\n                    position: absolute;\n                    bottom: 0;\n                    top: 0;\n                    left: 0;\n                    right: 0;\n                    pointer-events: none;\n                }\n                .cp-editable.editing::after {\n                    opacity: 0;\n                }\n                .cp-editable:hover .cp-editable-btn-wrapper {\n                    opacity: 1;\n                }\n                .cp-editable-btn-wrapper {\n                    opacity: 0;\n                    position: absolute;\n                    /* box-shadow: 0px 0px 2px rgba(255,255,255,0.5); */\n                    z-index: 1;\n                    /* right: 0; */\n                    right: 0;\n                    pointer-events: all;\n                    /* top: 5px; */\n                    /* top: -15px; */\n                    bottom: 0px;\n                    display: flex;\n                    justify-content: space-evenly;\n                    align-items: center;\n                    transition: all 100ms ease-in-out;\n                }\n                .cp-editable-btn,\n                .cp-editable-save-btn,\n                .cp-editable-cancel-btn {\n                    background-color: black;\n                    color: white;\n                    padding: 2px 6px;\n                    /* width: 50px; */\n                    font-size: 12px!important;\n                    font-weight: 200!important;\n                    border-radius: 4px;\n                    border: 1px solid rgba(150,150,150,0.5);\n                    cursor: pointer;\n                    line-height: normal;\n                    margin-left: 5px;\n                    text-align: center;\n                }\n                .cp-editable-btn:hover,\n                .cp-editable-save-btn:hover,\n                .cp-editable-cancel-btn:hover,\n                .cp-editable-img-cancel-btn:hover,\n                .cp-editable-img-save-btn:hover,\n                .cp-editable-img-btn:hover {\n                    background-color: rgb(50,50,50);\n                }\n                .cp-editable.editing .cp-editable-btn,\n                .cp-editable-img.editing .cp-editable-img-btn {\n                    display: none;\n                }\n                .cp-editable .cp-editable-save-btn,\n                .cp-editable .cp-editable-cancel-btn,\n                .cp-editable-img .cp-editable-img-cancel-btn,\n                .cp-editable-img .cp-editable-img-save-btn {\n                    display: none;\n                }\n                .cp-editable.editing .cp-editable-save-btn,\n                .cp-editable.editing .cp-editable-cancel-btn,\n                .cp-editable-img-btn.editing .cp-editable-img-cancel-btn,\n                .cp-editable-img-btn.editing .cp-editable-img-save-btn {\n                    display: block;\n                }\n\n                .ql-editor {\n                    white-space: normal;\n                }\n\n                .ql-toolbar, \n                .editor-wrapper,\n                .ql-editor,\n                .ql-editor * {\n                    background-color: white!important;\n                    color: black!important;\n                    line-height: normal!important;\n                    text-align: initial!important;\n                }\n\n                /* White space is weird in editor, so set to default */\n                .ql-editor p, \n                .ql-editor h2 {\n                    margin: 1em 0!important;\n                }\n\n                .editables-wrapper {\n                    /* position: absolute;\n                    top: 15px; */\n                    right: 0;\n                    position: absolute;\n                    bottom: 0;\n                    z-index: 999;\n                }\n\n                .cp-editable-img-btn {\n                    position: relative;\n                    border: 2px solid black;\n                    background-color: black;\n                    color: white;\n                    white-space: nowrap;\n                    padding: 2px 4px;\n                    width: fit-content;\n                    font-size: 12px;\n                    border-radius: 4px;\n                    border: 1px solid rgba(150,150,150,0.5);\n                    cursor: pointer;\n                    line-height: normal;\n                    font-weight: 200;\n                    margin-left: 5px;\n                }\n                .cp-editable-img-wrapper {\n                    position: absolute;\n                    z-index: 1;\n                    right: 0;\n                    bottom: 5px;\n                    display: flex;\n                    justify-content: space-evenly;\n                    align-items: center;\n                    transition: all 100ms ease-in-out;\n                }\n\n                .cp-editable-array-minus-wrapper {\n                    position: relative;\n                }\n                .cp-editable-array-minus {\n                    position: absolute;\n                    bottom: 5px;\n                    left: 5px;\n                    /*top: 50%;*/\n                    /*transform: translateY(-50%);*/\n                    border: 1px solid rgba(150,150,150,0.5);\n                    border-radius: 4px;\n                    font-size: 20px;\n                    background-color: black;\n                    font-weight: 800;\n                    line-height: 20px;\n                    padding: 5px 10px;\n                    color: white;\n                    cursor: pointer;\n                }\n                .cp-editable-array-plus-wrapper {\n                    position: absolute;\n                    left: 35px;\n                    bottom: 0px;\n                }\n                .cp-editable-array-plus {\n                    position: absolute;\n                    bottom: -35px;\n                    right: 0px;\n                    background-color: black;\n                    border: 1px solid rgba(150,150,150,0.5);\n                    border-radius: 4px;\n                    font-size: 25px;\n                    color: white;\n                    font-weight: 800;\n                    line-height: 20px;\n                    padding: 5px 10px;\n                    cursor: pointer;\n\n                }\n                .cp-editable-array-plus:hover ,\n                .cp-editable-array-minus:hover {\n                    opacity: .75;\n                }\n\n                /* Set defaults */\n                svg {\n                    color: initial!important;\n                    cursor: initial!important;\n                    margin-right: initial!important;\n                    margin-top: initial!important;\n                    height: initial!important;\n                    display: initial!important;\n                    padding: initial!important;\n                    padding-right: initial!important;\n                }\n            </style>\n        ')};return""},s=function(){return a.a.createElement(p,{allowedOrigin:"<example-domain.com>",templates:{}})};o.a.render(a.a.createElement(s,null),document.getElementById("root"))},3:function(e,t,n){e.exports=n(16)},4:function(e,t,n){}},[[3,1,2]]]);
//# sourceMappingURL=main.edeff8b2.chunk.js.map