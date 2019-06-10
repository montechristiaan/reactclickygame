import React, { Component } from "react";
import Wrapper from "./components/Wrapper";
import pics from "./pics.json";
import Card from "./components/Card";

let chosen = [] 

class App extends Component {
  
  state = {
    pics,
    score: 0,
    topScore: 0,
  };

  handleScoreChange = () => {
    
    this.setState({ score: this.state.score + 1})
  };

  handleTopScoreChange = () => { 
    if(this.state.score >= this.state.topScore){
      this.setState({topScore: this.state.score})
    }
  }

  shuffle(a) { 
    for (let i = this.state.pics.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

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