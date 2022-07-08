import { useState } from 'react';
import MultipleImagePicker, {
    Results,
} from '@baronha/react-native-multiple-image-picker'
import { options } from '@src/constants/multiple-image-picker'

const useReport = () => {
    const [currentPosition, setCurrentPosition] = useState(0)
    const [filePath, setFilePath] = useState<Results[]>()

    const chooseFile = async () => {
        const response = await MultipleImagePicker.openPicker({ ...options, selectedAssets: filePath })
        if (response) {
            setFilePath(response)
        } else {
            setFilePath([])
        }
    }

    const nextPosition = () => {
        setCurrentPosition(currentPosition + 1)
    }

    const prevPosition = () => {
        setCurrentPosition(currentPosition - 1)
    }

    return {
        currentPosition, filePath,
        nextPosition,
        prevPosition,
        chooseFile,
    }
}

export default useReport;
