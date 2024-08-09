/* eslint-disable react/no-unescaped-entities */
import React from "react";
import "./EventDrawer.css";
import SortPopover from "./SortPopOver/SortPopOver";
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    LinkBox,
    LinkOverlay,
    Text,
    Heading,
    Box,
    Image,
    SimpleGrid,
} from '@chakra-ui/react';

export default function EventDrawer(props) {
    const { isOpen, onClose } = useDisclosure(); // Removed unnecessary onOpen and btnRef
    const big = window.innerWidth > 1200; // Determine if the screen is large
    const color = props.events ? "#FDDA0D" : "#805AD5"; // Conditional color for different events
    const colorscheme = props.events ? "yellow" : "purple"; // Conditional color scheme for buttons

    function renderEvent() { // Removed props as a parameter here because the function accesses props directly
        if (!props.events) { // Single event case
            return (
                <LinkBox as='article' maxW='100%' p='5' mb='10px' borderWidth='2px' boxShadow="md" rounded='md'>
                    <Box as='time' dateTime='2021-01-15 15:30:00 +0000 UTC'>
                        Date (Σε ... ημέρες)
                    </Box>
                    <Heading size='md' my='2'>
                        <LinkOverlay href='#'>
                            PRIMER Music Festival 2024
                        </LinkOverlay>
                    </Heading>
                    <Box w="100%" h="50%" mb="3">
                        <Image rounded="md" src="https://more.com/getattachment/A1DD653F-B546-4804-8A91-7C04BEA3AB17/evg_primermusicfestival2024_1125_3067.png" alt="example" />
                    </Box>
                    <Text>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta earum aliquam pariatur explicabo quo voluptatum sequi deleniti amet incidunt, vitae corrupti libero? Adipisci eius repellendus beatae aspernatur laborum nam quia!
                    </Text>

                    <SimpleGrid mt="4" minChildWidth='200px' spacing='40px'>
                        <Box boxShadow="xl" border={`1px solid ${color}`} rounded="base" backdropFilter='auto' backdropBlur='8px' background="#fafafa" height='80px' p="2" color="black">
                            <div className="grid--box">
                                <Text>Τοποθεσία</Text>
                                <Text color={color} className="grid--info" fontSize="1.55rem" pt="0.5rem" fontWeight="600">Αθήνα</Text>
                            </div>
                        </Box>
                        <Box boxShadow="xl" border={`1px solid ${color}`} rounded="base" backdropFilter='auto' backdropBlur='8px' background="#fafafa" height='80px' p="2" color="black">
                            <div className="grid--box">
                                <Text>Απόσταση</Text>
                                <Text color={color} className="grid--info" fontSize="1.55rem" pt="0.5rem" fontWeight="600">3.5χλμ</Text>
                            </div>
                        </Box>
                        <Box boxShadow="xl" border={`1px solid ${color}`} rounded="base" backdropFilter='auto' backdropBlur='8px' background="#fafafa" height='80px' p="2" color="black">
                            <div className="grid--box">
                                <Text>Διάρκεια</Text>
                                <Text color={color} className="grid--info" fontSize="1.55rem" pt="0.5rem" fontWeight="600">120'</Text>
                            </div>
                        </Box>
                        <Box boxShadow="xl" border={`1px solid ${color}`} rounded="base" backdropFilter='auto' backdropBlur='8px' background="#fafafa" height='80px' p="2" color="black">
                            <div className="grid--box">
                                <Text>Διοργανωτής</Text>
                                <Text color={color} className="grid--info" overflow="scroll" fontSize="1.55rem" pt="0.5rem" fontWeight="600">CANDY KANE EVENTS IKE</Text>
                            </div>
                        </Box>
                    </SimpleGrid>
                </LinkBox>
            );
        } else { // Multiple events case
            return (
                <LinkBox as='article' maxW='100%' p='5' mb='10px' borderWidth='2px' boxShadow="md" rounded='md'>
                    <Box as='time' dateTime='2021-01-15 15:30:00 +0000 UTC'>
                        Date (Σε ... ημέρες)
                    </Box>
                    <Heading size='md' my='2' color="#805AD5">
                        <LinkOverlay href='#'>
                            PRIMER Music Festival 2024
                        </LinkOverlay>
                    </Heading>
                    <Text>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta earum aliquam pariatur explicabo quo voluptatum sequi deleniti amet incidunt, vitae corrupti libero? Adipisci eius repellendus beatae aspernatur laborum nam quia!
                    </Text>
                </LinkBox>
            );
        }
    }

    function renderButtons() { // Similarly, removed props as a parameter
        if (!props.events) { // Single event buttons
            return (
                <>
                    <Button mr="var(--chakra-space-3)" onClick={() => console.log("google maps redirect")} colorScheme={colorscheme}>Οδηγίες</Button>
                    <Button onClick={() => console.log("more.com redirect")} colorScheme={colorscheme}>Εισιτήρια</Button>
                </>
            );
        } else { // Multiple events button
            return (
                <>
                    <SortPopover colorscheme={colorscheme} />
                </>
            );
        }
    }

    return (
        <Drawer
            isOpen={props.isOpen} // Controlled by parent
            placement={big ? 'right' : 'bottom'}
            onClose={onClose}
            size={big ? "lg" : "xs"}
        >
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader fontSize="2em" color={color}>{props.events ? "Λίστα Γεγονότων" : "Γεγονός"}</DrawerHeader>
                <DrawerBody>
                    {renderEvent()} {/* Removed passing props to internal functions */}
                </DrawerBody>
                <DrawerFooter>
                    <Button variant='outline' mr={3} onClick={onClose}>
                        Πίσω
                    </Button>
                    {renderButtons()} {/* Removed passing props to internal functions */}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
