import styled from 'styled-components'
import { colors } from '~/utils/colors'
import { Flex } from '../Flex'

type Episode = {
  img: string
  label: string
}

type EpisodeTypeImage = {
  [key: string]: Episode
}

const EpisodeTypeImages: EpisodeTypeImage = {
  podcast: { img: 'audio_badge.svg', label: 'podcast' },
  clip: { img: 'audio_badge.svg', label: 'clip' },
  show: { img: 'audio_badge.svg', label: 'show' },
  tweet: { img: 'twitter_badge.svg', label: 'tweet' },
  twitter_space: { img: 'audio_badge.svg', label: 'clip' },
  youtube: { img: 'video_badge.svg', label: 'clip' },
  episode: { img: 'video_badge.svg', label: 'episode' },
  document: { img: 'notes_badge.svg', label: 'text' },
}

type Props = {
  type: string
}

export const TypeBadge = ({ type }: Props) => (
  <EpisodeWrapper>
    <img alt={EpisodeTypeImages[type]?.label || type} src={EpisodeTypeImages[type]?.img || ''} />
    <div className="label">{EpisodeTypeImages[type]?.label || type}</div>
  </EpisodeWrapper>
)

const EpisodeWrapper = styled(Flex).attrs({
  direction: 'row',
})`
  cursor: pointer;
  background: ${colors.white};
  border-radius: 1px;
  overflow: hidden;

  img {
    width: 14px;
    height: 14px;
    object-fit: cover;
  }

  .label {
    color: ${colors.BG1};
    font-family: Barlow;
    font-size: 8px;
    font-style: normal;
    font-weight: 800;
    line-height: 14px;
    text-transform: uppercase;
    line-height: 14px;
    letter-spacing: 0.48px;
    padding: 0 4px;
  }
`
