import React from 'react';

import { ActivityIndicator } from 'react-native';
import { Center } from 'native-base';

const LoadingData = (props) => {
    return (
        <Center h="100%" backgroundColor="#F6F8FA">
            <ActivityIndicator size="large" color="#452CB1" />
        </Center>
    );
};

export default LoadingData;
