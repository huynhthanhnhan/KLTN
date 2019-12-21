import * as BABYLON from '@babylonjs/core'

// dien tich be mat
export function surfaceArea(mesh: BABYLON.Mesh) {
    if (!mesh) {
        return 0.0;
    }
    var ar = 0.0;
    // tổng số đỉnh trên các mặt (mỗi 3 phần tử liền kề là 3 đỉnh của 1 tam giác)
    var indices = mesh.getIndices(); // mỗi phần tử mảng là chỉ số (số thứ tự) của điểm trong mảng buffer Position ( mỗi điểm đó có x, y, z)

    var nbFaces = indices.length / 3; // lấy 3 điểm để tạo thành 1 tam giác, là tổng số tam giác tạo nên mesh
    
    // tính diện tích từng tam giác
    for (var i = 0; i < nbFaces; i++) {
        ar = ar + facetArea(mesh, i);
    }
    return ar;
};

var facetArea = function(mesh, faceId) {
    if(!mesh) {
        return 0.0;
    }
    var indices = mesh.getIndices();
    if(faceId < 0 || faceId > nbFaces) {
        return 0.0;
    }
    var nbFaces = indices.length / 3;
    // lay danh sách toa do cua cac điểm trong buffer (vị trí có thể sai lệch với thực tế) (moi dinh co 3 tham so x, y, z)
    var positions = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
    var v1x = 0.0;
    var v1y = 0.0;
    var v1z = 0.0;
    var v2x = 0.0;
    var v2y = 0.0;
    var v2z = 0.0;
    var crossx = 0.0;
    var crossy = 0.0;
    var crossz = 0.0;
    var ar = 0.0;
    var i1 = 0;
    var i2 = 0;
    var i3 = 0;
 
    //lay index 3 dinh cua tam giac
    i1 = indices[faceId * 3];
    i2 = indices[faceId * 3 + 1];
    i3 = indices[faceId * 3 + 2];



    // tinh vector cua 2 canh dựa vào vị trí các điểm là đỉnh tam giác
    v1x = positions[i1 * 3] - positions[i2 * 3];
    v1y = positions[i1 * 3 + 1] - positions[i2 * 3 + 1];
    v1z = positions[i1 * 3 + 2] - positions[i2 * 3 + 2];

    v2x = positions[i3 * 3] - positions[i2 * 3];
    v2y = positions[i3 * 3 + 1] - positions[i2 * 3 + 1];
    v2z = positions[i3 * 3 + 2] - positions[i2 * 3 + 2];

    // tinh tich co huong cua 2 vector 
    crossx = v1y * v2z - v1z * v2y;
    crossy = v1z * v2x - v1x * v2z;
    crossz = v1x * v2y - v1y * v2x; 

    // dien tich bang 1/2 * tri tuyet doi tich co huong (can cua tong binh phuong)
    return Math.sqrt(crossx * crossx + crossy * crossy + crossz * crossz) * 0.5;
}

export function distance2Point(point1: BABYLON.Mesh, point2: BABYLON.Mesh){
    var distance = BABYLON.Vector3.Distance(point1.position, point2.position);
    return distance;
}
