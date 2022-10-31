
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x37a60f);



const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild( renderer.domElement);

const ground = new THREE.Object3D();
scene.add(ground);

//land

const landPlane = new THREE.PlaneGeometry(600,600,300,300);

const landMaterial = new THREE.MeshStandardMaterial();
landMaterial.color = new THREE.Color(0x00ff00);

const land = new THREE.Mesh(landPlane,landMaterial);
land.receiveShadow = true;
land.castShadow = false;
land.rotation.x -= Math.PI/2;
ground.add(land);


//iglo
const sphere = new THREE.SphereGeometry(40,512,256,0,Math.PI*2,0,Math.PI*0.5);
const sphereMaterial = new THREE.MeshStandardMaterial();
sphereMaterial.color = new THREE.Color(0xb9edeb);
const iglo = new THREE.Mesh(sphere,sphereMaterial);
iglo.castShadow= true;
iglo.position.x=-50;
iglo.position.z=-50;
ground.add(iglo);


//hut
const hutGeo =new THREE.CylinderGeometry(40,40,39,512,512);
const hutmap= new THREE.TextureLoader().load('wallm.jpg');
const hutnm= new THREE.TextureLoader().load('wallnm.jpg');
const huthm= new THREE.TextureLoader().load('wallh.png');
const hutaom= new THREE.TextureLoader().load('wallao.jpg');
const hutrm= new THREE.TextureLoader().load('wallrm.jpg');

hutnm.wrapS = THREE.RepeatWrapping;
hutnm.wrapT = THREE.RepeatWrapping;
hutnm.repeat.set(7, 1);

huthm.wrapS = THREE.RepeatWrapping;
huthm.wrapT = THREE.RepeatWrapping;
huthm.repeat.set(7, 1);

hutaom.wrapS = THREE.RepeatWrapping;
hutaom.wrapT = THREE.RepeatWrapping;
hutaom.repeat.set(7, 1);

hutrm.wrapS = THREE.RepeatWrapping;
hutrm.wrapT = THREE.RepeatWrapping;
hutrm.repeat.set(7, 1);

hutmap.wrapS = THREE.RepeatWrapping;
hutmap.wrapT = THREE.RepeatWrapping;
hutmap.repeat.set(7, 1);

const hutMaterial = new THREE.MeshStandardMaterial(
    {
    map: hutmap,
    normalMap: hutnm,
    displacementMap: huthm,
    displacementScale: 1.5,
    roughnessMap: hutrm,
    roughness: 1,
    aoMap: hutaom
    }
);
const hut = new THREE.Mesh(hutGeo,hutMaterial);
hut.castShadow= true;

const roofGeo = new THREE.ConeGeometry(50,40,320,10);
const groof= new THREE.TextureLoader().load('grassroof.jpg');
const roofMat = new THREE.MeshStandardMaterial({map: groof});
roofMat.color = new THREE.Color(0x857450);
const roof = new THREE.Mesh(roofGeo,roofMat);
roof.castShadow = true
hut.position.x=140;
hut.position.z=-70;
hut.position.y=19;
roof.position.x = 140;
roof.position.z = -70;
roof.position.y = 59;
ground.add(hut);
ground.add(roof);

//pond
const pondGeo = new THREE.CircleGeometry(100,128);
const water= new THREE.TextureLoader().load('water.jpg');
const pondMat = new THREE.MeshStandardMaterial({map: water});
pondMat.color = new THREE.Color(0x15a3cf);
const pond = new THREE.Mesh(pondGeo,pondMat);
pond.position.y = 0.2;
pond.rotation.x -= Math.PI/2;
pond.position.z = 100;
ground.add(pond);

// day light
var light = new THREE.DirectionalLight(0xffffff, 1);
light.castShadow = true;

//shadow quality
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;

// shadow area from light source
light.shadow.camera.near = 40;       
light.shadow.camera.far = 700;      
light.shadow.camera.left = -450;
light.shadow.camera.bottom = -200;
light.shadow.camera.right = 450;
light.shadow.camera.top = 200;


light.position.set(200,200,200); 


ground.add(light);

var amb = new THREE.AmbientLight(0xffffff,0.3);
ground.add(amb);

// night light
var fire = new THREE.PointLight(0xff4500,10,600,2);
fire.castShadow = true;
fire.position.set(60,5,1);

fire.shadow.camera.near = 10;       
fire.shadow.camera.far = 300;




//camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var zoom= document.getElementById('zoomRange');
camera.position.z = zoom.value;
camera.position.y = zoom.value;
camera.position.x = 0;
camera.lookAt(scene.position);





function daynight()
{
    var dayn=document.getElementById('switch3').checked;

    if(dayn)
    {
        // adds fire light to the object and removes sun light and ambient light
        ground.add(fire);
        ground.remove(light);
        ground.remove(amb);
        scene.background = new THREE.Color(0x000000)
    }
    else
    {
        // adds sun light and ambient light to the object and removes fire light
        ground.remove(fire);
        ground.add(light);
        ground.add(amb);
        scene.background = new THREE.Color(0x37a60f)
    
        
    }

}
             

function spin( )
{
    
    var spin=document.getElementById('switch1').checked;
    var dir=document.getElementById('switch2').checked;
    

    var speed = document.getElementById('speedRange');
    var spinSpeed=speed.value/100;
    
    if(spin)
    {
        if(dir)
        {
            ground.rotation.y += spinSpeed;
            
        }
        else
        {
            ground.rotation.y -= spinSpeed;
        }
    }

        

};

function zoomin()
{
    
    camera.position.z = zoom.value;
    camera.position.y = zoom.value;
    camera.lookAt(0,0,0);

}

function render( )
{
   renderer.render(scene, camera);
};

function loop( )
{
    
    requestAnimationFrame(loop);
    zoomin();
    daynight();
    spin();
    render();
    
};




loop();