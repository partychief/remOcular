/* ************************************************************************
   Copyright: 2008, OETIKER+PARTNER AG
   License: GPL
   Authors: Tobias Oetiker
************************************************************************ */

/* ************************************************************************
#asset(qx/icon/${qx.icontheme}/22/status/dialog-warning.png)
#asset(qx/icon/${qx.icontheme}/22/status/dialog-error.png)
#asset(qx/icon/${qx.icontheme}/22/status/dialog-information.png)
#asset(qx/icon/${qx.icontheme}/16/actions/dialog-close.png)
************************************************************************ */

/**
 * An Error Popup Window that shows messages
 * sent to to 'error' message bus.
 */
qx.Class.define("smokescope.ui.InfoBar", {
    extend : qx.ui.container.Composite,
    construct : function() {
        this.base(arguments);
        this.set({
            visibility: 'excluded',
            paddingLeft: 5,
            paddingRight: 5,
            allowGrowY: false,
            decorator: new qx.ui.decoration.Beveled('border-main','white',0.5)
        });

        this.setLayout(new qx.ui.layout.HBox(5));
        this.__body = new qx.ui.basic.Atom().set({
            gap      : 10
        });

        this.add(this.__body,{flex: 1});

        this.__closeBtn = new qx.ui.toolbar.Button(null,'icon/16/actions/dialog-close.png');       
        this.add(this.__closeBtn);
        this.__closeBtn.addListener("execute", function(e) {
            this.fade();
        },this);

        this.addListenerOnce('appear',function(){
            this.__fadeEffect = new qx.fx.effect.core.Fade(this.getContainerElement().getDomElement()).set({
                from: 1,
                to: 0,
                modifyDisplay: false,
                duration: 0.2
            });
            this.__fadeEffect.addListener("finish",function(){            
                this.setVisibility('excluded');
            },this);
        },this);
    },

    members : {
        __body : null,
        __fadeEffect: null,
        __closeBtn: null,
        __open : function(text){
            this.__body.setLabel(String(text));
            this.__closeBtn.setEnabled(true);
            if (this.__fadeEffect){
                this.__fadeEffect.update(1);
            }
            this.setVisibility('visible');
        },

        fade : function(){
            if (this.getVisibility() == 'visible'){
                this.__closeBtn.setEnabled(false);
                this.__fadeEffect.start();
            }
        },
                        
        error : function(text) {
            this.__body.setIcon("icon/22/status/dialog-error.png");
            this.setBackgroundColor('#ff6a97');
            this.__open(text);
        },

        warn : function(text) {
            this.__body.setIcon("icon/22/status/dialog-warning.png");
            this.setBackgroundColor('#ffdd3d');         
            this.__open(text);
        },

        info : function(text) {
            this.__body.setIcon("icon/22/status/dialog-information.png");
            this.setBackgroundColor('#96ff51');         
            this.__open(text);
        }
    }
});
