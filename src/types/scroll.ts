export interface OffsetInfScrollStateList<T> {
  /**
   * 스크롤 가능한 리스트의 항목들
   */
  itemList: T[]

  /**
   * 리스트의 마지막 항목 ID, 또는 비어 있는 경우 null
   */
  lastItemId: number | null

  /**
   * 리스트가 초기화되었는지를 나타냅니다.
   * 데이터가 아직 로드되지 않은 경우 확인하는 데 사용됩니다.
   */
  isInitialized: boolean

  /**
   * 리스트가 현재 데이터를 로딩 중인지 나타냅니다.
   * 데이터 조회 작업 중에 로딩 인디케이터를 표시하는 데 사용됩니다.
   */
  isLoading: boolean

  /**
   * 로드할 더 많은 항목이 있는지를 나타냅니다.
   * 추가 데이터를 가져올 필요가 있는지 판단하는 데 사용됩니다.
   */
  hasMore: boolean
}