import React, { Component } from "react";

class SearchResults extends Component {
  render() {
    return (
      <section className="searchResults">
        {/* <h1>Search Results</h1>
        { this.props.searchResults.map(result => (
          <div key={ result.id } className="result_card"> */}
        <h2>{ result.name }</h2>
        <button>detail</button>
          </div>
    ))
  }
      </section>
    );
  }
}

export default SearchResults;