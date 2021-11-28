import { idea } from "./Idea.js"
import { scoop } from "./Scoop.js"
import { invention } from "./Invention.js"

const manageData = ()=>{
    fetch('/assets/json/data.json')
    .then(response => response.json())
    .then(data => {
        const activeIdeas = [];
        const ideas = parseIdeas(data[0]); 
        const scoops = parseScoops(data[1]);
        const inventions = parseInventions(data[2], ideas.concat(scoops));
        createIdeasGrid(ideas);

        const ideaElements = [...document.getElementsByClassName("idea")];
        ideaElements.forEach(((element)=>{
            element.addEventListener("click", ()=>{
                toggleIdea(element);
            });
        }));
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
    const invArr = [];
    return inventions.map((inv)=>{
        const newInv = invention(inv["Invention"], inv["Description"]);
        const invIdeas = ideasAndScoops.filter((item)=>{
            return byName(item, inv["Idea 1"]) || byName(item, inv["Idea 2"]) || byName(item, inv["Idea 3"]);
        });

        newInv.setIdeas(invIdeas[0], invIdeas[1], invIdeas[2]);
        return newInv;
    });

};

const byFirstLetter = (item, char)=> item.name[0] == char;
const byChapter = (item, chapter)=> item.chapter == chapter; 
const byName = (item, name)=> item.name == name;
const createIdeasGrid = (ideas)=>{
    const grid = document.getElementById("ideas");
    ideas.forEach((id, i)=>{
        const ideaElement = document.createElement("div");
        ideaElement.className = "idea";
        ideaElement.id = `idea-${i}`;
        createIdeaTextContent(ideaElement, id);
        grid.appendChild(ideaElement);
    });
}
manageData();
const createIdeaTextContent = (element, id)=>{
    ["name", "location", "info", "chapter"].forEach((tag)=>{
        const tagParagraph = document.createElement("p");

        tagParagraph.innerText = `${tag}: ${id[tag]}`;

        element.appendChild(tagParagraph);
    });
}

const toggleIdea = (element) =>{
    if(element.classList.contains("active"))
        element.classList.remove("active");
    else
        element.classList.add("active");
}



//document.getElementsByClassName("idea").addEventListener("click", completeIdea);


