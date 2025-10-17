export type cityType = {
  name: string;
  geo: string
}

export type File = {
  url: string
  type: string
}

interface NumbersDetail {
  "sign": number,
  "birth": number,
  "empty": number[],
  "nature": number[],
  "spirit": number,
  "talent": number[],
  "destiny": number,
  "birthDay": string
}

export type Numbers = {
  "sum": NumbersDetail,
  "moon": NumbersDetail
}

export type ChatMember = {
  "user_id": string,
  "name": string,
  "avatar_url": string
}