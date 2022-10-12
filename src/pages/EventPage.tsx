import { useNavigate } from 'react-router'
import PageLayout from '../components/common/ui/PageLayout'
import CardTemplate from './../components/common/ui/CardTemplate'
import { InEventMainList, useGetDetailEvent, useGetEvent } from '../components/main/hooks/useEventLists'
import { useEffect, useState } from 'react'
import Pagination from './../components/main/common/Pagination'
import Search from '../components/main/common/Search'
import axios from 'axios'
import { useSetRecoilState } from 'recoil'
import { eventId } from '../store/event'
import { EventSkeleton } from '../components/common/ui/Skeleton'

interface EventItem {
  id: string
  title?: string
  description?: string
  startTime?: string
  endTime?: string
  mainImg?: string
  descImg?: string[]
}

function EventPage() {
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1)

  // const [eventList, setEventList] = useState<any>([])
  // const getEvent = async () => {
  //   const res = await axios.get('https://633010e5591935f3c8893690.mockapi.io/lenssis/api/v1/event')
  //   setEventList(res.data)
  // }
  // useEffect(() => {
  //   getEvent()
  // }, [])
  // location state 이용할지 recoil 이용할지
  const setEventId = useSetRecoilState(eventId)

  const onClickEvent = (id: number) => {
    setEventId(id)
    navigate(`/event/${id}`, { state: id })
  }
  // console.log(eventId)
  // if (eventId) {
  // }
  // const event = useGetDetailEvent(1)
  // console.log(event)
  const { data: eventList, isFetching } = useGetEvent()
  console.log(eventList)

  return (
    <>
      <PageLayout layoutWidth="max-w-[1180px]" innerTop="top-[40%]">
        <CardTemplate title="이벤트" isTitleVisible={true}>
          <div className=" grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 justify-items-stretch xs-max:gap-y-[20px] md:gap-8 md:px-12">
            {/* eventList.map */}
            {isFetching ? (
              <EventSkeleton count={4} />
            ) : (
              eventList &&
              eventList?.data?.eventMainList.map((event: InEventMainList) => (
                <div
                  key={event.eventId}
                  className="w-full rounded-xl xs-max:h-[215px] flex flex-col items-center my-2 shadow-basic hover:cursor-pointer"
                  onClick={() => onClickEvent(event.eventId)}
                >
                  <img
                    className="w-full h-[145px] md:h-[226px] rounded-t-xl object-fit md:object-cover"
                    src={event.imageUrl}
                    alt="イヴェントイメージ"
                  />
                  <div className=" h-[95px] rounded-b-xl">
                    {/* 이벤트 내용 */}
                    {event.eventTitle}
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="relative flex justify-center items-center">
            {eventList?.data?.totalCount && (
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                allCount={eventList.data.totalCount}
                divide={8}
              />
            )}
          </div>
        </CardTemplate>
      </PageLayout>
    </>
  )
}

export default EventPage
