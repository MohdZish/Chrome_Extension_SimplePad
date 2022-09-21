var currentFileTitle = "Default"

var defaultContent = "<p>Welcome to SimplePad !</p>"
chrome.storage.sync.set({'Default': defaultContent});

chrome.storage.sync.set({'currentNote': "Default"});