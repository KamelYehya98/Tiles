import {Cell} from './Cell.js';
export class Matrix{

    constructor(width, height){
        this.width = width;
        this.height = height;
        this.matrix = [];
        this.win = false;
        this.x = 0;
        this.y = 0;
        this.colors = ['blue', 'red', 'yellow', 'green', 'orange', 'violet', 'blueviolet', 'skyBlue', 'lightSeaGreen'];
        this.setBlank();
        this.createMatrix();
        this.fillMatrix();
        
    }


    createMatrix(){
        if(this.win)
            return;
        let m = document.getElementById("matrix");
        m.innerHTML = '';
        for(var i=0; i<this.height; i++){
            let tr = document.createElement('tr');
            tr.classList.add("slide_right");
            tr.style.animationDelay = "" + (i * 0.15) + "s";
            console.log(tr.style.animationDelay);
            for(var j=0; j<this.width; j++){
                let td = document.createElement('td');
                let div = document.createElement('div');
                div.classList.add('content');
                div.setAttribute('id', ''+ i + j);

                div.style.background = '' + this.colors[i];
                td.appendChild(div);
                tr.appendChild(td);
            }
            m.appendChild(tr);
        }
    }

    removeClassFromAllElements(name){
        if(this.win)
            return;
        let docs = document.querySelectorAll('.'+name);
        for(var doc of docs){
            doc.classList.remove(name);
        }
    }

    fillMatrix(){
        if(this.win)
            return;
        for(var i=0; i<this.height; i++){
            let arr = [];
            for(var j=0; j<this.width; j++){
                let cell = null;
                if(i === this.y && j === this.x){
                    cell = new Cell("");
                    document.getElementById(""+i+j).style.background = "white";
                }else
                    cell = new Cell(this.colors[i]);
                arr.push(cell);
            }
            this.matrix.push(arr);
        }
    }

    setBlank(){
        this.x = parseInt((this.width-1) / 2);
        this.y = parseInt((this.height-1) / 2);
    }

    isAvailable(_y, _x){
        if(_y >= this.height || _y < 0 || _x >= this.width || _x < 0)
            return false;
        return true;
    }

    moveBlank(direction){
        if(this.win)
            return;
        let blankDiv = document.getElementById(''+this.y+this.x);
        let nextDiv = undefined;
        let tempColor = undefined;
        switch(direction){
            case 'up':
                if(!this.isAvailable(this.y-1, this.x))
                    return false;
                nextDiv = document.getElementById('' + (this.y-1)+this.x);
                tempColor = this.matrix[this.y-1][this.x].getColor();
                this.matrix[this.y-1][this.x].setColor("white");
                this.matrix[this.y][this.x].setColor(tempColor);
                this.y -= 1;
                blankDiv.style.background = tempColor;
                nextDiv.style.background = "white";
                this.resetTimer();
                break;
            case 'down':
                if(!this.isAvailable(this.y+1, this.x))
                    return false;
                nextDiv = document.getElementById('' + (this.y+1)+this.x);
                tempColor = this.matrix[this.y+1][this.x].getColor();
                this.matrix[this.y+1][this.x].setColor("white");
                this.matrix[this.y][this.x].setColor(tempColor);
                this.y += 1;
                blankDiv.style.background = tempColor;
                nextDiv.style.background = "white";
                this.resetTimer();
                break;
            case 'left':
                if(!this.isAvailable(this.y, this.x-1))
                    return false;
                nextDiv = document.getElementById('' +this.y+(this.x-1));
                tempColor = this.matrix[this.y][this.x-1].getColor();
                this.matrix[this.y][this.x-1].setColor("white");
                this.matrix[this.y][this.x].setColor(tempColor);
                this.x -= 1;
                blankDiv.style.background = tempColor;
                nextDiv.style.background = "white";
                this.resetTimer();
                break;
            case 'right':
                if(!this.isAvailable(this.y, this.x+1))
                    return false;
                nextDiv = document.getElementById('' +this.y+(this.x+1));
                tempColor = this.matrix[this.y][this.x+1].getColor();
                this.matrix[this.y][this.x+1].setColor("white");
                this.matrix[this.y][this.x].setColor(tempColor);
                this.x += 1;
                blankDiv.style.background = tempColor;
                nextDiv.style.background = "white";
                this.resetTimer();
                break;
            default:
                return false;
        }
        
        if(this.didWin() === true){
            this.win = true;
            document.getElementById('win_button').click();
            return true;
        }
        return true;
    }

    async findSimilars(){
        if(this.win)
            return;
        for(var i=0; i<this.height; i++){
            for(var j=0; j<this.width; j++){
                let res = true;
                if(this.isAvailable(i+1, j) && this.matrix[i][j].getColor() === this.matrix[i+1][j].getColor()){
                    res = false; 
                }
                if(this.isAvailable(i-1, j) && this.matrix[i][j].getColor() === this.matrix[i-1][j].getColor()){
                    res = false;
                }
                if(this.isAvailable(i, j-1) && this.matrix[i][j].getColor() === this.matrix[i][j-1].getColor()){
                    res = false;    
                }
                if(this.isAvailable(i, j+1) && this.matrix[i][j].getColor() === this.matrix[i][j+1].getColor()){
                    res = false;
                }
                if(res === true){
                    document.getElementById("" + i+j).classList.add("blink");
                }
            }
        }
        await setTimeout(()=>{
            this.removeClassFromAllElements('blink');
        }, 2500);
    }

    didWin(){
        for(var i=0; i<this.height; i++){
            for(var j=0; j<this.width; j++){
                if(this.isAvailable(i+1, j) && this.matrix[i][j].getColor() === this.matrix[i+1][j].getColor())
                    return false;
                if(this.isAvailable(i-1, j) && this.matrix[i][j].getColor() === this.matrix[i-1][j].getColor())
                    return false;
                if(this.isAvailable(i, j-1) && this.matrix[i][j].getColor() === this.matrix[i][j-1].getColor())
                    return false;
                if(this.isAvailable(i, j+1) && this.matrix[i][j].getColor() === this.matrix[i][j+1].getColor())
                    return false;
            }
        }
        return true;
    }

    async setTimer(){
        this.timer = setTimeout(async()=>{
            if(this.win)
                return;
            await this.findSimilars();
            this.resetTimer();
        }, 8000);
    }

    resetTimer(){
        if(this.win)
            return;
        clearTimeout(this.timer);
        this.setTimer();
    }
}