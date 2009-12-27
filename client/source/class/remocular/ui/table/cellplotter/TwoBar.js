/* ************************************************************************
   Copyright: 2009 OETIKER+PARTNER AG
   License:   same as qooXdoo
   Authors:   Tobi Oetiker <tobi@oetiker.ch>
   Utf8Check: äöü
************************************************************************ */

/**
 * Plotter Plugin for the Canvas cellrenderer.
 * Draw two bars where the second sits on the first
 * and extends in both directions ... Ideal for average and standarddeviation.
 */
qx.Class.define("remocular.ui.table.cellplotter.TwoBar", {
    extend : qx.core.Object,

    /**
     * Instanciate the plotter
     *
     * @param cfg {Map} configuration map
     * 
     * <pre class='javascript'>
     * cfg = {
     *    mainbarFill:   '#color',
     *    mainbarBorder: '#color',
     *    stackbarFill:  '#color',
     *    stackbarBorder:'#color'
     * }; 
     * </pre>
     */
    construct : function(cfg) {
        this.base(arguments);

        this.__cfg = {
            mainbarFill    : cfg.mainbarFill || '#f88',
            mainbarBorder  : cfg.mainbarBorder || '#b44',
            stackbarFill   : cfg.stackbarFill || '#88f',
            stackbarBorder : cfg.stackbarBorder || '#44b'
        };

        this.reset();
    },

    members : {
        __cfg : null,
        __max : null,


        /**
         * TODOC
         *
         * @param c {var} TODOC
         * @param cellInfo {var} TODOC
         * @param w {var} TODOC
         * @param h {Map} TODOC
         * @return {boolean | var} TODOC
         */
        plot : function(c, cellInfo, w, h) {
            var d = cellInfo.value;

            if (isNaN(d.mainbar)) {
                return false;
            }

            var cfg = this.__cfg;
            var sum = d.mainbar;

            if (!isNaN(d.stackbar)) {
                sum += d.stackbar;
            }

            var redraw;

            if (sum > this.__max) {
                this.__max = sum;
                redraw = true;
            }

            var mainbar = Math.round(d.mainbar * (w - 4) / this.__max);
            c.strokeWidth = 0.5;
            c.fillStyle = cfg.mainbarFill;
            c.strokeStyle = cfg.mainbarBorder;
            c.fillRect(0.5, 2.5, mainbar, h - 6);
            c.strokeRect(0.5, 2.5, mainbar, h - 6);

            if (!isNaN(d.stackbar)) {
                var stackbar = Math.round(d.stackbar * w / this.__max);
                c.fillStyle = cfg.stackbarFill;
                c.strokeStyle = cfg.stackbarBorder;
                c.fillRect(mainbar - stackbar + 0.5, 6.5, 2 * stackbar, h - 13);
                c.strokeRect(mainbar - stackbar + 0.5, 6.5, 2 * stackbar, h - 13);
            }

            return redraw;
        },


        /**
         * TODOC
         *
         * @return {void} 
         */
        reset : function() {
            this.__max = 0;
        }
    }
});
