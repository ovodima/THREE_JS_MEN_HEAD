import * as THREE from 'three'
import { AmbientLight, Color, Mesh, MeshStandardMaterial } from "three";

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 20

const canvas = document.querySelector('.webgl') as HTMLBodyElement
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(window.innerWidth, window.innerHeight)

const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => {
  console.log("onstart");
};
loadingManager.onProgress = () => {
  console.log("onprogress");
};
loadingManager.onError = () => {
  console.log("onerror");
};

function textures(link: string) {
    return new THREE.TextureLoader(loadingManager).load(link);
}

const agateColor = textures("textures/Agate_001_COLOR.jpg");
const agateRough = textures("textures/Agate_001_ROUGH.jpg");
const agateOCC = textures("textures/Agate_001_OCC.jpg");
const agateNORM = textures("textures/Agate_001_NORM.jpg");
const agateDisp = textures("textures/Agate_001_DISP.jpg");


function textureOption(texture: any) {
    texture.anisotropy = 2;
  
    texture.minFilter = THREE.NearestMipMapNearestFilter;
    texture.minFilter = THREE.NearestMipMapNearestFilter;
  
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
  
    // texture.repeat.set(4, 4);
  }

  textureOption(agateColor)
//   textureOption(agateRough)


const geometrys = [
    new THREE.SphereGeometry( 10, 32, 16 ),
    new THREE.TorusGeometry( 5, 3, 16, 100 )
]

const materials = [
    new THREE.MeshPhongMaterial({
        color:0x00EAB71D
    }),
    new THREE.MeshMatcapMaterial({
        // alphaMap:agateRough,
        // bumpMap:agateColor,
        // displacementMap:agateDisp,
        // map:agateOCC,
        // normalMap:agateNORM,
        
        alphaTest: 0.1,
        matcap:agateColor,
        alphaMap:agateRough,
        displacementMap:agateDisp,
        normalMap:agateOCC,
        bumpMap: agateNORM
  

        
        
    }),
    new THREE.MeshPhysicalMaterial(),
]

const light: THREE.DirectionalLight = new THREE.DirectionalLight(0x404040, 2)

const lighting = [
     new THREE.AmbientLight(),
     new THREE.DirectionalLight(0xffffff, 5),
     new THREE.PointLight(),
     new THREE.SpotLight(),
];




const torus = new THREE.Mesh(geometrys[0], materials[1])
scene.add(torus)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function animate() {
    requestAnimationFrame(animate)

    torus.rotation.x += 0.002
    torus.rotation.y += 0.002

    render()
}

function render() {
    renderer.render(scene, camera)
    renderer.shadowMap.enabled = true
}

animate()