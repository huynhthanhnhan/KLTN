
import {hl, gizmoManager} from './Enviroment'

import {changeCreateLineMode, changeCreateMutiLineMode, changeCreatePointMode, changeEditMode, changeSelectMode, changeStartCreateLine, triggerStartPoint} from './index'

export function formBinding(){
//////////////////// Form Binding ////////////////////
var cbSelectMode = document.getElementById("cbSelectMode");
cbSelectMode.onclick = function() {
    var self = cbSelectMode as HTMLInputElement;
    changeSelectMode(self.checked);

    if (self.checked) {
        var checkboxes = document.getElementsByName('Mode')
        checkboxes.forEach((item: HTMLInputElement) => {
            if (item !== self && item.checked) item.click();
        })
    }
}
var cbPointMode = document.getElementById("cbPointMode");
cbPointMode.onclick = function() {
    var self = cbPointMode as HTMLInputElement; 
    changeCreatePointMode(self.checked);

    if (self.checked) {
        var checkboxes = document.getElementsByName('Mode')
        checkboxes.forEach((item: HTMLInputElement) => {
            if (item !== self && item.checked) item.click();
        })
    }
}

var cbSingleLineMode =document.getElementById("cbSingleLineMode");
cbSingleLineMode.onclick = function() {
    var self = cbSingleLineMode as HTMLInputElement;
    changeCreateLineMode(self.checked);
    triggerStartPoint();
    if (self.checked)
        changeStartCreateLine(true);

    if (self.checked) {
        var checkboxes = document.getElementsByName('Mode')
        checkboxes.forEach((item: HTMLInputElement) => {
            if (item !== self && item.checked) item.click();
        })
    }
}

var cbMultiLineMode  = document.getElementById("cbMultiLineMode");
cbMultiLineMode.onclick = function() {
    var self = cbMultiLineMode as HTMLInputElement;
    changeCreateMutiLineMode(self.checked);
    triggerStartPoint();
    if (self.checked)
    changeStartCreateLine(true);


    if (self.checked) {
        var checkboxes = document.getElementsByName('Mode')
        checkboxes.forEach((item:HTMLInputElement) => {
            if (item !== self && item.checked) item.click();
        })
    }
}

var cbEditMode = document.getElementById("cbEditMode");
cbEditMode.onclick = function() {
    var self = cbEditMode as HTMLInputElement;
    changeEditMode(self.checked);
    gizmoManager.boundingBoxGizmoEnabled = self.checked;


    if (self.checked) {
        var checkboxes = document.getElementsByName('Mode')
        checkboxes.forEach((item: HTMLInputElement) => {
            if (item !== self && item.checked) item.click();
        })
    }
}
}


