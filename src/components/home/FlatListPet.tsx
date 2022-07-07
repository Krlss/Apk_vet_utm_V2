import React from 'react'
import {View, Text, Image, Dimensions, SectionList} from 'react-native'

const PetsLost = [
  {
    name: 'Pablo',
    id: 'MAA-0001',
    url: 'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_3x4.jpg',
    age: '1 año',
    breed: 'Labrador',
  },
  {
    name: 'Corina',
    id: 'MAA-0002',
    url: 'https://kb.rspca.org.au/wp-content/uploads/2018/11/golder-retriever-puppy.jpeg',
    age: '1 año',
    breed: 'Retriever',
  },
  {
    name: 'Pepito',
    id: 'MAA-0003',
    url: 'https://th-thumbnailer.cdn-si-edu.com/SdKYWifCKfE2g8O-po_SO99hQ-Y=/1000x750/filters:no_upscale():focal(3126x2084:3127x2085)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/ec/e6/ece69181-708a-496e-b2b7-eaf7078b99e0/gettyimages-1310156391.jpg',
    age: '1 año',
    breed: 'Labrador',
  },
  {
    name: 'Pepa',
    id: 'MAA-0004',
    url: 'https://static.wixstatic.com/media/1b5818_203d9ee229df4b929961e36e0c8a0362~mv2.jpg/v1/fill/w_640,h_520,al_r,q_80,usm_0.66_1.00_0.01,enc_auto/1b5818_203d9ee229df4b929961e36e0c8a0362~mv2.jpg',
    age: '1 año',
    breed: 'Labrador',
  },
  {
    name: 'Flocky',
    id: 'MAA-0005',
    url: 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/streams/2013/May/130522/6C7536084-g-hlt-120105-puppy-423p.jpg',
    age: '1 año',
    breed: 'Labrador',
  },
  {
    name: 'Pepa',
    id: 'MAA-0006',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAbe5N5cK3zRLbUcAv-oowk7u__vtVMbiZpw&usqp=CAU',
    age: '1 año',
    breed: 'Labrador',
  },
  {
    name: 'Pepa',
    id: 'MAA-0006',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAbe5N5cK3zRLbUcAv-oowk7u__vtVMbiZpw&usqp=CAU',
    age: '1 año',
    breed: 'Labrador',
  },
]

const FlatListPet = () => {
  const {height} = Dimensions.get('window')
  return (
    <View style={{flex: 1}}>
      <SectionList
        sections={[{title: 'Perdidos', data: PetsLost}]}
        renderItem={({item}) => (
          <View
            style={{
              height: height * 0.2,
              backgroundColor: '#fff',
              marginBottom: 10,
            }}>
            <Image
              source={{uri: item.url}}
              style={{width: '100%', height: '100%'}}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
              }}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
                {item.name}
              </Text>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                {item.breed}
              </Text>
            </View>
          </View>
        )}
        renderSectionHeader={({section}) => (
          <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 10}}>
            {section.title}
          </Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}
export default FlatListPet
