import { useState } from 'react';

export default function useBoolean(defaultValue) {
    const [value, setValue] = useState(!!defaultValue);

    const setTrue = () => setValue(true);
    const setFalse = () => setValue(false);
    const toggle = () => setValue((x) => !x);

    return { value, setValue, setTrue, setFalse, toggle };
}
