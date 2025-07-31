import React, { useRef, useState } from 'react';
import {View, FlatList, Dimensions, Platform} from 'react-native';
// import Carousel, {Pagination} from 'react-native-reanimated-carousel';
import CarouselHomeItem from './CarouselHomeItem';
import data from '../../data/dataHomeScreen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Pagination from './Pagination';

const width = Dimensions.get("window").width;

const CarouselHome = () => {
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);

  const flatListRef = useRef(null);

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    // <View style={{flex: 1, resizeMode: 'center'}}>
    //   <Carousel
    //     layout="default"
    //     layoutCardOffset={0}
    //     ref={isCarousel}
    //     data={data}
    //     renderItem={CarouselHomeItem}
    //     sliderWidth={Platform.OS == 'ios' ? wp('100%') : 590}
    //     itemWidth={Platform.OS == 'ios' ? wp('95%') : 900}
    //     onSnapToItem={(index) => setIndex(index)}
    //     inactiveSlideShift={0}
    //     useScrollView={false}
    //   />
    //   <Pagination
    //     dotsLength={data.length}
    //     activeDotIndex={index}
    //     carouselRef={isCarousel}
    //     dotStyle={{
    //       width: wp('3%'),
    //       height: wp('3%'),
    //       borderRadius: wp('5%'),
    //       //   marginHorizontal: 0,
    //       marginVertical: 0,
    //       backgroundColor: 'rgba(0,50,0,0.7)',
    //     }}
    //     inactiveDotOpacity={0.4}
    //     inactiveDotScale={0.6}
    //     tappableDots={true}
    //   />
    // </View>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width }}>
    <FlatList
      ref={flatListRef}
      data={data}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => <CarouselHomeItem item={item} />}
      keyExtractor={(_, i) => i.toString()}
      onViewableItemsChanged={onViewRef.current}
      viewabilityConfig={viewConfigRef.current}
      getItemLayout={(_, i) => ({
        length: width,
        offset: width * i,
        index: i,
      })}
    />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: wp('3%'),
          height: wp('3%'),
          borderRadius: wp('5%'),
          marginVertical: 0,
          backgroundColor: 'rgba(0,50,0,0.7)',
          marginTop: 25,
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </View>
  );
};

export default CarouselHome;
