"use client";

import { useCallback, useReducer } from "react";
import { calculate } from "@/lib/calc";
import Display from "./Display";
import Keypad from "./Keypad";
import PercentButtons from "./PercentButtons";
import ModeToggle from "./ModeToggle";
import QuickPresets from "./QuickPresets";

type Mode = "add" | "subtract";

interface State {
    input: string;
    percent: number;
    mode: Mode;
}

type Action =
    | { type: "KEY"; key: string }
    | { type: "SET_PERCENT"; percent: number }
    | { type: "SET_MODE"; mode: Mode }
    | { type: "CLEAR" };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "KEY": {
            const { key } = action;
            if (key === "backspace") {
                return {
                    ...state,
                    input: state.input.length > 1 ? state.input.slice(0, -1) : "0",
                };
            }
            if (key === "." && state.input.includes(".")) return state;
            if (key === "." && state.input === "0") return { ...state, input: "0." };
            if (state.input === "0" && key !== ".") return { ...state, input: key };
            if (state.input.replace(".", "").length >= 10) return state; // max digits
            return { ...state, input: state.input + key };
        }
        case "SET_PERCENT":
            return { ...state, percent: action.percent };
        case "SET_MODE":
            return { ...state, mode: action.mode };
        case "CLEAR":
            return { ...state, input: "0" };
        default:
            return state;
    }
}

interface Props {
    initialPercent?: number;
    initialMode?: Mode;
}

export default function Calculator({
    initialPercent = 10,
    initialMode = "subtract",
}: Props) {
    const [state, dispatch] = useReducer(reducer, {
        input: "0",
        percent: initialPercent,
        mode: initialMode,
    });

    const base = parseFloat(state.input) || 0;
    const result = calculate(base, state.percent, state.mode);

    const handleKey = useCallback(
        (key: string) => dispatch({ type: "KEY", key }),
        []
    );
    const handlePercent = useCallback(
        (p: number) => dispatch({ type: "SET_PERCENT", percent: p }),
        []
    );
    const handleMode = useCallback(
        (m: Mode) => dispatch({ type: "SET_MODE", mode: m }),
        []
    );
    const handleClear = useCallback(() => dispatch({ type: "CLEAR" }), []);
    const handlePreset = useCallback((p: number, m: Mode) => {
        dispatch({ type: "SET_PERCENT", percent: p });
        dispatch({ type: "SET_MODE", mode: m });
    }, []);

    return (
        <div className="calculator-shell">
            <ModeToggle mode={state.mode} onToggle={handleMode} />
            <PercentButtons
                selected={state.percent}
                onSelect={handlePercent}
            />
            <Display
                input={state.input}
                result={result}
                percent={state.percent}
                mode={state.mode}
                onClear={handleClear}
            />
            <Keypad onKey={handleKey} />
            <QuickPresets onSelect={handlePreset} />
        </div>
    );
}
