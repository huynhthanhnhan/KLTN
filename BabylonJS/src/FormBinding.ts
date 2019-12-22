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
    // form.addEventListener('Create', event => {
    // // submit event detected
    // // (<HTMLInputElement>document.getElementById('edge')).value;
    // var x;
    // var y;
    // var z;
    // console.log("vao ho t cai");
    // // console.log("style",document.getElementById('box'));
    // if((<HTMLElement>document.getElementById('box')).style.display !='none')
    // {
    //     console.log("vao dung");
    //     // var cubeBox=CreateCubeCustom(x,y,z,parseInt((<HTMLInputElement>document.getElementById('edge')).value));
    //     // scene.registerBeforeRender(function(){
    //     //     cubeBox.rotation.y += 0.05;
    //     // });
    // }
    // var valDiameter=(<HTMLInputElement>document.getElementById('diameter')).value;
    // if(valDiameter !=null && valDiameter !='')
    // {
    //     CreateSphereCustom(x,y,z,parseInt(valDiameter));
    // }
    // var valBoxWidth=(<HTMLInputElement>document.getElementById('width')).value;
    // var valBoxHeight=(<HTMLInputElement>document.getElementById('height')).value;
    // if((valBoxWidth !=null && valBoxWidth !='')&&(valBoxHeight !=null && valBoxHeight !=''))
    // {
    //     CreateBoxCustom(x,y,z,parseInt(valBoxHeight),parseInt(valBoxWidth));
    // }
    // var valPointsOfPyramid=(<HTMLInputElement>document.getElementById('pointsofpyramid')).value;
    // var valPyramidHeight=(<HTMLInputElement>document.getElementById('heightofpyramid')).value;
    // if(valPointsOfPyramid !=null && valPyramidHeight !='')
    // {
    //     CreatePyramidCustom(x,y,z,parseInt(valPyramidHeight),parseInt(valPointsOfPyramid));
    // }
    // var valPointsOfPrism=(<HTMLInputElement>document.getElementById('pointsofprism')).value;
    // var valPrismHeigth=(<HTMLInputElement>document.getElementById('heightofprism')).value;
    // if(valPointsOfPrism !=null && valPrismHeigth !='')
    // {
    //     if(valPointsOfPrism == '3'){
    //         CreatePrismCustom(x,y,z,parseInt(valPointsOfPrism)+2,parseInt(valPrismHeigth));
    //     }
    //     else{
    //         CreatePrismCustom(x,y,z,parseInt(valPointsOfPrism)+1,parseInt(valPrismHeigth));
    //     }
    // }
    // var valConeDiameter=(<HTMLInputElement>document.getElementById('diameterofcone')).value;
    // var valConeHeight=(<HTMLInputElement>document.getElementById('heightofcone')).value;
    // if(valConeDiameter !=null && valConeHeight !='')
    // {
    //         CreateConeCustom(x,y,z,parseInt(valConeDiameter),parseInt(valConeHeight));
    // }
    // event.preventDefault()
   
    // })
    var checkStatus= function(checkValue){
        var state= {height:false, width:false, edge:false, diameter:false, pointsofpyramid:false,heightofpyramid:false, pointsofprism:false, heightofprism:false,diameterofcone:false, heightofcone:false };
        Object.keys(state).forEach(function(k){
            Object.keys(checkValue).forEach(function(i){
            if(state[k]==true){
                return;
            }
            state[k]=(k==i)?true:false;
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

    function changeSystemMode(mode: 'select' | 'line' | 'multiLine' | 'point' | 'edit' | 'intersect'|
    'plane3Point' | 'plane2Line' | 'planePointLine' | 'distance2Point' | 'distance2Line' | 'distancePointLine' | 'totalArea' | 'box-inputs' | 'cube-inputs' | 'cone-inputs' | 'sphere-inputs'|'pyramid-inputs') {
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
    $("#line_click_multi").on('click', function () {
        changeSystemMode('multiLine');
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
    });
    $("#plane_click_3_point").on('click', function () {
        changeSystemMode('plane3Point');
        setIsPickableBasicScene(false);
    });
    $("#plane_click_2_line").on('click', function () {
        changeSystemMode('plane2Line');
        setIsPickableBasicScene(false);
    });
    $("#plane_click_point_line").on('click', function () {
        changeSystemMode('planePointLine');
        setIsPickableBasicScene(false);
    });
    $("#caculate_distance_2_point").on('click', function () {
        changeSystemMode('distance2Point');
        setIsPickableBasicScene(false);
    });
    $("#caculate_distance_2_line").on('click', function () {
        changeSystemMode('distance2Line');
        setIsPickableBasicScene(false);
    });
    $("#caculate_distance_point_line").on('click', function () {
        changeSystemMode('distancePointLine');
        setIsPickableBasicScene(false);
    });
    $("#caculate_total_area").on('click', function () {
        changeSystemMode('totalArea');
        setIsPickableBasicScene(false);
    });


    var listMesh = document.getElementById('listMesh');
    var form_input = document.getElementById("formInput");
    var point1 = document.getElementById('point1');
    var point2 = document.getElementById('point2');
    var point3 = document.getElementById('point3');
    var vector = document.getElementById('vector');
    var position = document.getElementById('position');

    var box = document.getElementById('box');
    var cube = document.getElementById('cube');
    var cone = document.getElementById('cone');
    var sphere = document.getElementById('sphere');
    var pyramid= document.getElementById('pyramid');

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

    var box_width = document.getElementById('box-width') as HTMLInputElement;
    var box_height = document.getElementById('box-height') as HTMLInputElement;

    var cube_edge = document.getElementById('cube-edge') as HTMLInputElement;

    var cone_diameter = document.getElementById('cone-diameter') as HTMLInputElement;
    var cone_height = document.getElementById('cone-height') as HTMLInputElement;

    var sphere_diameter = document.getElementById('sphere-diameter') as HTMLInputElement;

    var pyramid_height = document.getElementById('pyramid-height') as HTMLInputElement;
    var pyramid_face = document.getElementById('pyramid-face') as HTMLInputElement;

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

    $("#box_input").on('click', function () {
        resetFormInput();
        box.style.display = 'block';
        position.style.display = 'block';
        setInputObject('box-inputs');
    })

    $("#cube_input").on('click', function () {
        resetFormInput();
        cube.style.display = 'block';
        position.style.display = 'block';
        setInputObject('cube-inputs');
    })

    $("#sphere_input").on('click', function () {
        resetFormInput();
        sphere.style.display = 'block';
        position.style.display = 'block';
        setInputObject('sphere-inputs');
    })

    $("#cone_input").on('click', function () {
        resetFormInput();
        cone.style.display = 'block';
        position.style.display = 'block';
        setInputObject('cone-inputs');
    })

    $("#pyramid_input").on('click', function () {
        resetFormInput();
        pyramid.style.display = 'block';
        position.style.display = 'block';
        setInputObject('pyramid-inputs');
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
            case "box-inputs":
                CreateBoxCustom(parseInt(position_x.value),parseInt(position_y.value),parseInt(position_z.value),parseInt(box_width.value),parseInt(box_height.value));
                break;
            case "cone-inputs":
                CreateConeCustom(parseInt(position_x.value),parseInt(position_y.value),parseInt(position_z.value),parseInt(cone_diameter.value),parseInt(cone_height.value));
                break;
            case "sphere-inputs":
                CreateSphereCustom(parseInt(position_x.value),parseInt(position_y.value),parseInt(position_z.value),parseInt(sphere_diameter.value));
                break;
            case "cube-inputs":
                CreateCubeCustom(parseInt(position_x.value),parseInt(position_y.value),parseInt(position_z.value),parseInt(cube_edge.value));
                break;
            case "pyramid-inputs":
                CreatePyramidCustom(parseInt(position_x.value),parseInt(position_y.value),parseInt(position_z.value),parseInt(pyramid_height.value),parseInt(pyramid_face.value));
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


