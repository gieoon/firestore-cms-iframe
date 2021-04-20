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

export default function CMS(){

    const [editing, setEditing] = useState(/*TODO make this false */true);
    // const [showEditor, setShowingEditor] = useState();
    const [currentData, setCurrentData] = useState();
    
    useEffect(()=>{
        // Listen to CMS websitecontent editing events.
        window.addEventListener("message", receivedMessage, false);

        // console.log('HIGHLIGHTING');
        // TODO remove this, this is only to be prompted by the parent from Craftie.xyz.
        // highlightEditable({origin: allowedOrigin, data: "startEdit"});

        setInterval(() => {
            addEditButton();
        }, 1500);

    }, []);

    // useEffect(()=>{
    //     console.log('currentData: ', currentData);
    // }, [currentData]);

    // Handles received messages from parent.
    const receivedMessage = (evt) => {
        // console.log('Received event Evt.data: ', evt.data);
        // 'highlight'
        if(!evt.origin.includes("login.bush_and_beyond")) return;

        if(evt.data.actionType === 'startEdit'){
            highlightEditable();
            // console.log("evt.data: ", evt.data);
            setCurrentData(evt.data.websiteContent);
        } else {
            // console.log('Editing not allowed: ', evt.origin);
        }
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

    // useEffect(()=>{
    //     console.log('Adding');
    //     if(editing){
    //         addEditButton();
    //     }
    // });

    const addEditButton = () => {
        const elements = Array.from(
            document.querySelectorAll('.cp-editable')
        );
        // console.log("editable elements: ", elements[2]);
        for(var el of elements){
            // console.log('el.querySelector(.cp-editable-btn): ', el.querySelector('.cp-editable-btn') === undefined);

            if(!el.querySelector('.cp-editable-btn')){
                console.log('Adding button');
                const dw = document.createElement('div');
                dw.classList.add("cp-editable-btn-wrapper");
                // console.log('Adding edit button to element: #', el, el.querySelector('.cp-editable-btn'));
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
    }

    const cancelClicked = (e) => {
        var parentElement = e.target.closest('.cp-editable');
        parentElement.classList.toggle('editing');
        // console.log('Cancel pressed')
        // console.log(quills[getCssSelector(parentElement)].getText());
        // quills[getCssSelector(parentElement)].setText("");
        // Manually hide
        parentElement.querySelector('.ql-toolbar').style.display = "none";
        parentElement.querySelector('.ql-container').style.display = "none";

        // quills[getCssSelector(parentElement)].disable();//enable(false);
        // delete quills[getCssSelector(parentElement)];
        // parentElement.textContent = quills[getCssSelector(parentElement)].getText();
        parentElement.innerHTML = quills[getCssSelector(parentElement)].getHTML();// + parentElement.innerHTML;
        // console.log("parentElement.textContent: ", parentElement.textContent);
        
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
        console.log('got text: ', currentText)

        // parentElement.textContent = currentText;
        parentElement.innerHTML = currentText;
        console.log(currentData);
        const dbObj = currentData;
        console.log("Loaded dbObj: ", dbObj);
        var sections = parentElement.id.split(/-|~/g);
        // sections.unshift("obj");
        console.log("el.id: ", parentElement.id);
        console.log("sections: ", sections);
        var val = extractElementContent(parentElement);
        
        // console.log(JSON.stringify(newObj));
        console.log("Sending: ", sections, val);

        window.parent.postMessage({
            actionType: 'finishedEdit',
            sections: sections,
            val: val,
        }, '*');

        addEditButton();
    }

    const extractElementContent = (el) => {
        console.log('Extracting text from: ', el, el.innerHTML);
        // var matchIndex = el.innerHTML.indexOf('<div class="editor-wrapper"');
        // var firstText = el.innerHTML;//.substring(0, matchIndex);
        // console.log('firstText: ', firstText);
        return el.innerHTML;//firstText;//el.textContent.replace(/EditSaveCancel/,'');
    }


    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
      
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        // [{ 'direction': 'rtl' }],                         // text direction
      
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
      
        ['clean']                                         // remove formatting button
    ];

    const createEditInput = (e) => {
        // console.log('Creating edit input');
        var el = e.target;
        var parentElement = el.closest('.cp-editable');
        parentElement.classList.toggle('editing');
        // console.log('parentElement: ', parentElement.innerHTML);
        // // var m = parentElement.innerHTML.match(/^[^<]*/);
        // var m = parentElement.innerHTML.match(/.+?(?=<div class="editor")/s);
        // console.log(m);
        // var currentText = m[0].trim();
        // var regexp = new RegExp(m[0]);
        var matchIndex = parentElement.innerHTML.indexOf('<div class="editor-wrapper"');
        var firstText = parentElement.innerHTML.substring(0, matchIndex);
        // var secondText = parentElement.innerHTML.substring(matchIndex);

        // console.log("first text: ", firstText);
        // console.log("second text: ", secondText);
        
        // var inp = document.createElement("input");
        if(!parentElement.querySelector('.ql-toolbar')){
            
            var quill = new Quill(parentElement.querySelector('.editor-wrapper'), { //getCssSelector(parentElement)
                modules: { toolbar: toolbarOptions },
                theme: 'snow'
            });
            // var currentText = parentElement.innerHTML;//.replace(/EditSaveCancel$/,'');
            // console.log('currentText: ', currentText);
             // Match until the first <, which denotes HTML postfixes.
            // console.log("m[0]: ", m[0]);
            // currentText = m[0].trim();
            // console.log('inner html: ', parentElement.innerHTML);
            // console.log("replaced: ", parentElement.innerHTML.replace(regexp, ''));
            
            // quill.setText(currentText);
            // quill.setHTML(currentText);
            // parentElement.innerHTML = parentElement.innerHTML.replace(regexp, '');
            parentElement.innerHTML = parentElement.innerHTML.replace(firstText, '');
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
        // console.log(quills);
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
                .cp-editable-cancel-btn:hover {
                    background-color: rgb(50,50,50);
                }
                .cp-editable.editing .cp-editable-btn {
                    display: none;
                }
                .cp-editable .cp-editable-save-btn,
                .cp-editable .cp-editable-cancel-btn {
                    display: none;
                }
                .cp-editable.editing .cp-editable-save-btn,
                .cp-editable.editing .cp-editable-cancel-btn {
                    display: block;
                }
            </style>
        `)
    }

    return "";
}