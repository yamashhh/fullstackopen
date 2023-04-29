import { axiosInstance } from "../lib/axios";
import {
  type DiaryEntry,
  type NewDiaryEntry,
  type NonSensitiveDiaryEntry,
} from "../types";

const getAll = async (): Promise<NonSensitiveDiaryEntry[]> => {
  const { data } = await axiosInstance.get<NonSensitiveDiaryEntry[]>(
    "/diaries"
  );
  return data;
};

const create = async (newDiary: NewDiaryEntry): Promise<DiaryEntry> => {
  const { data } = await axiosInstance.post<DiaryEntry>("/diaries", newDiary);
  return data;
};

export default { getAll, create };
