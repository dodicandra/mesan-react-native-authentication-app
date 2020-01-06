import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View, Image, Text} from 'react-native';

import * as api from "../service";
import {useEvent} from "../provider";

export default function EventList(props) {
    const {navigation} = props;
    const {navigate} = navigation;

    //1 - DECLARE VARIABLES
    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const { state, addEventsWithPaging } = useEvent();

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
            alert(error.message);
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
            <View style={{flex: 1, flexDirection: 'row', paddingVertical: 16, paddingHorizontal: 16}}>
                {/*<PanelItem {...article}/>*/}
                <Image source={{uri: item.image}} style={{width: 60, height: 90, marginRight: 12}}/>
                <View style={{flex:1, borderWidth:1}}>
                    <Text>{item.name}</Text>
                    <Text>{item.location}</Text>
                    <Text>{item.address}</Text>
                    <Text>{item.start_time}</Text>
                </View>
            </View>
        );
    };

    //==================================================================================================

    // 7 - RENDER FOOTER
    const renderFooter = () => {
        //if the events length is not less than the total result, dont display the footer
        if (!(events.length < totalResults)) return null;

        let footerStyle = {
            position: 'relative',
            paddingVertical: 20,
            marginTop: 10,
            marginBottom: 10
        };

        return (
            <View style={footerStyle}>
                <ActivityIndicator/>
            </View>
        );
    };

    //==================================================================================================

    // 8 - RENDER
    if (isFetching) return <ActivityIndicator style={{paddingVertical: 8}}/>;

    if (error) return <Error error={error} onRetry={getData}/>;

    return (
        <FlatList
            data={newsReducer[category]['articles']}
            renderItem={renderItem}
            numColumns={2}
            initialNumToRender={10}

            onRefresh={onRefresh}
            refreshing={isRefreshing}
            onEndReached={onLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            contentContainerStyle={{paddingHorizontal: 8}}
            keyExtractor={(item, index) => `event_${index.toString()}`}/>
    );
};

EventList.navigationOptions = ({navigation}) => {
    return {
        title: `Events`
    }
};

