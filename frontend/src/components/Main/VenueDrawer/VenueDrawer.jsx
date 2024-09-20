import React from "react";
import SortPopover from "./SortPopOver/SortPopOver";
import {
    Button,
    // Input,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    // DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure
} from '@chakra-ui/react' // Drawer
import { LinkBox, LinkOverlay, Text, Heading, Box, Image } from '@chakra-ui/react' // Link Overlay for Multiple Events

export default function VenueDrawer(props) {
    const { onClose } = useDisclosure()
    const btnRef = React.useRef()
    const big = window.innerWidth > 1200
    const color = "#FDDA0D"


    return (
        <Drawer
            isOpen={props.venue}
            placement={big ? 'right' : 'bottom'}
            onClose={props.onClose}
            finalFocusRef={btnRef}
            size={big ? "lg" : "xs"}
        >
            {/* <DrawerOverlay /> -> lowers the map's brightness*/}
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader fontSize="2em" color={color}>Λίστα Γεγονότων</DrawerHeader>
                {!props.venue || !Array.isArray(props.venue.groups) ? console.log(props.venue) :
                    <DrawerBody>
                        {
                            props.venue.groups.map(group => (
                                <LinkBox onClick={() => props.handleEventClick(group)} as='article' maxW='100%' p='5' mb='10px' borderWidth='2px' boxShadow="md" rounded='md'>
                                    <Box as='time' dateTime='2021-01-15 15:30:00 +0000 UTC'>
                                        {group.event_date}
                                    </Box>
                                    <Heading size='md' my='2' color="#805AD5">
                                        <LinkOverlay href='#'>
                                            {group.event_title}
                                        </LinkOverlay>
                                    </Heading>
                                    <Text>
                                        {group.event_description}
                                    </Text>

                                </LinkBox>
                            ))
                        }
                    </DrawerBody >
                }

                <DrawerFooter>
                    <Button variant='outline' mr={3} onClick={props.onClose}>
                        Πίσω
                    </Button>
                    <SortPopover colorscheme="yellow" />
                </DrawerFooter>
            </DrawerContent >
        </Drawer >
    )
}