import { Component } from "react";
import PropTypes from "prop-types";
import { DebounceInput } from "react-debounce-input";
import "./Searcher.css";

export default class Searcher extends Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: "" };
  }

  onInputChangeHandler = (value) => {
    const inputValue = value.target.value;
    this.setState({ inputValue });
    const { SearcherHandler } = this.props;
    SearcherHandler(inputValue);
  };

  render() {
    const { inputValue } = this.state;

    return (
      <DebounceInput
        minLength={1}
        className="input"
        type="text"
        placeholder="Type to search..."
        value={inputValue}
        debounceTimeout={500}
        onChange={this.onInputChangeHandler}
      />
    );
  }
}

Searcher.propTypes = {
  SearcherHandler: PropTypes.func.isRequired,
};
