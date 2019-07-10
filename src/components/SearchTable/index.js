import React from "react";
import "./styles.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export default class SearchTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    const new_data = this.props.data.filter(item => {
      return (
        item.type === this.props.filter[0] &&
        item.group === this.props.filter[1]
      );
    });
    this.setState({ list: new_data });
  }

  handleChange(e) {
    let currentList = [];
    let newList = [];
    const type = this.props.filter[0];
    const group = this.props.filter[1];
    const data = this.props.data;

    if (e.target.value !== "") {
      currentList = this.state.list;
      newList = currentList.filter(item => {
        const lc = item.name.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else if (this.props.filter[0] !== "") {
      newList = data.filter(item => {
        return item.type === type && item.group === group;
      });
    } else {
      newList = data;
    }
    this.setState({
      list: newList
    });
  }

  componentWillReceiveProps(newProps) {
    if (this.props.filter !== newProps.filter && newProps.filter[0] !== "") {
      const data = newProps.data;
      const type = newProps.filter[0];
      const group = newProps.filter[1];
      let newList = [];
      newList = data.filter(item => {
        return item.type === type && item.group === group;
      });
      this.setState({
        list: newList
      });
    }
  }

  render() {
    return (
      <div className="holder">
        <input
          type="text"
          className="input"
          onChange={this.handleChange}
          placeholder="Search..."
        />
        <Paper style={{ overflowX: "auto" }}>
          <Table style={{ minWidth: "100px" }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Group</TableCell>
                <TableCell align="right">Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.list.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.group}</TableCell>
                  <TableCell align="right">{row.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}
