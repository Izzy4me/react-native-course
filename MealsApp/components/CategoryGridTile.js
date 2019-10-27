import React from 'react';
import {
    TouchableOpacity,
    TouchableNativeFeedback,
    View,
    Text,
    StyleSheet,
    Platform
} from 'react-native';

const CategoryGridTile = props => {
    return (
        <View style={styles.gridItem}>
            <TouchableNativeFeedback
                style={{flex: 1}} // I think it will be ok without this
                onPress={props.onSelect}
            >
                {/* Merging with container flex style */}
                <View style={{...styles.container, ...{backgroundColor: props.color}}}>
                    <Text style={styles.title} numberOfLines={2}>{props.title}</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        borderRadius: 10,
        overflow: Platform.OS === 'android' && Platform.Version >= 21
            ? 'hidden'
            : 'visible',
        elevation: 5
    },
    container: {
        flex: 1,
        borderRadius: 10,
        elevation: 3,
        padding: 10,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
    }
});

export default CategoryGridTile;
