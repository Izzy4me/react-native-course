import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = props => {
    return <TextInput {...props} style={{...styles.input, ...props.style}} />
};
// by {...props} we forwarded all props to this build-in component, not just stylying one

const styles = StyleSheet.create({
    input: {
        height: 30,
        borderBottomWidth: 2,
        borderBottomColor: 'grey',
        marginVertical: 10
    }
});

export default Input;