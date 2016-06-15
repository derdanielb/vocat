ccm.component({
    name: 'vocat',
    config: {
        html: [ccm.store, {local: 'template.json'}],
        jquery_ui: [ccm.load, 'https://code.jquery.com/ui/1.12.0-rc.2/jquery-ui.min.js'],
        tree:[ccm.load, 'ccm_tree/ccm.brlz_tree.js']
    },
    Instance: function () {



        //https://code.jquery.com/ui/1.11.4/jquery-ui.min.js
        this.render = function () {
            var that = this;
            var folder = {
                "tag": "div",
                "class": "folder",
                "id": "%placeholder%",

                "inner": "a test"

            };

            var element = ccm.helper.element(this);
            element.html(ccm.helper.html(that.html.get('main')));
            var newtest = JSON.parse(JSON.stringify(folder));

            ccm.helper.find(that, '#' + parent).append(ccm.helper.html(newtest));



        }
    }
});


//Data structure
//  Root{}:
//      -Folder[]
//      -File[]
//  Folder{}:
//      -name:string
//      -content:[ Folder || File]
//  File{}:
//      -name:string
//      -ref:url
//


//"Folder": [{
//    "name": "Subfolder 1.1",
//    "content": {
//
//    }
//}],

//"File": [
//    {
//        "name": "File1.1",
//        "ref": "http://i.imgur.com/72w2Zl6.jpg"
//    }
//]