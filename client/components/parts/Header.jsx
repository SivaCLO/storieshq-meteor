Header = React.createClass({

  propTypes: {
    podcastId: React.PropTypes.string,
    headerText: React.PropTypes.string
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      podcast: Podcasts.findOne({_id: this.props.podcastId}),
    };
  },

  componentDidMount() {
    // if(this._modal) {
    //   this._modal.addEventListener('shown.bs.modal', function() {
    //     console.log(this._modal);
    //     var title = ReactDOM.findDOMNode(this.refs.title);
    //     title.focus();
    //   });
    // }

    if(this._modalTrigger && this.data.podcast && !this.data.podcast.title) {
      this._modalTrigger.click();
    }
  },

  getMethods(obj) {
    var result = [];
    for (var id in obj) {
      try {
        if (typeof(obj[id]) == "function") {
          result.push(id + ": " + obj[id].toString());
        }
      } catch (err) {
        result.push(id + ": inaccessible");
      }
    }
    return result;
  },

  saveTitle() {
    var title = ReactDOM.findDOMNode(this.refs.title).value.trim();
    Meteor.call("setTitle", this.props.podcastId, title, function(error, result) {
      if (error) {
        alert(error.reason);
      }
    });
  },

  logoutClicked(event) {
    event.preventDefault();
    Meteor.logout(function(err) {
      FlowRouter.go("/login");
    })
  },

  home() {
    FlowRouter.go("/");
  },

  podcastHome() {
    FlowRouter.go("/" + this.props.podcastId);
  },

  script() {
    FlowRouter.go("/" + this.props.podcastId + "/script");
  },

  record() {
    FlowRouter.go("/" + this.props.podcastId + "/record");
  },

  edit() {
    FlowRouter.go("/" + this.props.podcastId + "/edit");
  },

  publish() {
    FlowRouter.go("/" + this.props.podcastId + "/publish");
  },

  render() {

    return <div className="header">

      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="" onClick={this.home}>
              <img className="stories-logo" src="/img/transparent.png" />
            </a>
          </div>
          <div className="collapse navbar-collapse">
            {this.props.headerText ?
            <ul className="nav navbar-nav">
              <li><a href=""></a></li>
              <li className="navbar-brand">{this.props.headerText}</li>
            </ul>
            : ""}
            {this.data && this.data.podcast ?
            <ul className="nav navbar-nav">
              <li><a href=""></a></li>
              <li className="navbar-brand">
                <p>
                  <a className="podcastName" href="" onClick={this.podcastHome}>{this.data.podcast.title ? this.data.podcast.title : "Untitled"}</a>
                  &nbsp;<a href="" ref={(ref) => this._modalTrigger = ref} data-toggle="modal" data-target="#myModal">
                    <i className="fa fa-pencil"></i>
                  </a>
                </p>
              </li>
            </ul>
            : ""}
            {Meteor.user() ?
              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                  <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{Meteor.user() ? Meteor.user().profile.name : ""} <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li><a onClick={this.logoutClicked} href="">Logout</a></li>
                  </ul>
                </li>
              </ul>
            : ""}
          </div>
        </div>
      </nav>

      {this.data && this.data.podcast ?

        <div>

          <div className="text-center">
            <div className="actions btn-group" role="group" aria-label="...">
                <button type="button" className="btn btn-lg btn-warning action" onClick={this.script}><i className="fa fa-file-text-o"></i>&nbsp;Script</button>
                <button type="button" className="btn btn-lg btn-danger action" onClick={this.record}><i className="fa fa-microphone"></i>&nbsp;Record</button>
                <button type="button" className="btn btn-lg btn-success action" onClick={this.edit}><i className="fa fa-headphones"></i>&nbsp;Edit</button>
                <button type="button" className="btn btn-lg btn-primary action" onClick={this.publish}><i className="fa fa-bullhorn"></i>&nbsp;Publish</button>
            </div>
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

      : ""}

    </div>
  }
});
