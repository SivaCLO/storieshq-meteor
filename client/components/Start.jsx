Start = React.createClass({
  propTypes: {
    podcastId: React.PropTypes.string.isRequired
  },

  mixins: [ReactMeteorData],

  record() {
    ReactLayout.render(Record, {podcastId: this.props.podcastId});
  },

  getMeteorData() {
    return {
      podcast: Podcasts.findOne({_id: this.props.podcastId}),
    };
  },

  componentDidMount() {
    if(this._modalTrigger && this.data.podcast && !this.data.podcast.title) {
      this._modalTrigger.click();
    }
  },

  saveTitle() {
    var title = ReactDOM.findDOMNode(this.refs.title).value.trim();
    Meteor.call("setTitle", this.props.podcastId, title, function(error, result) {
      if (error) {
        alert(error.reason);
      }
    });
  },

  render() {
    return <div className="script">
      <Header podcastId={this.props.podcastId}/>
      <div className="text-center">
          <h2>
            {this.data.podcast.title ? this.data.podcast.title : "Untitled"}
            &nbsp;
            <a href="" ref={(ref) => this._modalTrigger = ref} data-toggle="modal" data-target="#myModal">
              <i className="fa fa-pencil editIcon"></i>
            </a>
          </h2>
      </div>

      <div id="myModal" ref={(ref) => this._modal = ref} className="modal fade" role="dialog">
        <div className="modal-dialog">

          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">Edit Title</h4>
            </div>
            <div className="modal-body">
              <input type="text" ref="title" placeholder="Untitled" defaultValue={this.data.podcast && this.data.podcast.title ? this.data.podcast.title : ""}></input>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.saveTitle}>Save</button>
            </div>
          </div>

        </div>
      </div>

    </div>
  }
});
