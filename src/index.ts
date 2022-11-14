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

    const ground = buildGround()

    buildDwellings()

    return scene
  }

  const buildGround = (): void => {
    const ground = BABYLON.CreateGround("ground", {width: 15, height: 16})
    const groundMat = new BABYLON.StandardMaterial("groundMat")
    groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0)
    ground.material = groundMat
  }

  const buildDwellings = () => {
    const detachedHouse = buildHouse(1)
    detachedHouse.rotation.y = BABYLON.Tools.ToRadians(-11.25)
    detachedHouse.position = new BABYLON.Vector3(-6.8, 0, 2.5)

    const semiHouse = buildHouse(2)
    semiHouse.rotation.y = BABYLON.Tools.ToRadians(-11.25)
    semiHouse.position = new BABYLON.Vector3(-4.5, 0, 3)

    const places = [[1, BABYLON.Tools.ToRadians(-11.25), -6.8, 2.5],
                    [2, BABYLON.Tools.ToRadians(-11.25), -4.5, 3],
                    [2, BABYLON.Tools.ToRadians(-11.25), -1.5, 4],
                    [2, BABYLON.Tools.ToRadians(-60), 1.5, 6],
                    [2, BABYLON.Tools.ToRadians(168.75), -6.4, -1.5],
                    [1, BABYLON.Tools.ToRadians(168.75), -4.1, -1],
                    [2, BABYLON.Tools.ToRadians(168.75), -2.1, -0.5],
                    [1, BABYLON.Tools.ToRadians(-144), 0, -1],
                    [1, BABYLON.Tools.ToRadians(250), 0.5, -3],
                    [2, BABYLON.Tools.ToRadians(260), 0.75, -5],
                    [1, BABYLON.Tools.ToRadians(255), 0.75, -7],
                    [2, BABYLON.Tools.ToRadians(85), 4.75, -1],
                    [1, BABYLON.Tools.ToRadians(88), 4.5, -3],
                    [2, BABYLON.Tools.ToRadians(85), 4.75, -5],
                    [1, BABYLON.Tools.ToRadians(85), 4.75, -7],
                    [2, BABYLON.Tools.ToRadians(-60), 5.25, 2],
                    [1, BABYLON.Tools.ToRadians(-60), 6, 4]]

    const houses: Array<BABYLON.InstancedMesh> = []
    let i: number = 0
    places.forEach((place) => {
      if (place[0] === 1) {
        houses.push(detachedHouse.createInstance(`house${i}`))
      } else {
        houses.push(semiHouse.createInstance(`house${i}`))
      }

      houses[i].rotation.y = place[1]
      houses[i].position = new BABYLON.Vector3(place[2], 0, place[3])
      i++
    })
  }

  const buildHouse = (width: 1 | 2): ReturnType<typeof BABYLON.Mesh.MergeMeshes> => {
    const box = buildBox(width)
    const roof = buildRoof(width)

    return BABYLON.Mesh.MergeMeshes([box, roof], true, false, null, false, true)
  }

  const buildBox = (width: 1 | 2): ReturnType<typeof BABYLON.MeshBuilder.CreateBox> => { 
    let faceUV: BABYLON.Vector4[]

    const boxMat = new BABYLON.StandardMaterial("boxMat")

    if (width === 2) {
      boxMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/semihouse.png", scene)
      faceUV = [new BABYLON.Vector4(0.6, 0.0, 1.0, 1.0),
                new BABYLON.Vector4(0.0, 0.0, 0.4, 1.0),
                new BABYLON.Vector4(0.4, 0.0, 0.6, 1.0),
                new BABYLON.Vector4(0.4, 0.0, 0.6, 1.0)]
    } else {
      boxMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/cubehouse.png", scene)
      faceUV = [new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0),
                new BABYLON.Vector4(0.0, 0.0, 0.25, 1.0),
                new BABYLON.Vector4(0.25, 0.0, 0.5, 1.0),
                new BABYLON.Vector4(0.75, 0.0, 1.0, 1.0)]
    }

    const box = BABYLON.MeshBuilder.CreateBox("box", {width: width, faceUV: faceUV, wrap: true})
    box.position.y = 0.5
    box.material = boxMat

    return box
  }

  const buildRoof = (width: 1 | 2): ReturnType<typeof BABYLON.MeshBuilder.CreateCylinder> => {
    const roofMat = new BABYLON.StandardMaterial("roofMat")
    roofMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg", scene)
    const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {diameter: 1.3, height: 1.2, tessellation: 3})
    roof.scaling.x = 0.75
    roof.scaling.y = width
    roof.rotation.z = BABYLON.Tools.ToRadians(90)
    roof.position.y = 1.22
    roof.material = roofMat
    return roof
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
