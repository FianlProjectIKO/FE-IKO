import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { CurrentInnerWidth } from '../../store/currentInnerWidth'
import { ItemDetail, MainCartModalState } from '../../store/mainCart'
import { useUser } from '../auth/hooks/useUser'
import { getProductDetails } from '../ProductDetail/hooks/useProductDetails'
import { addFavorite, useDeleteFavorite } from './../main/hooks/useFavorite'
import useToast from './toast/hooks/useToast'

interface PropsType {
  productId: number
  isFavorite?: number
}

function CartAndHeart({ productId, isFavorite }: PropsType) {
  const windowWidth = useRecoilValue(CurrentInnerWidth)
  const [onHeartAnimation, setOnHeartAnimation] = useState(false)
  const setIsCartModalOpen = useSetRecoilState(MainCartModalState)
  const deleteFavor = useDeleteFavorite()

  const navigate = useNavigate()
  const { fireToast } = useToast()
  const setDetail = useSetRecoilState(ItemDetail)

  const { user } = useUser()
  const { mutate } = useMutation(() => getProductDetails(user ? user?.memberId : 0, productId), {
    onSuccess: (data) => {
      setDetail(data.data)
    }
  })

  const ClickHeart = () => {
    if (!user) {
      fireToast({
        id: 'failedClickHeart',
        message: '로그인을 해주세요.',
        position: 'bottom',
        timer: 2000,
        type: 'warning'
      })
      navigate('signin')
      return
    }
    // throttle 구현 해보기
    setTimeout(() => {
      if (!onHeartAnimation) {
        addFavorite(productId)
      }
    }, 500)
    setOnHeartAnimation((prev) => !prev)
    if (onHeartAnimation) {
      deleteFavor(productId)
    }
  }

  useEffect(() => {
    if (isFavorite === 1) {
      setOnHeartAnimation(true)
    }
  }, [isFavorite])

  const ClickCart = () => {
    if (!user) {
      fireToast({
        id: 'failedClickHeart',
        message: '로그인을 해주세요.',
        position: 'bottom',
        timer: 2000,
        type: 'warning'
      })
      navigate('/signin')
      return
    }
    mutate()
    setTimeout(() => {
      setIsCartModalOpen((prev) => !prev)
    }, 100)
  }

  return (
    <div className={`flex justify-center items-center  `}>
      {windowWidth > 440 && (
        <div className={`mr-2 cursor-pointer hover:animate-click relative`} onClick={ClickCart}>
          <svg
            width={`${windowWidth < 440 ? 20 : 28}`}
            height={`${windowWidth < 440 ? 20 : 28}`}
            viewBox="0 0 20 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.38952 3.5352L2.76904 1H1"
              stroke="#ABABAB"
              strokeWidth="1.24252"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.39007 14.9518C6.04992 14.9518 6.58483 14.3843 6.58483 13.6842C6.58483 12.9841 6.04992 12.4166 5.39007 12.4166C4.73023 12.4166 4.19531 12.9841 4.19531 13.6842C4.19531 14.3843 4.73023 14.9518 5.39007 14.9518Z"
              stroke="#ABABAB"
              strokeWidth="1.24252"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.5669 3.53467L17.4814 9.45013H4.71823L3.38672 3.53467"
              stroke="#ABABAB"
              strokeWidth="1.24252"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.1948 14.9439C16.8546 14.9439 17.3895 14.3764 17.3895 13.6763C17.3895 12.9762 16.8546 12.4087 16.1948 12.4087C15.5349 12.4087 15 12.9762 15 13.6763C15 14.3764 15.5349 14.9439 16.1948 14.9439Z"
              stroke="#ABABAB"
              strokeWidth="1.24252"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.1976 12.4079L5.38948 12.4163L3.39062 3.53467"
              stroke="#ABABAB"
              strokeWidth="1.24252"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
      <div className={`cursor-pointer ${onHeartAnimation && 'animate-click'}`} onClick={ClickHeart}>
        <>
          <svg
            width={`${windowWidth < 440 ? 20 : 28}`}
            height={`${windowWidth < 440 ? 20 : 28}`}
            viewBox="0 0 18 15"
            fill={`${onHeartAnimation ? '#FF6C6C' : 'none'}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.0021 13.878V13.878L8.99492 13.878C8.967 13.8782 8.93934 13.8728 8.9135 13.8623C8.88796 13.8519 8.8647 13.8365 8.84502 13.8172C8.84479 13.817 8.84457 13.8168 8.84434 13.8165L2.37342 7.33728C2.37309 7.33694 2.37275 7.33661 2.37242 7.33627C1.67596 6.63201 1.28532 5.68147 1.28532 4.69095C1.28532 3.70064 1.67579 2.7503 2.37197 2.04608C3.07393 1.34688 4.02435 0.954265 5.01518 0.954265C6.00652 0.954265 6.95741 1.34728 7.65947 2.04717C7.65959 2.04729 7.65971 2.04741 7.65983 2.04753L8.55921 2.94691L8.99851 3.38621L9.4378 2.94691L10.3372 2.04753C10.3374 2.04734 10.3376 2.04714 10.3378 2.04694C10.3378 2.04693 10.3378 2.04692 10.3378 2.04691C11.0398 1.34719 11.9906 0.954265 12.9818 0.954265C13.9726 0.954265 14.9231 1.34686 15.625 2.04604C16.3212 2.75027 16.7117 3.70062 16.7117 4.69095C16.7117 5.68147 16.3211 6.63202 15.6246 7.33629C15.6243 7.33662 15.6239 7.33695 15.6236 7.33728L9.15267 13.8165C9.15245 13.8168 9.15222 13.817 9.152 13.8172C9.13232 13.8365 9.10906 13.8519 9.08352 13.8623C9.05768 13.8728 9.03001 13.8782 9.0021 13.878Z"
              stroke={`${onHeartAnimation ? '#FF6C6C' : '#ababab'}`}
              strokeWidth="1.24252"
            />
          </svg>
        </>
      </div>
    </div>
  )
}

export default CartAndHeart
