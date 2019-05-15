//https://stackoverflow.com/a/47480429/9068081
const delay = ms => new Promise(res => setTimeout(res, ms));

chrome.tabs.onCreated.addListener(
  async function(tab) {
    chrome.tabs.query({}, async function(tabs) {
      if (toggle) {
        for (let i = 1; i < tabs.length + 1; i++) {
          await delay((Math.floor(Math.random() * Math.floor(1)) + (1000 * (i - 1))) / 2);
          alert("Are you getting distracted?\n\nI've counted " + i.toString() + " tab" + ((i != 1) ? "s" : "") + " now\u2026");
        }
        await delay(1000);
        alert("I guess you can keep working now\u2026\n\n\u2026But I'll be back!")
      }
    })
  }
)

var toggle = false;
chrome.browserAction.onClicked.addListener(function(tab) {
  toggle = !toggle;
  if (toggle) {
    chrome.browserAction.setBadgeText({
      text: "ON"
    });
    chrome.browserAction.setTitle({
      title: "Turn off the punishment, but only if it's okay to get distracted now."
    });
  } else {
    chrome.browserAction.setBadgeText({
      text: ""
    });
    chrome.browserAction.setTitle({
      title: "Turn on the punishment! Bring it on!"
    });
  }
});
