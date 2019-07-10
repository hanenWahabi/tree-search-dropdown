import React from "react";
import "./App.css";
import { RadioGroup, Button, Grid } from "@material-ui/core";
import Subsection from "./components/subsection";
import SearchTable from "./components/SearchTable";
import DropDownItem from "./components/DropDownItem";
const PARAMS = [
  { id: 0, group: "Option 1", type: ["Type A", "Type B", "Type C"] },
  { id: 1, group: "Option 2", type: ["Type D", "Type E", "Type F"] }
];
const DATA = [
  { id: "0", name: "Example 1", group: "Option 1", type: "Type A" },
  { id: "3", name: "Example 2", group: "Option 1", type: "Type B" },
  { id: "4", name: "Example 3", group: "Option 1", type: "Type C" },
  { id: "5", name: "Example 4", group: "Option 2", type: "Type D" },
  { id: "6", name: "Example 5", group: "Option 2", type: "Type E" },
  { id: "7", name: "Example 6", group: "Option 2", type: "Type F" }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openSectionIndex: -1,
      checked: "",
      anchorEl: null,
      showMenu: false,
      group: null,
      shown_tables: [],
      selected_group: null
    };
    this.togglePanel = this.togglePanel.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (
      (this.wrapperRef && event.target.className === "dropdown") ||
      event.target.className === "container" ||
      event.target.className === "row" ||
      event.target.nodeName === "HTML"
    ) {
      this.setState({
        open: false,
        openSectionIndex: -1,
        checked: "",
        anchorEl: null,
        showMenu: false,
        group: null,
        shown_tables: [],
        selected_group: null
      });
    }
  }

  toggleMenu(event) {
    event.preventDefault();
    this.setState({ showMenu: !this.state.showMenu });
  }

  togglePanel(key, group) {
    this.setState({
      open: !this.state.open,
      openSectionIndex: this.state.open ? -1 : key,
      group: group
    });
    var coll = document.getElementsByClassName("collapsible");
    var content = coll[key].nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
      const new_tables = this.state.shown_tables.filter(item => {
        return item !== key;
      });
      this.setState({ shown_tables: new_tables });
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      this.setState({ shown_tables: [...this.state.shown_tables, key] });
    }
  }

  checkedRadio(value) {
    const selected_param = PARAMS.find(({ type }) => {
      return type.indexOf(value) > -1;
    });
    this.setState({
      checked: value,
      selected_group: selected_param ? selected_param.group : null
    });
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  render() {
    const {
      openSectionIndex,
      checked,
      shown_tables,
      selected_group
    } = this.state;

    return (
      <div className="container">
        <div className="dropdown">
          <Button
            onClick={this.toggleMenu}
            aria-haspopup="true"
            variant="contained"
            color="secondary"
          >
            Open Drop down menu
          </Button>

          {this.state.showMenu
            ? PARAMS.map(item => (
                <Grid container key={item.id}>
                  <Grid item md={3} xs={6} className="grid-menu">
                    <DropDownItem
                      id={item.id}
                      reference={this.setWrapperRef}
                      togglePanel={e => this.togglePanel(item.id, item.group)}
                      openSectionIndex={openSectionIndex}
                      name={item.group}
                    >
                      <RadioGroup value={checked}>
                        {item.type.map(val => (
                          <Subsection
                            key={val}
                            name={val}
                            onChecked={() => this.checkedRadio(val)}
                            checked={checked}
                          />
                        ))}
                      </RadioGroup>
                    </DropDownItem>
                  </Grid>
                  <Grid item xs={6} md={4} className="grid-table">
                    <div>
                      {item.type.includes(checked) &&
                      shown_tables.includes(item.id) ? (
                        <div className="search">
                          <SearchTable
                            data={DATA}
                            filter={[checked, selected_group]}
                          />
                        </div>
                      ) : null}
                    </div>
                  </Grid>
                </Grid>
              ))
            : null}
        </div>
      </div>
    );
  }
}
export default App;
