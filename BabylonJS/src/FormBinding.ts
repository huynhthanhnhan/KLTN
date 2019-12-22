import { CreateBoxDefault } from './Objects/BoxObject'
import { CreateBoxCustom } from './Objects/BoxObject'
import { CreateCubeDefault } from './Objects/CubeObject'
import { CreateCubeCustom } from './Objects/CubeObject'
import { CreateSphereDefault } from './Objects/SphereObject'
import { CreateSphereCustom } from './Objects/SphereObject'
import { CreatePyramidDefault } from './Objects/PyramidObject'
import { CreatePyramidCustom } from './Objects/PyramidObject'
import { CreateConeDefault } from './Objects/ConeObject'
import { CreateConeCustom } from './Objects/ConeObject'
import { CreatePrismDefault } from './Objects/PrismObject'
import { CreatePrismCustom } from './Objects/PrismObject'
import $ from 'jquery'
import { triggerStartPoint, setSysMode, setStartPoint, setIsStartCreateLine, setInputObject, getInputObject } from './TempVariable'
import { setIsPickableBasicScene } from './BasicScreen'
import { Point } from './Point'
import * as BABYLON from '@babylonjs/core'
import { Line } from './Line'
import { Plane } from './Plane'

export function formBinding() {
    // const form = document.querySelector('form')
    // form.addEventListener('submit', event => {
    // submit event detected
    // var valCube=(<HTMLInputElement>document.getElementById('edge')).value;
    // if(valCube !=null && valCube !='')
    // {
    //     var cubeBox=CreateCubeCustom(parseInt(valCube));
    //     // scene.registerBeforeRender(function(){
    //     //     cubeBox.rotation.y += 0.05;
    //     // });
    // }
    // var valDiameter=(<HTMLInputElement>document.getElementById('diameter')).value;
    // if(valDiameter !=null && valDiameter !='')
    // {
    //     CreateSphereCustom(valDiameter);
    // }
    // var valBoxWidth=(<HTMLInputElement>document.getElementById('width')).value;
    // var valBoxHeight=(<HTMLInputElement>document.getElementById('height')).value;
    // if((valBoxWidth !=null && valBoxWidth !='')&&(valBoxHeight !=null && valBoxHeight !=''))
    // {
    //     CreateBoxCustom(parseInt(valBoxHeight),parseInt(valBoxWidth));
    // }
    // var valPointsOfPyramid=(<HTMLInputElement>document.getElementById('pointsofpyramid')).value;
    // var valPyramidHeight=(<HTMLInputElement>document.getElementById('heightofpyramid')).value;
    // if(valPointsOfPyramid !=null && valPyramidHeight !='')
    // {
    //     CreatePyramidCustom(parseInt(valPyramidHeight),parseInt(valPointsOfPyramid));
    // }
    // var valPointsOfPrism=(<HTMLInputElement>document.getElementById('pointsofprism')).value;
    // var valPrismHeigth=(<HTMLInputElement>document.getElementById('heightofprism')).value;
    // if(valPointsOfPrism !=null && valPrismHeigth !='')
    // {
    //     if(valPointsOfPrism == '3'){
    //         CreatePrismCustom(parseInt(valPointsOfPrism)+2,parseInt(valPrismHeigth));
    //     }
    //     else{
    //         CreatePrismCustom(parseInt(valPointsOfPrism)+1,parseInt(valPrismHeigth));
    //     }
    // }
    // var valConeDiameter=(<HTMLInputElement>document.getElementById('diameterofcone')).value;
    // var valConeHeight=(<HTMLInputElement>document.getElementById('heightofcone')).value;
    // if(valConeDiameter !=null && valConeHeight !='')
    // {
    //         CreateConeCustom(parseInt(valConeDiameter),parseInt(valConeHeight));
    // }
    // event.preventDefault()

    // })
    var checkStatus = function (checkValue) {
        var state = { height: false, width: false, edge: false, diameter: false, pointsofpyramid: false, heightofpyramid: false, pointsofprism: false, heightofprism: false, diameterofcone: false, heightofcone: false };
        Object.keys(state).forEach(function (k) {
            Object.keys(checkValue).forEach(function (i) {
                if (state[k] == true) {
                    return;
                }
                state[k] = (k == i) ? true : false;
            });
        });
        Object.keys(state).forEach(function (k) {
            if (state[k] == true) {
                (<HTMLInputElement>document.getElementById(k)).type = 'text';
            }
            else {
                (<HTMLInputElement>document.getElementById(k)).type = 'hidden';
            }
        });
    }

    $('#shape').on('change', function () {
        if (this.value == "hinh lap phuong") {
            CreateCubeDefault();
            var value = "Hình lập phương";
            document.getElementById("infoHeader").innerHTML = value;
            var boxinfo = { edge: false };
            checkStatus(boxinfo);
        }
        else if (this.value == "hinh cau") {
            CreateSphereDefault();
            var value = "Hình cầu";
            document.getElementById("infoHeader").innerHTML = value;
            var sphereinfo = { diameter: false };
            checkStatus(sphereinfo);
        }
        else if (this.value == "hinh hop chu nhat") {
            CreateBoxDefault();
            var value = "Hình hộp chữ nhật";
            document.getElementById("infoHeader").innerHTML = value;
            var cubeinfo = { height: false, width: false };
            checkStatus(cubeinfo);
        }
        else if (this.value == "hinh chop") {
            CreatePyramidDefault();
            var value = "Hình chóp";
            document.getElementById("infoHeader").innerHTML = value;
            var pyramidinfo = { pointsofpyramid: false, heightofpyramid: false };
            checkStatus(pyramidinfo);
        }
        else if (this.value == "hinh tru") {
            CreatePrismDefault();
            var value = "Hình trụ";
            document.getElementById("infoHeader").innerHTML = value;
            var prisminfo = { pointsofprism: false, heightofprism: false };
            checkStatus(prisminfo);
        }
        else if (this.value == "hinh non") {
            CreateConeDefault();
            var value = "Hình nón";
            document.getElementById("infoHeader").innerHTML = value;
            var coneinfo = { diameterofcone: false, heightofcone: false };
            checkStatus(coneinfo);
        }
    });


    function changeSystemMode(mode: string = 'line' || 'multiLine' || 'select' || 'point' || 'edit') {
        setIsStartCreateLine(true)
        setSysMode(mode);
    }
    $('#menus').on('change', function () {
        if (this.value == "point") {
            changeSystemMode('point');
            setIsPickableBasicScene(true);
        }
        else if (this.value == "line") {
            // console.log('line')
            changeSystemMode('line')
            setIsPickableBasicScene(true);
        }
        else if (this.value == "multi") {
            triggerStartPoint();
            changeSystemMode('multiLine');
            setIsPickableBasicScene(true);
        }
        else if (this.value == "edit") {
            changeSystemMode('edit');
            setIsPickableBasicScene(false);
        }
        else if (this.value == "select") {
            changeSystemMode('select');
            setIsPickableBasicScene(false);
        }
        else if (this.value == "intersect") {
            changeSystemMode('intersect');
            setIsPickableBasicScene(false);
        }
    });
    $("#point_click").on('click', function () {
        changeSystemMode('point');
        setIsPickableBasicScene(true);
    })
    $("#line_click").on('click', function () {
        changeSystemMode('line');
        setIsPickableBasicScene(true);
    })
    $("#btn_select_mode").on('click', function () {
        changeSystemMode('select');
        setIsPickableBasicScene(false);
    })
    $("#btn_edit_mode").on('click', function () {
        changeSystemMode('edit');
        setIsPickableBasicScene(false);
    })
    $("#btn_view_intersect_mode").on('click', function () {
        changeSystemMode('intersect');
        setIsPickableBasicScene(false);
    })

    var listMesh = document.getElementById('listMesh');
    var form_input = document.getElementById("formInput");
    var point1 = document.getElementById('point1');
    var point2 = document.getElementById('point2');
    var point3 = document.getElementById('point3');
    var vector = document.getElementById('vector');
    var position = document.getElementById('position');

    var position_x = document.getElementById('position-x') as HTMLInputElement;
    var position_y = document.getElementById('position-y') as HTMLInputElement;
    var position_z = document.getElementById('position-z')as HTMLInputElement;
    var point1_x = document.getElementById('point1-x') as HTMLInputElement;
    var point1_y = document.getElementById('point1-y') as HTMLInputElement;
    var point1_z = document.getElementById('point1-z') as HTMLInputElement;
    var point2_x = document.getElementById('point2-x') as HTMLInputElement;
    var point2_y = document.getElementById('point2-y') as HTMLInputElement;
    var point2_z = document.getElementById('point2-z') as HTMLInputElement;
    var point3_x = document.getElementById('point3-x') as HTMLInputElement;
    var point3_y = document.getElementById('point3-y') as HTMLInputElement;
    var point3_z = document.getElementById('point3-z') as HTMLInputElement;
    var vector_x = document.getElementById('vector-x') as HTMLInputElement;
    var vector_y = document.getElementById('vector-y') as HTMLInputElement;
    var vector_z = document.getElementById('vector-z') as HTMLInputElement;

    $("#renderCanvas").on('click', function () {
        listMesh.style.display = "none";
        resetFormInput();
        form_input.style.display = "none"
    })
    var count = 1;
    $("#mesh-tab").on('click', function () {
        if (count % 2 == 0)
            listMesh.style.display = "none"
        else
            listMesh.style.display = "flex"
        count++;
    })

    function resetFormInput() {
        document.getElementsByName('div-form-input').forEach(e => {
            e.style.display = "none";
        })
        document.getElementsByName('form-input-value').forEach(e => {
            (e as HTMLInputElement).value = "";
        })
        setInputObject('');
        form_input.style.display = "block";
        document.getElementById('btnCreate').style.display = 'block';
        document.getElementById('btnClose').style.display = 'block';

    }
    $("#point_input").on('click', function () {
        resetFormInput();
        position.style.display = 'block';
        setInputObject('point');

        // var x = document.getElementById('position-x');
    })

    $("#line_input_point_vector").on('click', function () {
        resetFormInput();
        point1.style.display = 'block';
        vector.style.display = 'block';
        setInputObject('line-point-vector');
    })

    $("#line_input_2_point").on('click', function () {
        resetFormInput();
        point1.style.display = 'block';
        point2.style.display = 'block';
        setInputObject('line-point-point');
    })

    $("#plane_input_3_point").on('click', function () {
        resetFormInput();
        point1.style.display = 'block';
        point2.style.display = 'block';
        point3.style.display = 'block';
        setInputObject('plane-3-point');
    })

    $("#plane_input_point_vector").on('click', function () {
        resetFormInput();
        point1.style.display = 'block';
        vector.style.display = 'block';
        setInputObject('plane-point-vector');
    })

    $("#btnClose").on('click', function () {
        resetFormInput();
        form_input.style.display = "none";
    })
    $("#btnCreate").on('click', function () {
        switch (getInputObject()) {
            case "point":
                new Point(new BABYLON.Vector3(parseInt(position_x.value), parseInt(position_y.value), parseInt(position_z.value)));
                break;
            case "line-point-point":
                var pt1 = new BABYLON.Vector3(parseInt(point1_x.value), parseInt(point1_y.value), parseInt(point1_z.value));
                var pt2 = new BABYLON.Vector3(parseInt(point2_x.value), parseInt(point2_y.value), parseInt(point2_z.value));
                new Line(pt1, pt2,"pos-pos");
                break;
            case "line-point-vector":
                var pt = new BABYLON.Vector3(parseInt(point1_x.value), parseInt(point1_y.value), parseInt(point1_z.value));
                var vt = new BABYLON.Vector3(parseInt(vector_x.value), parseInt(vector_y.value), parseInt(vector_z.value));
                new Line(pt, vt,"point-vector");
                break;
            case "plane-3-point":
                var pt1 = new BABYLON.Vector3(parseInt(point1_x.value), parseInt(point1_y.value), parseInt(point1_z.value));
                var pt2 = new BABYLON.Vector3(parseInt(point2_x.value), parseInt(point2_y.value), parseInt(point2_z.value));
                var pt3 = new BABYLON.Vector3(parseInt(point3_x.value), parseInt(point3_y.value), parseInt(point3_z.value));
                new Plane('3point',pt1, pt2,pt3);
                break;
            case "plane-point-vector":
                var pt = new BABYLON.Vector3(parseInt(point1_x.value), parseInt(point1_y.value), parseInt(point1_z.value));
                var vt = new BABYLON.Vector3(parseInt(vector_x.value), parseInt(vector_y.value), parseInt(vector_z.value));
                new Plane('point-vector',pt, vt, 0);
                break;
            default:
        }
        form_input.style.display = "none";
    })

    // $('#plane').on('change', function () {
    //     if (this.value == "3point") {
    //         changeSystemMode('point');
    //         setIsPickableBasicScene(true);
    //     }
    //     else if (this.value == "point_normal") {
    //         // console.log('line')
    //         changeSystemMode('line')
    //         setIsPickableBasicScene(true);
    //     }
    // }
}


