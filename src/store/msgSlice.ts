import { createSlice } from "@reduxjs/toolkit";
import Message from "../components/global-types/TMessage";

export type MsgState = {
    msgList: Array<Message>,
    showModalMsg: {
        open: boolean,
        type: string,
    };
};

const initialState: MsgState = {
    msgList: [],
    showModalMsg: {open: false, type: ''}
};

const msgSlice = createSlice({
    name: 'msg',
    initialState ,
    reducers: {
        resetState: (state) => initialState,
        addMsg: (state, action) => {
            state.msgList.push(action.payload)
        },
        editMsg: (state, action) => {
            const {id, titulo, mensagem, userId } = action.payload
            const findMsg = state.msgList.findIndex((mensagem: Message) => mensagem.id === id)!
            state.msgList[findMsg].id = id
            state.msgList[findMsg].titulo = titulo
            state.msgList[findMsg].mensagem = mensagem
            state.msgList[findMsg].userId = userId
            state.msgList.splice(findMsg, 1, state.msgList[findMsg])
        },
        deleteMsg: (state, action) => {
            const filtered = state.msgList.filter((mensagem: Message) => mensagem.id !== action.payload) 
            state.msgList = filtered
        },
        setModalMsg: (state, action) => {
            const {open, type} = action.payload
            state.showModalMsg = {open, type}
        },
        resetModalMsg: (state) => {
            state.showModalMsg = initialState.showModalMsg
        },
    },
    extraReducers: {}
});

export const { resetState, addMsg, setModalMsg, resetModalMsg } = msgSlice.actions
export default msgSlice.reducer