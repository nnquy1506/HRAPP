import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'

export const useAlert = () => {
    const { t } = useTranslation()

    const showAlertNotification = ({
        title,
        message,
        txtSubmit,
        callbackSubmit,
        options,
    }) => {
        Alert.alert(
            title || '',
            message || '',
            [
                {
                    text: txtSubmit || t('common.ok'),
                    onPress: callbackSubmit,
                },
            ],
            options
        )
    }
    const showAlertConfirm = ({
        title,
        message,
        txtSubmit,
        callbackSubmit,
        txtCancel,
        callbackCancel,
        options,
        styleTxtSubmit,
    }) => {
        Alert.alert(
            title || '',
            message || '',
            [
                {
                    text: txtSubmit || t('common.ok'),
                    onPress: callbackSubmit,
                    style: styleTxtSubmit || null,
                },
                {
                    text: txtCancel || t('common.cancel'),
                    onPress: callbackCancel,
                    style: 'cancel',
                },
            ],
            options
        )
    }

    return {
        showAlertNotification,
        showAlertConfirm,
    }
}
