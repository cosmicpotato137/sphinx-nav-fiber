import { noop } from 'lodash'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import AudioIcon from '~/components/Icons/AudioIcon'
import BudgetIcon from '~/components/Icons/BudgetIcon'
import NodesIcon from '~/components/Icons/NodesIcon'
import TwitterIcon from '~/components/Icons/TwitterIcon'
import VideoIcon from '~/components/Icons/VideoIcon'
import { api } from '~/network/api'
import { useUserStore } from '~/stores/useUserStore'
import { colors } from '~/utils/colors'
import { Flex } from '../common/Flex'
import EpisodeIcon from '../Icons/EpisodeIcon'

type StatResponse = {
  /* eslint-disable camelcase */
  num_nodes: number
  num_episodes: number
  num_audio: number
  num_video: number
  num_contributors: number
  num_daily: number
  num_twitter_space: number
}

type TStats = {
  numAudio: number
  numContributors: number
  numDaily: number
  numEpisodes: number
  numNodes: number
  numTwitterSpace: number
  numVideo: number
}

export const Stats = () => {
  const [stats, setStats] = useState<TStats | null>(null)
  const [budget] = useUserStore((s) => [s.budget])

  function formatBudget(value: number | null) {
    if (value === null) {
      return '?'
    }

    const stringBudget = value.toLocaleString()

    const splittedBudget = stringBudget.split(',')

    return splittedBudget.join(' ')
  }

  useEffect(() => {
    const run = async () => {
      try {
        const data = await api.get<StatResponse>('/stats')

        if (data) {
          setStats({
            numAudio: data.num_audio,
            numContributors: data.num_contributors,
            numDaily: data.num_daily,
            numEpisodes: data.num_episodes,
            numNodes: data.num_nodes,
            numTwitterSpace: data.num_twitter_space,
            numVideo: data.num_video,
          })
        }
      } catch (e) {
        noop()
      }
    }

    run()
  }, [])

  if (!stats) {
    return null
  }

  return (
    <StatisticsContainer>
      <StatisticsWrapper>
        <Stat>
          <div className="icon">
            <NodesIcon />
          </div>
          <div className="text">{stats.numNodes}</div>
        </Stat>
        <Stat>
          <div className="icon">
            <EpisodeIcon />
          </div>
          <div className="text">{stats.numEpisodes}</div>
        </Stat>
        <Stat>
          <div className="icon">
            <AudioIcon />
          </div>
          <div className="text">{stats.numAudio}</div>
        </Stat>
        <Stat>
          <div className="icon">
            <VideoIcon />
          </div>
          <div className="text">{stats.numVideo}</div>
        </Stat>
        <Stat>
          <div className="icon">
            <TwitterIcon />
          </div>
          <div className="text">{stats.numTwitterSpace}</div>
        </Stat>
      </StatisticsWrapper>
      <StatisticsBudget>
        <Budget>
          <div className="icon">
            <BudgetIcon />
          </div>
          <div className="text">
            <p>
              {`${formatBudget(budget)} `} <span className="budgetUnit">SAT</span>
            </p>
          </div>
        </Budget>
      </StatisticsBudget>
    </StatisticsContainer>
  )
}

const StatisticsWrapper = styled(Flex).attrs({
  align: 'center',
  direction: 'row',
  grow: 1,
  justify: 'flex-start',
})``

const StatisticsBudget = styled(Flex).attrs({
  align: 'center',
  direction: 'row',
  grow: 1,
  justify: 'flex-end',
})``

const StatisticsContainer = styled(Flex).attrs({
  align: 'center',
  direction: 'row',
  grow: 1,
})`
  justify-content: between;
`

const Stat = styled(Flex).attrs({
  align: 'center',
  direction: 'row',
  justify: 'flex-start',
})`
  color: ${colors.white};
  background: ${colors.BG1};
  padding: 6px 10px 6px 8px;
  font-family: Barlow;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: 0.78px;
  margin: 0 8px;
  border-radius: 200px;

  &:hover {
    background: ${colors.BUTTON1_PRESS};
  }

  &:active {
    background: ${colors.BUTTON1};
  }

  .icon {
    margin-right: 8px;
    font-size: 16px;
  }

  .text {
  }
`

const Budget = styled(Flex).attrs({
  align: 'center',
  direction: 'row',
})`
  display: flex;
  height: 2.5rem;
  padding: 0.75rem 0.9375rem 0.75rem 0.9375rem;
  align-items: center;
  gap: 0.625rem;
  color: ${colors.white};
  background: ${colors.BG1};
  font-family: Barlow;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.0075rem;
  border-radius: 12.5rem;

  &:hover {
    background: ${colors.BUTTON1_PRESS};
  }

  &:active {
    background: ${colors.BUTTON1};
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .budgetUnit {
    color: ${colors.GRAY6};
  }

  .text {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
