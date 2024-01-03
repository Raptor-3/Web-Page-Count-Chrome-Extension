const increaseCount = () => {
        var tabUrl = document.location.href;
        getCount(function(value) {
            var current = value;
            if (current != undefined) {
                current++;
                var obj = {};
                obj[tabUrl] = current; 
                chrome.storage.sync.set(obj, function() {
                    console.log("Value updated");
                    })
                }
            else {
                var obj = {};
                obj[tabUrl] = 1; 
                chrome.storage.sync.set(obj, function() {
                    console.log("Value added");
                });
            }
        });
}

const getCount = (getKeyValue) => {
        var tabUrl = document.location.href;
        chrome.storage.sync.get(tabUrl, function(result) {
            getKeyValue(result[tabUrl])
        });
}

increaseCount();
let lastUrl = location.href;
new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        increaseCount();
        }
}).observe(document, {subtree: true, childList: true});
