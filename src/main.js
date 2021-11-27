import { idea } from "./Idea.js"
import { scoop } from "./Scoop.js"

const manageIdeasAndInventions = ()=>{
    fetch('/assets/json/ideas.json')
    .then(response => response.json())
    .then(chapters => {
        const ideas = parseIdeas(chapters); 
        return ideas;
    }).then( (ideas)=>{
        manageScoops();
    });
}

const manageScoops = fetch('/assets/json/scoops.json')
    .then(response => response.json())
    .then(scoops => {
        const allScoops = parseScoops(scoops["Missable"], true).concat(
                          parseScoops(scoops["Unmissable"], false));
});

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

const parseInventions = () =>{

}

manageIdeasAndInventions();
//manageScoops();
//manageInventions();
