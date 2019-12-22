import * as BABYLON from '@babylonjs/core'

// dien tich be mat
export function totalArea(mesh: BABYLON.Mesh) {
    if (!mesh) {
        return 0.0;
    }
    var totalArea = 0.0;
    // tổng số đỉnh trên các mặt (mỗi 3 phần tử liền kề là 3 đỉnh của 1 tam giác)
    var indices = mesh.getIndices(); // mỗi phần tử mảng là chỉ số (số thứ tự) của điểm trong mảng buffer Position ( mỗi điểm đó có x, y, z)

    var numOfFaces = indices.length / 3; // lấy 3 điểm để tạo thành 1 tam giác, là tổng số tam giác tạo nên mesh
    
    // tính diện tích từng tam giác
    for (var i = 0; i < numOfFaces; i++) {
        totalArea = totalArea + facetArea(mesh, indices, i);
    }
    return totalArea;
};

var facetArea = function(mesh, indices, faceId) {
    if(!mesh) {
        return 0.0;
    }
    // lay danh sách toa do cua cac điểm trong buffer (vị trí có thể sai lệch với thực tế) (moi dinh co 3 tham so x, y, z)
    var listPosition = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
    var vector1x = 0.0;
    var vector1y = 0.0;
    var vector1z = 0.0;
    var vector2x = 0.0;
    var vector2y = 0.0;
    var vector2z = 0.0;
    var crossx = 0.0;
    var crossy = 0.0;
    var crossz = 0.0;
    var index1 = 0;
    var index2 = 0;
    var index3 = 0;
 
    //lay index 3 dinh cua tam giac
    index1 = indices[faceId * 3];
    index2 = indices[faceId * 3 + 1];
    index3 = indices[faceId * 3 + 2];



    // tinh vector cua 2 canh dựa vào vị trí các điểm là đỉnh tam giác
    vector1x = listPosition[index1 * 3] - listPosition[index2 * 3];
    vector1y = listPosition[index1 * 3 + 1] - listPosition[index2 * 3 + 1];
    vector1z = listPosition[index1 * 3 + 2] - listPosition[index2 * 3 + 2];

    vector2x = listPosition[index3 * 3] - listPosition[index2 * 3];
    vector2y = listPosition[index3 * 3 + 1] - listPosition[index2 * 3 + 1];
    vector2z = listPosition[index3 * 3 + 2] - listPosition[index2 * 3 + 2];

    // tinh tich co huong cua 2 vector 
    crossx = vector1y * vector2z - vector1z * vector2y;
    crossy = vector1z * vector2x - vector1x * vector2z;
    crossz = vector1x * vector2y - vector1y * vector2x; 

    // dien tich bang 1/2 * tri tuyet doi tich co huong (can cua tong binh phuong)
    return Math.sqrt(crossx * crossx + crossy * crossy + crossz * crossz) * 0.5;
}

export function distance2Point(point1: BABYLON.Mesh, point2: BABYLON.Mesh){
    var distance = BABYLON.Vector3.Distance(point1.position, point2.position);
    return distance;
}
