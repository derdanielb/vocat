ccm.component(
    {
        name: 'vocat',
        config: {
            html: [ccm.store, {local: 'http://derdanielb.github.io/vocat/template.json'}],
            jquery_ui: [ccm.load, 'https://code.jquery.com/ui/1.12.0-rc.2/jquery-ui.min.js'],
            tree: [ccm.instance, 'http://derdanielb.github.io/vocat/ccm_tree/ccm.brlz_tree.js'],
            trainer: [ccm.instance, 'http://derdanielb.github.io/vocat/ccm_vocab/ccm.vocab-trainer.js'],
            style: [ ccm.load, 'http://derdanielb.github.io/vocat/vocat.css' ]

        },
        Instance: function () {
            var currentTreeDir = "http://derdanielb.github.io/vocat/demo2.json";

            function refreshTitle(title) {
                document.title = "VOCAT: " + title;
            }
            this.render = function () {
                var that = this;

                var reloadvocab = function (voc) {

                    currentTreeDir = voc;
                    //console.log(voc);
                    that.atrainer = ccm.instance('http://derdanielb.github.io/vocat/ccm_vocab/ccm.vocab-trainer.js', {
                        element: jQuery('#trainer'),
                        vocfield: currentTreeDir
                    });
                    that.atrainer.render();
                    refreshTitle(voc);
                };
                var element = ccm.helper.element(this);
                element.html(ccm.helper.html(that.html.get('main')));
                //this.tree.render();
                //next two lines also a working alternative
                this.atree = ccm.instance('http://derdanielb.github.io/vocat/ccm_tree/ccm.brlz_tree.js', {
                    element: jQuery('#tree_area_2'),
                    dir: currentTreeDir,
                    whatacall: reloadvocab
                });
                this.atree.render();
                that.atrainer = ccm.instance('http://derdanielb.github.io/vocat/ccm_vocab/ccm.vocab-trainer.js', {
                    element: jQuery('#trainer'),
                    vocfield: currentTreeDir
                });
                //that.atrainer.render();



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