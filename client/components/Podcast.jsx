// Task component - represents a single todo item
Podcast = React.createClass({
  propTypes: {
    podcast: React.PropTypes.object.isRequired
  },

  edit() {
    FlowRouter.go('/' + this.props.podcast._id);
  },

  render() {
    return (
      <div>
        <a href="" onClick={this.edit}>
          {this.props.podcast.title ? this.props.podcast.title : "Untitled"}
        </a>
      </div>
    );
  }
});
