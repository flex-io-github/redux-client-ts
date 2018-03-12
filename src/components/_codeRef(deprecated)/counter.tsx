import * as React from 'react';
// import { State as CounterState } from '@src/features/counters/reducer';
// import * as CounterSelectors from '@src/features/counters/selectors';
// import { Dispatch } from '@src/features';
// import { bindActionCreators } from '@src/typings/redux';
// import { countersActions } from '@src/features/counters/actions'
interface Props {
}
interface State {
  count: number;
}

// const mapStateToProps = (state: CounterState) => ({
//   counters: CounterSelectors.getReduxCounter(state),
// })

// const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators ({
//   onIncrement: countersActions.increment,
// }, dispatch)

export class Counter extends React.Component<Props, State> {
  interval: number;
  state = { count: 0 };

  componentWillMount() {
    const incrementCounter = () => {
      this.setState({ count: this.state.count + 1 });
    };
    this.interval = setInterval(incrementCounter, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <div>Counter: {this.state.count}</div>
      </div>
    );
  }
}

export default Counter;
