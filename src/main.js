import { idea } from "./Idea.js"
import { scoop } from "./Scoop.js"

const createIdeas = ()=>{
    fetch('/assets/json/ideas.json')
    .then(response => response.json())
    .then(chapters => {
        const ideas = parseIdeas(chapters); 

        console.log(ideas[0].name);
    });
}

const createScoops = fetch('/assets/json/scoops.json')
    .then(response => response.json())
    .then(scoops => {
        const allScoops = parseScoops(scoops["Missable"], true).concat(
                          parseScoops(scoops["Unmissable"], false));
        console.log(allScoops);
});

//createIdeas();

const parseIdeas = (chapters)=>{
    const ideas = [];
    for(const chapter in chapters){
        chapters[chapter].forEach((obj)=>{
            ideas.push(idea(obj["Idea"], obj["Can be Found"], obj["Additional Information"], chapter.at(-1))); //name, location, info, chapter
        });
    }
    return ideas;
}

const parseScoops = (scoops, isMissable) =>{
    const scoopArr = [];

       for(const currScoop in scoops){
           if(isMissable)//missable
                scoopArr.push(scoop(scoops[currScoop]["Name"], scoops[currScoop]["Location"],
                scoops[currScoop]["Description"], scoops[currScoop]["Point at which you missed it"]));     
           else //unmissable
                scoopArr.push(scoop(scoops[currScoop]["Name"], scoops[currScoop]["Location"],
                scoops[currScoop]["Description"]));
       }
       return scoopArr;
};
