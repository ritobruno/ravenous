import React from 'react';
import './SearchBar.css';

let sortByOptions = {
  'Best Match': 'best_match',
  'Highest Rated': 'rating',
  'Most Reviewed': 'review_count',

  constructor(props){
    this.handleTermChange.bind(this);
    this.handleLocationChange.bind(this);
  },

  getSortByClass(sortByOption) {
    if(this.state.sortBy == sortByOption){
      return 'active';
    }
    else {
      return ' ';
    }
  },

  handleSortByChange(sortByOption){
    this.setState(
      {sortBy: this.state.sortBy }
    );
  },

  handleTermChange(e){
    this.setState({
      term: e.target.value
    });
  },
  handleLocationChange(e){
    this.setState({
      location: e.target.value
    });
  }
};



class SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      term:' ',
      location:' ' ,
      sortBy: 'best_match'
    };
  }

  renderSortByOptions(){
    return Object.keys(sortByOptions).map(i => {
      let sortByOptionValue = sortByOptions[i];
      return <li className='{getSortByClass(sortByOptionValue)}' key='{sortByOptionValue}' onClick='{handleSortByChange.bind(this, sortByOptionValue)}' >{i}</li>;
    });
  };

  render(){
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>
            {this.renderSortByOptions()};
          </ul>
        </div>
        <div className="SearchBar-fields">
          <input onChange='{this.handleTermChange}' placeholder="Search Businesses" />
          <input onChange='{this.handleLocationChange}' placeholder="Where?" />
        </div>
        <div className="SearchBar-submit">
          <a>Lets Go</a>
        </div>
      </div>

    );

  }
};

export default SearchBar;
