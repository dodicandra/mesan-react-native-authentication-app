import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, SectionList, StyleSheet, Text, View} from 'react-native';
import moment from 'moment';

import * as api from "../service";
import {useEvent} from "../provider";
import {font} from "../../../theme";

import EventItem from "../components/EventItem";
import {Error} from "../../../components/Shared";

export default function EventList(props) {
    const {navigation} = props;
    const {navigate} = navigation;

    //1 - DECLARE VARIABLES
    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const {state, addEventsWithPaging} = useEvent();

    let {events, totalResults, nextPage} = state;


    //==================================================================================================

    //2 - MAIN CODE BEGINS HERE
    useEffect(() => {
        getData(false);
    }, []);

    //==================================================================================================

    //3 - GET DATA
    async function getData(refresh = false) {
        if (refresh) setIsRefreshing(true);
        else setIsFetching(true);

        try {
            let response = await api.getEvents();
            addEventsWithPaging(response);
        } catch (error) {
            setError(error);
        } finally {
            setIsFetching(false);
            setIsRefreshing(false)
        }
    }

    //==================================================================================================

    // 4 - ON REFRESH
    async function onRefresh() {
        await getData(true)
    }

    //==================================================================================================

    // 5 - ON LOAD MORE
    async function onLoadMore() {
        if (!isLoadingMore) {
            setIsLoadingMore(true);

            //if the nextPage is set or the current length is less than the total results available
            if (state.nextPage || events.length < totalResults) {
                try {
                    let response = await api.getEventsWithPaging(nextPage);
                    addEventsWithPaging(response);
                } catch (error) {
                    alert(error.message);
                } finally {
                    setIsLoadingMore(false)
                }
            }
        }
    }

    //==================================================================================================

    // 6 - RENDER ITEM
    const renderItem = ({item, index}) => {
        return (
            <EventItem item={item} index={index}/>
        );
    };
// #F86964
    //==================================================================================================

    // 7 - RENDER FOOTER
    const renderFooter = () => {
        //if the events length is not less than the total result, don't display the footer
        if (!(events.length < totalResults)) return null;

        return (
            <View style={styles.footerStyle}>
                <ActivityIndicator/>
            </View>
        );
    };

    //==================================================================================================

    // 8 - RENDER
    if (isFetching) return <ActivityIndicator style={{paddingVertical: 8}}/>;

    if (error) return <Error error={error} onRetry={getData}/>;

    return (
        <View>
            <SectionList
                sections={events}
                renderItem={renderItem}
                style={{backgroundColor: "#FFF"}}
                initialNumToRender={10}
                renderSectionHeader={({section: {title}}) => (
                    <View style={{
                        flex: 1,
                        paddingTop: 16,
                        paddingBottom: 8,
                        paddingHorizontal: 16,
                        backgroundColor: "#FFF"
                    }}>
                        <Text style={{
                            color: "#545454",
                            fontSize: 16,
                            lineHeight: 21,
                            fontFamily: font,
                            fontWeight: "500"
                        }}>


                            {moment(new Date(title)).format('ddd, MMM DD')}


                        </Text>
                    </View>
                )}

                onRefresh={onRefresh}
                refreshing={isRefreshing}
                onEndReached={onLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
                contentContainerStyle={{}}
                keyExtractor={(item, index) => `event_${index.toString()}`}/>
        </View>
    );
};

EventList.navigationOptions = ({navigation}) => {
    return {
        title: `Events`
    }
};


const styles = StyleSheet.create({
    footerStyle: {
        position: 'relative',
        paddingVertical: 20,
        marginTop: 10,
        marginBottom: 10
    }
});