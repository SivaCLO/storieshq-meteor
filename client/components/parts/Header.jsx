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

  logoutClicked(event) {
    event.preventDefault();
    Meteor.logout(function(err) {
      FlowRouter.go("/login");
    })
  },

  home() {
    FlowRouter.go("/");
  },

  start() {
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
            {Meteor.user() ?
              <ul className="nav navbar-nav navbar-right">
                <li className="navbar-text">Signed in as </li>
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
          <div className="text-center">
            <div className="actions btn-group" role="group" aria-label="...">
                <button type="button" className="btn btn-lg btn-default plain" onClick={this.start}><i className="fa fa-th-large"></i></button>
                <button type="button" className="btn btn-lg btn-default plain action" onClick={this.script}><i className="fa fa-file-text-o text-warning"></i>&nbsp;Script</button>
                <button type="button" className="btn btn-lg btn-default plain action" onClick={this.record}><i className="fa fa-microphone text-danger"></i>&nbsp;Record</button>
                <button type="button" className="btn btn-lg btn-default plain action" onClick={this.edit}><i className="fa fa-headphones text-success"></i>&nbsp;Edit</button>
                <button type="button" className="btn btn-lg btn-default plain action" onClick={this.publish}><i className="fa fa-bullhorn text-primary"></i>&nbsp;Publish</button>
            </div>
          </div>
      : ""}

    </div>
  }
});
