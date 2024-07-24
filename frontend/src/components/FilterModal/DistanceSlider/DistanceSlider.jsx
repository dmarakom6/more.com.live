import {
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    Text
} from '@chakra-ui/react'

import { useState } from "react"

export default function DistanceSlider() {
    const [sliderValues, setSliderValues] = useState([10, 30]); // initial values can be adjusted

    const handleSliderChangeEnd = (val) => {
        setSliderValues(val);
        // console.log(val);
    };

    return (
        <>
            <Text fontSize="1.15rem">Απόσταση | Από <b style={{ color: "#805AD5" }}>{sliderValues[0]}χλμ</b> Μέχρι <b style={{ color: "#805AD5" }}>{sliderValues[1]}χλμ</b></Text>
            <RangeSlider
                aria-label={['min', 'max']}
                onChangeEnd={handleSliderChangeEnd}
                defaultValue={sliderValues}
                min={0} // minimum value can be adjusted
                max={100} // maximum value can be adjusted
            >
                <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
            </RangeSlider>

        </>
    );
}