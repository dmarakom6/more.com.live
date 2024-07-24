import {
    Checkbox, Stack
} from "@chakra-ui/react"
import { useState } from "react"

export default function EventCheckbox() {
    const [checkedItems, setCheckedItems] = useState([true, true])

    const allChecked = checkedItems.every(Boolean)
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked

    return (
        <>
            <Checkbox
                size="lg"
                isChecked={allChecked}
                isIndeterminate={isIndeterminate}
                onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
                defaultChecked
            >
                Όλα
            </Checkbox>
            <Stack pl={6} mt={1} spacing={1}>
                <Checkbox
                    size="lg"
                    colorScheme="purple"
                    isChecked={checkedItems[0]}
                    onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
                >
                    Ένα Γεγονός
                </Checkbox>
                <Checkbox
                    size="lg"
                    colorScheme="yellow"
                    isChecked={checkedItems[1]}
                    onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
                >
                    Πολλαπλά Γεγονότα
                </Checkbox>
            </Stack>
        </>
    )
}