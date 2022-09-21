

const editor = SUNEDITOR.create((document.getElementById('editor') || 'editor'),{
    height: 450,
    defaultStyle: "font-size:16px;"
});

//var defaultContent = "<p>Welcome to SimplePad !</p>"
//chrome.storage.sync.set({'Default': defaultContent});

chrome.storage.sync.get("currentNote", function(result) {
    document.getElementById("noteTitle").value = result.currentNote;
    chrome.storage.sync.get(result.currentNote, function(newresult) {
        editor.setContents(newresult[result.currentNote]);
      });
  });


editor.onChange = saveContent;

//document.getElementById("noteTitle").value = 'Default';

//editor.onChange = function (contents, core) { console.log('onChange', contents) }

document.getElementById('addNewNote').addEventListener('click', AddNewNote);
document.getElementById('noteTitle').addEventListener('change', updateTitle);
// to remove these : (testing)
/*
document.getElementById('alert').addEventListener('click', getFileContent);
document.getElementById('save').addEventListener('click', saveFileContent);
document.getElementById('replaceSaved').addEventListener('click', openFileContent);
document.getElementById('storage').addEventListener('click', alertStorage);
document.getElementById('clearNotes').addEventListener('click', clearAllNotes);
*/



function fileBtnClicked(e){
    var fileTitle = e.target.id; // key
    // save content and title of previous file
    
    // refresh editor
    
    // open content in editor and title of clicked file and ID of div
    document.getElementById("noteTitle").value = fileTitle;
    chrome.storage.sync.get(fileTitle, function(result) {
        editor.setContents(result[fileTitle]);
      });

    chrome.storage.sync.set({'currentNote': fileTitle});
}



// <div id="alert" class="btn btn-light btn-block fileListbtn">alert</div>
function AddNewNote(){
    // clear content of editor
    editor.setContents("");

    // create new storage 
    chrome.storage.sync.get(null, function(items) {
        notesCount = Object.keys(items).length;
        var key = "text" + notesCount;
        var obj= {};
        obj[key] = editor.getContents();
        chrome.storage.sync.set(obj);

        addDivtoList(key);

        // title change
        document.getElementById("noteTitle").value = key;
        chrome.storage.sync.set({'currentNote': key});
    });
}

refreshNoteList()
function refreshNoteList(){
    const myNode = document.getElementById("notesMenu");
    myNode.innerHTML = ''; // clearing the menu first
    chrome.storage.sync.get(null, function(items) {
        //items = items => Object.keys(items).sort().reduce((res, key) => (res[key] = items[key], res), {})
        for (key in items) {
            if(key != "currentNote"){
                addDivtoList(key)
            }
        }
    });
}

function addDivtoList(key){
    var tag = document.createElement("div");
    tag.innerHTML = key; // key is the title text
    tag.id = key;
    tag.onclick = fileBtnClicked;
    tag.className = "btn btn-light btn-block fileListbtn";
    var element = document.getElementById("notesMenu");
    element.appendChild(tag);
}


function clearAllNotes(){
    chrome.storage.sync.clear();
}

function getFileContent(){
    alert(editor.getContents());
}

function alertStorage(){
    alert(currentFileTitle)
    chrome.storage.sync.get(null, function(items) {
        var allKeys = Object.keys(items);
        alert(allKeys);
    });
}

function saveFileContent(){
    chrome.storage.sync.set({'tst': editor.getContents()});
}

function updateTitle(){
    chrome.storage.sync.get("currentNote", function(result) {
        var oldTitle = result.currentNote;
        var newTitle = document.getElementById("noteTitle").value;
        chrome.storage.sync.remove(oldTitle);
        
        var obj= {};
        obj[newTitle] = editor.getContents();
        chrome.storage.sync.set(obj, function(){
            refreshNoteList()
        });
    });
}


function saveContent(){
    var noteTitle = document.getElementById("noteTitle").value;
    var obj= {};
    obj[noteTitle] = editor.getContents();
    //alert("content changed")
    chrome.storage.sync.set(obj);
}

function openFileContent(key){
    chrome.storage.sync.get(key, function(result) {
        editor.setContents(result.tst);
      });
}

function loadNote(key){
    document.getElementById("noteTitle").value = key;
    chrome.storage.sync.get(key, function(result) {
        editor.setContents(result.key);
      });
}

function hello(){
    alert("hello");
}

