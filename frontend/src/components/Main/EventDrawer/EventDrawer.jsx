/* eslint-disable react/no-unescaped-entities */
import React from "react";
import "./EventDrawer.css";
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
import { SimpleGrid } from '@chakra-ui/react' // Info Layout


export default function EventDrawer(props) {
    const { onClose } = useDisclosure()
    const btnRef = React.useRef()
    const big = window.innerWidth > 1200
    const color = "#805AD5"
    const colorscheme = "purple"
    // console.log(props.event.distance)


    return !props.event ? console.log(props.event) : (
        <Drawer
            isOpen={props.event}
            placement={big ? 'right' : 'bottom'}
            onClose={props.onClose}
            finalFocusRef={btnRef}
            size={big ? "lg" : "xs"}
        >
            {/* <DrawerOverlay /> -> lowers the map's brightness*/}
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader fontSize="2em" color={color}>Γεγονός</DrawerHeader>

                <DrawerBody>
                    <LinkBox as='article' maxW='100%' p='5' mb='10px' borderWidth='2px' boxShadow="md" rounded='md'>
                        <Box as='time' dateTime='2021-01-15 15:30:00 +0000 UTC'>
                            {props.event.event_date}
                        </Box>
                        <Heading size='md' my='2'>
                            <LinkOverlay href='#'>
                                {props.event.event_title}
                            </LinkOverlay>
                        </Heading>
                        <Box w="100%" h="50%" mb="3">
                            <Image rounded="md" src={`https://www.more.com${props.event.event_thumbnail_url}`} width="100%" height="300" alt="event thumbnail" />
                        </Box>
                        <Text>
                            {props.event.event_description}
                        </Text>

                        <SimpleGrid mt="4" minChildWidth='200px' spacing='40px'>
                            <Box boxShadow="xl" border={`1px solid ${color}`} rounded="base" backdropFilter='auto' backdropBlur='8px' background="#fafafa" height='80px' p="2" color="black">
                                <div className="grid--box">
                                    <Text>Τοποθεσία</Text>
                                    <Text color={color} className="grid--info" fontSize="1.55rem" pt="0.5rem" fontWeight="600">{props.event.event_location}</Text>
                                </div>

                            </Box>
                            <Box boxShadow="xl" border={`1px solid ${color}`} rounded="base" backdropFilter='auto' backdropBlur='8px' background="#fafafa" height='80px' p="2" color="black">
                                <div className="grid--box">
                                    <Text>Απόσταση</Text>
                                    <Text color={color} className="grid--info" fontSize="1.55rem" pt="0.5rem" fontWeight="600">{props.event.distance} χλμ.</Text>
                                </div>

                            </Box>
                            <Box boxShadow="xl" border={`1px solid ${color}`} rounded="base" backdropFilter='auto' backdropBlur='8px' background="#fafafa" height='80px' p="2" color="black">
                                <div className="grid--box">
                                    <Text>Διάρκεια</Text>
                                    <Text color={color} className="grid--info" fontSize="1.55rem" pt="0.5rem" fontWeight="600">{props.event.duration}'</Text>
                                </div>

                            </Box>
                            <Box boxShadow="xl" border={`1px solid ${color}`} rounded="base" backdropFilter='auto' backdropBlur='8px' background="#fafafa" height='80px' p="2" color="black">
                                <div className="grid--box">
                                    <Text>Διοργανωτής</Text>
                                    <Text color={color} className="grid--info" style={{ overflow: "none" }} overflow="scroll" fontSize="1.55rem" pt="0.5rem" fontWeight="600">{props.event.producer_name}</Text>
                                </div>

                            </Box>
                            {/* <Box boxShadow="xl" border={`1px solid ${color}`} rounded="base" backdropFilter='auto' backdropBlur='8px' background="#fafafa" height='80px' p="2" color="black">
                                <div className="grid--box">
                                    <Text>Εισιτήρια</Text>
                                    <Text color={color} className="grid--info" fontSize="1.55rem" pt="0.5rem" fontWeight="600"><a className="grid--link" href="">more.com</a></Text>
                                </div>

                            </Box>
                            <Box boxShadow="xl" border={`1px solid ${color}`} rounded="base" backdropFilter='auto' backdropBlur='8px' background="#fafafa" height='80px' p="2" color="black">
                                <div className="grid--box">
                                    <Text>Οδηγίες</Text>
                                    <Text color={color} className="grid--info" fontSize="1.55rem" pt="0.5rem" fontWeight="600"><a className="grid--link" href="">Εδώ</a></Text>
                                </div>

                            </Box> */}
                        </SimpleGrid>
                    </LinkBox>
                </DrawerBody >
                <DrawerFooter>
                    <Button variant='outline' mr={3} onClick={props.onClose}>
                        Πίσω
                    </Button>
                    <a href={`https://maps.google.com/?q=${props.event.latitude},${props.event.longitude}`}><Button mr="var(--chakra-space-3)" colorScheme={colorscheme}>Οδηγίες</Button></a>
                    <a href={`https://more.com/${props.event.event_url}`}><Button colorScheme={colorscheme}>Εισιτήρια</Button></a>
                </DrawerFooter>
            </DrawerContent >
        </Drawer >

    )

}
