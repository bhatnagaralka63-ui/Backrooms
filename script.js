// ---------- PROPS ----------
const propGroup = new THREE.Group();
scene.add(propGroup);
// ================================
// IMPROVED LIGHTING
// ================================

scene.add(new THREE.AmbientLight(0x403820, 0.35));

const lightFixtures = [];

for(let y = 0; y < ROWS; y++){

    for(let x = 0; x < COLS; x++){

        if(Math.random() < 0.35) continue;

        const c = cellCenter(maze[idx(x,y)]);

        const light = new THREE.PointLight(
            0xfff3b0,
            1.2,
            CELL * 3,
            2
        );

        light.position.set(
            c.x,
            WALL_H - 0.2,
            c.z
        );

        scene.add(light);

        const panel = new THREE.Mesh(

            new THREE.BoxGeometry(1,0.05,0.4),

            new THREE.MeshBasicMaterial({
                color:0xffffdd
            })

        );

        panel.position.set(
            c.x,
            WALL_H - 0.05,
            c.z
        );

        scene.add(panel);

        lightFixtures.push({

            light,
            panel,

            mode:Math.random(),

            timer:Math.random()*3

        });

    }

}
// ---------------- BOX ----------------
function addBox(x, z) {

    const box = new THREE.Mesh(
        new THREE.BoxGeometry(
            0.5 + Math.random() * 0.8,
            0.5 + Math.random() * 1.2,
            0.5 + Math.random() * 0.8
        ),
        new THREE.MeshStandardMaterial({
            color: 0x6d5b33,
            roughness: 1
        })
    );

    box.position.set(
        x,
        box.geometry.parameters.height / 2,
        z
    );

    box.rotation.y = Math.random() * Math.PI;

    propGroup.add(box);

}

// ---------------- PILLAR ----------------
function addPillar(x, z) {

    const pillar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18,0.18,3.1,10),
        new THREE.MeshStandardMaterial({
            color:0xc6ba83,
            roughness:1
        })
    );

    pillar.position.set(x,1.55,z);

    propGroup.add(pillar);

}

// ---------------- PUDDLE ----------------
function addPuddle(x,z){

    const puddle = new THREE.Mesh(

        new THREE.CircleGeometry(0.45+Math.random()*0.4,24),

        new THREE.MeshStandardMaterial({

            color:0x222222,
            metalness:0.6,
            roughness:0.15

        })

    );

    puddle.rotation.x = -Math.PI/2;
    puddle.position.set(x,0.01,z);

    propGroup.add(puddle);

}

// ---------------- DESK ----------------
function addDesk(x,z){

    const desk = new THREE.Group();

    const wood = new THREE.MeshStandardMaterial({
        color:0x7d5b32,
        roughness:1
    });

    const metal = new THREE.MeshStandardMaterial({
        color:0x555555
    });

    const top = new THREE.Mesh(
        new THREE.BoxGeometry(1.3,0.08,0.75),
        wood
    );

    top.position.y = 0.75;

    desk.add(top);

    for(let i=-1;i<=1;i+=2){

        for(let j=-1;j<=1;j+=2){

            const leg = new THREE.Mesh(

                new THREE.BoxGeometry(0.08,0.75,0.08),

                metal

            );

            leg.position.set(
                i*0.55,
                0.37,
                j*0.28
            );

            desk.add(leg);

        }

    }

    desk.position.set(x,0,z);
    desk.rotation.y = Math.random()*Math.PI*2;

    propGroup.add(desk);

}

// ---------------- CHAIR ----------------
function addChair(x,z){

    const chair = new THREE.Group();

    const mat = new THREE.MeshStandardMaterial({

        color:0x333333

    });

    const seat = new THREE.Mesh(

        new THREE.BoxGeometry(0.4,0.08,0.4),

        mat

    );

    seat.position.y = 0.45;

    chair.add(seat);

    const back = new THREE.Mesh(

        new THREE.BoxGeometry(0.4,0.45,0.08),

        mat

    );

    back.position.set(
        0,
        0.65,
        -0.16
    );

    chair.add(back);

    chair.position.set(x,0,z);

    chair.rotation.y = Math.random()*Math.PI*2;

    propGroup.add(chair);

}

// ---------------- CABINET ----------------
function addCabinet(x,z){

    const cabinet = new THREE.Mesh(

        new THREE.BoxGeometry(0.55,1.25,0.55),

        new THREE.MeshStandardMaterial({

            color:0x777777,
            metalness:0.2,
            roughness:0.8

        })

    );

    cabinet.position.set(x,0.63,z);

    propGroup.add(cabinet);

}
function decorateRoom(cx, cz){

    // Desk
    addDesk(cx - 0.6, cz);

    // Chair
    addChair(cx - 0.05, cz);

    // Cabinet
    addCabinet(cx + 0.8, cz - 0.5);

    // Box stack
    addBox(cx + 0.7, cz + 0.6);

    if(Math.random() < 0.5){

        addPuddle(cx, cz + 0.9);

    }

}
// ---------------- GENERATE PROPS ----------------

for(let y = 0; y < ROWS; y++){

    for(let x = 0; x < COLS; x++){

        const c = cellCenter(maze[idx(x,y)]);

        const r = Math.random();

        // 8% chance to generate a furnished office

        if(r < 0.08){

            decorateRoom(c.x, c.z);

        }

        else if(r < 0.15){

            addCabinet(c.x,c.z);

        }

        else if(r < 0.28){

            addBox(
                c.x + (Math.random()-0.5),
                c.z + (Math.random()-0.5)
            );

        }

        else if(r < 0.38){

            addPillar(c.x,c.z);

        }

        else if(r < 0.55){

            addPuddle(c.x,c.z);

        }

    }

}