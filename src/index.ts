import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'

(async () => {
  console.log('fire')
  const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement
  const engine = new BABYLON.Engine(canvas, true)

  const createScene = async function () {
    const scene = new BABYLON.Scene(engine)
    const camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0,), scene)

    camera.setTarget(BABYLON.Vector3.Zero())
    camera.attachControl(canvas, true)
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene)
    light.intensity = 0.7

    const ground = BABYLON.CreateGround("ground", {width: 10, height: 10}, scene)
    const groundMat = new BABYLON.StandardMaterial("groundMat")
    groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0)
    ground.material = groundMat

    const faceUV = [
      new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0),
      new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0),
      new BABYLON.Vector4(0.25, 0.0, 0.5, 1.0),
      new BABYLON.Vector4(0.75, 0.0, 1.0, 1.0)
    ]

    const box1Mat = new BABYLON.StandardMaterial("box1Mat")
    box1Mat.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/floor.png", scene)
    const box1 = BABYLON.MeshBuilder.CreateBox("box1", {})
    box1.position.y = 0.5
    box1.material = box1Mat

    const roof1Mat = new BABYLON.StandardMaterial("roof1Mat")
    roof1Mat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg", scene)
    const roof1 = BABYLON.MeshBuilder.CreateCylinder("roof1", {diameter: 1.3, height: 1.2, tessellation: 3})
    roof1.scaling.x = 0.75
    roof1.rotation.z = BABYLON.Tools.ToRadians(90)
    roof1.position.y = 1.22
    roof1.material = roof1Mat

    return scene
  }

  const scene = await createScene()

  scene.debugLayer.show()

  engine.runRenderLoop(() => {
    scene.render()
  })

  window.addEventListener("resize", () => {
    engine.resize()
  })
})()
