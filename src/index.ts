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

    const cubehouseFaceUV = [
      new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0),
      new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0),
      new BABYLON.Vector4(0.25, 0.0, 0.5, 1.0),
      new BABYLON.Vector4(0.75, 0.0, 1.0, 1.0)
    ]

    const cubehouseBoxMat = new BABYLON.StandardMaterial("cubehouseBoxMat")
    cubehouseBoxMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/cubehouse.png", scene)
    const cubehouseBox = BABYLON.MeshBuilder.CreateBox("cubehouseBox", {faceUV: cubehouseFaceUV, wrap: true})
    cubehouseBox.position.y = 0.5
    cubehouseBox.material = cubehouseBoxMat

    const cubehouseRoofMat = new BABYLON.StandardMaterial("cubehouseRoofMat")
    cubehouseRoofMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg", scene)
    const cubehouseRoof = BABYLON.MeshBuilder.CreateCylinder("cubehouseRoof", {diameter: 1.3, height: 1.2, tessellation: 3})
    cubehouseRoof.scaling.x = 0.75
    cubehouseRoof.rotation.z = BABYLON.Tools.ToRadians(90)
    cubehouseRoof.position.y = 1.22
    cubehouseRoof.material = cubehouseRoofMat

    const detachedhouseFaceUV = [
      new BABYLON.Vector4(0.0, 0.0, 0.4, 1.0),
      new BABYLON.Vector4(0.6, 0.0, 1.0, 1.0),
      new BABYLON.Vector4(0.4, 0.0, 0.6, 1.0),
      new BABYLON.Vector4(0.4, 0.0, 0.6, 1.0),
    ]

    const detachedhouseBoxMat = new BABYLON.StandardMaterial("detachedhouseBoxMat")
    detachedhouseBoxMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/semihouse.png", scene)
    const detachedhouseBox = BABYLON.MeshBuilder.CreateBox("detachedhouseBox", {width: 2, height: 1, depth: 1, faceUV: detachedhouseFaceUV, wrap: true}, scene)
    detachedhouseBox.position.y = 0.5
    detachedhouseBox.position.x = 3
    detachedhouseBox.material = detachedhouseBoxMat

    const detachedhouseRoofMat = new BABYLON.StandardMaterial("detachedhouseRoofMat")
    detachedhouseRoofMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg", scene)
    const detachedhouseRoof = BABYLON.MeshBuilder.CreateCylinder("detachedhouseRoof", {diameter: 1.3, height: 2.2, tessellation: 3})
    detachedhouseRoof.scaling.x = 0.75
    detachedhouseRoof.rotation.z = BABYLON.Tools.ToRadians(90)
    detachedhouseRoof.position.y = 1.22
    detachedhouseRoof.position.x = 3
    detachedhouseRoof.material = detachedhouseRoofMat

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
