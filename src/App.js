import React, { Component } from 'react';

import Snake from './Snake'
import Food from './food'

const getRandomCoordinates=()=>{
let min= 1;
let max= 98;
let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
let y = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
return [x, y]
}

const initialState= {speed: 80,
  food:getRandomCoordinates(),
  direction: 'RIGHT',
  snakeDots:[
    [0,0],
    [2,0]

  ]}
class App extends Component {
  
  state= initialState;
  

  componentDidMount(){
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onkeydown;

  }

  onkeydown = (e) =>{
    e=e || window.event;
    switch(e.keyCode){
      case 38:
        console.log("Made By Mk")
      this.setState({direction: 'UP'});
      break;
      case 40:
      this.setState({direction: 'DOWN'});
      break;
      case 37:
        this.setState({direction: 'LEFT'});
        break;
        case 39:
          this.setState({direction: 'RIGHT'});
          break;
      }
  }
 

  componentDidUpdate(){
    this.checkIfEat();
    this.checkIfCollapsed();
    this.checkIfOutBorders();
  }

moveSnake=()=>{
let dots = [...this.state.snakeDots];
let head = dots[dots.length -1];
  switch(this.state.direction){
    case 'RIGHT':
      head = [head[0] + 2, head[1]];
      break;
    case 'LEFT':
      head = [head[0]-2, head[1]];
      break;
    case 'UP':
      head = [head[0], head[1]-2];
      break;
    case 'DOWN':
      head = [head[0], head[1]+2];
      break;    
  }
  dots.push(head);
  dots.shift();
  this.setState({
    snakeDots: dots
  })
}

checkIfOutBorders(){
  let head = this.state.snakeDots[this.state.snakeDots.length - 1];
  if(head[0] >= 100 || head[1] >=100||head[0] < 0|| head[1] < 0 ){
   this.onGameOver();
  }
}

checkIfEat(){
  let head = this.state.snakeDots[this.state.snakeDots.length - 1];
  let food = this.state.food;
  if(head[0]===food[0] && head[1] === food[1]){
  this.setState({
    food: getRandomCoordinates()
  })
  console.log(this.state.speed)
  this.increaseSpeed();
  this.enlargeSnake();
  }
   
}

enlargeSnake(){
  let newSnake = [...this.state.snakeDots];
  newSnake.unshift([]);
  this.setState({
    snakeDots: newSnake
  })
}

increaseSpeed()
{
  if(this.state.speed > 5){
    this.setState({
      speed: this.state.speed - 5
    })
  }
  
}
onGameOver(){
  alert(`OOfs...don't try to go outside, Stay Home Stay Safe..your Score: ${this.state.snakeDots.length}`);
this.setState(initialState)
}

onGameOverCollapsed(){
  alert(`You have Eaten yourself...DAMN...your score is :${this.state.snakeDots.length}`);
  this.setState(initialState)

}



checkIfCollapsed(){
  let snake = [...this.state.snakeDots];
  let head = snake[snake.length - 1];
  snake.pop();
  snake.forEach(dot => {
    if(head[0] === dot[0] && head[1] === dot[1]){
      // alert("You were Collapsed")
this.onGameOverCollapsed();
    }
  });

}
  render(){
  return (
    
    <div className="game-area">
   <Snake snakeDots={this.state.snakeDots}/>
   <Food dot={this.state.food}/>
     </div>
  );
}
}

export default App;
