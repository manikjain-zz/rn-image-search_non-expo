import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Image, Dimensions, ActivityIndicator } from 'react-native';
import axios from 'axios';

const { width } = Dimensions.get('window');
const equalWidth = (width / 3.3);

export default class Images extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            loading: false,
            page: 1
        }
    }

    static navigationOptions =
        {
            title: 'Search Results',
            headerStyle: {
                backgroundColor: '#FFC107'
            },
            headerTintColor: '#fff',
        };

    componentDidMount() {
        this.getImages();
    }

    getImages() {
        const query = this.props.navigation.getParam('searchQuery', 'nothing');
        const { page } = this.state;
        this.setState({ loading: true });
        setTimeout(() => {
            axios({
                url: 'https://api.shutterstock.com/v2/images/search',
                headers: { 'content-type': 'application/json' },
                auth: { username: CLIENT_ID, password: CLIENT_SECRET },
                params: {
                    query: query,
                    page: page,
                    per_page: '40'
                }
            })
                .then(res => {
                    let imageData = res.data.data;
                    this.setState({
                        images: [...this.state.images, ...imageData],
                        loading: false,
                    })
                })
                .catch(error => {
                    console.log(error);
                });
        }, 1500);
    }

    getMoreImages = () => {
        this.setState(
            {
                page: this.state.page + 1,
            }, () => this.getImages());
        console.log(this.state);
    }

    _keyExtractor = (item, index) => item.id;

    renderFooter = () => {
        if (!this.state.loading) return null;
        return (
            <View style={{ paddingVertical: 20, borderTopWidth: 1, borderTopColor: "#CED0CE" }}>
                <ActivityIndicator animating size="large" />
            </View>
        )
    }

    render() {
        if (this.state.loading && this.state.page === 1) {
            return (
                <View style={{ paddingVertical: 20, borderTopWidth: 1, borderTopColor: "#CED0CE" }}>
                    <ActivityIndicator animating size="large" />
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <FlatList
                        data={this.state.images}
                        numColumns={3}
                        keyExtractor={this._keyExtractor}
                        renderItem={({ item }) => (
                            <View style={{ padding: 5 }}>
                                <Image
                                    style={{ height: 100, width: equalWidth }}
                                    source={{ uri: item.assets.huge_thumb.url }}
                                    resizeMode='cover'
                                />
                            </View>
                        )}
                        ListFooterComponent={this.renderFooter}
                        onEndReached={this.getMoreImages}
                        onEndReachedThreshold={60}
                    />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        flexDirection: 'column',
        marginVertical: 5,
        margin: 5,
        alignItems: 'center'
    }
});
