import React, { Component, useRef} from 'react';
import {View, Text, ScrollView, FlatList, Modal, StyleSheet, Button, PanResponder, Alert, Share} from 'react-native';
import {Card, Icon, Input, Rating} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/BaseUrl';
import  {postFavorite, postComment} from '../redux/ActionCreater';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dish : state.dishReducer,
        comments: state.commentReducer,
        favorite : state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (comment) => dispatch(postComment(comment))
})


function RenderDish(props)
{
    const dish = props.dish;

    let view;        

    const recognizeRightDrag = ({moveX, moveY, dx, dy}) => {
        if(dx<-200) return true;
        else return false
    }; 

    const recognizeLeftDrag = ({moveX, moveY, dx, dy}) => {
        if(dx>200) return true;
        else return false
    }; 

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {
            view.rubberBand(1000)
                .then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));
        },
        onPanResponderEnd: (e, gestureState) =>{
            if(recognizeRightDrag(gestureState)) 
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                    ],
                    { cancelable: false }
                );

            if(recognizeLeftDrag(gestureState))
                props.onPressComment();

            return true; 
        }
    });

    const shareDish = (title, message, url) => {
        Share.share({
            title: title,
            message: title+" : "+message+"\n"+url,
            url: url
        },{
            dialogTitle: "Share "+title
        });
    }

    if(dish != null)
    {
        return (
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
                ref={(ref) => {view= ref;}}
                {...panResponder.panHandlers}
            >
                <Card
                    featuredTitle={dish.name}
                    image = {{uri : baseUrl + dish.image}}
                >
                    <Text style={{margin: 10, marginBottom:30}}>
                        {dish.description}
                    </Text>
                    <View style={{flex:1, flexDirection:"row", alignItems:'center', justifyContent:'center'}}>
                        <Icon
                            raised
                            name={ props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.onPress()}
                            />
                        <Icon
                            raised
                            name='pencil'
                            type='font-awesome'
                            color='#512DA8'
                            onPress={() => props.onPressComment()}
                        />
                        <Icon
                            raised
                            name='share'
                            type='font-awesome'
                            color='#51D2A8'
                            onPress={() => shareDish(dish.name, dish.description, baseUrl+dish.image)}
                        />
                    </View>
                </Card>
            </Animatable.View>
        );
    }
    else
        return <View></View>
}

function RenderComment(props)
{
    const comments = props.comments;

    const renderDishCommments = ({item, index}) => {
        return (
        <View  style={{margin:10}}
            key={index}
        >
            <Text style={{fontSize: 14}}>{item.comment}</Text>
            <Rating imageSize={20} readonly startingValue={item.rating} style={{alignItems:'baseline'}}/>
            <Text style={{fontSize: 14}}> -- {item.author} </Text>
        </View>
    )};

    return (
            <Card
                title= 'Comments'>
                <FlatList
                    data = {comments}
                    renderItem = {renderDishCommments}
                    keyExtractor = {item => item.id.toString()}
                ></FlatList>
            </Card>
        );
}

class DishDetail extends Component
{
    constructor(props){
        super(props);
        this.state={
            showCommentModal: false,
            author: '',
            dishId: null,
            comment: '',
            rating : 5
        }
    }

    getcomment(dishID, comments){
        this.setState({date: new Date()});
        let com = {
            id : comments.length,
            author: this.state.author,
            dishId: dishID,
            comment: this.state.comment,
            rating : this.state.rating,
            date : new Date(),
        }
        return com;
    }

    toggleModal() {
        this.setState({
            showCommentModal: false,
            id : null,
            author: '',
            dishId: null,
            comment: '',
            rating : 5
        });
    }
   
    static navigationOptions = {
        title : 'Dish Detail'
    }

    render(){
        const dishid = this.props.navigation.getParam('dishId', '');
        
        if(this.props.comments.errMess){
            return (
                <ScrollView>
                    
                    <RenderDish dish = {this.props.dish.dishes[+dishid]} 
                        favorite={this.props.favorite.some(el => el === dishid)}
                        onPress={() =>this.props.postFavorite(dishid)}
                        onPressComment={() => this.setState({showCommentModal: true})}>
                    </RenderDish> 
                    <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
                        <Card
                            title= 'Comments'>
                            <Text>{this.props.comments.errMess}</Text>
                        </Card> 
                    </Animatable.View>
                    <Modal animationType = {"slide"} transparent = {false}
                        visible = {this.state.showCommentModal}
                        onDismiss = {() => this.toggleModal() }
                        onRequestClose = {() => this.toggleModal() }>
                        <View style={style.modal}>
                            <Rating 
                                showRating 
                                readonly={false}
                                startingValue = {this.state.rating*2}
                                ratingCount={this.state.rating}                
                                onFinishRating={(rating) => this.setState({rating:rating})}
                            />
                            <Input
                                placeholder='Author'
                                onChangeText ={(text) => this.setState({author:text})}
                                leftIcon={<Icon name='user' type='font-awesome' size={22} color='grey' />}
                            />
                            <Input
                                placeholder='comment'
                                onChangeText ={(text) => this.setState({comment:text})}
                                leftIcon={<Icon name='comment-o' type='font-awesome' size={22} color='grey' />}
                            />
                            <View style={{margin: 5}}>
                                <Button 
                                    raised
                                    onPress = {() =>{this.props.postComment(this.getcomment(dishid,this.props.comments.comments)); this.toggleModal(); }}
                                    color="#512DA8"
                                    title="Submit" 
                                />
                            </View>
                            <View style={{margin: 5}}>
                                <Button 
                                    raised
                                    onPress = {() =>{this.toggleModal(); }}
                                    color="grey"
                                    title="Close" 
                                />
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            );
        }
        else {
            return (
                <ScrollView>
                    <RenderDish dish = {this.props.dish.dishes[+dishid]} 
                        favorite={this.props.favorite.some(el => el === dishid)}
                        onPress={() => this.props.postFavorite(dishid)}
                        onPressComment={() => this.setState({showCommentModal: true})}>
                    </RenderDish> 
                    <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
                        <RenderComment comments={this.props.comments.comments.filter((comment) => comment.dishId === dishid)} />
                    </Animatable.View>
                    <Modal animationType = {"slide"} transparent = {false}
                        visible = {this.state.showCommentModal}
                        onDismiss = {() => this.toggleModal() }
                        onRequestClose = {() => this.toggleModal() }>
                        <View style={style.modal}>
                            <Rating 
                                showRating 
                                readonly={false}
                                startingValue = {this.state.rating*2}
                                ratingCount={this.state.rating}                
                                onFinishRating={(rating) => this.setState({rating:rating})}
                            />
                            <Input
                                placeholder='Author'
                                onChangeText ={(text) => this.setState({author:text})}
                                leftIcon={<Icon name='user' type='font-awesome' size={22} color='grey' />}
                            />
                            <Input
                                placeholder='comment'
                                onChangeText ={(text) => this.setState({comment:text})}
                                leftIcon={<Icon name='comment-o' type='font-awesome' size={22} color='grey' />}
                            />
                            <View style={{margin: 5}}>
                                <Button 
                                    raised
                                    onPress = {() =>{this.props.postComment(this.getcomment(dishid,this.props.comments.comments)); this.toggleModal(); }}
                                    color="#512DA8"
                                    title="Submit" 
                                />
                            </View>
                            <View style={{margin: 5}}>
                                <Button 
                                    raised
                                    onPress = {() =>{this.toggleModal(); }}
                                    color="grey"
                                    title="Close" 
                                />
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
                
            );
        }
    }
}

const style = StyleSheet.create({
    
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         textAlign: 'center',
         color: '#f7df34',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }
});

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);