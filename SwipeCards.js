import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import SwipeCards from 'react-native-swipe-cards';

class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.card}>
                <Image style={styles.thumbnail} source={{uri: this.props.image}} />
                <Text style={styles.text}>{this.props.name}</Text>
            </View>
        )
    }
}

class NoMoreCards extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.noMoreCards}>
                <Text>No more cards</Text>
            </View>
        )
    }
}

const cards = [
    {name: '桐谷美玲', image: 'http://crispy-trend.net/wp-content/uploads/2017/06/4b9b924530cbb466f0cb76229c94b025-e1498700772676.jpg'},
    {name: '佐々木希', image: 'https://www.j-cast.com/trend/assets_c/2015/08/trend_20150831182844-thumb-645xauto-71432.jpg'},
    {name: '石原さとみ', image: 'https://i0.wp.com/free-style-info.com/wp-content/uploads/2017/05/yamap_ishihara002-20170511.jpg?fit=300%2C312&ssl=1'},
]

const cards2 = [
    {name: '桐谷美玲', image: 'http://crispy-trend.net/wp-content/uploads/2017/06/4b9b924530cbb466f0cb76229c94b025-e1498700772676.jpg'},
    {name: '石原さとみ', image: 'https://i0.wp.com/free-style-info.com/wp-content/uploads/2017/05/yamap_ishihara002-20170511.jpg?fit=300%2C312&ssl=1'},
]

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: cards,
            outOfCards: false
        }
    }

    handleYup (card) {
        console.log("yup")
    }

    handleNope (card) {
        console.log("nope")
    }

    cardRemoved (index) {
        console.log(`The index is ${index}`);

        let CARD_REFRESH_LIMIT = 3

        if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
            console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);

            if (!this.state.outOfCards) {
                console.log(`Adding ${cards2.length} more cards`)

                this.setState({
                    cards: this.state.cards.concat(cards2),
                    outOfCards: true
                })
            }

        }

    }

    render() {
        return (
            <SwipeCards
                cards={this.state.cards}
                loop={false}

                renderCard={(cardData) => <Card {...cardData} />}
                renderNoMoreCards={() => <NoMoreCards />}
                showYup={true}
                showNope={true}

                handleYup={this.handleYup}
                handleNope={this.handleNope}
                cardRemoved={this.cardRemoved.bind(this)}
            />
        )
    }
}

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        borderRadius: 5,
        overflow: 'hidden',
        borderColor: 'grey',
        backgroundColor: 'white',
        borderWidth: 1,
        elevation: 1,
    },
    thumbnail: {
        width: 300,
        height: 300,
    },
    text: {
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    noMoreCards: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})