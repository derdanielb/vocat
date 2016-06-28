ccm.component({
    name: "vocat",
    config: {
        html: [ccm.store, {local: "http://derdanielb.github.io/vocat/resources/template.json"}],
        jquery_ui: [ccm.load, "https://code.jquery.com/ui/1.12.0-rc.2/jquery-ui.min.js"],
        tree: [ccm.instance, "http://derdanielb.github.io/vocat/resources/ccm_tree/ccm.brlz_tree.js"],
        trainer: [ccm.instance, "http://derdanielb.github.io/vocat/resources/ccm_vocab/ccm.vocab-trainer.js"],
        style: [ccm.load, "http://derdanielb.github.io/vocat/resources/vocat.css"]
    },
    Instance: function () {
        function e(e) {
            document.title = "VOCAT: " + e
        }

        var c = "http://derdanielb.github.io/vocat/resources/demo2.json";
        this.render = function () {
            var t = this, r = function (r) {
                c = r, t.atree = ccm.instance("http://derdanielb.github.io/vocat/resources/ccm_vocab/ccm.vocab-trainer.js", {
                    element: jQuery("#trainer"),
                    vocfield: c
                }), t.atree.render(), e(r)
            }, a = ccm.helper.element(this);
            a.html(ccm.helper.html(t.html.get("main"))), this.atree = ccm.instance("http://derdanielb.github.io/vocat/resources/ccm_tree/ccm.brlz_tree.js", {
                element: jQuery("#tree_area_2"),
                dir: c,
                whatacall: r
            }), console.log("asdf"), this.atree.render(), t.atrainer = ccm.instance("http://derdanielb.github.io/vocat/resources/ccm_vocab/ccm.vocab-trainer.js", {
                element: jQuery("#trainer"),
                vocfield: c
            })
        }
    }
});