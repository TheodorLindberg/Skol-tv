function objectStylingStruct(borderColor, borderWidth, background) {
    this.borderColor = borderColor;
    this.borderWidth = borderWidth;
    this.background = background;
}

function getDefaultObjectStyling() {
    return new objectStylingStruct(true, true, true);
}

function configStruct(horizontalResize, verticalResize, lockToRatio,
    defaultDimentions, objectStyling, objectStylingConfig,
    resizeCallback) {

    this.horizontalResize = horizontalResize;
    this.verticalResize = verticalResize;
    this.lockToRatio = lockToRatio;
    this.defaultDimentions = defaultDimentions;
    this.objectStyling = objectStyling;
    this.objectStylingConfig = getDefaultObjectStyling();
    this.resizeCallback = resizeCallback;


}

function getDefaultConfig() {
    return new configStruct(true, true, false, false, true, getDefaultObjectStyling(), false);
}

function GetNewObj() {
    var elem = $('<div class="interact">' +
        '<div class="interact-element-content"></div>' +
        '<div class="HoverContent">' +
        '<div class="TopLeft interactMovePoint"></div>' +
        '<div class="TopRight interactMovePoint"></div>' +
        '<div class="BottomLeft interactMovePoint"></div>' +
        '<div class="BottomRight interactMovePoint"></div>' +

        '<div class="Top interactMovePoint"></div>' +
        '<div class="Right interactMovePoint"></div>' +
        '<div class="Left interactMovePoint"></div>' +
        '<div class="Bottom interactMovePoint"></div>' +

        '</div></div>');
    return elem;
}