import React, {useState} from 'react'
import ImageViewer from 'react-native-image-zoom-viewer'
import ArrowBack from '@src/assets/icon/arrow-back.svg'
import {
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  TouchableOpacity,
  View,
} from 'react-native'
import {Results} from '@baronha/react-native-multiple-image-picker'

interface IProps {
  filePath?: Results[]
}

const Photos = ({filePath}: IProps) => {
  const [indexImage, setIndexImage] = useState(0)
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <ScrollView>
        {filePath && filePath.length > 0 && (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {filePath.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => {
                  setIndexImage(index)
                  setShowModal(true)
                }}>
                <View style={{margin: 5}}>
                  <Image
                    source={{uri: item.path}}
                    style={{width: 125, height: 125}}
                  />
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        )}
      </ScrollView>
      <Modal animationType="fade" transparent={true} visible={showModal}>
        <ImageViewer
          imageUrls={filePath?.map(item => ({
            url: item.path,
          }))}
          enableSwipeDown={true}
          pageAnimateTime={300}
          index={indexImage}
          onSwipeDown={() => setShowModal(false)}
          renderHeader={() => (
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={{
                padding: 20,
                marginTop: 20,
                position: 'absolute',
                zIndex: 1,
              }}>
              <ArrowBack fill={'#fff'} width={20} height={20} />
            </TouchableOpacity>
          )}
        />
      </Modal>
    </>
  )
}

export default Photos
