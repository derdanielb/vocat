ccm.component({
    name: 'vocat',
    config: {
        html: [ccm.store, {local: 'template.json'}],
        jquery_ui: [ccm.load, 'https://code.jquery.com/ui/1.12.0-rc.2/jquery-ui.min.js'],
        tree:[ccm.instance, 'ccm_tree/ccm.brlz_tree.js', {element: jQuery('#tree_area_3'), dir: 'ccm_tree/demo.json'}]
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
            this.tree.render();
            //next two lines also a working alternative
            //this.atree = ccm.instance('ccm_tree/ccm.brlz_tree.js', {element: jQuery('#tree_area_3'), dir: 'ccm_tree/demo.json'});
            //this.atree.render();


            //ccm.helper.find(that, '#' + parent).append(ccm.helper.html(newtest));
            //element.tree(ccm.render({element: jQuery('#tree_area_3'), dir: 'demo.json'}));
            //ccm.render( 'ccm_tree',{element: jQuery('#tree_area_3'), dir: 'ccm_tree/demo.json'});
            //ccm.render(('ccm_tree/ccm.brlz_tree.js', {element: jQuery('#tree_area_3'), dir: 'demo.json'}));
            //var treec = ccm.helper.element(tree);
            //treec.render({element: jQuery('#tree_area_3'), dir: 'demo.json'});



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