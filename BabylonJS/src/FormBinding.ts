
import { hl, gizmoManager } from './Enviroment'

import { changeCreateLineMode, changeCreateMutiLineMode, changeCreatePointMode, changeEditMode, changeSelectMode, changeStartCreateLine, triggerStartPoint } from './index'
import { CreateBoxDefault } from './BoxObject'
import { CreateBoxCustom } from './BoxObject'
import { CreateCubeDefault } from './CubeObject'
import { CreateCubeCustom } from './CubeObject'
import { CreateSphereDefault } from './SphereObject'
import { CreateSphereCustom } from './SphereObject'
import { CreatePyramidDefault } from './PyramidObject'
import { CreateConeDefault } from './ConeObject'
import { CreatePrismDefault } from './PrismObject'
import $ from 'jquery'

export function formBinding() {
    //////////////////// Form Binding ////////////////////
    // var cbSelectMode = document.getElementById("cbSelectMode");
    // cbSelectMode.onclick = function () {
    //     var self = cbSelectMode as HTMLInputElement;
    //     changeSelectMode(self.checked);

    //     if (self.checked) {
    //         var checkboxes = document.getElementsByName('Mode')
    //         checkboxes.forEach((item: HTMLInputElement) => {
    //             if (item !== self && item.checked) item.click();
    //         })
    //     }
    // }
    // var cbPointMode = document.getElementById("cbPointMode");
    // cbPointMode.onclick = function () {
    //     var self = cbPointMode as HTMLInputElement;
    //     changeCreatePointMode(self.checked);

    //     if (self.checked) {
    //         var checkboxes = document.getElementsByName('Mode')
    //         checkboxes.forEach((item: HTMLInputElement) => {
    //             if (item !== self && item.checked) item.click();
    //         })
    //     }
    // }

    // var cbSingleLineMode = document.getElementById("cbSingleLineMode");
    // cbSingleLineMode.onclick = function () {
    //     var self = cbSingleLineMode as HTMLInputElement;
    //     changeCreateLineMode(self.checked);
    //     triggerStartPoint();
    //     if (self.checked)
    //         changeStartCreateLine(true);

    //     if (self.checked) {
    //         var checkboxes = document.getElementsByName('Mode')
    //         checkboxes.forEach((item: HTMLInputElement) => {
    //             if (item !== self && item.checked) item.click();
    //         })
    //     }
    // }

    // var cbMultiLineMode = document.getElementById("cbMultiLineMode");
    // cbMultiLineMode.onclick = function () {
    //     var self = cbMultiLineMode as HTMLInputElement;
    //     changeCreateMutiLineMode(self.checked);
    //     triggerStartPoint();
    //     if (self.checked)
    //         changeStartCreateLine(true);


    //     if (self.checked) {
    //         var checkboxes = document.getElementsByName('Mode')
    //         checkboxes.forEach((item: HTMLInputElement) => {
    //             if (item !== self && item.checked) item.click();
    //         })
    //     }
    // }

    // var cbEditMode = document.getElementById("cbEditMode");
    // cbEditMode.onclick = function () {
    //     var self = cbEditMode as HTMLInputElement;
    //     changeEditMode(self.checked);
    //     gizmoManager.boundingBoxGizmoEnabled = self.checked;


    //     if (self.checked) {
    //         var checkboxes = document.getElementsByName('Mode')
    //         checkboxes.forEach((item: HTMLInputElement) => {
    //             if (item !== self && item.checked) item.click();
    //         })
    //     }
    // }

    const form = document.querySelector('form')
    form.addEventListener('submit', event => {
    // submit event detected
    var valCube=(<HTMLInputElement>document.getElementById('edge')).value;
    if(valCube !=null && valCube !='')
    {
        CreateCubeCustom(valCube);
    }
    var valDiameter=(<HTMLInputElement>document.getElementById('diameter')).value;
    if(valDiameter !=null && valDiameter !='')
    {
        CreateSphereCustom(valDiameter);
    }
    var valBoxWidth=(<HTMLInputElement>document.getElementById('width')).value;
    var valBoxHeight=(<HTMLInputElement>document.getElementById('height')).value;
    if((valBoxWidth !=null && valBoxWidth !='')&&(valBoxHeight !=null && valBoxHeight !=''))
    {
        CreateBoxCustom(valBoxHeight,valBoxWidth);
    }
    var valPoints=(<HTMLInputElement>document.getElementById('points')).value;
    if(valPoints !=null && valPoints !='')
    {
        // Cre(valPoints);
    }
    event.preventDefault()
   
    })
    var checkStatus= function(checkValue){
        var state= {height:false, width:false, edge:false, diameter:false, points:false };
        Object.keys(state).forEach(function(k){
            Object.keys(checkValue).forEach(function(i){
            if(state[k]==true){
                return;
            }
            state[k]=(k==i)?true:false;
            });
        });
        Object.keys(state).forEach(function(k){
            if(state[k]==true)
            {
                (<HTMLInputElement>document.getElementById(k)).type='text';
            }
            else
            {
                (<HTMLInputElement>document.getElementById(k)).type='hidden';
            }
        });
    }

    $('#shape').on('change', function () {
        if (this.value == "hinh lap phuong") {
            CreateCubeDefault();
            var value = "Hình lập phương";
            document.getElementById("infoHeader").innerHTML=value;
            var boxinfo= {edge:false };
            checkStatus(boxinfo);
        }
            else if(this.value=="hinh cau"){
                CreateSphereDefault();
                var value="Hình cầu";
                document.getElementById("infoHeader").innerHTML=value;
                var sphereinfo={diameter:false};
                checkStatus(sphereinfo);
            }
            else if(this.value == "hinh hop chu nhat"){
                CreateBoxDefault();
                var value="Hình hộp chữ nhật";
                document.getElementById("infoHeader").innerHTML=value;
                var cubeinfo={height:false, width:false};
                checkStatus(cubeinfo);
            }
            else if(this.value == "hinh chop"){
                CreatePyramidDefault();
                var value="Hình chóp";
                document.getElementById("infoHeader").innerHTML=value;
            }
            else if(this.value == "hinh tru"){
                CreatePrismDefault();
                var value="Hình trụ";
                document.getElementById("infoHeader").innerHTML=value;
            }
            else if(this.value == "hinh non"){
                CreateConeDefault();
                var value="Hình nón";
                document.getElementById("infoHeader").innerHTML=value;
            }
    });

    var changeMode= function(modeValue){
        var mode= {changeSelectMode:false, changeEditMode:false,changeCreatePointMode:false,changeCreateLineMode:false,changeCreateMutiLineMode:false};
        Object.keys(mode).forEach(function(k){
            Object.keys(modeValue).forEach(function(i){
            if(mode[k]==true){
                return;
            }
            mode[k]=(k==i)?true:false;
            });
        });
        Object.keys(mode).forEach(function(k){
            if(mode[k]==true)
            {
                if(k == "changeEditMode")
                {
                    console.log("changeedittrue");
                    changeEditMode(true);
                    gizmoManager.boundingBoxGizmoEnabled = true;
                }
                else if(k == "changeSelectMode")
                {
                    console.log("changeselecttrue");
                    changeSelectMode(true);
                    gizmoManager.boundingBoxGizmoEnabled = false;
                }
                else if(k == "changeCreatePointMode")
                {
                     console.log("changeCreatePointModetrue");
                    changeCreatePointMode(true);
                    gizmoManager.boundingBoxGizmoEnabled = false;
                }
                else if(k == "changeCreateLineMode")
                {
                    console.log("changeCreateLineModetrue");
                    changeCreateLineMode(true);
                    gizmoManager.boundingBoxGizmoEnabled = false;
                    triggerStartPoint();
                    changeStartCreateLine(true);
                }
                else if(k == "changeCreateMutiLineMode")
                {
                    console.log("changeCreateMutiLineModetrue");
                    changeCreateMutiLineMode(true);
                    gizmoManager.boundingBoxGizmoEnabled = false;
                    triggerStartPoint();
                    changeStartCreateLine(true);
                }
            }
            else
            {
                if(k == "changeEditMode")
                {
                    console.log("changeeditfalse");
                    changeEditMode(false);
                }
                else if(k == "changeSelectMode")
                {
                    console.log("changeSelectModefalse");
                    changeSelectMode(false);
                }
                else if(k == "changeCreatePointMode")
                {
                    console.log("changeCreatePointModefalse");
                    changeCreatePointMode(false);
                }
                else if(k == "changeCreateLineMode")
                {
                    console.log("changeCreateLineModefalse");
                    changeCreateLineMode(false);
                }
                else if(k == "changeCreateMutiLineMode")
                {
                    console.log("changeCreateMutiLineModefalse");
                    changeCreateMutiLineMode(false);
                }
            }
        });
    }
 
    $('#menus').on('change', function () {
        if (this.value == "point") {
            var pointmode={changeCreatePointMode:false};
            changeMode(pointmode);
        }
        else if (this.value == "single") {
            var singlemode={changeCreateLineMode:false};
            changeMode(singlemode);
        }
        else if (this.value == "multi") {
            var multimode={changeCreateMutiLineMode:false};            
            changeMode(multimode);
        }
        else if (this.value == "edit") {
            var editmode={changeEditMode:false};
            changeMode(editmode);
        }
        else if (this.value == "select") {
            var selectmode={changeSelectMode:false};
            changeMode(selectmode);
            
        }
    });
}


