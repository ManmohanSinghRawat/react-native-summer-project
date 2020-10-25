import React, {Component} from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

class LoadingComponent extends Component{
    render(){
        return (
            <View> 
                <ActivityIndicator size="large" color="#512DA8"></ActivityIndicator>
                <Text style={styles.loadingText} >Loading . . .</Text>
            </View>
        );
    }
   
}

const styles = StyleSheet.create({
    loadingView: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1
    },
    loadingText: {
      color: '#512DA8',
      fontSize: 14,
      fontWeight: 'bold',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      flex: 1
    }
});

export default LoadingComponent;