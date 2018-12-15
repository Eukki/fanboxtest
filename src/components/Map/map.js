import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

function move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        let k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
};

export class GoogleMapRender extends Component {
	constructor(props) {
		super(props);

		this.state = {
			poly: false
		}

		this.initDirections = this.initDirections.bind(this);
		this.changeDirection = this.changeDirection.bind(this);
		this.addPoint = this.addPoint.bind(this);
	}

	componentDidUpdate(prevProps) {
		if (this.props.changeIndex) this.changeDirection(this.props.changeIndex);
		if (this.props.points[0]) this.initListeners(this.props.points);
	}

    initDirections(mapProps, map) {
    	const google = this.props.google;
    	const poly = new google.maps.Polyline({
          strokeColor: 'red',
          strokeOpacity: 0.7,
          strokeWeight: 2
        });

        poly.setMap(map);
        this.setState({poly});

        document.getElementById('newPoint').addEventListener('keyup', (e) => this.addPoint(e, map));
    }

    initListeners(points) {
    	const point = points[points.length-1];
    	if (!point.isListener && point.marker) {
    		point.marker.addListener('drag', (e) => {
    			const newPosition = e.latLng;
				const path = this.state.poly.getPath().j;
				
				path[point.index] = newPosition;
				this.state.poly.setPath(path);
    		});

    		point.marker.addListener('click', () => {
		      point.info.open(point.map, point.marker);
		    });

    		point.isListener = true;
    		this.props.updatePoints(points);
    	}
    }

    changeDirection(changeIndex) {
    	let poly = this.state.poly;
    	let path = poly.getPath().j;
    	let points = this.props.points;
    	let newPath;

    	if (changeIndex.new === false) {
    		points[changeIndex.old].marker.setMap(null);
    		points.splice(changeIndex.old, 1);

    		for (var i = 0; i < points.length; i++) {
    			points[i].index = i;
    		}

    		path.splice(changeIndex.old, 1);
    		newPath = path;
    	} else {
    		newPath = move(path, changeIndex.old, changeIndex.new);
    	}

    	poly.setPath(newPath);
    	this.props.updatePoints(points);
    	this.props.updateIndex(false);
    }

	addPoint(e, map) {
		if (e.key === 'Enter') {
			const google = this.props.google;
			const points = this.props.points;
			const point = points[points.length-1];
			const path = this.state.poly.getPath();

			path.push(map.getCenter());
	        point.marker = new google.maps.Marker({
	          draggable: true,
	          position: map.getCenter(),
	          map: map
	        });

	        point.info = new google.maps.InfoWindow({
		      content: '<div>'+point.name+'</div>'
		    });

		    point.map = map;

	        this.props.updatePoints(points);
		}
	}

	render() {
		return (
			<Map 
	            google={this.props.google}
	            initialCenter={{lat: 55.738658, lng: 37.618846}} 
	            zoom={9} 
	            style={{width: '100%', height: '100%'}}
	            onReady={this.initDirections}
            >
          	</Map> 
		)
	}
};

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDxtiunl1kADOT4ZnUHcO3CTMeE5uVOAJI')
})(GoogleMapRender)