Result = React.createClass({
  propTypes: {
    podcastId: React.PropTypes.string.isRequired
  },

  mixins: [ReactMeteorData],

  home() {
    FlowRouter.go('/');
  },

  getMeteorData() {
    return {
      podcast: Podcasts.findOne({_id: this.props.podcastId}),
    };
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
      <Header />
      <br></br>
      <br></br>
      <Title podcastId={this.props.podcastId}/>

      <p>It's time to Share!</p>
      <button className="btn btn-primary">Twitter</button>
      <button className="btn btn-primary">Facebook</button>
      <br></br>
      <br></br>
      <button onClick={this.home} className="btn btn-primary">Back to My Podcasts</button>
    </div>
  }
});
