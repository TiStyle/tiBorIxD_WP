class Skill{
    constructor(e){

        const values = Array.from(e.children);
        // console.log(values)

        values.forEach(value => 
            value.classList.add('appear')
        )
        // const values = Array.from(document.querySelectorAll('.value'));
        
        // values.forEach(value => value.classList.add('appear'))
    }
}