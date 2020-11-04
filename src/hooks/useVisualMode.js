import { useState } from "react";
import React from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  function transition(mode, replace = false) {
    setHistory(prev => {
      if (replace) {
        return [...prev.slice(0, prev.length - 1), mode];
      } else {
        return [...prev, mode];
      }
    });
  }
  function back() {
    if (history.length < 2) return;
    setHistory(prev => [...prev.slice(0, history.length - 1)]);
  }
  return { mode: history.slice(-1)[0], transition, back }};