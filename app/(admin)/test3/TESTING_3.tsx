'use client'
import {useStoreSlideover} from "../../../src/store";
import {shallow} from "zustand/shallow";
import SlideOver from "../../../components/product_views/SlideOver";

export default function Testing3() {
    const updateSlideover = useStoreSlideover(
        (state) => state.updateOpen,
        shallow
    )

    return (
        <>
            <button onClick={() => updateSlideover(true)}>OPENNN</button>
            <SlideOver/>
        </>
    )
}