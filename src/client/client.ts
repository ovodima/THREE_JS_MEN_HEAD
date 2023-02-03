import * as THREE from 'three'
import { AmbientLight, PointLight, Color, Mesh, MeshStandardMaterial, ObjectLoader } from "three";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
const scene: THREE.Scene = new THREE.Scene()

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 3.5
// camera.position.y = 2



const canvas = document.querySelector('.webgl') as HTMLBodyElement
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(window.innerWidth, window.innerHeight)

const loadingManager: THREE.LoadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => {
  console.log("onstart");
};
loadingManager.onProgress = () => {
  console.log("onprogress");
};
loadingManager.onError = () => {
  console.log("onerror");
};

const ambLight: THREE.DirectionalLight = new THREE.DirectionalLight()

ambLight.position.x = 2.5
ambLight.intensity = 1.2

function textures(link: string) {
    return new THREE.TextureLoader(loadingManager).load(link);
}


const agateColor = textures("textures/Agate_001_COLOR.jpg");
// const agateDisp = textures("textures/Agate_001_DISP.jpg");
// const agateNORM = textures("textures/Agate_001_NORM.jpg");
const agateROUGH = textures("textures/Agate_001_ROUGH.jpg");
// const agateOCC = textures("textures/Agate_001_OCC.jpg");

const metalColor = textures("textures/metal/Material_2079.jpg");
const organicDISP = textures("textures/metal/Organic_abstract_001_DISP.jpg");
const organicNORM = textures("textures/metal/Organic_abstract_001_NORM.jpg");
const organicOCC = textures("textures/metal/Organic_abstract_001_OCC.jpg");
const metalROUGH = textures("textures/metal/Metal_006_roughness.jpg");


const materialPh: THREE.MeshPhysicalMaterial = new THREE.MeshPhysicalMaterial({
    map:agateColor,
    clearcoatRoughnessMap: agateROUGH,
})


// const material: THREE.MeshMatcapMaterial = new THREE.MeshMatcapMaterial({
//     // map:organicColor,
//     displacementMap:organicDISP,
//     bumpMap:organicOCC,
//     normalMap:organicNORM,
//     alphaMap:organicROUGH,
//     matcap:organicColor,
// })

const objLoader: OBJLoader = new OBJLoader()
objLoader.load(
    'models/Head 2 from Heads Bundle 2 decimated.obj',
    (object) => {
        // (object.children[0] as THREE.Mesh).material = material
        object.rotation.y = 0.7

      object.position.y = 1

      window.addEventListener('mousemove', (e) => {
        // let pageX = Math.round(e.pageX / 1000)
        // let pageY = Math.round(e.pageY / 1000)

        let pageX = Math.round(e.pageX) / 10002
        let pageY = e.pageY / 10002

        // object.rotation.x += pageX / 10
        object.rotation.y += pageY
        

        camera.position.x = 0.0005
        camera.position.y = pageX

      })


  
        
        object.traverse(function (child) {
            if ((child as THREE.Mesh).isMesh) {
                (child as THREE.Mesh).material = materialPh
            }
        })
        scene.add(object, )
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)





scene.add(ambLight)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function animate() {
    requestAnimationFrame(animate)

    // torus.rotation.x += 0.002
    // torus.rotation.y += 0.002

    render()
}

function render() {
    renderer.render(scene, camera)
    renderer.shadowMap.enabled = true
}

animate()