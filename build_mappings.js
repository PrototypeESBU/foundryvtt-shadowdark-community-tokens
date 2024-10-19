//
// script for building a mapping file that includes only completed files.
//
const fs = require('fs');
const filePath = "artwork/series-1/mapping.json";
const prefix = "modules/shadowdark-community-tokens/";
let total = 0;
let complete = 0;
let exportobject = {"shadowdark":{"monsters":{}}};

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    try {
        // Parse the JSON file content as an object
        const jsonObject = JSON.parse(data);
        const monsters = jsonObject['shadowdark.monsters'];
    
        // Loop through each monster imported
        Object.keys(monsters).forEach(key => {
            total++;
            const monster = monsters[key];
            if (!fs.existsSync(monster.actor.replace(prefix, ''))) {
                console.log(`Missing Protrait : ${monster["__MONSTER_NAME__"]}`);
            }
            else if (!fs.existsSync(monster.token.texture.src.replace(prefix, ''))) {
                console.log(`Missing token : ${monster["__MONSTER_NAME__"]}`);
            } 
            else {
                exportobject.shadowdark.monsters[key] = monster;
                complete++;
            }
        });
        // Convert the object to a JSON string and save
        const jsonData = JSON.stringify(exportobject, null, 2);
        fs.writeFile("current_mapping.json", jsonData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
            } else {
                console.log('File has been saved');
            }
        });
        console.log(`${complete} / ${total}`);    

    } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
    }
});

