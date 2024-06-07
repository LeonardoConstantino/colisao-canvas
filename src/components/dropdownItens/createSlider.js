export const createSlide = (label, name, valorInicial, max, min, step, handle, title='', eixo) => {
    const spanText = {
        type: null,
        props: { nodeValue: `${label}: ` },
    }
    
    const spanValue = {
        type: 'span',
        props: {
            "data-name": name,
            children: [
                {
                    type: null,
                    props: { nodeValue: valorInicial },
                },
            ],
        },
    }
    
    const span = {
        type: 'span',
        props: {
            children: [spanText, spanValue],
        },
    }
    
    const input = {
        type: 'input',
        props: {
            type: 'range',
            min: min,
            max: max,
            step: step,
            value: valorInicial,
            oninput: handle,
        },
    }
    
    if(eixo){
        input.props["data-eixo"] = eixo
    }
    
    return {
        type: 'label',
        props: {
            class: 'label-config',
            children: [span, input],
            title
        },
    }
    
}