import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {fetchUser, clearData} from '../reduxFolder/actions/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import firebase from 'firebase';

export class Main extends React.Component {
componentDidMount{
    this.props.fetchUser();
    this.props.clearData();
    //what purpose do these serve?
}
const { currentUser} = this.props;
render(){
    return(

    )
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser, clearData}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);



