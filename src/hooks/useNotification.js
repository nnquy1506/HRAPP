import React from 'react'
import { useToast, Text } from 'native-base'

export const useNotification = () => {
    const toast = useToast()

    const showErrorNotification = (message, options) => {
        toast.show({
            placement: 'top',
            status: 'error',
            title: <Text>{message || "Có lỗi xảy ra!"}</Text>,
            isClosable: true,
            ...options,
        })
    }
    const showSuccessNotification = (message, options) => {
        toast.show({
            placement: 'top',
            status: 'success',
            title: <Text>{message || "Có lỗi xảy ra!"}</Text>,
            isClosable: true,
            ...options,
        })
    }

    return {
        showErrorNotification,
        showSuccessNotification,
    }
}
