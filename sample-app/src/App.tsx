import {useMemo, useState} from 'react'
import { useTranslation } from 'react-i18next'
import dayjs from "dayjs";
import "./App.css"
import {
  ImageUploadField, CrossfadeImage, FileUploadItem, ImageUploadSortableField, useDateTimeFormatters,
  GroupedDataTable, Localized, ThemeProvider, useTheme
} from "../../src";
import 'dayjs/locale/ko' // 한국어 가져오기
import 'dayjs/locale/en'
import {buildTreeWithSubRows} from "../../src";
import type {ColumnDef, RowSelectionState} from "@tanstack/react-table";

class Hi {
  name: string = ""
  parentId: string = ""
  id: string = ""

  constructor(partial: Partial<Hi>) {
    Object.assign(this, partial)
  }
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" key="vite-ui-theme" themeExpiryHours={1}>
      <ScreenBody />
    </ThemeProvider>
  )
}

function ScreenBody() {
  const [count, setCount] = useState(0)
  const { t, i18n } = useTranslation()
  const { resolvedTheme, setTheme } = useTheme()

  const changeLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng);
  };

  const { dateTimeFormat } = useDateTimeFormatters()
  const time = dayjs()
  const [image, setImage] = useState<FileUploadItem>(new FileUploadItem({}))
  const [images, setImages] = useState<FileUploadItem[]>([])

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const items = useMemo(() => [
    new Hi({ name: "name", parentId: "0", id: "0"}),
    new Hi({ name: "name2", parentId: "0" , id: "3",}),
    new Hi({ name: "name3", parentId: "1", id: "1",}),
    new Hi({ name: "name4", parentId: "1", id: "4" }),
    new Hi({ name: "name5", parentId: "1", id: "5" }),
    new Hi({ name: "name6", parentId: "2" , id: "2"}),
    new Hi({ name: "name7", parentId: "2" , id: "6"}),
  ], [])

  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const columns: ColumnDef<Hi>[] = useMemo(() => [
    {
      id: "name",
      header: () => (<div>name</div>),
      cell: ({ row }) => (<div>{row.original.name}</div>),
    },
    {
      id: "id",
      header: () => (<div>id</div>),
      cell: ({ row }) => (<div>{row.original.id}</div>),
    },
    {
      id: "parentId",
      header: () => (<div>parentId</div>),
      cell: ({ row }) => (<div>{row.original.parentId}</div>),
    },
  ], [])

  const itemsChildren = useMemo(() => buildTreeWithSubRows(items, item => item.id, item => item.parentId, item => item.id === item.parentId), [items])

  const text: Localized<string> = { ko: "안녕", en: "Hello" }
  return (
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
        <div>{text.ko} / {text.en}</div>
        <div>{Localized.get(text, "ko")}</div>
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
        <div className="flex flex-row ">
          <button onClick={() => setTheme("light")}>Light</button>
          <button onClick={() => setTheme("dark")}>Dark</button>
        </div>
        <ImageUploadField
          id="thumbnail"
          label="썸네일"
          uploadHintText="이미지를 업로드하세요"
          descriptionText="권장 비율은 16:9 입니2다"
          aspectRatio="16 / 9"
          requiredAspectRatio
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
        <GroupedDataTable columns={columns} data={itemsChildren} getRowId={item => item.id} selectionState={[rowSelection, setRowSelection]} onClick={() => {}}

        />
      </div>
    </section>
  )
}
