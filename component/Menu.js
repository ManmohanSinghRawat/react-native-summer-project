import React, {Component} from 'react';
import { View, FlatList, Text } from 'react-native';
import { Tile } from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/BaseUrl';
import LoadingComponent from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dish : state.dishReducer
    }
}

class Menu extends Component
{
    static navigationOptions =  {
        title : 'Menu'
    };

    render()
    {
        const {navigate} = this.props.navigation;

        const renderDishItem = ({item, index}) => {
            return (
                <Animatable.View animation="fadeInRightBig" duration={2000}>   
                    <Tile
                        key={index}
                        title={item.name}
                        caption={item.description}
                        featured
                        onPress={() => navigate('Dishdetail', { dishId: item.id })}
                        imageSrc={{ uri: baseUrl + item.image}}
                    />
                </Animatable.View>
            );
        };
    
        if (this.props.dish.isloading) {
            return(
                <LoadingComponent />
            );
        }
        else if (this.props.dish.errMess) {
            return(
                <View>            
                    <Text>{this.props.dish.errMess}</Text>
                </View>            
            );
        }
        else {
            return (
                <FlatList 
                    data = {this.props.dish.dishes}
                    renderItem = {renderDishItem}
                    keyExtractor = {item => item.id.toString()}
                >
                </FlatList>
            );
        }
        
    }
}

export default connect(mapStateToProps)(Menu);