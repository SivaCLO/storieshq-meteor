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

  render() {
    return (
      <div>
        <a href="" onClick={this.open}>
          {this.props.podcast.title ? this.props.podcast.title : "Untitled"}
        </a>
      </div>
    );
  }
});
