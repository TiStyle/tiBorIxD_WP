class Skill{
    constructor(e){

        this.values = Array.from(e.children);
        
        this.values.forEach(function(value, index){
            value.classList.add('appear');
        })
    }
}