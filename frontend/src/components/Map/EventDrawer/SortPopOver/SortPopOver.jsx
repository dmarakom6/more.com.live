import "./SortPopover.css"

import {
    Popover,
    PopoverTrigger,
    Button,
    PopoverContent,
    PopoverHeader,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody,
    Select
} from '@chakra-ui/react'


export default function SortPopover(props) {
    return (
        <Popover placement='top-start'>
            <PopoverTrigger>
                <Button colorScheme={props.colorscheme}>Ταξινόμηση</Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverHeader fontWeight='semibold'>Επιλέξτε Ταξινόμηση</PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                    <div className="select">
                        <h2>Κατά</h2>
                        <Select bg="#805AD5" color="white" placeholder='Ημερομηνία'>
                            <option value='option1'>Όνομα</option>
                            <option value='option2'>Απόσταση</option>
                        </Select>
                    </div>
                    <div className="select">
                        <h2>Σειρά</h2>
                        <Select bg="#805AD5" color="white" placeholder='Φθίνουσα'>
                            <option value='option1'>Αύξουσα</option>
                        </Select>
                    </div>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}