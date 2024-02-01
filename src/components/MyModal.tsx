'use client'

import {
  Modal,
  ModalOverlay
} from '@chakra-ui/react'
import { ReactNode } from 'react'

export default function MyModal({ isOpen, onClose, onOpen, children }: { isOpen: boolean, onClose: () => void, onOpen: () => void, children: ReactNode }) {
  return (
    <>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        {children}
      </Modal>
    </>
  )
}