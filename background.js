//https://stackoverflow.com/a/47480429/9068081
const delay = ms => new Promise(res => setTimeout(res, ms));

chrome.tabs.onCreated.addListener(
  async function(tab) {
    chrome.tabs.query({}, async function(tabs) {
      if (toggle) {
        let broken = false;
        for (let i = 1; i < tabs.length + 1; i++) {
          chrome.tabs.query({}, function(nowtabs) { tabs = nowtabs });
          await delay((Math.floor(Math.random() * Math.floor(1)) + (1000 * (i - 1))) / 2);
          if (!confirm("Are you getting distracted?\n\nI've counted " + ((tabs.length != 1) ? i.toString() + " of " + tabs.length.toString() + " tabs" : "one tab") + " now\u2026")) {
            chrome.tabs.remove(tab.id);
            broken = true;
            //alert("\nCrisis averted! Get back to work!") Should this be a notification? Can we do that?
            break
          };
        }
      }
    })
  }
)

function toggler (tab) {
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
}

chrome.browserAction.onClicked.addListener(toggler);

var toggle = false;
toggler({});
