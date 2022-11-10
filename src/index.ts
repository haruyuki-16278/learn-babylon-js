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

    const box1 = BABYLON.MeshBuilder.CreateBox("box1", {})
    box1.position.y = 0.5
    const roof1 = BABYLON.MeshBuilder.CreateCylinder("roof1", {diameter: 1.3, height: 1.2, tessellation: 3})
    roof1.scaling.x = 0.75
    roof1.rotation.z = BABYLON.Tools.ToRadians(90)
    roof1.position.y = 1.22

    const box2 = BABYLON.MeshBuilder.CreateBox("box2", {})
    box2.scaling.x = 2
    box2.scaling.y = 1.5
    box2.scaling.z = 3
    box2.position = new BABYLON.Vector3(-4, 0.75, 0)
    box2.rotation.y = BABYLON.Tools.ToRadians(-45)

    const box3 = BABYLON.MeshBuilder.CreateBox("box3", {})
    box3.scaling = new BABYLON.Vector3(2, 1.5, 3)
    box3.position.x = 4
    box3.position.y = 0.75
    box3.position.z = 0
    box3.rotation.y = BABYLON.Tools.ToRadians(45)

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
