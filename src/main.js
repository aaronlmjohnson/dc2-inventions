import { idea } from "./Idea.js"

const createIdeas = ()=>{
    fetch('/assets/json/ideas.json')
    .then(response => response.json())
    .then(chapters => {
        const ideas = parseIdeas(chapters); 

        console.log(ideas[0].name);
    });
}

createIdeas();

const parseIdeas = (chapters)=>{
    const ideas = [];
    for(const chapter in chapters){
        chapters[chapter].forEach((obj)=>{
            ideas.push(idea(obj["Idea"], obj["Can be Found"], obj["Additional Information"], chapter.at(-1))); //name, location, info, chapter
        });
    }
    return ideas;
}