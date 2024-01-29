import { useReducer } from "react";

const initialState = {
  open: false,
  title: "",
  content: "",
  start: null,
  end: null,
  allDay: false,
  id: null,
};

const reducer = (state, action) => {
  const { type, title, content, start, end, allDay, id } = action;

  switch (type) {
    case "OPEN_DIALOG":
      return { ...state, open: true };
    case "CLOSE_DIALOG":
      return { ...state, open: false };
    case "EVENT_CLICK":
      return {
        open: true,
        title: title ?? state.title,
        content: content ?? state.content,
        start: start ?? state.start,
        end: end ?? state.end,
        allDay: allDay ?? state.allDay,
        id: id ?? state.id,
      };
    case "ADD_EVENT":
      return {
        ...state,
        open: true,
        title: title,
        content: content,
        start: start,
        end: end,
        allDay: allDay,
        id: id,
      };
    case "SET_ALL_DAY":
      return { ...state, allDay: allDay };
    case "SET_CONTENT":
      return { ...state, content: content };
    case "SET_END":
      return { ...state, end: end };
    case "SET_START":
      return { ...state, start: start };
    default:
      throw new Error();
  }
};

const useEventHandling = () => {
  const [dialogProperties, dispatch] = useReducer(reducer, initialState);

  return { dialogProperties, dispatch };
};

export default useEventHandling;
