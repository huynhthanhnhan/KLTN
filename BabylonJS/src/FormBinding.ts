
import { hl, gizmoManager } from './Enviroment'

import { changeCreateLineMode, changeCreateMutiLineMode, changeCreatePointMode, changeEditMode, changeSelectMode, changeStartCreateLine, triggerStartPoint } from './index'
import { CreateBoxDefault } from './BoxObject'
import $ from 'jquery'

export function formBinding() {
    //////////////////// Form Binding ////////////////////
    var cbSelectMode = document.getElementById("cbSelectMode");
    cbSelectMode.onclick = function () {
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
    cbPointMode.onclick = function () {
        var self = cbPointMode as HTMLInputElement;
        changeCreatePointMode(self.checked);

        if (self.checked) {
            var checkboxes = document.getElementsByName('Mode')
            checkboxes.forEach((item: HTMLInputElement) => {
                if (item !== self && item.checked) item.click();
            })
        }
    }

    var cbSingleLineMode = document.getElementById("cbSingleLineMode");
    cbSingleLineMode.onclick = function () {
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

    var cbMultiLineMode = document.getElementById("cbMultiLineMode");
    cbMultiLineMode.onclick = function () {
        var self = cbMultiLineMode as HTMLInputElement;
        changeCreateMutiLineMode(self.checked);
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

    var cbEditMode = document.getElementById("cbEditMode");
    cbEditMode.onclick = function () {
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
    $('#shape').on('change', function () {
        if (this.value == "hinh lap phuong") {
            CreateBoxDefault();
            var value = "Đây là hình lập phương";
            $('#txtinfo').val(value);
        }
        //     else if(this.value=="hinh cau"){
        //         var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
        //         sphere.position.y = 1;
        //         var value="Đây là hình cầu";
        //         $('#txtinfo').val(value);
        //     }
        //     else if(this.value == "hinh hop chu nhat"){
        //         var box = BABYLON.MeshBuilder.CreateBox("box", {height: 2, width: 4}, scene);
        //         box.position.y = -2;
        //         var value="Đây là hình hộp chữ nhật";
        //         $('#txtinfo').val(value);
        //     }
        //     else if(this.value == "hinh chop"){
        //         var polyhedron={ 
        //             // "vertex":[[0.729665,-0.670121,-0.319155],[0.655235,0.29213,0.754096],[0.093922,0.607123,-0.537818],[-0.702196,-0.595691,-0.485187],[-0.776626,0.36656,0.588064]], 
        //             "vertex":[[-0.729665,0.670121,0.319155],[-0.655235,-0.29213,-0.754096],[-0.093922,-0.607123,0.537818],[0.702196,0.595691,0.485187],[0.776626,-0.36656,-0.588064]], 
        //             "face":[[1,4,2],[0,1,2],[3,0,2],[4,3,2],[4,1,0,3]] }
        //         var polygon = BABYLON.MeshBuilder.CreatePolyhedron(polyhedron.name, { custom: polyhedron, size: 2 }, scene);
        //         var value="Đây là hình chóp";
        //         $('#txtinfo').val(value);
        //     }
    });

    var listMode = [changeCreateLineMode, changeCreatePointMode,changeCreateMutiLineMode,changeEditMode,changeSelectMode];

    function changeMode(mode: Function) {
        // debugger
        changeCreatePointMode(true);
        window['test']=mode
        // mode(true);
        listMode.forEach(m => {
            // if (m != mode)
                // mode(false);
        })
    }



    $('#menus').on('change', function () {
        if (this.value == "point") {
            changeMode(changeCreatePointMode);
            // changeCreatePointMode(true);
        }
        else if (this.value == "single") {
            changeMode(changeCreateLineMode);

            // changeCreateLineMode(true);
        }
        else if (this.value == "multi") {
            triggerStartPoint();
            changeCreateMutiLineMode(true);
        }
        else if (this.value == "edit") {
            changeEditMode(true);
        }
        else if (this.value == "select") {
            changeSelectMode(true);
        }
    });
}


