function broswerHistory(obj, actions) {

    for(let action of actions) {
        let [act, website] = action.split(' ');

        if(act === 'Open') {
            openTab(website);
        } else if(act === 'Close') {
            closeTab(website);
        } else {
            obj["Open Tabs"] = [];
            obj["Recently Closed"] = [];
            obj["Browser Logs"] = [];
        }
    }

    function openTab(w) {
        obj["Open Tabs"].push(w);
        actionLogs(w, "Open ");
    }

    function closeTab(w) {
        if(obj["Open Tabs"].includes(w)) {
            let index = obj["Open Tabs"].indexOf(w);
            let closedItem = obj["Open Tabs"].splice(index, 1)[0];
            obj["Recently Closed"].push(closedItem);
            actionLogs(w, "Close ");
        }
    }

    function actionLogs(w, pre) {
        obj["Browser Logs"].push(pre + w);
    }

    console.log(obj["Browser Name"]);
    console.log(`Open Tabs: ${obj["Open Tabs"].join(', ')}`);
    console.log(`Recently Closed: ${obj["Recently Closed"].join(', ')}`);
    console.log(`Browser Logs: ${obj["Browser Logs"].join(', ')}`);
}