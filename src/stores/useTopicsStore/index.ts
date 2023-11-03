import create from 'zustand'
import { DATE } from '~/components/SourcesTableModal/SourcesView/constants'
import { TtopicsParams, getTopicsData } from '~/network/fetchSourcesData'
import { FetchTopicResponse, Topic, TopicFilter } from '~/types'

type TopicsStore = {
  data: Record<string, Topic> | null
  ids: string[]
  total: number
  filters: TopicFilter
  setTopics: () => void
  terminate: () => void
  setFilters: (filter: Partial<TopicFilter>) => void
}

const defaultData: Omit<TopicsStore, 'setTopics' | 'setFilters' | 'terminate'> = {
  data: null,
  ids: [],
  total: 0,
  filters: {
    muted: false,
    sortBy: DATE,
    page: 0,
    pageSize: 50,
  },
}

export const useTopicsStore = create<TopicsStore>((set, get) => ({
  ...defaultData,
  setTopics: async () => {
    const { data, ids, filters } = get()

    const payload = prepareTopicFilters(filters)

    const responseData: FetchTopicResponse = await getTopicsData(payload)

    const newData: Record<string, Topic> = filters.page > 0 ? data || {} : {}
    const newIds: string[] = filters.page > 0 ? ids : []

    responseData.data.forEach((topic) => {
      newData[topic.ref_id] = topic
      newIds.push(topic.ref_id)
    })

    set({ data: newData, ids: newIds, total: responseData.topicCount })
  },
  setFilters: (filters: Partial<TopicFilter>) => set({ filters: { ...get().filters, page: 0, ...filters } }),
  terminate: () => set(defaultData),
}))

const prepareTopicFilters = (filters: TopicFilter): TtopicsParams => ({
  muted: filters.muted ? 'True' : 'False',
  skip: String(filters.page * filters.pageSize),
  limit: String(filters.pageSize),
  sort_by: filters.sortBy,
  ...(filters.search ? { search: filters.search || '' } : {}),
})
