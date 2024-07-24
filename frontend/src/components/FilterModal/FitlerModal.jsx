import { Button, Stack, ModalOverlay, useDisclosure, Modal, ModalBody, ModalHeader, ModalCloseButton, ModalFooter, Text, ModalContent } from "@chakra-ui/react"
import { FaFilter } from "react-icons/fa";
import { useState } from "react"

import EventCheckbox from "./EventCheckbox";

export default function FilterModal() {

    const Overlay = () => (
        <ModalOverlay
            bg='none'
            backdropFilter='auto'
            backdropInvert='80%'
            backdropBlur='2px'
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = useState(<Overlay />)

    return (
        <>
            <Button
                leftIcon={<FaFilter />} onClick={() => {
                    setOverlay(<Overlay />)
                    onOpen()
                }} colorScheme='purple' variant='outline'>
                Φίλτρο
            </Button>
            <Modal size="xl" isCentered isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader>Επιλέξτε Φίλτρο</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <EventCheckbox />
                    </ModalBody>
                    <ModalFooter>
                        <Stack direction="row" pl={6} mt={1} spacing={3}>
                            <Button variant="outline">Ακύρωση</Button>
                            <Button colorScheme="purple">Εφαρμογή</Button>
                        </Stack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}