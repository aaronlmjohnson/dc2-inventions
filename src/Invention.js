export const invention = (name, description, id)=>{
    const _ideas = [];
    const setIdeas = (idea1, idea2, idea3) =>{
        _ideas.push(idea1, idea2, idea3);
    };
    const getIdeas = ()=> {return _ideas;}
    return {
            name,
            description,
            id, 
            setIdeas, 
            getIdeas
           };
};

