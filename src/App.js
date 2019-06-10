import React, { Component } from "react";
import Wrapper from "./components/Wrapper";
import pics from "./pics.json";
import Card from "./components/Card";

let chosen = [] 
// Setting the state
class App extends Component {
  
  state = {
    pics,
    score: 0,
    topScore: 0,
  };
  //incrementing score by 1 and setting new state.score
  handleScoreChange = () => {
    
    this.setState({ score: this.state.score + 1})
  };
//setting new state if current score is bigger than the current top score
  handleTopScoreChange = () => { 
    if(this.state.score >= this.state.topScore){
      this.setState({topScore: this.state.score})
    }
  }
//randomly shuffle pics from the json file
  shuffle(a) { 
    for (let i = this.state.pics.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
//either change the top score or the current score based on the chosen pic, shuffle photos and set new state.
  randomizePics = id => {

if (chosen.includes(id)){ 
    alert("You already chose that character! Start Again!!!")
    chosen = []
    this.setState({
      score: 0
    })
    this.handleTopScoreChange()
}
else{
    chosen.push(id)
    this.handleScoreChange()
}

    const pics = this.shuffle(this.state.pics)
    console.log(pics)
    
    
    this.setState({ pics });
  };
//generate what we'll actually be seeing on the client side
render() { 
  return (
      <div className = "container"> 
        <div className = "jumbotron">
        <h1>React Memory Game</h1>
        <h2>Click on an image to start!</h2>
        <h2>Score: {this.state.score} | Top Score: {this.state.topScore}</h2>
        </div>
        <Wrapper>
        {this.state.pics.map(pic => ( 
          <Card
            randomizePics={this.randomizePics}
            id={pic.id}
            key={pic.id}
            name={pic.name}
            image={pic.image}
            occupation={pic.occupation}
          />
        ))}
        </Wrapper>
      </div>
  );
}
}

export default App;