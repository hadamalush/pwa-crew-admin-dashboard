import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "./store";

export type DispatchFunction = () => AppDispatch;

export const useGlobalDispatch: DispatchFunction = useDispatch;
export const useGlobalSelector: TypedUseSelectorHook<RootState> = useSelector;
