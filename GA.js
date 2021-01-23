// @ts-check
var population;
var target;
var Width = 400;
var Height = 400;
var startX = Width / 2;
var startY = Height - 0.1 * Height;
var numWalkers = 300;
var lifeSpan = 500;

function setup() {
    createCanvas(Width, Height);
    target = new Target(Width / 2, 0 + 0.1 * Height, 10);
    population = new Population(numWalkers, startX, startY, lifeSpan);

}

function draw() {
    background(0);
    population.Update();
    population.Show();
    target.Show();
}

class Walker {
    constructor(x, y, lifeSpan) {
        this.position = new Vector(x, y);
        this.randomWalk = false;
        this.age = 0;
        this.lifeSpan = lifeSpan;
        this.dead = false;
        this.genetics = new Genetics(lifeSpan);
    }

    get fitness() {
        var distance = target.DistanceFrom(this);
        if (distance>280) {
            return 0;
        } else {
            return (1/distance);
        }
        
    }
    Show() {
        if (this.dead == false) {
            rectMode(CENTER)
            rect(this.position.x, this.position.y, 5, 5);
        }
    }

    Update() {
        if (this.dead == true) {
            return;
        }
        if (this.randomWalk) {
            var randx = Math.random() * 2 - 1;
            var randy = Math.random() * 2 - 1;
            this.position.x += randx;
            var randx = Math.random() * 2 - 1;
            var randy = Math.random() * 2 - 1;
            this.position.y += randy;
        }
        this.position.x+=this.genetics.DNA[this.age].x;
        this.position.y+=this.genetics.DNA[this.age].y;
        this.age++;
        if (this.age == lifeSpan) {
            this.dead = true;
        }
    }
}

class Population {
    constructor(maxPopulation, startX, startY, lifeSpan) {
        this.population = [];
        this.matingPool = [];
        this.maxAge = 0;
        this.maxFitness = 0;
        this.maxAllTimeFitness = 0;
        this.deadCount = 0;
        this.lifeSpan=lifeSpan;
        for (let i = 0; i < maxPopulation; i++) {
            this.population[i] = new Walker(startX, startY, lifeSpan);
            this.population[i].randomWalk = false;
        }
        
    }
    Update() {
        this.maxAge++;
        this.maxFitness = 0;
        this.population.forEach(element => {
            element.Update();
            if (element.fitness > this.maxAllTimeFitness) {
                this.maxAllTimeFitness = element.fitness;
            }
            if (element.fitness > this.maxFitness) {
                this.maxFitness = element.fitness;
                this.bestWalker=element;
            }
            if (element.dead == true) {
                this.deadCount++;
            }
        });
        document.getElementById("age").innerHTML = "Age: " + this.maxAge + " Max fittness: " + this.maxFitness+ " Max All Timefittness: " + this.maxAllTimeFitness;

        if (this.deadCount == this.population.length) {
            this.NextGeneration();
        }
    }
    Show() {
        this.population.forEach(element => {
            element.Show();
        });
    }
    NextGeneration() {
        this.matingPool = [];
        
        this.population.forEach(curWalker => {
            var n = Math.round(10 * (curWalker.fitness / this.maxFitness));
         
            for (let i = 0; i < n; i++) {
                this.matingPool.push(curWalker);
            }
        });
        console.log(this.matingPool.length);
        var newPopulation =[];
        for (let i = 0; i < this.population.length; i++) {
            if (this.population[i].fitness==this.maxFitness) {
                console.log("best " + this.population[i].fitness);
                var newWalker = new Walker(startX,startY,lifeSpan);
                newWalker.genetics.DNA = this.population[i].genetics.DNA;
                newPopulation.push(newWalker);
                continue;                
            }
            
            var newWalker = new Walker(startX,startY,lifeSpan);
            newWalker.genetics=this.DoTheShagging();
            newPopulation.push(newWalker);
            
        }
        this.population=newPopulation;
        
        this.maxAge = 0;
        this.deadCount = 0;
    }
    DoTheShagging(){
        var genetics1= new Genetics(this.lifeSpan);
        var genetics2= new Genetics(this.lifeSpan); 
        var ind1 = Math.round(Math.random()*(this.matingPool.length-1));
        var ind2 = Math.round(Math.random()*(this.matingPool.length-1));
        
        for (let i = 0; i < genetics1.DNA.length; i++) {
            genetics1.DNA[i].x = this.matingPool[ind1].genetics.DNA[i].x;
            genetics1.DNA[i].y = this.matingPool[ind1].genetics.DNA[i].y;
            genetics2.DNA[i].x = this.matingPool[ind2].genetics.DNA[i].x;
            genetics2.DNA[i].y = this.matingPool[ind2].genetics.DNA[i].y;
            
        }
        
        genetics1.breed(genetics2);
        return genetics1;
    }
}

class Genetics {
    constructor(maxLife) {
        this.DNA = [];
        for (let i = 0; i < maxLife; i++) {
            var randx = Math.round(Math.random() * 4) - 2;
            var randy = Math.round(Math.random() * 4) - 2;
            this.DNA[i] = new Vector(randx, randy);
        }
    }
    breed(genetics2){
        for (let i = 0; i < this.DNA.length; i++) {
            if (Math.round(Math.random())==1){
                this.DNA[i].x=genetics2.DNA[i].x;
                this.DNA[i].y=genetics2.DNA[i].y;
            }          
        }
    }
}

class Target {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    Show() {
        ellipse(this.x, this.y, this.radius, this.radius);
    }

    DistanceFrom(walker) {
        return ((this.x - walker.position.x) ** 2 + (this.y - walker.position.y) ** 2) ** 0.5;
    }
}
class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    sum(newVector) {
        this.x += newVector.x;
        this.y += newVector.y;
    }
}
