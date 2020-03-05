const ControlType2TagName = new Object();
export function regControlType(controlType, tagName) {
    ControlType2TagName[controlType] = tagName;
}
export function getTagName(controlType) {
    return ControlType2TagName[controlType];
}
