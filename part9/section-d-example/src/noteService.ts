import axios from "axios";
import { type NewNote, type Note } from "./types";

const baseUrl = "http://localhost:3001/notes";

export const getAllNotes = async (): Promise<Note[]> => {
  const { data } = await axios.get<Note[]>(baseUrl);
  return data;
};

export const createNote = async (object: NewNote): Promise<Note> => {
  const { data } = await axios.post<Note>(baseUrl, object);
  return data;
};
