import React from "react";
import "./styles.css";
import { KeyboardArrowDown, KeyboardArrowRight } from "@material-ui/icons";

export default class DropDownItem extends React.Component {
  render() {
    const { id, openSectionIndex, name, togglePanel, reference } = this.props;
    return (
      <div className="main" ref={reference}>
        <div className="collapsible" onClick={togglePanel}>
          {openSectionIndex === id ? (
            <KeyboardArrowDown className="icon" fontSize="small" />
          ) : (
            <KeyboardArrowRight className="icon" fontSize="small" />
          )}
          <p>{name}</p>
        </div>
        <div className="content">{this.props.children}</div>
      </div>
    );
  }
}
