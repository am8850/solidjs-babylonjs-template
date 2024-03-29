import { createSignal, onMount } from 'solid-js'
import * as BABYLON from 'babylonjs'
//import solidLogo from './assets/solid.svg'
//import viteLogo from '/vite.svg'
//import './App.css'

function App() {
  //const [count, setCount] = createSignal(0)
  const [size, setSize] = createSignal({ width: 0, height: 0 })
  let canvas: HTMLCanvasElement = null!;
  let parentDiv: HTMLDivElement = null!;

  onMount(() => {
    // Reset the canvas size
    // the first time
    setSize({ width: parentDiv.clientWidth, height: parentDiv.clientHeight })
    canvas.width = size().width
    canvas.height = size().height
    console.info(size())

    const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
    const createScene = function () {

      // Creates a basic Babylon Scene object
      const scene = new BABYLON.Scene(engine)

      // Set a transparent background
      scene.autoClear = false

      // Creates and positions a free camera
      const camera = new BABYLON.FreeCamera("camera1",
        new BABYLON.Vector3(0, 5, -10), scene)

      // Targets the camera to scene origin
      camera.setTarget(BABYLON.Vector3.Zero())

      // This attaches the camera to the canvas
      camera.attachControl(canvas, true)

      // Creates a light, aiming 0,1,0 - to the sky
      const light = new BABYLON.HemisphericLight("light",
        new BABYLON.Vector3(0, 1, 0), scene)

      // Dim the light a small amount - 0 to 1
      light.intensity = 0.7

      // Built-in 'sphere' shape.
      const sphere = BABYLON.MeshBuilder.CreateSphere("sphere",
        { diameter: 2, segments: 32 }, scene);

      // Move the sphere upward 1/2 its height
      sphere.position.y = 1;

      // Built-in 'ground' shape.
      const ground = BABYLON.MeshBuilder.CreateGround("ground",
        { width: 6, height: 6 }, scene);

      //ground.rotation.y += 0.5

      scene.registerBeforeRender(function () {
        ground.rotation.y += 0.01
      })

      return scene;
    };

    const scene = createScene(); //Call the createScene function

    // Register a render loop to repeatedly render the scene
    engine.runRenderLoop(function () {
      scene.render()
    });

    // Watch for browser/canvas resize events
    window.addEventListener("resize", function () {
      setSize({ width: parentDiv.clientWidth, height: parentDiv.clientHeight })
      canvas.width = size().width
      canvas.height = size().height
      console.info(size())
      engine.resize();
    });
  })

  return (
    <>
      <div style="background:black;color:white;marging:0px;padding:0px">
        Test
        <div ref={parentDiv} class="" style="height:800px">
          <canvas ref={canvas}></canvas>
        </div>
        Test
      </div>
    </>
  )
}

export default App
