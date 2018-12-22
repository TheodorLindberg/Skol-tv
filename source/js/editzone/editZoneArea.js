//rootElement the html element the edit will be created in zone will be shown in, format HTMLDomElement refrence
//ratio the ratio of the edit zone, format {"h": ratio_width, "w": ratio_height}
//margin the margins the edit zone will have relative to the editing area, aka from the top /left element, format, format {"top": top_margin, "bottom": bottom_margin, and for left and right
//outerMargin the outermargins basically defins the area for the edit zone can be placed on and it is relative to the window, this needs to be handeld better in the futre and can be i just need to make some sort of better css to make the website work with it, format, format {"top": top_margin, "bottom": bottom_margin, and for left and right

//MODES
var STATE_EXITED = -100; //unresolved error
var STATE_UNINITIALIZED = -1; //init hasen't been called
var STATE_READY = 1; //Ready
var STATE_CREATING_ELEMENT = 11; //When user is creating a element, currently by dragging
var STATE_ACTIVE_ELEMENT = 12; //When user i manipulating element
var STATE_STANDBY_ACTIVE_ELEMENT = 121; //When a element is still active but the user is doin something else outside the editZoneCanvas

function MarginConfig(margin, centerHorizontally, centerVerically, minDimensions, outerMargins) {
    this.margin = margin;
    this.centerHorizontally = centerHorizontally;
    this.centerVerically = centerVerically;
    this.minDimensions = minDimensions;
    this.outerMargins = outerMargins;
}

function GetDefaultMarginConfig() { return new MarginConfig({ "top": 15, "bottom": 15, "left": 25, "right": 25 }, true, false, { "width": 160, "height": 90 }, { "top": 108, "bottom": 0, "left": 0, "right": 0 }); }

function EditZone(editZoneCanvas, ratio, marginConfig) {
    this.editZoneCanvas = editZoneCanvas;
    this.ratio = ratio;
    this.marginConfig = marginConfig;
    this.margin = marginConfig.margin;

    this.elementList = [];
    this.activeCard = null;
    this.cardHierarchy = [];
    this.activeFocusOnCard = true;
    this.topHierarchyLevel = 1;

    this.state = STATE_UNINITIALIZED;
    this.creationElementHandeler = null
        //Very important functions, needs to be called after creation. Function both sets the internal variables ready for use and changes the html edit zone area to a valid state
    this.init = function() {
        this.editZoneCanvas.editZone = this;
        //Make sure this variable exists, many event listeners uses it
        window.editZone = this;

        this.state = STATE_READY;
        this.updateEditZone();

        window.addEventListener("resize", EditZoneResizeEvent, false);
        window.addEventListener("mousedown", EditZoneMouseDownEvent, false);
        window.addEventListener("mousemove", EditZoneMouseMoveEvent, false);
        window.addEventListener("mouseup", EditZoneMouseUpEvent, false);
        window.addEventListener("keydown", EditZoneKeyPressEvent, false);
        return true;
    };
    this.getLocalBounds = function() {
        return { "top": 0, "left": 0, "bottom": this.editZoneCanvas.clientHeight, "right": this.editZoneCanvas.clientWidth };
    }
    this.moveToTopHierarchy = function(element) {
        element.style.zIndex = this.topHierarchyLevel;
        this.topHierarchyLevel++;
    }
    this.addElement = function(element) {

        this.elementList.push(element);

        this.cardHierarchy.push(element);

        this.moveToTopHierarchy(element.getElement());

    };
    //Updates the current editzone to count in page resizing
    //Returns true if success, fale if failed, like the edit zone can't fit on the viewport
    //This function just updates the editing canvas and does not affect any elements placed on the editing canvas
    this.updateEditZone = function() {

        this.checkValidState();

        var neededWidth = this.marginConfig.outerMargins.left + this.marginConfig.outerMargins.right;
        var neededHeight = this.marginConfig.outerMargins.top + this.marginConfig.outerMargins.bottom;

        var availableWidth = Math.max(document.documentElement.clientWidth - neededWidth, (window.innerWidth - neededWidth) || 0);
        var availableHeight = Math.max(document.documentElement.clientHeight - neededHeight, (window.innerHeight - neededHeight) || 0);

        var h = availableHeight - (this.margin.bottom + this.margin.top);
        var w = availableWidth - (this.margin.left + this.margin.right);

        if (h / 9 < w / 16) {
            w = (h / 9) * 16;
            h = (w / 16) * 9;
        } else {
            h = (w / 16) * 9;
            w = (h / 9) * 16;
        }

        if (w < this.marginConfig.minDimensions.width || h < this.marginConfig.minDimensions.height) {
            return { "result": false, "reason": "Resulting canvas to small, scale your browser or call changeMinDimensions function in console" };
        }

        var finalMarginLeft, finalMarginTop;

        finalMarginLeft = (this.marginConfig.centerHorizontally ? ((availableWidth - w) / 2) : this.margin.left);
        finalMarginTop = (this.marginConfig.centerVerically ? ((availableHeight - h) / 2) : this.margin.top);

        this.editZoneCanvas.style.marginLeft = finalMarginLeft + "px";
        this.editZoneCanvas.style.marginTop = finalMarginTop + "px";

        this.editZoneCanvas.style.width = w + "px";
        this.editZoneCanvas.style.height = h + "px";
    };

    this.checkValidState = function() {
        if (this.state < 0) {
            switch (this.state) {
                case STATE_UNINITIALIZED:
                    alert("FATAL ERROR::EDIT_ZONE_CHECKER::REASON, INIT HASEN'T BEEN CALLED ON EDIT ZONE CANVAS");
                    break;
                case STATE_EXITED:
                    alert("FATAL ERROR::EDIT_ZONE_CHECKER::REASON, a unkown error have happend please check console and reload page");
                    break;
            }
        }

    }
};

function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
};