ccm.component(
    {
        name: 'vocat',
        config: {
            html: [ccm.store, {local: 'template.json'}],
            jquery_ui: [ccm.load, 'https://code.jquery.com/ui/1.12.0-rc.2/jquery-ui.min.js'],
            tree: [ccm.instance, 'ccm_tree/ccm.brlz_tree.js']
        },
        Instance: function () {
            var currentTreeDir = "demo.json";

            function refreshTitle(title) {
                document.title = "VOCAT: " + title;
            }

            //tree:[ccm.instance, 'ccm_tree/ccm.brlz_tree.js', {element: jQuery('#tree_area_3'), dir: 'demo.json', whatacall: '{ alert("hi"); tree.render()}'}]

            //https://code.jquery.com/ui/1.11.4/jquery-ui.min.js
            this.render = function () {
                var that = this;
                var reloadvocab = function (voc) {

                    currentTreeDir = voc;
                    console.log(voc);
                    that.atree = ccm.instance('ccm_tree/ccm.brlz_tree.js', {
                        element: jQuery('#tree_area_2'),
                        dir: currentTreeDir,
                        whatacall: reloadvocab
                    });
                    that.atree.render();
                    refreshTitle(voc);
                };
                var element = ccm.helper.element(this);
                element.html(ccm.helper.html(that.html.get('main')));
                //this.tree.render();
                //next two lines also a working alternative
                this.atree = ccm.instance('ccm_tree/ccm.brlz_tree.js', {
                    element: jQuery('#tree_area_2'),
                    dir: currentTreeDir,
                    whatacall: reloadvocab
                });
                this.atree.render();
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