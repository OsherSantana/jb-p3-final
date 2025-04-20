import { PropsWithChildren, useEffect } from "react";
import { io } from "socket.io-client";
import { useAppDispatch } from "../../redux/hooks";
import { newVacation } from "../../redux/vacationProfileSlice";
import Vacation from "../../models/vacation/Vacation";

export default function Io(props: PropsWithChildren): JSX.Element {

    const { children } = props


    const dispatch = useAppDispatch()

    useEffect(() => {
        const socket = io(import.meta.env.VITE_IO_SERVER_URL)

        socket.onAny((eventName, payload) => {
            switch (eventName) {
                case 'newVacation':
                    const newVacationPayload = payload as Vacation
                    dispatch(newVacation(newVacationPayload))
                    break;
            }
        })

    }, [])

    return (
        <>
            {children}
        </>
    )

}