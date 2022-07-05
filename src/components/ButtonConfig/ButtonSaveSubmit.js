import React from 'react'
import { TouchableOpacity, ActivityIndicator } from 'react-native'
import { Text } from 'native-base'

const ButtonSaveSubmit = ({ onPress, isLoading, _loading }) => {
    if (isLoading) {
        return <ActivityIndicator {..._loading} />
    }
    return (
        <TouchableOpacity onPress={onPress}>
            <Text color="primary.700" fontWeight="bold" fontSize="16">
                Save
            </Text>
        </TouchableOpacity>
    )
}

export default ButtonSaveSubmit
