/* ************************************************************************
   Copyright: 2009 OETIKER+PARTNER AG
   License: GPL
   Authors: Tobi Oetiker <tobi@oetiker.ch>
************************************************************************ */

qx.Class.define("remocular.ui.form.renderer.Top",{
    extend : qx.ui.form.renderer.AbstractRenderer,
    construct: function(form){
        var layout = new qx.ui.layout.HBox(2);
        this._setLayout(layout);
        this.base(arguments,form);
    },
    members : {
        addItems: function(items,names,title){
            for (var i = 0; i < items.length; i++) {
                var label =  new qx.ui.basic.Label(names[i]).set({alignY: 'middle'});
                this._add(label);
                var item = items[i];
                label.setBuddy(item);
                if (item instanceof qx.ui.form.RadioGroup) {
                    item = this._createWidgetForRadioGroup(item);
                }
                item.set({
                    alignY: 'middle',
                    allowGrowY: false,
                    marginLeft: 2
                });
                this._add(item);
                this._add(new qx.ui.toolbar.Separator());
            }    
        },
        addButton : function(button) {
            this._add(button);
        },
        getLayout : function() {
            return this._getLayout();
        }
    }
});
