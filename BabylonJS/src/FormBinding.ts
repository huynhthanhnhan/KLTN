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
import {triggerStartPoint, setSysMode, setStartPoint, setIsStartCreateLine} from './TempVariable'
import { setIsPickableBasicScene } from './BasicScreen'

export function formBinding() {
    const form = document.querySelector('form')
    form.addEventListener('submit', event => {
    // submit event detected
    // (<HTMLInputElement>document.getElementById('edge')).value;
    var x;
    var y;
    var z;
    if((<HTMLInputElement>document.getElementById('edge')).value !=null && (<HTMLInputElement>document.getElementById('edge')).value !='')
    {
        var cubeBox=CreateCubeCustom(x,y,z,parseInt((<HTMLInputElement>document.getElementById('edge')).value));
        // scene.registerBeforeRender(function(){
        //     cubeBox.rotation.y += 0.05;
        // });
    }
    var valDiameter=(<HTMLInputElement>document.getElementById('diameter')).value;
    if(valDiameter !=null && valDiameter !='')
    {
        CreateSphereCustom(x,y,z,parseInt(valDiameter));
    }
    var valBoxWidth=(<HTMLInputElement>document.getElementById('width')).value;
    var valBoxHeight=(<HTMLInputElement>document.getElementById('height')).value;
    if((valBoxWidth !=null && valBoxWidth !='')&&(valBoxHeight !=null && valBoxHeight !=''))
    {
        CreateBoxCustom(x,y,z,parseInt(valBoxHeight),parseInt(valBoxWidth));
    }
    var valPointsOfPyramid=(<HTMLInputElement>document.getElementById('pointsofpyramid')).value;
    var valPyramidHeight=(<HTMLInputElement>document.getElementById('heightofpyramid')).value;
    if(valPointsOfPyramid !=null && valPyramidHeight !='')
    {
        CreatePyramidCustom(x,y,z,parseInt(valPyramidHeight),parseInt(valPointsOfPyramid));
    }
    var valPointsOfPrism=(<HTMLInputElement>document.getElementById('pointsofprism')).value;
    var valPrismHeigth=(<HTMLInputElement>document.getElementById('heightofprism')).value;
    if(valPointsOfPrism !=null && valPrismHeigth !='')
    {
        if(valPointsOfPrism == '3'){
            CreatePrismCustom(x,y,z,parseInt(valPointsOfPrism)+2,parseInt(valPrismHeigth));
        }
        else{
            CreatePrismCustom(x,y,z,parseInt(valPointsOfPrism)+1,parseInt(valPrismHeigth));
        }
    }
    var valConeDiameter=(<HTMLInputElement>document.getElementById('diameterofcone')).value;
    var valConeHeight=(<HTMLInputElement>document.getElementById('heightofcone')).value;
    if(valConeDiameter !=null && valConeHeight !='')
    {
            CreateConeCustom(x,y,z,parseInt(valConeDiameter),parseInt(valConeHeight));
    }
    event.preventDefault()
   
    })
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
                var pyramidinfo={pointsofpyramid:false,heightofpyramid:false};
                checkStatus(pyramidinfo);
            }
            else if(this.value == "hinh tru"){
                CreatePrismDefault();
                var value="Hình trụ";
                document.getElementById("infoHeader").innerHTML=value;
                var prisminfo={pointsofprism:false, heightofprism:false};
                checkStatus(prisminfo);
            }
            else if(this.value == "hinh non"){
                CreateConeDefault();
                var value="Hình nón";
                document.getElementById("infoHeader").innerHTML=value;
                var coneinfo={diameterofcone:false, heightofcone:false};
                checkStatus(coneinfo);
            }
    });


    function changeSystemMode(mode: string = 'line'||'multiLine'||'select'||'point'||'edit'){
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
        else if(this.value == "intersect"){
            changeSystemMode('intersect');
            setIsPickableBasicScene(false);
        }
    });
    $("#point_click").on('click', function(){
        changeSystemMode('point');
        setIsPickableBasicScene(true);
    })
    $("#line_click").on('click', function(){
        changeSystemMode('line');
        setIsPickableBasicScene(true);
    })
    $("#btn_select_mode").on('click', function(){
        changeSystemMode('select');
        setIsPickableBasicScene(false);
    })
    $("#btn_edit_mode").on('click', function(){
        changeSystemMode('edit');
        setIsPickableBasicScene(false);
    })
    $("#btn_view_intersect_mode").on('click', function(){
        changeSystemMode('intersect');
        setIsPickableBasicScene(false);
    })
    function resetFormInput(){
        document.getElementsByName('div-form-input').forEach(e=>{
            e.style.display = "none";
        })
    }

    

    $("#point_input").on('click', function(){
        resetFormInput();
        // document.getElementById('position').style.display = 'block';
        // document.getElementById('btnCreate').style.display = 'block';
        // var x = document.getElementById('position-x');
        document.getElementById('sphere').style.display = 'block';
        console.log("da vao");
        document.getElementById('btnCreate').style.display = 'block';

    })

    $("#line_input_point_vector").on('click', function(){
        resetFormInput();
        document.getElementById('point1').style.display = 'block';
        document.getElementById('vector').style.display = 'block';
        document.getElementById('btnCreate').style.display = 'block';
    })

    $("#line_input_2_point").on('click', function(){
        resetFormInput();
        document.getElementById('point1').style.display = 'block';
        document.getElementById('point2').style.display = 'block';
        document.getElementById('btnCreate').style.display = 'block';
    })

    $("#boxinput").on('click', function(){
        resetFormInput();
        document.getElementById('box').style.display = 'block';
        document.getElementById('btnCreate').style.display = 'block';
    })

    $("#cubeinput").on('click', function(){
        resetFormInput();
        document.getElementById('cube').style.display = 'block';
        document.getElementById('btnCreate').style.display = 'block';
    })

    $("#sphereinput").on('click', function(){
        resetFormInput();
        document.getElementById('sphere').style.display = 'block';
        document.getElementById('btnCreate').style.display = 'block';
    })

    $("#prisminput").on('click', function(){
        resetFormInput();
        document.getElementById('box').style.display = 'block';
        document.getElementById('btnCreate').style.display = 'block';
    })

    $("#pyramidinput").on('click', function(){
        resetFormInput();
        document.getElementById('box').style.display = 'block';
        document.getElementById('btnCreate').style.display = 'block';
    })

    $("#coneinput").on('click', function(){
        resetFormInput();
        document.getElementById('cone').style.display = 'block';
        document.getElementById('btnCreate').style.display = 'block';
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


