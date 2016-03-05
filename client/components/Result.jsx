Result = React.createClass({
  propTypes: {
    podcastId: React.PropTypes.string.isRequired
  },

  mixins: [ReactMeteorData],

  home() {
    FlowRouter.go("/");
  },

  getMeteorData() {
    return {
      podcast: Podcasts.findOne({_id: this.props.podcastId}),
    };
  },

  componentWillMount() {
    if(!this.data.podcast) {
      FlowRouter.go('/');
    }
  },

  save() {
    var title = ReactDOM.findDOMNode(this.refs.title).value.trim();
    var notes = ReactDOM.findDOMNode(this.refs.notes).value.trim();
    Meteor.call("setup", this.props.podcastId, title, notes, function(error, result) {
      if (error) {
        alert(error.reason);
      }
    });
  },

  // saveImage() {
  //   var bucket = new AWS.S3({params: {Bucket: 'stories-images'}});
  //
  //   var file = ReactDOM.findDOMNode(this.refs.filechooser).value.trim();
  //
  //   if (file) {
  //     this.setState({imageResults: ""});
  //
  //     var _this = this;
  //     var params = {Key: this.props.podcastId, Body: file};
  //     bucket.upload(params, function (err, data) {
  //       _this.setState({imageResults: err ? 'Error' : 'Success'});
  //     });
  //   } else {
  //     this.setState({imageResults: "Nothing to upload"});
  //   }
  // },

  render() {
    return <div className="result">
      <Header podcastId={this.props.podcastId} headerText={this.data.podcast.title ? this.data.podcast.title : "Untitled"}/>
      <div className="text-center">
        <h2>It's time to Share!</h2>
        <button className="btn btn-primary">Twitter</button>
        <button className="btn btn-primary">Facebook</button>

        <p><button onClick={this.home} className="btn btn-primary">Done</button></p>
      </div>
    </div>
  }
});
