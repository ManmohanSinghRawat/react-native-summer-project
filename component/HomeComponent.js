import React, {Component} from 'react'; 
import { Text, View, Animated, Easing } from 'react-native';
import { Card } from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/BaseUrl';
import LoadingComponent from './LoadingComponent';

const mapStateToProp = state => {
    return {
        dish : state.dishReducer,
        leader: state.leaderReducer,
        promo: state.promotionReducer,
        comment: state.commentReducer
    }
}

function RenderItem(props) {
        const item = props.item;

        if(props.isloading){
            return (<LoadingComponent></LoadingComponent>);
        }
        else if(props.errMess){
            return (
                <View> 
                    <Text>{props.errMess}</Text>
                </View>
            );
        }
        else {
            if (item != null) {
                return(
                    <Card
                        featuredTitle={item.name}
                        featuredSubtitle={item.designation}
                        image={{uri: baseUrl + item.image}}>
                        <Text
                            style={{margin: 10}}>
                            {item.description}</Text>
                    </Card>
                );
            }
            else {
                return(<View></View>);
            }
        }   
}

class Home extends Component {

    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0);        
    }

    componentDidMount () {
        this.animate()
    }

    static navigationOptions = {
        title: 'Home',
    };

    animate () {
        this.animatedValue.setValue(0)
        Animated.timing(
          this.animatedValue,
          {
            toValue: 8,
            duration: 6000,
            easing: Easing.linear
          }
        ).start(() => this.animate())
    }

    render() {   
        
        const xpos1 = this.animatedValue.interpolate({
            inputRange: [0, 1, 3, 5, 8],
            outputRange: [600, 300, 0, -300, -600]
        })
        const xpos2 = this.animatedValue.interpolate({
            inputRange: [0, 2, 4, 6, 8],
            outputRange: [600, 300, 0, -300, -600]
        })
        const xpos3 = this.animatedValue.interpolate({
            inputRange: [0, 3, 5, 7, 8],
            outputRange: [600, 300, 0, -300, -600]
        })

        return(
            <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
                <Animated.View style={{ width: '100%', transform: [{translateX: xpos1}]}}>
                <RenderItem isloading={this.props.dish.isloading} errMess={this.props.dish.errMess} item={this.props.dish.dishes.filter((dish) => dish.featured)[0]} />
                </Animated.View>
                <Animated.View style={{ width: '100%', transform: [{translateX: xpos2}]}}>
                <RenderItem isloading={this.props.promo.isloading} errMess={this.props.promo.errMess} item={this.props.promo.promos.filter((promo) => promo.featured)[0]} />
                </Animated.View>
                <Animated.View style={{ width: '100%', transform: [{translateX: xpos3}]}}>
                <RenderItem isloading={this.props.leader.isloading} errMess={this.props.leader.errMess} item={this.props.leader.leaders.filter((leader) => leader.featured)[0]} />
                </Animated.View>
            </View>
        );
    }
}

export default connect(mapStateToProp)(Home);
