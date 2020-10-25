import React, {Component} from 'react';
import { View, FlatList, Text , Alert} from 'react-native';
import { ListItem } from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/BaseUrl';
import LoadingComponent from './LoadingComponent';
import {deleteFavorite} from '../redux/ActionCreater';
import SwipeOut from 'react-native-swipeout';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dish : state.dishReducer,
        favorite : state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    deleteFavorite : (dishId) => dispatch(deleteFavorite(dishId))
})

class Favorite extends Component
{
    static navigationOptions =  {
        title : 'Favorites'
    };

    render()
    {
        const {navigate} = this.props.navigation;

        const renderDishItem = ({item, index}) => {

            const rightButton = [
                {
                    text: 'Delete',
                    type:'Delete',
                    onPress : () => {
                        Alert.alert(
                            'Delete Favorite',
                            'Are you sure to delete the favorite dish '+ item.name,
                            [
                                {
                                    text: 'Cancel', 
                                    onPress: () => console.log(item.name + 'Not Deleted'),
                                    style: 'cancel'
                                },{
                                    text: 'Ok',
                                    onPress: () => this.props.deleteFavorite(item.id) 
                                }
                            ],
                            {cancelable: false}
                        );
                    }
                }
            ];

            return (
                <Animatable.View animation="fadeInRightBig" duration={2000}> 
                    <SwipeOut right={rightButton} autoClose={true}>
                        
                            <ListItem
                                key={index}
                                title={item.name}
                                subtitle={item.description}
                                hideChevron={true}
                                onPress={() => navigate('Dishdetail', { dishId: item.id })}
                                leftAvatar={{ source: {uri: baseUrl + item.image}}}
                            />   
                    </SwipeOut>
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
                    data = {this.props.dish.dishes.filter((dish) => this.props.favorite.some(el => el===dish.id))}
                    renderItem = {renderDishItem}
                    keyExtractor = {item => item.id.toString()}
                >
                </FlatList>
            );
        }
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);