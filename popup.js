const container = document.getElementsByClassName("container")[0];
container.innerHTML = '<div class="title"style="min-width:275px;min-height:50px"><h1>Number of times you have visited this page:</h1></div>'

const getValue = (getKeyValue) => {
    chrome.tabs.query({active: true, currentWindow: true }, function (tabs) {
        var tab = tabs[0];
        var tabUrl = tab.url;
        chrome.storage.sync.get(tabUrl, function(result) {
            getKeyValue(result[tabUrl])
        });
    });
}

getValue(function(value) {
        p = document.createElement("p");
        p.innerHTML = value;
        container.appendChild(p);

        var b = document.createElement('button');
        b.innerHTML = "Reset";
        container.appendChild(b);
        b.addEventListener('click', function() {
            onButtonClicked();
        });
});

function onButtonClicked (){
    chrome.tabs.query({active: true, currentWindow: true }, function (tabs) {
        var tab = tabs[0];
        var tabUrl = tab.url;
        var obj = {};
        obj[tabUrl] = 1; 
        chrome.storage.sync.set(obj, function() {
            window.location.reload();
        });
    });
}