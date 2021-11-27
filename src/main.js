import { idea } from "./Idea.js"
import { scoop } from "./Scoop.js"

const manageData = ()=>{
    fetch('/assets/json/data.json')
    .then(response => response.json())
    .then(data => {
        const ideas = parseIdeas(data[0]); 
        const scoops = parseScoops(data[1]);
        const inventions = parseInventions(data[2], ideas.concat(scoops));
        
    });
};

const parseIdeas = (chapters)=>{
    const ideas = [];
    for(const chapter in chapters){
        chapters[chapter].forEach((obj)=>{
            ideas.push(idea(obj["Idea"], obj["Can be Found"], obj["Additional Information"], chapter.at(-1))); //name, location, info, chapter
        });
    }

   return ideas;
};

const parseScoops = (scoops, isMissable = true) =>{
    return createScoops(scoops["Unmissable"], false).concat(createScoops(scoops["Missable"], true));
};

const createScoops = (scoops, isMissable) =>{
    const scoopArr = [];
       for(const currScoop in scoops){
           if(isMissable)//missable
                scoopArr.push(scoop(scoops[currScoop]["Name"], scoops[currScoop]["Location"],
                scoops[currScoop]["Description"], scoops[currScoop]["Chapter"],scoops[currScoop]["Point at which you missed it"]));     
           else //unmissable
                scoopArr.push(scoop(scoops[currScoop]["Name"], scoops[currScoop]["Location"],
                scoops[currScoop]["Description"], scoops[currScoop]["Chapter"]));
       }
       return scoopArr;
};

const parseInventions = (inventions, ideasAndScoops)=>{
    const filtered = ideasAndScoops.filter((item)=> byFirstLetter(item, "A"));
    console.log(filtered);

};

const byFirstLetter = (item, char)=> item.name[0] == char;
//const byChapter
manageData();

