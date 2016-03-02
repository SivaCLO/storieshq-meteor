Podcast = React.createClass({
  propTypes: {
    podcast: React.PropTypes.object.isRequired
  },

  open() {
    FlowRouter.go('/' + this.props.podcast._id);
  },

  getInitialState: function(){
      return {
        stateText: null
      }
  },

  componentWillMount() {
    switch(this.props.podcast.state) {
      case undefined:
      case 0:
        this.setState({stateText: "Scripting"});
        break;
      case 1:
        this.setState({stateText: "Recording"});
        break;
      case 2:
        this.setState({stateText: "Editing"});
        break;
      case 3:
        this.setState({stateText: "Publishing"});
        break;
      case 99:
      default:
        this.setState({stateText: "Published"});
        break;
    }
  },

  render() {
    return (
      <div>
        <a href="" onClick={this.open}>
          {this.props.podcast.title ? this.props.podcast.title : "Untitled"}
        </a>
        {this.props.podcast.state == 99 ? "" : " (" + this.state.stateText + ")"}
      </div>
    );
  }
});
