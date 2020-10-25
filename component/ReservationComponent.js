import React,{Component} from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';

class Reservation extends Component{

    constructor(props){
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: ''
        }
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: null
        });
    }

    static navigationOptions =  {
        title : 'Reservation'
    };

    async obtainPermission(){
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if(permission.status !== 'granted'){
            permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }

    async obtainCalenderPermission(){
        let permission = await Calendar.requestCalendarPermissionsAsync(Calendar.DEFAUlt);
        if(permission.status !== 'granted'){
            permission = await Calendar.requestCalendarPermissionsAsync(Calendar.DEFAUlt);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted!');
            }
        }
        return permission;
    }

    async obtainCalender(){
        let calendar = await Calendar.getCalendarsAsync();
        if(calendar == null){
            Alert.alert('Permission not granted!');
        }
        return calendar[5];
    }


    async presentLocalNotification(date){
        await this.obtainPermission();
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for '+ date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        });
    }

    async addEventToCalendar(date){
        await this.obtainCalenderPermission();
        let calendar = await this.obtainCalender();
        await this.obtainPermission();
        let eventId =  Calendar.createEventAsync(
            calendar.id,
            {
                title: 'Con Fusion Table Reservation',
                startDate: new Date(Date.parse(date)),
                endDate:  new Date(Date.parse(date)+1000*2*60*60),
                timeZone: 'Asia/Kolkata',
                location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
            }
        );
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for '+ date + ' requested.Event is added to you calendar.',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            },
        });
    }

    render(){
        return(
            <ScrollView>
                <Animatable.View animation="zoomIn" duration={2000} delay={1000}>
                <View style={style.formRow}>
                    <Text style={style.formLabel}>Number of Guest</Text>
                    <Picker style={style.formItem} selectedValue={this.state.guests} onValueChange={(itemValue, itemIndex)=>this.setState({guests:itemValue})}>
                        <Picker.Item label='1' value='1'></Picker.Item>
                        <Picker.Item label='2' value='2'></Picker.Item>
                        <Picker.Item label='3' value='3'></Picker.Item>
                        <Picker.Item label='4' value='4'></Picker.Item>
                        <Picker.Item label='5' value='5'></Picker.Item>
                    </Picker>
                </View>
                <View style={style.formRow}>
                    <Text style={style.formLabel}>Smoking/Non-Smoking</Text>
                    <Switch style={style.formItem} value={this.state.smoking} tintColor='#512DA8' onValueChange={(value) => this.setState({smoking:value})}></Switch>
                </View>
                <View style={style.formRow}>
                    <Text style={style.formLabel}>Date and Time</Text>
                    <DatePicker
                        style={{flex: 2, marginRight: 20}}
                        date={this.state.date}
                        format=''
                        mode="datetime"
                        placeholder="select date and Time"
                        minDate="2017-01-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        }}
                        onDateChange={(date) => {this.setState({date: date})}}
                    />
                </View>
                <View style={{margin:10}}>
                    <Button title="Reserve" onPress={() => Alert.alert(
                            'Your Reservation OK?',
                            'Number of Guests: '+this.state.guests+'\n'+'Smoking? '+this.state.smoking+'\n'+'Date and Time: '+this.state.date,
                            [
                                {text: 'Cancel', onPress: () => { console.log('Cancel Pressed'), this.resetForm()}, style: 'cancel'},
                                {text: 'OK', onPress: () => {this.addEventToCalendar(this.state.date), this.resetForm()} }
                            ],
                            {cancelable: false}
                        )} color="#512DA8" accessibilityLabel="Learn more about this purple button"/>
                </View>
                </Animatable.View>
            </ScrollView>
        );
    }
};

const style = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }
});

export default Reservation;