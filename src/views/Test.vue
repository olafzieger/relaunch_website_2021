<template>
    <div id="container">
        <canvas class="webgl"></canvas>
    </div>
</template>

<script>
import * as THREE from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import gsap from 'gsap'
import { GUI } from 'dat.gui'
import texture from '@/assets/textures/concrete/Concrete_Wall_011_basecolor.jpg'
import font from '@/assets/fonts/Roboto_Bold.json'

export default {
  name: 'ThreeTest',
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      texture,font
    }
  },
  methods: {
    init: function() {

        // Canvas
        const canvas = document.querySelector('canvas.webgl')
      
        /**
       * Textures
       */
      const loadingManager = new THREE.LoadingManager()
      loadingManager.onStart = () =>
      {
          console.log('loadingManager: loading started')
      }
      loadingManager.onLoad = () =>
      {
          console.log('loadingManager: loading finished')
      }
      loadingManager.onProgress = () =>
      {
          console.log('loadingManager: loading progressing')
      }
      loadingManager.onError = () =>
      {
          console.log('loadingManager: loading error')
      }

      const textureLoader = new THREE.TextureLoader(loadingManager)

      // const colorTexture = textureLoader.load('/textures/checkerboard-1024x1024.png')
      // const colorTexture = textureLoader.load('/textures/checkerboard-2x2.png')
      const colorTexture = textureLoader.load(
          '/textures/minecraft.png',
          () =>
          {
              console.log('textureLoader: loading finished')
          },
          () =>
          {
              console.log('textureLoader: loading progressing')
          },
          () =>
          {
              console.log('textureLoader: loading error')
          }
      )
      colorTexture.wrapS = THREE.MirroredRepeatWrapping
      colorTexture.wrapT = THREE.MirroredRepeatWrapping
      // colorTexture.repeat.x = 2
      // colorTexture.repeat.y = 3
      // colorTexture.offset.x = 0.5
      // colorTexture.offset.y = 0.5
      // colorTexture.rotation = Math.PI * 0.25
      // colorTexture.center.x = 0.5
      // colorTexture.center.y = 0.5
      colorTexture.generateMipmaps = false
      colorTexture.minFilter = THREE.NearestFilter
      colorTexture.magFilter = THREE.NearestFilter

      //const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
      //const heightTexture = textureLoader.load('/textures/door/height.jpg')
      //const normalTexture = textureLoader.load('/textures/door/normal.jpg')
      //const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
      //const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
      const roughnessTexture = textureLoader.load(this.texture)




        // Sizes
        const sizes = {
            width: 400,
            height: 500
        }

        // Scene
        const scene = new THREE.Scene()
        const RCIcon = new THREE.Group()

        // Object
        const cubeGeometry = new THREE.BoxGeometry(0.02, 1, 1)
        const cubeMaterial = new THREE.MeshStandardMaterial({
             map:  roughnessTexture 
        })
         const cubeMaterial2 = new THREE.MeshStandardMaterial({
            map:  roughnessTexture   })
         const cubeMaterial3 = new THREE.MeshStandardMaterial({
            map:  roughnessTexture     })
         const cubeMaterial4 = new THREE.MeshStandardMaterial({
            map:  roughnessTexture 

        })




        const surface1 = new THREE.Mesh(cubeGeometry, cubeMaterial)
        const surface2 = new THREE.Mesh(cubeGeometry, cubeMaterial2)
        const surface3 = new THREE.Mesh(cubeGeometry, cubeMaterial3)
        const surface4 = new THREE.Mesh(cubeGeometry, cubeMaterial4)
        RCIcon.add(surface1,surface2,surface3,surface4)
        scene.add(RCIcon)


        //Lights
        const ambientLight = new THREE.AmbientLight(0x64DABE, 0.1)
        
        scene.add(ambientLight)
        const directionalLight = new THREE.DirectionalLight(0xDC9B92, 13.8)
        //scene.add(directionalLight)

        const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.6)
        scene.add(hemisphereLight)
        const pointLight = new THREE.PointLight(0x64DABE, 3.5)
        scene.add(pointLight)
        pointLight.position.set(2,  1.5, 2)
        pointLight.rotation.y += 4.4


        const pointLightFront = new THREE.PointLight(0x3498E5, 1.5)
        scene.add(pointLightFront)
        pointLightFront.position.set(0,  0, 4)
        /*
        const gui = new GUI()
        const cubeFolder = gui.addFolder('Cube')
        cubeFolder.add(pointLight.position, 'x', 0, 5)
        cubeFolder.add(pointLight.position, 'y', 0, 5)
        cubeFolder.add(pointLight.position, 'z', 0, 5)
        cubeFolder.open()*/

        console.log("font",this.font)
        var fontloader = new FontLoader();
        const test=this.font
        fontloader.load(test, function ( font ) {

            const geometry = new TextGeometry( 'Hello three.js!', {
                font: font,
                size: 80,
                height: 5,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 10,
                bevelSize: 8,
                bevelOffset: 0,
                bevelSegments: 5
            } );
            const textMaterial = new THREE.MeshBasicMaterial()
            const text = new THREE.Mesh(textGeometry, textMaterial)
            scene.add(text)

        });   


        const rectAreaLight = new THREE.RectAreaLight(0x64DABE, 2, 2, 2)
        scene.add(rectAreaLight)
        rectAreaLight.position.set(2,  2.5, 4)
        rectAreaLight.target=RCIcon




        // Camera
        const camera = new THREE.PerspectiveCamera(85, sizes.width / sizes.height)
        camera.position.z = 3
        camera.position.y = 1.2
        scene.add(camera)



        // Renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true 

        })
        renderer.setSize(sizes.width, sizes.height)
        /**
         * Animate
         */
        surface1.rotation.y = Math.PI*0.5
        surface1.rotation.x = Math.PI*0.5

        surface2.rotation.y = Math.PI*0.5
        surface2.position.z = -0.5
        surface2.position.y = +0.5
        surface3.rotation.y = Math.PI*0.5
        surface3.rotation.x = Math.PI*0.5
        surface3.position.y=1
        surface4.rotation.y = Math.PI*0.5
        surface4.position.z = +0.5
        surface4.position.y = +1.5
        RCIcon.rotation.x=.4
        //RCIcon.rotation.z=1

        RCIcon.rotation.y=0.8

        console.log("Math.PI",Math.PI)
        const tick = () =>  
        {
            // Update objects
            RCIcon.rotation.y += 0.01
            // Render
            renderer.render(scene, camera)

            // Call tick again on the next frame
            window.requestAnimationFrame(tick)
        }

        tick()

    },
    animate: function() {

    }
  },
  mounted() {
      console.log("this",this)
      this.init();
  }
}
</script>

<style scoped>

    #container{
      background-color: #64DABE;
      height: 500px;
    }

    .webgl{
      float: right;
    }    
</style>