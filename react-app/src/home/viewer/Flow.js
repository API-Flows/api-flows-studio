
const isInput = (type) => {
    return (type === 'input');
}

const isOutput = (type) => {
    return (type === 'output');
}

const isStep = (type) => {
    return (!isInput(type) && !isOutput(type));
}

export { isInput, isOutput, isStep };