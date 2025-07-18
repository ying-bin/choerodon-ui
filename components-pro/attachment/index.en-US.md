---
category: Pro Components
subtitle: 附件
type: Data Entry
title: Attachment
---

附件上传和展示

## 何时使用

需要上传文件时。

## API

### Attachment
 
属性说明如下：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| accept | 接受上传的文件类型 [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept) | string[] |  |
| data | 上传所需参数 | object |  |
| headers | 设置上传的请求头部，IE10 以上有效 | object |  |
| multiple | 是否支持多选，IE10 以上有效 | boolean | true |
| withCredentials | 上传请求时是否携带 cookie | boolean | false |
| listType | 上传列表的内建样式，支持三种基本样式 `text`, `picture` 和 `picture-card` | string | 'text' |
| viewMode | 上传列表的显示模式，支持三种基本样式 `none`, `list` 和 `popup` | string | 'list' |
| sortable | 是否可排序, 只读模式下不可拖拽 | boolean | true |
| fileKey | 上传文件的参数名 | string | [attachment.defaultFileKey](/components/configure/#AttachmentConfig) |
| fileSize | 上传文件的大小限制, 单位 `B` | number | [attachment.defaultFileSize](/components/configure/#AttachmentConfig) |
| useChunk | 是否开启分片上传 | boolean |  |
| chunkSize | 分片大小 | number | [attachment.defaultChunkSize](/components/configure/#AttachmentConfig) |
| chunkThreads | 分片上传并发数 | number | [attachment.defaultChunkThreads](/components/configure/#AttachmentConfig) |
| pictureWidth | 图片尺寸， 只适用于 listType 为 picture 和 picture-card | number |  |
| count | 自定义附件数量 | number |  |
| max | 同时上传文件的最大数量, `0` 表示无限制 | number |  |
| listLimit | 上传列表最大显示数量，只适用于只读模式 | number |  |
| showHistory | 可显示操作历史记录 | boolean |  |
| showSize | 显示文件大小信息 | boolean | true |
| downloadAll | 是否显示全部下载按钮，只适用于只读模式， 必须配置[attachment.getDownloadAllUrl](/components/configure/#AttachmentConfig) | boolean \| ButtonProps | true |
| bucketName | 附件上传的桶名 | string |  |
| bucketDirectory | 附件上传的桶目录 | string |  |
| storageCode | 附件存储编码 | string |  |
| template | 附件模板 | { bucketName?: string, bucketDirectory?: string, storageCode?:string, attachmentUUID: string, isPublic?: boolean } |  |
| previewTarget | 预览链接跳转对象， 如要在iframe内预览， 可给 iframe 指定 name={previewTarget} | string | 'attachment-preview'  |
| isPublic | 是否是公共的， [attachment](/components/configure/#AttachmentConfig)配置中相关钩子会使用该属性 | boolean |  |
| attachments | 附件列表 | (AttachmentFile \| FileLike)[] |  |
| showValidation | 校验信息展示方式 | `newLine` \| `tooltip` | `viewMode` == `popup` ? `tooltip` : `newLine` |
| getUUID | 获取 uuid | () => Promise<string> \| string | [attachment.getAttachmentUUID](/components/configure/#AttachmentConfig) |
| buttons | 功能按钮，默认存在`download` 和 `remove`值，可传递数组、自定义按钮或按钮配置属性对象，数组为可选值字符串+按钮配置属性对象（非默认按钮需添加唯一 key） | string[] \| \[string, object\] \| ReactNode[] \| object \| (({ attachment: AttachmentFile, bucketName?: string, bucketDirectory?: string, storageCode?:string, attachmentUUID: string, isPublic?: boolean, readOnly?: boolean, disabled?: boolean }) => ReactElement<ButtonProps\>)\[\] | [['download', 'remove']] |
| onAttachmentsChange | 附件列表变更事件 | (AttachmentFile[]) => void |  |
| beforeUpload | 上传文件之前的钩子，参数为上传的文件，可对文件在上传之前进行校验操作若返回 false 则停止上传并从列表充删除。支持返回一个 Promise 对象，Promise 对象 reject 或 resolve(false) 时则停止上传，resolve 时开始上传。 | (attachment: AttachmentFile, list: AttachmentFile[]) => (boolean \| Promise) | - |
| onUploadProgress | 上传进度变化的回调 | (percent: number, attachment: AttachmentFile) => void | 无 |
| onUploadSuccess | 上传成功的回调 | (response: any, attachment: AttachmentFile) => void | 无 |
| onUploadError | 上传出错的回调 | (error: Error, attachment: AttachmentFile) => void | 无 |
| getPreviewUrl | 获取预览地址，默认使用 AttachmentFile.url，返回空则不可预览。其中函数的返回值为 (() => string \| Promise< string>) 时，仅支持 listType 为 text 的情况 | ({ attachment: AttachmentFile, bucketName?: string, bucketDirectory?: string, storageCode?:string, attachmentUUID: string, isPublic?: boolean }) => (string \| (() => string \| Promise< string>) \| undefined) |  |
| removeImmediately | 是否立即删除 | boolean | true |
| onTempRemovedAttachmentsChange | 临时删除文件变化回调，`removeImmediately` 为 false 时生效 | (tempRemovedAttachments?: AttachmentFile[]) => void |  |
| filesLengthLimitNotice | 上传文件时，数量超过限定数量的自定义提示 | (defaultInfo: string) => void | (defaultInfo) => Modal.error(defaultInfo) |
| countTextRenderer | 上传按钮中数量显示 renderer | (count?: number, max?: number, defaultCountText?: ReactNode) => ReactNode |  |
| removeConfirm | 删除前确认气泡框配置 | boolean \| PopconfirmProps | |
| templateDownloadButtonRenderer | 自定义下载模板按钮，使用后需完全自定义下载模板相关逻辑 | () => ReactNode | |
| downloadAllMode | 显示全部下载按钮模式 | readOnly \| always | 'readOnly' |
| getDownloadAllUrl | 获取全部下载地址，返回值类型为函数时作为按钮的点击事件 | ({ bucketName?: string, bucketDirectory?: string, storageCode?:string, attachmentUUID: string, isPublic?: boolean }) => string \| Function \| undefined |  |
| getDownloadUrl | 获取下载地址，返回值类型为函数时作为按钮的点击事件，默认使用 AttachmentFile.url | ({ attachment: AttachmentFile, bucketName?: string, bucketDirectory?: string, storageCode?:string, attachmentUUID: string, isPublic?: boolean }) => string \| Function \| undefined | [attachment.getDownloadUrl](/components/configure/#AttachmentConfig) |

更多属性请参考 [FormField](/components-pro/field/#FormField) 和 [Button](/components-pro/button/#Button)。
附件对象参考 [AttachmentFile](/components-pro/data-set/#AttachmentFile)
全局配置参考 [attachment](/components/configure/#AttachmentConfig)

### Attachment.Group

附件组, 属性如下:

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| viewMode | 上传列表的显示模式，支持两种基本样式  `list` 和 `popup` | string | 'popup' |
| text | 按钮文字 | ReactNode |  |
| count | 自定义附件数量, 未设置时会自动获取组内的附件数量 | number |  |

更多属性请参考 [Button](/components-pro/button/#Button)。

### Attachment.Dragger
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| attachmentChildren | 上传组件 children | ReactNode | $l('Attachment', 'upload_attachment') |

### Attachment Instance Methods
| 属性 | 说明 | 参数 | 返回值类型 | 版本 |
| --- | --- | --- | --- | --- |
| remove | 删除临时移除文件 |  | void | 1.6.5 |
| reset | 还原临时移除文件 |  | void | 1.6.5 |