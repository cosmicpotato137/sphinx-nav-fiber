import { Button } from '@mui/material'
import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'
import styled from 'styled-components'
import CopyIcon from '~/components/Icons/CopyIcon'
import NotesIcon from '~/components/Icons/NotesIcon'
import { Flex } from '~/components/common/Flex'
import { useAppStore } from '~/stores/useAppStore'
import { NodeExtended } from '~/types'
import { colors } from '~/utils/colors'
import CheckIcon from '../../../Icons/CheckIcon'

type TranscriptProps = {
  stateless?: boolean
  node: NodeExtended | null
}

export const Transcript = ({ stateless, node }: TranscriptProps) => {
  const [transcriptIsOpen, setTranscriptOpen] = useAppStore((s) => [s.transcriptIsOpen, s.setTranscriptOpen])

  const [isCopied, setIsCopied] = useState(false)

  if (!stateless && !transcriptIsOpen) {
    return null
  }

  const copyNodeText = (text: string | undefined) => {
    if (text === undefined) {
      return
    }

    navigator.clipboard.writeText(text)
    setIsCopied(true)
  }

  return (
    <Flex grow={1} shrink={1}>
      <Header>
        {stateless && (
          <Heading>
            <div className="icon">
              <NotesIcon />
            </div>
            <div className="title">Transcript</div>
          </Heading>
        )}

        {node?.text ? (
          <>
            {!isCopied ? (
              <Button
                endIcon={<CopyIcon />}
                onPointerDown={() => copyNodeText(node?.text)}
                size="small"
                variant="outlined"
              >
                Copy
              </Button>
            ) : (
              <CopiedButton align="center" direction="row" justify="flex-start">
                <div className="icon">
                  <CheckIcon />
                </div>
                <div className="text">Copied</div>
              </CopiedButton>
            )}
          </>
        ) : (
          <div />
        )}

        {!stateless && (
          <CloseButton
            onClick={() => {
              setTranscriptOpen(false)
            }}
          >
            <MdClose fontSize={35} />
          </CloseButton>
        )}
      </Header>
      <Box>{node?.text ? `"${node?.text}"` : '...'}</Box>
    </Flex>
  )
}

const Heading = styled(Flex).attrs({
  direction: 'row',
  align: 'center',
})`
  .icon {
    font-size: 16px;
    color: ${colors.GRAY3};
    margin-right: 7px;
  }

  .title {
    color: ${colors.white};
    font-family: Barlow;
    font-size: 10px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
`

const Header = styled(Flex).attrs({
  direction: 'row',
  align: 'center',
  justify: 'space-between',
})`
  margin-bottom: 18px;
`

const CloseButton = styled(Flex).attrs({})`
  color: ${colors.mainBottomIcons};
  cursor: pointer;
  &:hover {
    color: ${colors.lightBlue500};
  }
`

const Box = styled(Flex)`
  color: ${colors.white};
  text-overflow: ellipsis;
  whitespace: nowrap;
  font-family: Barlow;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
`

const CopiedButton = styled(Flex)`
  color: ${colors.SECONDARY_BLUE};
  font-family: Barlow;
  font-size: 13px;
  font-weight: 500;
  height: 28px;
  padding: 0 20px;
  .text {
    margin-left: 5px;
  }

  .icon {
    font-size: 12px;
  }
`
