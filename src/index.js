// This has been moved to npm package firestore-cms-iframe.

import React, {useEffect, useState, ReactDOM} from 'react';
// This is shared code for all CMS listeners.
// Listens to events from login.<domain-name>.craftie.xyz, 
// Edits the page after events are received.
import Quill from 'quill';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import getCssSelector from 'css-selector-generator';


Quill.prototype.getHTML = () => {
    return document.querySelector('.ql-editor').innerHTML;
};

Quill.prototype.setHTML = (html) => {
    document.querySelector('.ql-editor').innerHTML = html;
}

const quills = {};

export default function CMS({
    allowedOrigin
}){

    const [editing, setEditing] = useState(/*TODO make this false */true);
    // const [showEditor, setShowingEditor] = useState();
    const [currentData, setCurrentData] = useState();
    const [currentImageId, setCurrentImageId] = useState();
    
    useEffect(()=>{
        // Listen to CMS websitecontent editing events.
        window.addEventListener("message", receivedMessage, false);

        // TODO remove this, this is only to be prompted by the parent from Craftie.xyz.
        // highlightEditable({origin: allowedOrigin, data: "startEdit"});

        

    }, []);

    // Handles received messages from parent.
    const receivedMessage = (evt) => {
        // 'highlight'
        if(!evt.origin.includes(allowedOrigin)) return;
        if(evt.data.actionType === "initEditing"){
            setInterval(() => {
                addEditButton();
            }, 1500);
        }
        else if(evt.data.actionType === 'startEdit'){
            highlightEditable();
            setCurrentData(evt.data.websiteContent);
        }
        else if(evt.data.actionType === 'updateElement'){
            // document.getElementById(currentFileId).classList.toggle('editing');
            document.getElementById(evt.data.identifier).src = evt.data.file.url;
        }
        else if(evt.data.actionType === 'updateArray'){
            console.log('RECEIVED UPDATING ARRAY: ', evt.data);
            setCurrentData(evt.data.newWebsiteContent);
            window.location.reload();
        }
        
        // else if(evt.data.actionType === 'cancelSaveFile'){
        //     document.getElementById(currentFileId).classList.toggle('editing');
        // }
    }

    useEffect(() => {
        var head = document.head;
        var link = document.createElement("link");
    
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = "https://cdn.quilljs.com/1.3.6/quill.snow.css";
    
        head.appendChild(link);
    
        return () => { head.removeChild(link); }
    }, []);

    const addEditButton = () => {
        // Text
        const elements = Array.from(
            document.querySelectorAll('.cp-editable')
        );
        for(var el of elements){

            if(!el.querySelector('.cp-editable-btn')){
                const dw = document.createElement('div');
                dw.classList.add("cp-editable-btn-wrapper");
                const d = document.createElement('div');
                const editorContainer = document.createElement('div');
                d.textContent = "Edit";
                // const img = document.createElement('img');
                // img.src = "";
                d.classList.add('cp-editable-btn');
                editorContainer.classList.add('editor-wrapper');
                
                const d2 = document.createElement('div');
                d2.textContent = "Save";
                d2.classList.add('cp-editable-save-btn');
                

                const d3 = document.createElement('div');
                d3.textContent = "Cancel";
                d3.classList.add('cp-editable-cancel-btn');
                
                d2.onclick = (e) => {
                    saveClicked(e);
                }

                d3.onclick = (e) => {
                    cancelClicked(e);
                }
                
                d.onclick = (e) => {
                    createEditInput(e);
                }
                el.appendChild(editorContainer);
                dw.appendChild(d);
                dw.appendChild(d2);
                dw.appendChild(d3);
                el.appendChild(dw);
            }

        }

        // Images
        const imgElements = Array.from(
            document.querySelectorAll('.cp-editable-img')
        );
        for(var el of imgElements){
            if(!el.parentElement.querySelector('.cp-editable-img-btn')){
                el.parentElement.style.position = "relative";
                const dw = document.createElement('div');
                dw.classList.add("cp-editable-img-wrapper");
                const d = document.createElement('div');
                d.textContent = "Change Image";

                d.classList.add('cp-editable-img-btn');
                
                // const d2 = document.createElement('div');
                // d2.textContent = "Save";
                // d2.classList.add('cp-editable-img-save-btn');
                
                // const d3 = document.createElement('div');
                // d3.textContent = "Cancel";
                // d3.classList.add('cp-editable-img-cancel-btn');

                // d2.onclick = (e) => {
                //     saveImageClicked(e);
                // }
                // d3.onclick = (e) => {
                //     cancelImageClicked(e);
                // }
                d.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    createImageUpload(e);
                }
                dw.appendChild(d);
                // dw.appendChild(d2);
                // dw.appendChild(d3);
                el.parentElement.insertBefore(dw, el.nextSibling);
            }
        }

        // Lists
        const arrayElements = Array.from(
            document.querySelectorAll('.cp-editable-array')
        );
        for(var el of arrayElements){
            if(!el.querySelector('.cp-editable-array-plus')){
                // Put remove button on direct child div.
                var childrenElements = Array.from(
                    el.querySelectorAll(':scope > div')
                );

                for(var i=0;i<childrenElements.length;i++){
                    const dm = document.createElement('div');
                    dm.classList.add('cp-editable-array-minus-wrapper');
                    const minus = document.createElement('div');
                    minus.textContent = "-";
                    minus.classList.add('cp-editable-array-minus');
                    minus.id = i;
                    dm.style.position = "relative";
                    dm.appendChild(minus);
                    childrenElements[i].appendChild(dm);

                    minus.onclick = (e) => {
                        var parentElement = e.target.closest('.cp-editable-array');//e.target.parentElement.parentElement;
                        window.parent.postMessage({
                            actionType: 'removeFromArray',
                            sections: getSections(parentElement.id),
                            identifier: parentElement.id,
                            index: e.target.id,
                        }, '*');
                    }
                }
                el.style.position = "relative";
                // Search only for direct children with :scope pseudo-class.
                const dw = document.createElement('div');
                dw.classList.add("cp-editable-array-plus-wrapper");
                const plus = document.createElement('div');
                plus.textContent = "+";
                plus.classList.add('cp-editable-array-plus');

                dw.appendChild(plus);   
                el.appendChild(dw);

                plus.onclick = (e) => {
                    var parentElement = e.target.parentElement.parentElement;
                    var obj = constructArrayObj(parentElement);
                    window.parent.postMessage({
                        actionType: 'addToArray',
                        sections: getSections(parentElement.id),
                        identifier: parentElement.id,
                        obj: obj,
                    }, '*');
                }
            }
        }
    }

    // Provided with an element, construct an element by detecting all children types and creating them.
    // These are found by looking for id's of the form 'asd-0-etc'
    const constructArrayObj = (parentElement) => {
        const singleInstance = [];
        // console.log(parentElement)
        // Find all elements with an 'id' attribute
        // Assume that direct child is the right type.
        console.log("parentelements: ", parentElement);
        for(var el of Array.from(parentElement.firstChild.querySelectorAll("[id]"))){
            if(!el.classList.contains("cp-editable-array-minus")){
                var m = el.id.match(/[a-zA-Z0-9]+$/);
                console.log(m, m[0]);
                singleInstance.push({
                    type: el.tagName.toLowerCase(),
                    value: m[0],
                });
            }
        }
        // console.log(singleInstance);
        return singleInstance;
        // for(var t of [".cp-editable",".cp-editable-img",".cp-editable-array"]){
        //     for(var element of Array.from(parentElement.querySelectorAll(t))){

        //     }
        // }
    }

    const cancelClicked = (e) => {
        var parentElement = e.target.closest('.cp-editable');
        parentElement.classList.toggle('editing');
        // quills[getCssSelector(parentElement)].setText("");
        // Manually hide
        parentElement.querySelector('.ql-toolbar').style.display = "none";
        parentElement.querySelector('.ql-container').style.display = "none";

        // quills[getCssSelector(parentElement)].disable();//enable(false);
        // delete quills[getCssSelector(parentElement)];
        // parentElement.textContent = quills[getCssSelector(parentElement)].getText();
        parentElement.innerHTML = quills[getCssSelector(parentElement)].getHTML();// + parentElement.innerHTML;
        
        // // Redefine click events for buttons.
        // Recreates everything.
        addEditButton();
    }

    // Save this field to the DB
    const saveClicked = async (e) => {
        var parentElement = e.target.closest('.cp-editable');
        parentElement.classList.toggle('editing');
        
        // Update local DOM
        // var quill = quills[getCssSelector(parentElement)];
        var currentText = quills[getCssSelector(parentElement)].getHTML();//document.querySelector('.ql-editor').textContent;//Not working => quill.getText();

        // parentElement.textContent = currentText;
        parentElement.innerHTML = currentText;
        const dbObj = currentData;
        var sections = parentElement.id.split(/-|~/g);
        // sections.unshift("obj");
        var val = extractElementContent(parentElement);

        window.parent.postMessage({
            actionType: 'finishedEdit',
            sections: sections,
            val: val,
        }, '*');

        addEditButton();
    }

    // const saveImageClicked = () => {
    //     // var parentElement = e.target.parentElement.previousElementSibling;
    //     // parentElement.classList.toggle('editing');
    //     document.getElementById(currentImageId).classList.toggle('editing');
    //     // Update local DOM
    //     var sections = currentImageId.split(/-|~/g);

    //     console.log('SENDING Save Image: ', sections, currentFile);
    //     window.parent.postMessage({
    //         actionType: 'editFile',
    //         sections: sections,
    //         file: currentFile,
    //         identifier: currentImageId,
    //     }, '*');

    //     addEditButton();
    // }

    const getSections = (s) => {
        var a = s.split(/-|~/g);
        return a;
    }

    const createImageUpload = (e) => {
        var el = e.target;
        var parentElement = el.parentElement.previousElementSibling;//closest('.cp-editable-img');
        console.log("variables: ", el, parentElement, parentElement.id);
        parentElement.classList.toggle('editing');
        // setCurrentFile(imageId);
        setCurrentImageId(parentElement.id);
        // setShowingImageUploader(true);
        window.parent.postMessage({
            actionType: 'editFile',
            sections: getSections(parentElement.id),
            identifier: parentElement.id,
        }, '*');
    }

    const extractElementContent = (el) => {
        // var matchIndex = el.innerHTML.indexOf('<div class="editor-wrapper"');
        // var firstText = el.innerHTML;//.substring(0, matchIndex);
        return el.innerHTML;//firstText;//el.textContent.replace(/EditSaveCancel/,'');
    }


    const toolbarOptions = [
        [{ 'header': [2, false] }],
        // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', /*'code-block'*/'link'],
      
        // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        // [{ 'direction': 'rtl' }],                         // text direction
      
        // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        // [{ 'font': [] }],
        [{ 'align': [] }],
      
        // ['clean']                                         // remove formatting button
    ];

    const createEditInput = (e) => {
        var el = e.target;
        var parentElement = el.closest('.cp-editable');
        parentElement.classList.toggle('editing');
        
        // // var m = parentElement.innerHTML.match(/^[^<]*/);
        // var m = parentElement.innerHTML.match(/.+?(?=<div class="editor")/s);
        // var currentText = m[0].trim();
        // var regexp = new RegExp(m[0]);
        var matchIndex = parentElement.innerHTML.indexOf('<div class="editor-wrapper"');
        var firstText = parentElement.innerHTML.substring(0, matchIndex);
        // var secondText = parentElement.innerHTML.substring(matchIndex);

        // var inp = document.createElement("input");
        if(!parentElement.querySelector('.ql-toolbar')){
            // Kills onclick() events, so has to be placed first.
            parentElement.innerHTML = parentElement.innerHTML.replace(firstText, '');
            var quill = new Quill(parentElement.querySelector('.editor-wrapper'), { //getCssSelector(parentElement)
                modules: { toolbar: toolbarOptions },
                theme: 'snow',
                formats: ['bold','header','italic','blockquote','indent','link','strike','script','underline','list','direction','align','image','video'],
            });
            // var currentText = parentElement.innerHTML;//.replace(/EditSaveCancel$/,'');
             // Match until the first <, which denotes HTML postfixes.
            // currentText = m[0].trim();
            
            // quill.setText(currentText);
            // quill.setHTML(currentText);
            // parentElement.innerHTML = parentElement.innerHTML.replace(regexp, '');
            quill.setHTML(firstText);
            // parentElement.innerHTML = secondText;

            quills[getCssSelector(parentElement)] = quill;
        } else {
            // Editor already exists, just show it
            parentElement.querySelector('.ql-toolbar').style.display = "block";
            parentElement.querySelector('.ql-container').style.display = "block";
            // var currentText = parentElement.textContent;
            // currentText = currentText.replace(/EditSaveCancel$/,'');
            // currentText = m[0].trim();
            // var replaceText = new RegExp(currentText + "EditSaveCancel");
            // parentElement.innerHTML = parentElement.innerHTML.replace(regexp, '');
            parentElement.innerHTML = parentElement.innerHTML.replace(firstText, '');
            // parentElement.innerHTML = secondText;
            quills[getCssSelector(parentElement)].setHTML(firstText);
            // quills[getCssSelector(parentElement)].setText(currentText);
        }

        // Redefine click events for buttons.
        parentElement.querySelector('.cp-editable-cancel-btn').onclick = (e) => {
            cancelClicked(e);
        }
        parentElement.querySelector('.cp-editable-save-btn').onclick = (e) => {
            saveClicked(e);
        }
        // const toolbar = document.createElement('div');
        // toolbar.innerHTML = `<div id="toolbar">
        //     <button class="ql-bold">Bold</button>
        //     <button class="ql-italic">Italic</button>
        // </div>`;

        // parentElement.appendChild(toolbar);
        // parentElement.appendChild(editor);
    }



    const highlightEditable = () => {
        if(!editing)
            setEditing(true);

        addEditButton();

        // Attach CSS to head
        document.head.insertAdjacentHTML('beforeend', `
            <style>
                .cp-editable {
                    border: 2px solid black;
                    position: relative;
                }
                .cp-editable::after {
                    content: "";
                    background-color: rgba(0,0,0,0.1);
                    position: absolute;
                    bottom: 0;
                    top: 0;
                    left: 0;
                    right: 0;
                    pointer-events: none;
                }
                .cp-editable.editing::after {
                    opacity: 0;
                }
                .cp-editable-btn-wrapper {
                    position: absolute;
                    /* box-shadow: 0px 0px 2px rgba(255,255,255,0.5); */
                    z-index: 1;
                    right: 0;
                    bottom: -5px;
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    transition: all 100ms ease-in-out;
                }
                .cp-editable-btn,
                .cp-editable-save-btn,
                .cp-editable-cancel-btn {
                    background-color: black;
                    color: white;
                    padding: 2px 4px;
                    width: 50px;
                    font-size: 12px;
                    border-radius: 4px;
                    border: 1px solid rgba(150,150,150,0.5);
                    cursor: pointer;
                    line-height: normal;
                    font-weight: 200;
                    margin-left: 5px;
                }
                .cp-editable-btn:hover,
                .cp-editable-save-btn:hover,
                .cp-editable-cancel-btn:hover,
                .cp-editable-img-cancel-btn:hover,
                .cp-editable-img-save-btn:hover,
                .cp-editable-img-btn:hover {
                    background-color: rgb(50,50,50);
                }
                .cp-editable.editing .cp-editable-btn,
                .cp-editable-img.editing .cp-editable-img-btn {
                    display: none;
                }
                .cp-editable .cp-editable-save-btn,
                .cp-editable .cp-editable-cancel-btn,
                .cp-editable-img .cp-editable-img-cancel-btn,
                .cp-editable-img .cp-editable-img-save-btn {
                    display: none;
                }
                .cp-editable.editing .cp-editable-save-btn,
                .cp-editable.editing .cp-editable-cancel-btn,
                .cp-editable-img-btn.editing .cp-editable-img-cancel-btn,
                .cp-editable-img-btn.editing .cp-editable-img-save-btn {
                    display: block;
                }

                .ql-toolbar, 
                .editor-wrapper,
                .ql-editor,
                .ql-editor * {
                    background-color: white!important;
                    color: black!important;
                    line-height: normal!important;
                    text-align: initial!important;
                }

                .cp-editable-img-btn {
                    position: relative;
                    border: 2px solid black;
                    background-color: black;
                    color: white;
                    white-space: nowrap;
                    padding: 2px 4px;
                    width: fit-content;
                    font-size: 12px;
                    border-radius: 4px;
                    border: 1px solid rgba(150,150,150,0.5);
                    cursor: pointer;
                    line-height: normal;
                    font-weight: 200;
                    margin-left: 5px;
                }
                .cp-editable-img-wrapper {
                    position: absolute;
                    z-index: 1;
                    right: 0;
                    bottom: 5px;
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    transition: all 100ms ease-in-out;
                }

                .cp-editable-array-minus-wrapper {
                    position: relative;
                }
                .cp-editable-array-minus {
                    position: absolute;
                    bottom: 5px;
                    right: 5px;
                    /*top: 50%;*/
                    /*transform: translateY(-50%);*/
                    border: 1px solid rgba(150,150,150,0.5);
                    border-radius: 4px;
                    font-size: 20px;
                    background-color: black;
                    font-weight: 800;
                    line-height: 20px;
                    padding: 5px 10px;
                    color: white;
                    cursor: pointer;
                }
                .cp-editable-array-plus-wrapper {
                    position: absolute;
                    right: 10px;
                    bottom: 0px;
                }
                .cp-editable-array-plus {
                    position: absolute;
                    bottom: -35px;
                    right: 0px;
                    background-color: black;
                    border: 1px solid rgba(150,150,150,0.5);
                    border-radius: 4px;
                    font-size: 25px;
                    color: white;
                    font-weight: 800;
                    line-height: 20px;
                    padding: 5px 10px;
                    cursor: pointer;

                }
                .cp-editable-array-plus:hover ,
                .cp-editable-array-minus:hover {
                    opacity: .75;
                }
            </style>
        `)
    }

    return "";
}


