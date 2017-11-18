import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBarArea from './AppBarArea';
import ContentArea from './ContentArea';



class App extends React.Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBarArea/>
          <ContentArea/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;