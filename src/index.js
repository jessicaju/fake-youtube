// Create a new component that produces some html
// Take this component's generated html and put it on the page

// get use to troubleshooting

// final value of app
// both es6 and jsx can't be rendered directly in the browser

import React, { Component }  from 'react'; // create and manage components
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list'; 
import VideoDetails from './components/video_details'; 
import _ from 'lodash'; 

const API_KEY = 'AIzaSyCNVtVOXZRs8O6OYD7GagYZ0PTG74ELodI';

// factory that produces instance
class App extends Component {
  constructor(props) {
    super(props);  
    this.state = { 
        videos: [], 
        selectedVideo: null
    }; 
    this.videoSearch('surfboards'); 
  }

  videoSearch(term) { 
    YTSearch({key: API_KEY, term: term}, (videos) =>  {
      this.setState({ 
        videos: videos, 
        selectedVideo: videos[0] 
       }); 
   });
  }

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term); }, 300); 
    return (
      <div>
        <SearchBar onSearchTermChange= {videoSearch} /> 
        <VideoDetails video={this.state.selectedVideo} /> 
        <VideoList 
          onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
          videos={this.state.videos} /> 
      </div>
    ); 
  }
}

// must instantiate component first
ReactDOM.render(<App />, document.querySelector('.container'));
