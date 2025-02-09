import { Slide } from '@mui/material'
import styled from 'styled-components'
import ChevronLeftIcon from '~/components/Icons/ChevronLeftIcon'
import CloseIcon from '~/components/Icons/CloseIcon'
import { Flex } from '~/components/common/Flex'
import { useAppStore } from '~/stores/useAppStore'
import { useDataStore } from '~/stores/useDataStore'
import { colors } from '~/utils/colors'
import { SelectedNodeView } from '../SelectedNodeView'

type Props = { open: boolean }

export const SideBarSubView = ({ open }: Props) => {
  const [setSelectedNode, setTeachMe, showTeachMe] = useDataStore((s) => [
    s.setSelectedNode,
    s.setTeachMe,
    s.showTeachMe,
  ])

  const [setSidebarOpen] = useAppStore((s) => [s.setSidebarOpen])

  return (
    <Slide direction="right" in={open} mountOnEnter style={{ width: showTeachMe ? '700px' : '' }} unmountOnExit>
      <Wrapper>
        <ScrollWrapper>
          <SelectedNodeView />
        </ScrollWrapper>
        <CloseButton
          onClick={() => {
            setSelectedNode(null)
            setTeachMe(false)
          }}
        >
          <CloseIcon />
        </CloseButton>
        <CollapseButton
          onClick={() => {
            setSidebarOpen(false)
          }}
        >
          <ChevronLeftIcon />
        </CollapseButton>
      </Wrapper>
    </Slide>
  )
}

const Wrapper = styled(Flex)(({ theme }) => ({
  position: 'relative',
  background: colors.BG1,
  width: '100%',
  margin: '64px auto 20px 10px',
  borderRadius: '16px',
  zIndex: 29,
  overflow: 'hidden',
  [theme.breakpoints.up('sm')]: {
    width: '390px',
  },
}))

const CloseButton = styled(Flex)`
  font-size: 32px;
  color: ${colors.white};
  cursor: pointer;
  position: absolute;
  right: 3px;
  top: 3px;

  &:hover {
    color: ${colors.GRAY6};
  }

  &:active {
  }
`

const ScrollWrapper = styled(Flex)(() => ({
  height: '100%',
  width: '100%',
}))

const CollapseButton = styled(Flex).attrs({
  align: 'center',
  justify: 'center',
  p: 8,
})(({ theme }) => ({
  backgroundColor: colors.BG1_NORMAL,
  cursor: 'pointer',
  transitionDuration: '0.2s',
  position: 'absolute',
  right: '0px',
  top: '50%',
  zIndex: 1,
  width: '24px',
  height: '48px',
  transform: 'translateY(-50%)',
  borderRadius: '0px 6px 6px 0px',
  boxShadow: '2px 0px 6px 0px rgba(0, 0, 0, 0.25) inset',
  color: colors.white,

  [theme.breakpoints.up('sm')]: {
    left: '100%',
  },
  '&:hover': {
    backgroundColor: colors.BG1_HOVER,
  },
  '&:active': {
    backgroundColor: colors.BG1_PRESS,
    color: colors.GRAY6,
  },
}))
