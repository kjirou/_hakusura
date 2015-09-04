module.exports = React.createClass({

  childContextTypes: {
    shared: React.PropTypes.object
  },

  contextTypes: {
    ctx: React.PropTypes.object
  },

  getChildContext() {
    return {
      shared: this.getContext()
    };
  },

  getContext() {
    return this.state.activeContext || this.context.shared;
  },

  getInitialState() {
    return {
      activeContext: null,
      templateProps: {}
    };
  },

  render() {

    let ActiveComponent = null;
    if (this.state.activeContext !== null) {
      this.state.templateProps.ref = 'root';
      ActiveComponent = React.createElement(
        this.state.activeContext.component,
        this.state.templateProps
      );
    }

    const props = {
      top: 'top',
      left: 'left',
      width: 82,
      height: 34,
      border: {
        type: 'line'
      },
      style: {
        fg: 'white',
        bg: 'blue',
        border: {
          fg: 'white'
        }
      },
      context: 'Now loading..'
    };

    return(
      <box {...props}>
        {ActiveComponent}
      </box>
    );
  }
});
