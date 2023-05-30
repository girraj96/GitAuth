import { Animated, Dimensions, PanResponder, StyleSheet, Text, View } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
const { height, width } = Dimensions.get('window')

const CardCom = ({ item = {}, index, onSwipeUp = () => { }, heightIn, }) => {
    const [back, setBack] = useState(false)//<------------this is use for reset the animation hold value
    const card_Width = width - 40;//<------------------ this is a card width
    const side = card_Width / 1.9;//<------------------ this is use for a action triger sides when card go left or right

    const swipeGesture = useRef(new Animated.ValueXY()).current//<----------This is use for a holding a animation states

    // this is use for reset the animation hold value
    useEffect(() => {
        swipeGesture.setValue({ x: 0, y: 0 });
        setBack(false)
    }, [!!back])
    // --------------- this is use for a card swip gesture animation----------
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderMove: (e, gestureState) => {
            swipeGesture.setValue({ x: heightIn ? 0 : gestureState.dx, y: 0 });
        },
        onPanResponderGrant: (evt, gestureState) => false,
        onPanResponderRelease: (evt, gestureState) => {
            if (gestureState.dx > side) {
                onSwipeUp(false, item, index);
                setBack(true)

            } else if (gestureState.dx < -side) {
                onSwipeUp(true, item, index);
                setBack(true)

            } else {
                Animated.spring(swipeGesture, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: true,
                }).start();
            }
        },
        onPanResponderTerminationRequest: (evt, gestureState) =>
            true,
        onPanResponderTerminate: (evt, gestureState) => {
            console.log(evt?.cancelable, 'evtevtevt');
        }
    })

    // -----------------this is use for swip rotate animation 
    const rotate = swipeGesture.x.interpolate({
        inputRange: [-card_Width / 2, 0, card_Width / 2],
        outputRange: ['-10deg', '0deg', '10deg'],
        extrapolate: 'clamp',
    });
    return (
        <Animated.View
            pointerEvents={heightIn ? 'box-none' : 'box-only'}
            style={styles.cardView(heightIn, swipeGesture, rotate)}
            {...panResponder.panHandlers}
        >
            <Text>{item.id}</Text>
        </Animated.View>
    )
}

export default memo(CardCom)

const styles = StyleSheet.create({
    cardView: (heightIn, swipeGesture, rotate) => ({
        height: heightIn ? '96%' : '80%',
        width: width - 40,
        backgroundColor: 'white',
        elevation: 10,
        position: 'absolute',
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        transform: [...swipeGesture.getTranslateTransform(), { rotate: rotate }]
    })
})