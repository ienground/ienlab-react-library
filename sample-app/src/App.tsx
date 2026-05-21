import {useState} from 'react'
import { useTranslation } from 'react-i18next'
import './App.css'
import dayjs from "dayjs";
import {ImageUploadField, CrossfadeImage, ImageUploadItem, ImageUploadSortableField, useDateTimeFormatters} from "../../src";
import 'dayjs/locale/ko' // 한국어 가져오기
import 'dayjs/locale/en'

export default function App() {
  const [count, setCount] = useState(0)
  const { t, i18n } = useTranslation()

  const changeLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng);
  };

  const { dateTimeFormat } = useDateTimeFormatters()
  const time = dayjs()
  const [image, setImage] = useState<ImageUploadItem>(new ImageUploadItem({}))
  const [images, setImages] = useState<ImageUploadItem[]>([])

  return (
    <>
      <section id="center">
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h1>라이브러리 샘플 애플리케이션</h1>
          <p>react-library 컴포넌트 사용 예시</p>
          
          <div style={{ margin: '20px 0' }}>
            <h2>Image 컴포넌트 사용 예시</h2>
            <CrossfadeImage
              src="https://picsum.photos/200/300"
              alt="Placeholder Image"
              width={300}
              height={200}
            />
          </div>
          
          <div style={{ margin: '20px 0' }}>
            <h2>Translations</h2>
            <p>{t('libs:auth.errors.invalid_credential')}</p>
            <p>{t('strings:amount')}</p>
          </div>
          
          <div style={{ margin: '20px 0' }}>
            <button onClick={() => changeLanguage('en')}>English</button>
            <button onClick={() => changeLanguage('ko')}>Korean</button>
          </div>
          <div>{dateTimeFormat(time.toDate())}</div>
          <div>
            <button
              type="button"
              className="counter"
              onClick={() => setCount((count) => count + 1)}
            >
              Count is {count}
            </button>
          </div>
          <ImageUploadField
            id="thumbnail"
            label="썸네일"
            uploadHintText="이미지를 업로드하세요"
            descriptionText="권장 비율은 16:9 입니다"
            value={image}
            onChange={item => setImage(item)}
            // components={{
            //   Input,
            //   Field,
            //   FieldLabel,
            //   FieldDescription,
            // }}
          />
          <ImageUploadSortableField
            id="thumbnail"
            label="썸네일"
            uploadHintText="이미지를 업로드하세요"
            descriptionText="권장 비율은 16:9 입니다"
            items={images}
            onChange={items => setImages(items)}
            // components={{
            //   Input,
            //   Field,
            //   FieldLabel,
            //   FieldDescription,
            // }}
          />
        </div>
      </section>
    </>
  )
}
