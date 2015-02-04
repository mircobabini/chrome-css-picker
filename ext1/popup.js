function onWindowLoad() {

  function test(){
    chrome.tabs.executeScript(null, {
      file: "getPagesSource.js"
    }, function() {
      // If you try and inject into an extensions page or the webstore/NTP you'll get an error
      if (chrome.extension.lastError) {
        message.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
      }
    });
  }
  document.querySelector('#test').addEventListener( 'click', test )
}

window.onload = onWindowLoad;

