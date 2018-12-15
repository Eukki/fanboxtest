import React, { Component } from 'react';
import GoogleMap from '../Map/map';
import { List } from './list';

import './Style/bootstrap.min.css';
import './Style/style.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      points: [],
      name: '',
      changeIndex: false
    }

    this.update = this.update.bind(this);
    this.updateIndex = this.updateIndex.bind(this);
    this.updateName = this.updateName.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  update(points) {
    this.setState({points});
  }

  updateIndex(value) {
    this.setState({changeIndex: value});
  }

  updateName(e) {
    this.setState({name: e.target.value});
  }

  keyPress(e) {
    if (e.key === 'Enter') {
      const points = this.state.points; 
      const point = {
        name: this.state.name,
        index: points.length,
        marker: null,
        isListener: false
      }

      points.push(point);
      this.setState({
        points,
        name: ''
      });
    }
  }

  render() {
    const points = this.state.points;
    return (
      <div>
        <div className="container">
          <div className="row">
            
            <div className="col-md-4 col-xs-12">
              
              <input id='newPoint' className="form-control pl-3 mt-3" type="text" placeholder="Новая точка маршрута" onChange={this.updateName} onKeyPress={this.keyPress} value={this.state.name}></input>

              <div className="list-group mt-4">
                <div className="mh-700 overflow-auto">
                  <List points={points} updatePoints={this.update} updateIndex={this.updateIndex} />
                </div>
              </div>

            </div>

            <div className="col-md-8 col-xs-12 min-h-400 mh-700 mt-3">
              <GoogleMap points={points} changeIndex={this.state.changeIndex} updateIndex={this.updateIndex} updatePoints={this.update}/>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default App;