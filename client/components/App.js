export default class App extends React.Component {

  constructor(){
    super();
    //this.state = {cnt: 1};
  }

  //componentDidMount() {
  //  this._id =setInterval(() => {
  //    this.incrementCounter();
  //  }, 1000)
  //}

  //componentWillUnmount() {
  //  clearInterval(this._id);
  //}

  //incrementCounter() {
  //  this.setState({cnt: this.state.cnt + 1});
  //}

  render() {
    let props = {
      top: 'center',
      left: 'center',
      width: '100%',
      height: '100%',
      border: {
        type: 'line'
      },
      style: {
        fg: 'white',
        bg: 'black',
        border: {
          fg: 'white'
        }
      },
      content: 'AppContext!'
    };

    return <box {...props} />;
  }
}
