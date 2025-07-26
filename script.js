let buttons = document.querySelectorAll('button')
let input = ''
let display = document.getElementById('display')
let reset = false

function calculate(event){
    const btn = event.currentTarget
    const id = btn.id
    const value = btn.getAttribute('data-value')
    const classList = btn.classList

    if(id === 'equals' || value === '='){
        try{
            input = eval(input).toString()
        }
        catch {
            input = 'Error'
        }
        display.textContent = input
        reset = true
        return;
    }

    if(classList.contains('operator')) 
    {
        if(/[+\-*/%]$/.test(input)) 
        {
            input = input.slice(0, -1)
        }
        input += value
    }

    else if(id === 'delete') 
    {
        input = input.slice(0, -1)
    }

    else if(id === 'all-clear' || value.toLowerCase() === 'c') 
    {
        input = ''
        display.textContent= '0'
        return;
    }

    else if(value !== '='){
        if(reset || input === 'Error'){
            input = ''
            reset = false
        }
        if (value === '.') {
            const lastNumber = input.split(/[\+\-\*\/%]/).pop()
            if (lastNumber.includes('.')) 
                return
            if (input === '' || /[+\-*/%]$/.test(input)) {
                input += '0.'
            } 
            else {
                input += '.'
            }
        }
        else
            input += value 
    }
    display.textContent = input || '0'
}

buttons.forEach(btn => {
    btn.addEventListener('click', calculate);
})

document.addEventListener('keydown', handlekeys)

function handlekeys(event){
    const key = event.key

    const validKeys = '0123456789.%*/+-'

    if(validKeys.includes(key)) {
        const button = document.querySelector(`button[data-value="${key}"]`)

        if(button)
            button.click()
    }
    else if(key === 'Enter' || key === '='){
        document.getElementById('equals').click()
    }

    else if(key === 'Backspace'){
        document.getElementById('delete').click();
    }
    else if(key.toLowerCase() === 'C'){
        document.getElementById('all-clear').click()
    }
}